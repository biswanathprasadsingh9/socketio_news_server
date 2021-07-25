const express = require('express');
const router = express.Router();



const News= require('../models/News');
const NewsController = require('../controllers/NewsController');


router.get('/',NewsController.index);
router.post('/',NewsController.store);





// module.exports = router;

module.exports = function (io) {


    io.sockets.on("connect", async (socket) => {
      console.log("User connected");


      socket.on('test_event', function(data) {
        // you can try one of these three options

        // this is used to send to all connecting sockets
        const response = await News.find().sort({_id:-1})
        socket.broadcast.emit("all_news", response);


        // // this is used to send to all connecting sockets except the sending one
        // socket.broadcast.emit('eventToClient',{ id: userid, name: username });
        // // this is used to the sending one
        // socket.emit('eventToClient',{ id: userid, name: username });
    }




      // //GET ALL DATAS
      // socket.on('get_all_news', async (data,callbackFn) => {
      //   // setInterval(async function(){
      //   const response = await News.find().sort({_id:-1});
      //   socket.broadcast.emit("all_news", response);
      //   // }, 1000);
      // })
      //
      //
      //
      // socket.on('get_category_name', async (data,callbackFn) => {
      //     // setInterval(async function(){
      //     const response = await News.find({category:data.category}).sort({_id:-1});
      //     io.sockets.emit("get_category_data", response);
      //     // console.log(response)
      //     // }, 1000);
      // })


    });



    return router;
};
