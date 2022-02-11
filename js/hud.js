let hud = {
  content: [
    ["Hello"],
    ["Goodbye"],
    ["..."]
  ],
  display: 0
}

function drawHUD(hudHeight) {
  stroke(255)
  noFill()
  // rect(16, h + 16, w - 32, 100 - 32, 16)

  noStroke()
  fill(200, 200, 0)
  textFont("monospace")
  textWrap(CHAR)
  textSize(16)
  let display = hud.content[hud.display]
  for (let i in display) {
    let t = display[i]
    let w_ = (w - 64)/display.length
    let x = 32 + i*(w - 64)/display.length
    text(t, x, h + hudHeight/3, w_, 100)
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
