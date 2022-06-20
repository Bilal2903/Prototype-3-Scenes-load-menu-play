import * as PIXI from "pixi.js";

export class Skeleton extends PIXI.Sprite {
  private speed: number;

  constructor(texture: PIXI.Texture) {
    super(texture);
    this.speed = Math.random() * 5;
    this.x = Math.random() * window.innerWidth + 100;
    this.y = Math.random() * window.innerHeight;
    this.anchor.set(0.5);
    this.scale.set(0.4 + Math.random() * 0.6);
  }

  public hit() {
    this.x = window.innerWidth + 100;
  }

  public walk() {
    this.x -= this.speed;
    this.y += Math.cos(this.x * 0.03) * 1.1;
    if (this.x < -100) {
      this.x = window.innerWidth + 100;
      this.y = Math.random() * window.innerHeight;
    }
  }

  public hitPlayer() {
    console.log("hit shark");
  }
}