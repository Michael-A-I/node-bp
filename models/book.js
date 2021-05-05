/*
.##.....##..#######..########..########.##......
.###...###.##.....##.##.....##.##.......##......
.####.####.##.....##.##.....##.##.......##......
.##.###.##.##.....##.##.....##.######...##......
.##.....##.##.....##.##.....##.##.......##......
.##.....##.##.....##.##.....##.##.......##......
.##.....##..#######..########..########.########
*/


const mongoose = require('mongoose')

// image handling w/ multer
const coverImageBasePath = 'upload/bookCovers'
// virutal book to get path to display image in ejs via fs
const path = require('path');

const bookSchema = new mongoose.Schema({
    title:       {
        type:String,
        required:true
    },
    description: {
        type:String
    },
    publishDate: {
        type:Date,
        required:true
    },
    pageCount:  { 
        type:Number,
        required:true
    },
    createdAt: {
        type:Date,
        required: true,
        default: Date.now
    },
    coverImage:{
        type: Buffer,
        required: true
    },
    coverImageType:{
        type:String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Author"
    }      

})

// Virtual property
bookSchema.virtual('coverImagePath').get(function (){
    if(this.coverImage != null && this.coverImageType != null){
        return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
    }
})

// name of table Author
module.exports = mongoose.model('Book', bookSchema)

// export named variable
module.exports.coverImageBasePath = coverImageBasePath