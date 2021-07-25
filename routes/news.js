const express = require('express');
const router = express.Router();



const News= require('../models/News');
const NewsController = require('../controllers/NewsController');


router.get('/',NewsController.index);
router.get('/:id',NewsController.view);
router.get('/delete/:id',NewsController.deletenews);


router.post('/',NewsController.store);





// module.exports = router;

module.exports = function (io) {

      const changeStream = News.watch();

      io.on('connection', async function (socket) {
        console.log('Connection!');



          const responsesa = await News.find().sort({_id:-1});
          io.to(socket.id).emit('all_news', responsesa);



        if(socket.handshake.query.category!==undefined){
          const response = await News.find({category:socket.handshake.query.category}).sort({_id:-1});
          // io.emit("get_category_data", response);
          io.to(socket.id).emit('get_category_data', response);

        }




        //////=================ON CANGE================//////
        changeStream.on('change', async (change) => {

          const response = await News.find().sort({_id:-1});
          io.emit("all_news", response);


          if(socket.handshake.query.category!==undefined){
            const response2 = await News.find({category:socket.handshake.query.category}).sort({_id:-1});
            // io.emit("get_category_data", response2);
            io.to(socket.id).emit('get_category_data', response2);

          }

        });




        // // USERS - Change
        // changeStream.on('change',async function(change) {
        //     console.log('COLLECTION CHANGED');
        //
        //
        //     // socket.on('get_all_news', async (data,callbackFn) => {
        //       const response = await News.find().sort({_id:-1});
        //       io.sockets.emit("all_news", response);
        //     // })
        //
        //
        //
        // });


      });




    //   io.on("connect", async (socket) => {
    //   // console.log("User connected");
    //
    //   socket.on('get_all_news', async (data,callbackFn) => {
    //     const response = await News.find().sort({_id:-1});
    //     io.sockets.emit("all_news", response);
    //   })
    //
    //
    //
    //   socket.on('post_news',async(data,callbackFn)=>{
    //     callbackFn(data)
    //     console.log(data);
    //
    //     News.create(data)
    //
    //     // const response = await News.find().sort({_id:-1});
    //     // io.sockets.emit("all_news", response);
    //   })
    //
    //   // setInterval(async function(){
    //   //   const response = await News.find().sort({_id:-1});
    //   //   socket.emit("all_news", response);
    //   //   // console.log(response)
    //   // }, 1000);
    //
    //
    // });



    return router;
};
