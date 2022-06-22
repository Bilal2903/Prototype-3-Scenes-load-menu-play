import * as PIXI from 'pixi.js'
import townImage from "./images/Map & Terrain/ZeldaWorld.png"
import playerImage from "./images/PlayerCharacters/Player.png"
import { TownMap } from "./TownMap"
import { Player} from "./Player"
import { Texture } from 'pixi.js'
import { Skeleton } from "./skeleton"
import { Bullet } from "./bullet"
import bulletImage from "./images/Map & Terrain/bullet.png"

//fish is skeloton.ts
//enemy is enemy.ts
//bubbles is bullet.ts


export class Game{
    public pixi : PIXI.Application //canvas element in de html file
    private loader : PIXI.Loader
    private player : Player
    public townMap : TownMap
    public texture : Texture
    private bullets : Bullet [] = []
    private skeletons : Skeleton [] = []

    constructor(){
        console.log("ik ben een game")
        this.pixi = new PIXI.Application({ width: 1440, height: 1129})
        console.log(this.pixi)
        document.body.appendChild(this.pixi.view)

        this.loader = new PIXI.Loader()
        this.loader.add('townTexture', townImage)
        this.loader.add('playerSprite', playerImage)
        this.loader.add("bulletTexture", bulletImage)

        
        this.loader.add("./attack.json")
        this.loader.add("./enemy.json")
        
        this.loader.load(()=>this.loadCompleted())
    }

    public loadCompleted() {

        //creates background image
        this.townMap = new TownMap(this.loader.resources["townTexture"].texture!)
        this.pixi.stage.addChild(this.townMap)

        // read attack spritesheet
        const textures: PIXI.Texture[] = [];
            
        for (let i = 1; i <= 13; i++ ){
            textures.push(PIXI.Texture.from(`a${i}.png`))
        }

        // read enemy spritesheet
        const enemytextures: PIXI.Texture[] = [];

        for (let i = 1; i <= 8; i++ ){
            enemytextures.push(PIXI.Texture.from(`go_${i}.png`))
        }
        
        //add player 
        this.player = new Player(this, this.townMap, textures)
        this.pixi.stage.addChild(this.player)
        

        for (let i = 0; i < 20; i++) {
            let sk = new Skeleton (enemytextures);
            this.pixi.stage.addChild(sk)
            this.skeletons.push(sk);
          }
        
        this.pixi.stage.x = this.pixi.screen.width / 2;
        this.pixi.stage.y = this.pixi.screen.height / 2;

        this.pixi.ticker.add((delta) => this.update(delta));
    }

    public shootBullet(bx: number, by: number) {
        let bullet = new Bullet(bx, by, this, this.loader.resources["bulletTexture"].texture!);
        this.pixi.stage.addChild(bullet);
        this.bullets.push(bullet);
      }
    
      public removeBullet(bullet: Bullet) {
        this.bullets = this.bullets.filter((b) => b !== bullet);
      }


    public update(delta: number){
        this.player.update(delta)
        
        for (let skeleton of this.skeletons){
            console.log(skeleton)
            skeleton.walk()

            for (let b of this.bullets) {
                if (this.collision(b, skeleton)) {
                  b.hit();
                  skeleton.hit();
                }
            }
        }

        for (let bullet of this.bullets) {
            bullet.update();
          }
    }

    private collision(sprite1:PIXI.Sprite, sprite2:PIXI.Sprite) {
        const bounds1 = sprite1.getBounds()
        const bounds2 = sprite2.getBounds()

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }
}

let g = new Game()