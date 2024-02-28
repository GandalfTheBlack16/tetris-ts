import { BLOCK_SIZE } from './contstants'
import { Block } from './types'

export class Piece {
    
    private readonly blocks: Block
    private x: number
    private y: number

    constructor(blocks: Block, x: number, y: number){
        this.blocks = blocks
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

    getVerticalSize() {
        for(let row = this.blocks.length - 1; row >= 0; row--){
            for(let col = 0; col < this.blocks[row].length; col++){
                if(this.blocks[row][col] === 1){
                    return row + 1
                }
            }
        }
        return 1
    }

    getHorizontalSize() {
        for(let col = this.blocks[0].length - 1; col >= 0; col--){
            for(let row = 0; row < this.blocks.length; row++){
                if(this.blocks[row][col] === 1){
                    return col + 1
                }
            }
        }
        return 1
    }

    draw(ctx: CanvasRenderingContext2D){
        for(let row = 0; row < this.blocks.length; row++){
            for(let col = 0; col < this.blocks[row].length; col++){
                if(this.blocks[row][col] === 1){
                    ctx.fillStyle = '#a12f2f'
                    ctx.fillRect((this.y + col) * BLOCK_SIZE, (this.x + row) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
                }
            }
        }
    }
}