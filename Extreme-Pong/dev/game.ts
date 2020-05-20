/// <reference path="ball.ts"/>

class Game {
    
    public balls : Ball[] = []
    private paddle : Paddle
    private ballAmountStart : number = 10

    private _score : number = 0

    public get score() : number {return this._score;} 
    public set score(score : number) {this._score = score;}    
    
    constructor() {


        for (let i = 0; i < this.ballAmountStart; i++) {
            this.balls.push(new Ball(this))         
        }
        this.paddle = new Paddle()

        this.gameLoop()
    }


    checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
        }
    
    private gameLoop(){

        if (this.ballAmountStart > this.balls.length){
            for (let i = 0; i < this.ballAmountStart - this.balls.length; i++) {
                // this.ballAmount = this.ballAmountStart         
                this.balls.push(new Ball(this))
            }
        }

        this.paddle.update()

        for(let b of this.balls){
            b.update()
        }

        for (let i = 0; i < this.balls.length; i++) {
            let hit = this.checkCollision(this.balls[i].getRectangle(), this.paddle.getRectangle())
            // console.log(`ball ${i} hits pedal: ${hit}`)

            if (hit) {
                this.balls[i].xspeed *= -2
            }
        }


        

        requestAnimationFrame(()=>this.gameLoop())
    }
} 

window.addEventListener("load", () => new Game())