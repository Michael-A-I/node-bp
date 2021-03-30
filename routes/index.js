
const express = require('express');
const router = express.Router();


// All Authors Routes
router.get('/', (req,res)=>{
    res.render('index')
})


module.exports = router