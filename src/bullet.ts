import * as PIXI from "pixi.js";
import { Game } from "./game";
import { Player } from "./Player";

export class Bullet extends PIXI.Sprite {
    private mygame: Game;
    constructor(bx: number, by: number, mygame: Game, texture: PIXI.Texture) {
        super(texture);
        this.scale.set(2);
        this.x = bx + 80;
        this.y = by - 30;
        this.angle = 90

        //let townmapwidth = 3048
        //let townmapheight = 2041

        this.mygame = mygame;
        console.log("I am a bullet")
    }

    public hit() {
        this.mygame.removeBullet(this);
        this.destroy();
    }

    update() {
        this.x += 10;

        if (this.x > 3048) {
            this.mygame.removeBullet(this);
            this.destroy();
        }
    }
}
