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

const authorSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    }
})

// name of table Author
module.exports = mongoose.model('Author', authorSchema)