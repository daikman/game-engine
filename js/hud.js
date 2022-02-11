let hud = {
  content: [
    [""],
    ["Hello"],
    ["..."],
    ["Maybe you should click over here"],
    ["Welcome to Norrsken"],
    ["Welcome to Norrsken, a game were you walk around in a snowy forrest."],
    ["So..."],
    ["Walk around!"],
  ],
  duration: [200, 200, 100, null, 100, null, 100, 200],
  display: 0
}

function drawHUD(hudHeight) {

  let hudCopy = hud
  stroke(255)
  noFill()
  // rect(16, h + 16, w - 32, 100 - 32, 16)

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
    text(l, x, h + hudHeight/6, w_, hudHeight)
  }

  if (hudCopy.duration[hudCopy.display]) {
    hudCopy.duration[hudCopy.display] -= 1;

    if (hudCopy.duration[hudCopy.display] <= 0) {
      nextDia()
    }
  }

}

function nextDia() {
  if (hud.display < hud.content.length - 1) {
    hud.display += 1
  } else {
    hud.content = [""]
    hud.display = 0
  }
}
