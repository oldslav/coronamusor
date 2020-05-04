class Cop {
  constructor(x, y, speed, animation) {
    this.body = createVector(x, y);
    this.speed = speed;
    this.animation = animation;
    this.len = animation.length;
    this.index = 0;
  }

  attack() {
    this.body.y += this.speed;
  }

  update() {
    this.attack();
    this.index += 0.3;
  }

  fine(sally) {
    const d = p5.Vector.dist(this.body, sally.body);
    if (d < 32) {
      return true;
    } else {
      return false;
    }
  }

  show() {
    let index = floor(this.index) % this.len;
    image(this.animation[index], this.body.x, this.body.y, 64, 64);
  }
}
