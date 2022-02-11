function mute() {
  if (music.amp().value > 0) {
    music.amp(0, 1)
  } else {
    music.amp(0.8, 0.5)
  }
}

function drawMute() {
  textSize(16)
  text("🎧", 16, 32)
  if (music.amp().value < 0.8) {
    text("❌", 16, 32)
  }
}
