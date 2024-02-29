import { Blocks } from "./blocks"
import { Board } from "./board"
import { BLOCK_ACCERELATION, BLOCK_SIZE, BLOCK_SPEED, INITIAL_BLOCK_POSITION, MOVE_SENSETIVITY } from "./contstants"
import { Piece } from "./piece"

const canvas = document.querySelector<HTMLCanvasElement>('#board')!
const board = new Board(canvas)
let currentPieceX = 0
let currentPieceY = INITIAL_BLOCK_POSITION
let currentPiece = getRandomPiece()
let nextPiece = getRandomPiece()

let leftPressed = false
let rightPressed = false
let downPressed = false

let score = 0
let level = 1

function moveDown() {
    currentPieceX += BLOCK_SPEED + (downPressed ? BLOCK_ACCERELATION : 0)
}

function moveSides(piece: Piece) {
    if (board.checkHorizontalCollision(piece)) {
        return
    }
    if (leftPressed && currentPieceY > 0) {
        currentPieceY -= MOVE_SENSETIVITY
    }
    if (rightPressed && (currentPieceY + piece.getHorizontalSize()) * BLOCK_SIZE < board.getWidth) {
        currentPieceY += MOVE_SENSETIVITY
    }
}

function checkCollision(piece: Piece) {
    //Bottom collision
    if ((piece.getX + piece.getVerticalSize()) * BLOCK_SIZE > board.getHeigt) {
        return true
    }
    return false
}

function getRandomPiece(): Piece {
    const index = Math.floor(Math.random() * Blocks.length)
    return Blocks[index]
}

function getScoreMultiplier(lines: number) {
    switch (lines) {
        case 1:
            return 40
        case 2:
            return 100
        case 3:
            return 300
        case 4:
            return 1200
        default:
            return 0
    }
}

export function gameLoop() {
    board.clear()
    board.drawBlockTiles()
    const piece = new Piece(currentPiece, currentPieceX, currentPieceY)
    piece.draw(board.getContext)
    moveSides(piece)
    if (!checkCollision(piece) && !board.checkVerticalCollision(piece)) {
        moveDown()
    } else {
        board.freezePiece(piece)
        if (board.checkTopCollision()) {
            board.clear()
        }
        const lines = board.checkLine()
        if (lines > 0) {
            score += getScoreMultiplier(lines) * level
            console.log(score)
        }
        currentPiece = nextPiece
        nextPiece = getRandomPiece()
        currentPieceX = 0
        currentPieceY = INITIAL_BLOCK_POSITION
    }
    requestAnimationFrame(gameLoop)
}

export function initEvents() {
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowUp':
                break
            case 'ArrowDown':
                downPressed = true
                break
            case 'ArrowLeft':
                leftPressed = true
                break
            case 'ArrowRight':
                rightPressed = true
                break
        }
    })
    document.addEventListener('keyup', (event) => {
        switch (event.key) {
            case 'ArrowUp':
                break
            case 'ArrowDown':
                downPressed = false
                break
            case 'ArrowLeft':
                leftPressed = false
                break
            case 'ArrowRight':
                rightPressed = false
                break
        }
    })
}
