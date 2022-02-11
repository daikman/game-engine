let level, player, target, maxim, music, playerSprite;

let travelling = false;

let objects = [];

let w = 600
let h = 400

function preload() {
  // load all levels
  for (let i of levels) {
    i.path = loadImage(i.path)
    //i.path = getPath(i.path)
    i.bg = loadImage(i.bg)
    for (let e in i.events) {
      i.events[e].img = loadImage(i.events[e].img)
    }

    i.music = loadSound(i.music)
  }
  playerSprite = loadImage("images/sprites/spritesheet.png")
}

function setup() {
  createCanvas(w, h + 50);
  level = getLevel("start")
  level.bg.resize(w, h)
  //level.bgStyle = stylize(level.bg, 4)
  player = new Player(
    level.path[0][level.start],
    level.path[1][level.start]
  )
  target = createVector(player.x, player.y)

  objects = getObjects(level.objects)

  music = level.music
  music.amp(0.1)
  music.loop()

  pixelDensity(1)
  noCursor();
}



function draw() {

  background(0)
  image(level.bg, 0, 0)

  player.move()
  player.show()

  drawHUD(height-h)

  // draw travel transition
  travelTransition(travelling)

  drawMute();
  drawCursor();

  // attempt to play music if it did no initialise correctly
  ensureMusic(music.output.context)

}

function drawCursor() {
  fill(255, 155, 155, 200)
  circle(mouseX, mouseY, 12)
}

function drawPath(path) {
  stroke(0);
  let x = path[0];
  let y = path[1];
  for (let i = 0; i < x.length; i++) {
    point(x[i], y[i])
  }
}

function mouseClicked() {

  // check what is being clicked
  let hud = mouseY > h;
  let muteButton = mouseX > 16 & mouseX < 37 & mouseY > 16 & mouseY < 37

  if (hud) {
    nextDia()
  }

  if (muteButton) {
    mute()
  }

  if (!hud & !muteButton) {
    if (!travelling) {
      target = createVector(mouseX, mouseY)
      player.index = player.searchPath(target)
    }
  }

  // check events layers
  for (let e of level.events) {
    // if player is in bounds
    if (player.x > e.pos.xMin &
        player.x < e.pos.xMax) {
      // check if mouse is in bounds
      let xIn = mouseX < e.pos.xMax &
          mouseX > e.pos.xMin
      let yIn = mouseY < e.pos.yMax &
          mouseY > e.pos.yMin

      if (xIn & yIn) {
        let prom = handleEvent(e.type, e.content)
      }
    }
  }

}

function getYRange(x, path) {
  let ys = [];
  for (let i in path[0]) {
    if (path[0][i] == x) {
      ys.push(path[1][i])
    }
  }
  return([min(ys), max(ys)])
}

function getObjects(objs) {
  // for (let i in objs) {
  //   let o = objs[i]
  //   if (o.name == "bear") {
  //     objects[i] = new Bear();
  //   }
  // }
}
