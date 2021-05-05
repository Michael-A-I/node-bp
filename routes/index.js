/*
.########...#######..##.....##.########.########.########.
.##.....##.##.....##.##.....##....##....##.......##.....##
.##.....##.##.....##.##.....##....##....##.......##.....##
.########..##.....##.##.....##....##....######...########.
.##...##...##.....##.##.....##....##....##.......##...##..
.##....##..##.....##.##.....##....##....##.......##....##.
.##.....##..#######...#######.....##....########.##.....##
*/
const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// All Authors Routes
router.get('/', async(req,res)=>{
let books = await Book.find({}).sort({createAt:'desc'}).limit(10).exec()

try {
    
} catch (error) {
    books = []
}

    res.render('index',{books})
})


module.exports = router

