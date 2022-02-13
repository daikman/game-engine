function handleEvent(type, content) {
  // use a switch
  if (type == "travel") {

      travel(content)


  }
}

function travel(content) {

  if (travelling) {
    let levelNames = levels.map(d => d.name)
    let levelIndex = levelNames.indexOf(content)
    level = levels[levelIndex]
    level.bg.resize(w, h)
    //level.bgStyle = stylize(level.bg, 4)
    player.x = level.path[0][level.start]
    player.y = level.path[1][level.start]

    target.x = level.path[0][level.start]
    target.y = level.path[1][level.start]

    player.index = level.start

    // if music is different, change music
    if (level.music.file != music.file) {
      music.stop()
      music = level.music
      music.loop()
    }

    travelling = false
    // hud.content = [""]
  } else {
    travelling = true
    setTimeout(travel, 100, content)
  }

}

function travelTransition(travelling) {
  if (travelling) {
    // hud.content = [["Travelling..."]]
    // hud.duration = [10]
    // hud.display = 0
  }
}
