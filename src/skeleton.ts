import * as PIXI from "pixi.js";

export class Skeleton extends PIXI.AnimatedSprite {
  private speed: number;

  constructor(textures: PIXI.Texture[]) {
    super(textures);

    this.speed = Math.random() * 5;
    let townmapwidth = 3048
    let townmapheight = 2041
    this.x = Math.random() * townmapwidth
    this.y = Math.random() * townmapheight
    this.anchor.set(0.5);
    this.scale.set(0.35);
    this.play()

    console.log("i am a skeleton")
    this.animationSpeed = 0.4

  }

  public hit() {
    this.x = 3048;
  }

  public walk() {
    this.x += Math.random() * 4 -2
    this.y += Math.random() * 4 -2
    // this.x -= this.speed;
    // this.y += Math.cos(this.x * 0.03) * 1.1;
    // if (this.x < -100) {
    //   this.x = window.innerWidth + 100;
    //   this.y = Math.random() * window.innerHeight;
    // }
  }

  public hitPlayer() {
    console.log("hit player");
  }
}