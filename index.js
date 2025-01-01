

let express = require('express');
let socket = require('socket.io');

//app setup
let app = express();

//server setup
let server = app.listen(5600,()=>{
    console.log('listening on port 5600');
})

//route setup
app.get('/',(res,req)=>{
    req.sendFile(__dirname+'/public/index.html');
})

//socket setup
let io = socket(server);

io.on('connection',(socket)=>{
    console.log('socket connection is CONNECTED @ID - ' + socket.id)
    socket.on('chat',(data)=>{
        // console.log(data);
        io.sockets.emit('chat',data);
    })

    socket.on('typing',(name)=>{
        // console.log(name);
        socket.broadcast.emit('typing',name);
    })
})

