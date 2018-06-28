// Setup basic express server
var express = require('express')
var app = express()
var path = require('path')
var server = require('http').createServer(app)
var io = require('socket.io')(server)
var port = process.env.PORT || 3000

server.listen(port, () => {
  console.log('Server listening at port %d', port)
})

// Routing
app.use(express.static(path.join(__dirname, 'public')))

const state = {
  players: [],
  enemies: [],
  coins: [],
  ranking: []
}

const WORLD_WIDTH = 500
const WORLD_HEIGHT = 500

function reset () {
  const { players, enemies, coins } = state

  players.forEach(player => {
    player.x = Math.random() * WORLD_WIDTH
    player.y = Math.random() * WORLD_HEIGHT
    player.score = 0
  })

  while (enemies.length > 0) enemies.pop()
  while (enemies.length < 10) {
    enemies.push({
      x: Math.random() * WORLD_WIDTH,
      y: Math.random() * WORLD_HEIGHT,
      vx: Math.random() > 0.5 ? 1 : -1,
      vy: Math.random() > 0.5 ? 1 : -1,
      size: Math.random() * 20 + 10
    })
  }

  while (coins.length > 0) coins.pop()
  while (coins.length < 10) {
    coins.push({
      x: Math.random() * WORLD_WIDTH,
      y: Math.random() * WORLD_HEIGHT,
      size: Math.random() * 10 + 5
    })
  }
}
reset()

function collision (obj1, obj2) {
  const sizeSum = (obj1.size / 2 + obj2.size / 2)
  return (Math.abs(obj1.x - obj2.x) < sizeSum) &&
    (Math.abs(obj1.y - obj2.y) < sizeSum)
}

function updateRanking(state) {

    const players = state.players;

    players.sort(function (p1, p2) {

        if(p1.score > p2.score) return -1;
        else if(p1.score === p2.socore) return 0;
        else return 1;
    });
}

const speed = 3
function logic () {
  setTimeout(logic, 20)

  const { players, enemies, coins } = state

  // player logic
  players.forEach(player => {
    if (player.dead) return

    const { keyboard } = player
    if (keyboard.left) player.x -= speed
    if (keyboard.right) player.x += speed
    if (keyboard.up) player.y -= speed
    if (keyboard.down) player.y += speed
  })

  // enemy logic
  enemies.forEach(enemy => {
    enemy.x += enemy.vx
    enemy.y += enemy.vy
    if (enemy.x < 0 || WORLD_WIDTH < enemy.x) enemy.vx *= -1
    if (enemy.y < 0 || WORLD_HEIGHT < enemy.y) enemy.vy *= -1

    players.forEach(player => {
      if (!player.dead && collision(enemy, player)) {
        player.dead = true
        io.sockets.emit('playerDead', player.id);
      }
    })
  })

  // coin logic
  coins.forEach((coin, i) => {
    players.forEach(player => {
      if (!player.dead && collision(player, coin)) {
        player.score += Math.ceil(coin.size)
        coins.splice(i, 1)
        updateRanking(state);
      }
    })
  })

  io.sockets.emit('state', state)
}
logic()

io.on('connection', socket => {
  const player = {
    x: 0,
    y: 0,
    size: 20,
    score: 0,
    keyboard: {},
    id: socket.id,
    username: ''
  }

  state.players.push(player);

  socket.on('setUsername', function (username) {
      player.username = username;
  });

  socket.on('input', function (keyboard) {
    if( player.dead) return;
    player.keyboard = keyboard
  })

  socket.on("disconnect", function () {

    state.players.forEach(function ( p, i) {

        if(player.id === p.id) state.players.splice(i,1);
    });

    socket.broadcast.emit("playerDc", player);
  })

})