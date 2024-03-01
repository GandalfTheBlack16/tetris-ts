import { BLOCK_ACCERELATION, BLOCK_SIZE, MOVE_SENSETIVITY } from './contstants'
import { Block } from './types'

export class Piece {
    
    private readonly blocks: Block
    private currentPositon: number
    private x: number
    private y: number

    constructor(blocks: Block, x: number, y: number){
        this.blocks = blocks
        this.currentPositon = 0
        this.x = x
        this.y = y
    }

    get getX() {
        return this.x
    }

    get getY() {
        return this.y
    }

    get getBlocks(): Block {
        return this.blocks
    }

    get getCurrentPosition(): number {
        return this.currentPositon
    }

    getVerticalSize() {
        const currentBlock = this.blocks.positions[this.currentPositon]
        for(let row = currentBlock.length - 1; row >= 0; row--){
            for(let col = 0; col < currentBlock[row].length; col++){
                if(currentBlock[row][col] === 1){
                    return row + 1
                }
            }
        }
        return 1
    }

    getHorizontalSize() {
        const currentBlock = this.blocks.positions[this.currentPositon]
        for(let col = currentBlock[0].length - 1; col >= 0; col--){
            for(let row = 0; row < currentBlock.length; row++){
                if(currentBlock[row][col] === 1){
                    return col + 1
                }
            }
        }
        return 1
    }

    draw(ctx: CanvasRenderingContext2D){
        const currentBlock = this.blocks.positions[this.currentPositon]
        for(let row = 0; row < currentBlock.length; row++){
            for(let col = 0; col < currentBlock[row].length; col++){
                if(currentBlock[row][col] === 1){
                    ctx.fillStyle = '#a12f2f'
                    ctx.fillRect((this.y + col) * BLOCK_SIZE, (this.x + row) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
                }
            }
        }
    }

    drawNextPiece(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number){
        const currentBlock = this.blocks.positions[this.currentPositon]
        for(let row = 0; row < currentBlock.length; row++){
            for(let col = 0; col < currentBlock[row].length; col++){
                if(currentBlock[row][col] === 1){
                    ctx.fillStyle = '#a12f2f'
                    ctx.fillRect((col + canvasHeight / BLOCK_SIZE / 2 - 2) * BLOCK_SIZE, (row + canvasWidth / BLOCK_SIZE / 2 - 1) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
                }
            }
        }
    }

    moveDown(speed: number, downPressed: boolean) {
        this.x += speed + (downPressed ? BLOCK_ACCERELATION : 0)
    }

    moveLeft() {
        this.y -= MOVE_SENSETIVITY
    }

    moveRight() {
        this.y += MOVE_SENSETIVITY
    }

    rotate() {
        this.currentPositon = (this.currentPositon + 1) % this.blocks.positions.length
    }
}