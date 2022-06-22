import * as PIXI from 'pixi.js'
import { TownMap } from './TownMap'
import { Game } from './game'

export class Player extends PIXI.AnimatedSprite {
    
    //variables
    private xspeed: number;
    private yspeed: number;
    private townMap: TownMap;
    private game: Game;

    constructor(game: Game, townMap: TownMap, textures: PIXI.Texture[]) {
        super(textures)
        this.width = 420
        this.height = 420
        this.stop()

        console.log("hyaa! i am link!");
        this.xspeed = 0;
        this.yspeed = 0;
    
        this.townMap = townMap;

        this.game = game;
        this.animationSpeed = 0.1
        this.loop = false
        
        this.x = game.pixi.screen.width / 2;
        this.y = game.pixi.screen.height / 2;

        this.x = 400
        this.y = 400

        this.scale.set(0.2)
        this.anchor.set(0.5)

        window.addEventListener("keydown", (e: KeyboardEvent) => this.move(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.unMove(e))

       
        
    }

    private shoot() {
        let direction = this.xspeed < 0 ? -1 : 1
        this.game.shootBullet(this.x, this.y); //direction
      }


    //operations
    public update(delta: number) {
        super.update(delta)
        

        let mapwidth = 3050 //De breedte van het Map
        let mapheight = 2350 //De lengte van de Map
        let centerx = 720 // midden van de viewport X
        let centery = 564.5 // midden van de viewport Y

        // Speler mag niet buiten beeld lopen
        this.x = this.clamp(this.x + this.xspeed, 36, 3010)
        this.y = this.clamp(this.y + this.yspeed, 48, 1984)

        let mapx = this.clamp(this.x, centerx, mapwidth - centerx)
        let mapy = this.clamp(this.y, centery, mapheight - centery)
        this.game.pixi.stage.pivot.set(mapx, mapy)    

    
    }

    clamp(num: number, min: number, max: number) {
        return Math.min(Math.max(num, min), max)
    }

    private move(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case " ":
                console.log("attack sword")
                this.gotoAndPlay(1)
                break;
            case "K":
                console.log("attack bullet")
                this.shoot()
                break;    
            case "A":
            case "ARROWLEFT":
                //this.direction = 3
                this.xspeed = -5
                this.scale.set(-0.2, 0.2)
                break
            case "D":
            case "ARROWRIGHT":
                //this.direction = 1
                this.xspeed = 5
                this.scale.set(0.2, 0.2)
                break
            case "W":
            case "ARROWUP":
                //this.direction = 0
                this.yspeed = -5
                break
            case "S":
            case "ARROWDOWN":
                //this.direction = 2
                this.yspeed = 5
                break
        }
    }

    private unMove(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case "A":
            case "D":
            case "ARROWLEFT":
            case "ARROWRIGHT":
                this.xspeed = 0
                break
            case "W":
            case "S":
            case "ARROWUP":
            case "ARROWDOWN":
                this.yspeed = 0
                break
        }
    }
}