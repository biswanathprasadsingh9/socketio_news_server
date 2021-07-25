const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
  imageurl:{
    type:String
  },
  heading:{
    type:String
  },
  subheading:{
    type:String
  },
  content:{
    type:String
  },
  category:{
    type:String
  }
},{timestamps:true})

const News = mongoose.model('News',NewsSchema);
module.exports=News;
