

const News= require('../models/News');


module.exports = function  (app,io,req,res) {


  io.sockets.on("connect", async (socket) => {
    console.log("User connected");

    socket.on('get_all_news', async (data,callbackFn) => {
      const response = await News.find().sort({_id:-1});
      io.sockets.emit("all_news", response);
    })



    async function getAllData(){
      socket.on('get_all_news', async (data,callbackFn) => {
        const response = await News.find().sort({_id:-1});
        io.sockets.emit("all_news", response);
      })
    }



    app.post('/api/newssocket', async (req,res) => {

      News.create(req.body)
      .then(responses=>{

        getAllData()

        res.json({
          response:true
        })
      })






  });





    // io.sockets.emit("all_news", req.body);


    console.log(req.body)
  })

}
