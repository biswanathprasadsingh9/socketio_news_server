const {response}= require('express');
const News= require('../models/News');


//***INDEX***
const index = async (req,res) => {

    res.json({
      response:true
    })
}


//***STORE***
const store = (req,res) => {

  News.create(req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })
}


//***VIEW***
const view = (req,res) => {
  News.findById(req.params.id)
  .then(response=>{
    res.json({
      response:true,
      data:response
    })
  })
}

//***DELETE***
const deletenews = (req,res) => {
  News.findByIdAndRemove(req.params.id)
  .then(response=>{
    res.json({
      response:true,
      data:response
    })
  })
}


module.exports={index,store,view,deletenews};
