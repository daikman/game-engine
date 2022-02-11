class Player {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.searchRange = 1;
    this.speed = 1;
    this.index = 0;
    this.acc = 0.01;
    this.rings = [];
    this.sprite = {
      left: [
        playerSprite.get(11, 16, 29, 40),
        playerSprite.get(43, 16, 29, 40),
        playerSprite.get(73, 16, 29, 40)
      ],
      right: [
        playerSprite.get(10, 65, 29, 40),
        playerSprite.get(42, 65, 29, 40),
        playerSprite.get(73, 65, 29, 40)
      ]
    };
    this.spr = this.sprite.right;
    this.sprIndex = 0;
    this.still = true;
  }

  move() {

    level.start = this.index

    let tempTarget = createVector(level.path[0][this.index], level.path[1][this.index])
    let pos = createVector(this.x, this.y)

    let distance = abs(tempTarget.x - pos.x)

    if (distance > 4) {

      tempTarget.sub(pos)
      tempTarget.setMag(this.speed)
      pos.add(tempTarget)

      this.x = pos.x
      this.y = pos.y

      // set still to false to start sprite animation
      if (this.still) {
        this.still = false
      }

    } else if (!this.still) {
      // set still to true to stop sprite animation
      this.still = true
    }


  }

  searchPath(tg) {
    // find horizontal distance between tg and each point on path
    let distances = []
    for (let i of level.path[0]) {
      distances.push(abs(tg.x - i))
    }

    // find the index of the closest point on that path
    let min_index = distances.indexOf(min(distances))

    return(min_index)
  }

  show() {

    // SPRITE CONTROL
    if (this.x > level.path[0][this.index]) {
      this.spr = this.sprite.left
    } else {
      this.spr = this.sprite.right
    }

    if (this.still) {
      this.sprIndex = 0;
    } else {
      this.sprIndex += 0.1;
    }

    if (this.sprIndex > (this.sprite.left.length-1)) {
      this.sprIndex = 0
    }

    let tempIndex = floor(this.sprIndex)

    let tempSpr = createImage(29, 40)
    tempSpr.copy(this.spr[tempIndex], 0, 0, 29, 40, 0, 0, 29, 40)

    // scale the sprite according to depth
    // height/2 should be maxY and height should be min Y
    let scale = map(this.y, h/2, h, 1/2, 1);
    tempSpr.resize(29*scale, 40*scale)

    //imageMode(CENTER)
    image(tempSpr, this.x - tempSpr.width/2, this.y - tempSpr.height)
    //imageMode(CORNER)


  }

}
