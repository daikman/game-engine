function stylize(img, res) {
  let cols = []
  let xs = []
  let ys = []
  for (let x = 0; x < img.width; x += res) {
    for (let y = 0; y < img.height; y += res) {
      xs.push(x)
      ys.push(y)
      let col = img.get(x, y)
      //col[0] += random(-50, 50)
      col[1] += random(-20, 20)
      //col[2] += random(-50, 50)
      cols.push(col)
    }
  }

  return(
    [[xs,ys], cols, res]
  )
}

function drawStyle(style) {
  let cols = style[1]
  for (let i in cols) {
    fill(cols[i])
    rect(style[0][0][i], style[0][1][i], style[2])
  }
}
