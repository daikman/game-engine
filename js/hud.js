let hud = {
  content: [
    [""],
    ["Hello"],
    ["..."],
    ["Maybe you should click over here"],
    ["Welcome to Norrsken"],
    ["Welcome to Norrsken, a game were you walk around in a snowy forrest."],
    ["So..."],
    "Walk around!",
  ],
  duration: [200, 200, 100, null, 100, null, 100, 200],
  display: 0
}

function drawHUD(hudHeight) {

  let hudCopy = hud
  push()
  translate(0, h)

  noStroke()
  fill(200, 200, 0)
  textFont("monospace")
  textWrap(CHAR)
  textSize(16)
  let t = hudCopy.content[hudCopy.display]

  for (let i in t) {
    let l = t[i]
    let w_ = (w - 64)/t.length
    let x = 32 + i*(w - 64)/t.length
    text(l, x, hudHeight/6, w_, hudHeight)
  }


  if (hudCopy.duration[hudCopy.display]) {
    hudCopy.duration[hudCopy.display] -= 1;

    if (hudCopy.duration[hudCopy.display] <= 0) {
      nextDia()
    }
  } else {
    text("🖝", 12, 24)
  }

  pop()

}

function nextDia() {
  if (!hud.duration[hud.display]) {
    if (hud.display < hud.content.length - 1) {
      hud.display += 1
    } else {
      hud.content = [""]
      hud.display = 0
      hud.duration[0] = 10
    }
  }

}
