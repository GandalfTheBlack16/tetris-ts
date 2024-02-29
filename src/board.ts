import { BOARD_WIDTH, BOARD_HEIGHT, BLOCK_SIZE } from './contstants'
import { Piece } from './piece'
import { BlockTiles } from './types'

export class Board {
    
    private readonly canvas: HTMLCanvasElement
    private readonly ctx: CanvasRenderingContext2D
    private blockTiles: BlockTiles = []
    
    constructor(canvas: HTMLCanvasElement){
        this.canvas = canvas
        this.canvas.width = BOARD_WIDTH
        this.canvas.height = BOARD_HEIGHT
        this.ctx = this.canvas.getContext('2d')!
        this.blockTiles = Array.from({ length: BOARD_HEIGHT / BLOCK_SIZE }, () => Array(BOARD_WIDTH / BLOCK_SIZE).fill(0))
    }

    get getContext() {
        return this.ctx
    }

    get getWidth() {
        return this.canvas.width
    }

    get getHeigt() {
        return this.canvas.height
    }

    clear() {
        this.ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT)
    }

    drawBlockTiles() {
        for(let row = 0; row < this.blockTiles.length; row++){
            for(let col = 0; col < this.blockTiles[row].length; col++){
                if(this.blockTiles[row][col] === 1){
                    this.ctx.fillStyle = '#a12f2f'
                    this.ctx.fillRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
                }
            }
        }
    }

    freezePiece(piece: Piece) {
        const blocks = piece.getBlocks
        for (let row = 0; row < blocks.length; row++) {
            for (let col = 0; col < blocks[row].length; col++) {
                if (Math.round(piece.getY) + col < BOARD_WIDTH / BLOCK_SIZE && Math.round(piece.getX) + row < BOARD_HEIGHT / BLOCK_SIZE && blocks[row][col] === 1) {
                    this.blockTiles[Math.round(piece.getX) + row][Math.round(piece.getY) + col] = 1
                }
            }
        }
    }

    checkVerticalCollision(piece: Piece) {
        const blocks = piece.getBlocks
        for (let row = 0; row < blocks.length; row++) {
            for (let col = 0; col < blocks[row].length; col++) {
                if (blocks[row][col] === 1 && Math.round(piece.getX) + row + 1 < BOARD_HEIGHT / BLOCK_SIZE && this.blockTiles[Math.round(piece.getX) + row + 1][Math.round(piece.getY) + col] === 1) {
                    return true
                }
            }
        }
        return false
    }

    checkHorizontalCollision(piece: Piece) {
        const blocks = piece.getBlocks
        for (let row = 0; row < blocks.length; row++) {
            for (let col = 0; col < blocks[row].length; col++) {
                if (blocks[row][col] === 1 && Math.round(piece.getY) + col + 1 > 0 && Math.round(piece.getY) + col + 1 < BOARD_WIDTH / BLOCK_SIZE && 
                this.blockTiles[Math.round(piece.getX) + row][Math.round(piece.getY) + col + 1] === 1) {
                    return true
                }
            }
        }
        return false
    }

    checkLine() {
        let lines = 0
        for (let row = 0; row < this.blockTiles.length; row++) {
            if (this.blockTiles[row].every((block) => block === 1)) {
                this.blockTiles.splice(row, 1)
                this.blockTiles.unshift(Array(BOARD_WIDTH / BLOCK_SIZE).fill(0))
                lines++
                if (lines === 4) {
                    break
                }
            }
        }

        return lines
    }

    checkTopCollision() {
        return this.blockTiles[0].some((block) => block === 1)
    }
}