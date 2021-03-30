const express = require('express');
const router = express.Router();
// model
const Author = require('../models/author');

// All Authors Routes
router.get('/', async (req,res)=>{
    // get all authors matching search
    let searchOptions = {}
    let locals = {errorMessage:"please enter search parameter"}
    
    if(req.query.name !== null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, "i")
    }
    

    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index',{authors:authors, 
                                    searchOptions:req.query
                                })
    } catch (error) {
        res.redirect('/')
        console.log("error")
    }
})

// New Authors Route
// authors/new
// empty instance of author model
router.get('/new', (req,res)=>{
    res.render('authors/new',{author: new Author()})
})

// Create Author Routes

router.post('/', async (req,res)=>{

// client send data to server 
const author = new Author({
    name: req.body.name
})

let locals = {
    author:author,
    errorMessage: 'Error create Author'
}


try {
  const newAuthor = await author.save()
  res.redirect(`authors`)
} catch (error) {
    res.render('authors/new',locals)
}


})


module.exports = router

