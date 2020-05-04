class Hero {
  constructor(x, y, acc, idle, left, right) {
    this.body = createVector(x, y);
    this.acceleration = acc;
    this.idle = idle;
    this.left = left;
    this.right = right;
    this.len = 4;
    this.index = 0;
  }

  move(dir) {
    this.body.x += dir * this.acceleration;
  }

  setAcceleration(acc) {
    this.acceleration = acc;
  }

  update() {
    this.index += 0.3;
    const index = floor(this.index) % this.len;
    if (keyIsDown(LEFT_ARROW) && hero.body.x >= 72) {
      image(this.left[index], this.body.x, this.body.y, 32, 64);
      this.move(-1);
    } else if (keyIsDown(RIGHT_ARROW) && hero.body.x <= width - 128) {
      image(this.right[index], this.body.x, this.body.y, 32, 64);
      this.move(1);
    } else {
      image(this.idle[index], this.body.x, this.body.y, 32, 64);
    }
  }
}
