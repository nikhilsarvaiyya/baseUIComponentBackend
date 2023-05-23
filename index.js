const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const createError = require('http-errors');
const http = require('http').Server(app);
const config = require('./config.js');




// App use settings ---------------------------------------------------------------------------------

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, }),)
app.use(cors())

// Static directory path
app.use(express.static(path.join(__dirname, '../baseUIComponent/dist/angular12base')))

// app.get('*', (req, res) => {
//   res.sendFile(
//     path.join(__dirname, '../baseUIComponent/dist/angular12base/index.html'),
//   )
// })

app.get('/', (req, res) => {
  res.send('invaild endpoint')
})

// Database Connection ------------------------------------------------------------------------------------
let db = config.DATABASE_PATH + "/" + config.DATABASE_NAME;

mongoose
  .connect(db, {
    dbName: "baseUI",
    useNewUrlParser: true,
  })
  .then((x) => {
    console.log(`db:${x.connections[0].name}`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })

// Soclet Io Connection ------------------------------------------------------------------------------------
const io = require('socket.io')(http, {
  cors: {
    origin: config.ORIGIN,
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('Socket IO connected');
  socket.on('disconnect', (reason) => {
    console.log('Socket IO disconnected', reason);
  });
  socket.on('error', (err) => {
    console.log("Error: " + err);
  });
  socket.on('cmd', cmd => onCommand(socket, cmd));
});




// Api Routes Connetions------------------------------------------------------------------------------------
const cardRoute = require('./routes/cards.routes')
const iconRoute = require('./routes/icons.routes')
app.use('/api', cardRoute)
app.use('/api', iconRoute)


// 404 Handler -------------------------------------------------------------------------------------------------------
app.use((req, res, next) => {
  next(createError(404))
})

// Base Route Enabling CORS------------------------------------------------------------------------------------------------
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5200");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  next();
});


// error handler ---------------------------------------------------------------------------------------------------------
app.use(function (err, req, res, next) {
  console.error(err.message)
  if (!err.statusCode) err.statusCode = 500
  res.status(err.statusCode).send(err.message)
})

// PORT Connection -----------------------------------------------------------------------------------------------------
http.listen(config.PORT, () => {
  console.log('Port:' + config.PORT)
})



function onCommand( socket, cmd ) {
  console.log( 'cmd:' + cmd.type );

  switch( cmd.type ) {
    // snapshot sending to specific client on request
    case 'snap':
      items.forEach( i =>
        socket.emit( 'event', { type: 'itemadded', data: i } )
      );
      break;
    // data changes are broadcast for all clients
    case 'additem':
      items.push( cmd.data );
      io.emit( 'event', { type: 'itemadded', data: cmd.data } );
      break;
    case 'updateitem':
      const item = items.find( i => i.id === cmd.data.id );
      item.value = cmd.data.value;
      io.emit( 'event', { type: 'itemupdated', data: item } );
      break;
    case 'delitem':
      const idx = items.findIndex( i => i.id === cmd.data.id );
      items.splice( idx, 1 );
      io.emit( 'event', { type: 'itemdeleted', data: cmd.data.id } );
      break;
  }
}