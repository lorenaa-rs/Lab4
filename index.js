const path = require('path');
const axios = require('axios');
const express = require('express');
const app = express();
const cors = require('cors')

let dateServer = new Date();

//settings
app.set('port', process.env.PORT || 3000);

//static files
app.use(express.static(path.join(__dirname,'public')))
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//start server
const server = app.listen(app.get('port'),()=>{
    // console.log(`Este es la ip de alguien ${app.request.ip}`)
    // console.log(`Este es la ips alguien ${app.request.ip}`)
    axios.post('http://172.19.0.1:3000/register',{
        port: app.get('port'),
        ip: '',
    }).then(response=>{
        console.log(response)
    }).catch(function (error) {
        console.log("El servidor coordinador no esta conectado");
      })
    console.log('Server on port', app.get('port'));
})

app.post('/currentTime',(req,res)=>{
    let serverCorDate = new Date(req.body.date)
    console.log('hola')
    let difference = dateServer - serverCorDate;
    console.log(dateServer.getMinutes()+':'+dateServer.getSeconds()+'===='+serverCorDate.getMinutes()+':'+serverCorDate.getSeconds())
    console.log(difference)
    res.json({difference:difference})
})

app.post('/adjust',(req,res)=>{
    let aux = new Date(dateServer);
    dateServer.setMilliseconds(dateServer.getMilliseconds()+req.body.data)
    let info = {
        actualDate: aux,
        adjust: req.body.data/1000,
        newDate : dateServer
    }
    io.sockets.emit('info', info)
    res.json({message:"Hora ajustada correctamente"})
})

//Web Sockets
const SocketIO = require('socket.io');
const io = SocketIO(server);

io.on('connection', (socket)=>{
    console.log('New Connection',socket.id)

    socket.on('date',(data)=>{
        let aux = new Date(dateServer);
        data.hours = parseInt(data.hours) + 5;
        console.log(data)
        dateServer.setHours(parseInt((data.hours)),parseInt(data.minutes));
        let info = {
            actualDate: aux,
            adjust: (dateServer-aux)/1000,
            newDate : dateServer
        }
        io.sockets.emit('info', info)
    })
});

setTimeout(function() {
    setInterval(function(){
        io.sockets.emit("date", dateServer.setSeconds(dateServer.getSeconds()+1))
    },1000) 
},2000)