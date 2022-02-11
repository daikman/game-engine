function getLevel(name) {

  let index = levels.findIndex(d => d.name == name);

  let level = levels[index];

  // if path is an image
  if (level.path.canvas) {
    level.path = getPath(level.path)
  }


  for (let e of level.events) {
    e.pos = getEventPos(e.img)
  }

  return(level);

}

function getPath(img) {
  let path = [[],[]];
  img.resize(w, h)
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      let col = img.get(x, y)
      let isBlack = col[0] == 0 && col[1] == 0 && col[2] == 0
      if (isBlack) {
        path[0].push(x)
        path[1].push(y)
      }
    }
  }

  // make path 1 pixel thick
  for (let x in path[0]) {
    let range = getYRange(path[0][x], path)
    path[1][x] = (range[1] + range[0])/2
  }

  // make path into just nPoints points
  let nPoints = 80
  // divide path length by nPoints
  let offset = floor(path[0].length/nPoints)

  let newPath = [[],[]];
  for (let i = 0; i < path[0].length; i += offset) {
    newPath[0].push(path[0][i])
    newPath[1].push(path[1][i])
  }

  return(newPath)
}

function getEventPos(img) {

  let Xs = [];
  let Ys = [];

  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let col = img.get(x, y)

      if (col[0] == 255 & col[2] != 255, col[2] != 255) {
        Xs.push(x)
        Ys.push(y)
      }
    }
  }

  console.log(Xs)

  return(
    {
      xMin: min(Xs),
      xMax: max(Xs),
      yMin: min(Ys),
      yMax: max(Ys)
    }
  )
}
