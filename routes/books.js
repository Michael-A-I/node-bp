/*
.########...#######..##.....##.########.########.########.
.##.....##.##.....##.##.....##....##....##.......##.....##
.##.....##.##.....##.##.....##....##....##.......##.....##
.########..##.....##.##.....##....##....######...########.
.##...##...##.....##.##.....##....##....##.......##...##..
.##....##..##.....##.##.....##....##....##.......##....##.
.##.....##..#######...#######.....##....########.##.....##
*/

const express       = require('express');
const router        = express.Router();
// model
const Author        = require('../models/author');
const Book          = require('../models/book');

// image setup
// const path              = require('path')
// const uploadPath        = path.join('public',Book.coverImageBasePath)
const imageMimeTypes    = ['image/jpeg','image/png','image/gif']
// multipart for data multer
// const multer            = require('multer')
// ref model for setting up destination
// const upload            = multer({
//     dest:uploadPath,
//     fileFilter:(req,file,callback)=>{
//         callback(null, true)
//     }

// })
// remove images on error (built in node.js)
const fs = require('fs');


// Search through list of all books
router.get('/', async (req,res)=>{
    let query = Book.find();

    if(req.query.title != null && req.query.title !=''){
        query = query.regex('title', new RegExp(req.query.title, 'i'))
    }
    if(req.query.publishedBefore != null && req.query.pusblishedBeforce !=''){
        query = query.lte('publishDate', req.query.publishedBefore)
    }
    if(req.query.publishedAfter != null && req.query.pusblishedAfter !=''){
        query = query.gte('publishDate', req.query.publishedAfter)
    }
    
    

   try {    
    const books = await query.exec()

    const params = {books            :books,
                    searchOptions    :req.query}
                    
    res.render('books/index', params)

   } catch (error) {
       console.log("error on get /"+ error)
       res.redirect('/')
   }
})


// create new book to database
router.get('/new', async (req,res)=>{
   
    renderNewPage(res, new Book())
  
})


// CREATE BOOK
router.post('/', async (req,res)=>{

    const fileName = req.file != null ? req.file.filename : null
    console.log("Author: "+req.body.author);


    
    let auth = req.body.author
    const book = new Book({
        author: auth,
        title: req.body.title,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        // coverImageName: fileName,
        description: req.body.description
    })
    
    saveCover(book,req.body.cover)

    console.log(book)
    
    try {
        console.log('saving book...')
        const newBook = await book.save();
        console.log("ROUTER.POST(/) TRY STATEMENT")
        // save new book
        
        console.log(newBook)
        
        res.redirect('books')
        
    } catch (error) {
        
        console.log("router author "+req.body.author)
        console.log("ROUTER.POST(/) CATCH STATEMENT")
        console.log("error @ POST / "+error)

        // fs remove book cover
        // if(book.coverImageName != null){
        //     removeBookCover(book.coverImageName)
        // }
        // render books/new with error message if book could not save
        renderNewPage(res, book, true)
    }

})





// remove image created from upload path and file name
// function removeBookCover(fileName){
//     fs.unlink(path.join(uploadPath,fileName), err => {
//         if (err) console.error("Error @ removeBookCover "+err)
//     })
// }

async function renderNewPage(res,book, hasError = false){
    try {
        const authors = await Author.find({})
        const params = {authors,book}
        // console.log(params.authors[0]._id)
        console.log("RENDER NEW PAGE: TRY")
        
        if(hasError){
            params.errorMessage = 'error creating book'
        }
        
        res.render('books/new', params)
   
    } catch (error) {
        
        
        
        console.log("renderNewPage Function ERROR: "+error)
        res.redirect('/books')
    }
}


function saveCover(book,coverEncoded){
    
    console.log("save image")

    if(coverEncoded == null) return; 
    
    const cover = JSON.parse(coverEncoded)
console.log(cover.type);
    if(cover != null && imageMimeTypes.includes(cover.type)){
        book.coverImage     = new Buffer.from(cover.data,'base64')
        book.coverImageType = cover.type
    }
}


module.exports = router

