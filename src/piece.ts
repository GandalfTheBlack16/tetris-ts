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
        const currentBlock = this.blocks.positions[this.blocks.currentPositon]
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
        const currentBlock = this.blocks.positions[this.blocks.currentPositon]
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
        const currentBlock = this.blocks.positions[this.blocks.currentPositon]
        for(let row = 0; row < currentBlock.length; row++){
            for(let col = 0; col < currentBlock[row].length; col++){
                if(currentBlock[row][col] === 1){
                    ctx.fillStyle = '#a12f2f'
                    ctx.fillRect((this.y + col) * BLOCK_SIZE, (this.x + row) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
                }
            }
        }
    }

    rotate() {
        this.blocks.currentPositon = (this.blocks.currentPositon + 1) % this.blocks.positions.length
    }
}