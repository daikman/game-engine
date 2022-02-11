function mute() {
  if (music.amp().value > 0) {
    music.amp(0, 1)
  } else {
    music.amp(0.1, 0.5)
  }
}

function drawMute() {
  textSize(16)
  text("🎧", 16, 32)
  if (music.amp().value < 0.1) {
    text("❌", 16, 32)
  }
}

function ensureMusic(context) {
  if (context.state == "suspended" & frameCount % 100 == 0) {
    music.loop()
  }
}
