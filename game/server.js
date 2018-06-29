// Setup basic express server
var express = require('express')
var app = express()
var path = require('path')
var server = require('http').createServer(app)
var io = require('socket.io')(server)
var port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Server listening at port %d', port)
})

// Routing
app.use(express.static(path.join(__dirname, 'public')));

let gameServer = {

    interval: 20,

    // The server state that tracks the objects
    state: {
        players: [],
        enemies: [],
        items: [],
        proyectiles: []
    },

    // events received from the client
    netEvents: {

        "disconnect" : function () {
            
            let socket = this;
            for(let i = state.players.length-1; i >= 0; --i){
                
                let p = state.players[i];
                if( socket.player.id === p.id) state.players.splice(i,1);
            }
        
            socket.broadcast.emit("playerDc", socket.player);
            delete socket.player;
        },

        // set the nickname and pokemon choosed 
        "initalPlayerData": function (data) {

            let socket = this;
            let player = socket.player;

            player.nickname = data.nickname;
            player.is = data.is;
        },

        "playerAttack" : function () {  },
        "itemPicked": function () {  },
        "playerMove": function () {  }
    },

    // net events to send to clients due server actions
    emitEvents: {

        // show send spawn player if state is sended?
        "spawnPlayer": function () {  },
        "spawnEnemy": function () {  },
        "spawnItem": function () {  },
        "enemyDied": function () {  },
        "playerDied": function () {  },
        "spawnBoss": function () {  },
        "bossDied": function () {  },
        // proyectile spawn?
        "spawnProyectile": function () {  },
        "enemyAttack": function () {  },
        "bossAttack": function () {  },
        "itemPicked": function () {  },
        "playerMove": function () {  },
        // emit player attack?
        "playerAttack": function () {  },
    },

    generatePlayerEntity: function (socket) {

        let player = {
            id: socket.id,
            nickname: '',
            score: 0,
            hp: 0,
            hpMax: 0,
            atk: 0,
            def: 0,
            lvl: 1,
            dir: 1,
            is: '',
            scale: 2,
            currAnim: 0,
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            type: 'player'
        };
    
        scoket.player = player;
    },

    logic: function () { 

        setTimeout(this.logic, this.interval);
    },

    init: function(options){

        this.interval = options.interval;

        // On user connected
        io.on('connection', socket => {

            // generate the user entity and bind it to the socket
            this.generatePlayerEntity(socket);

            this.state.players.push(socket.player);

            for(let e in netEvents){

                socket.on(e, this.netEvents[e].bind(socket));
            }

        });
    }

};

