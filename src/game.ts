import { Blocks } from "./blocks"
import { Board } from "./board"
import { BLOCK_SIZE, INITIAL_BLOCK_POSITION } from "./contstants"
import { Piece } from "./piece"

const boardCanvas = document.querySelector<HTMLCanvasElement>('#board')!
const nextPieceCanvas = document.querySelector<HTMLCanvasElement>('#next-piece')!

const board = new Board(boardCanvas)
let currentPiece: Piece = getRandomPiece()
let nextPiece: Piece = getRandomPiece()

let leftPressed = false
let rightPressed = false
let downPressed = false
let upPressed = false

let lines = 0
let score = 0
let level = 1
let speed = 0.04
let gameOver = false

function moveDown() {
    currentPiece.moveDown(speed, downPressed)
}

function moveSides(piece: Piece) {
    if (board.checkHorizontalCollision(piece)) {
        return
    }
    if (leftPressed && currentPiece.getY > 0) {
        currentPiece.moveLeft()
    }
    if (rightPressed && (currentPiece.getY + piece.getHorizontalSize()) * BLOCK_SIZE < board.getWidth) {
        currentPiece.moveRight()
    }
}

function rotatePiece(piece: Piece) {
    if (upPressed){
        piece.rotate()
        upPressed = false
    }
}

function checkCollision(piece: Piece) {
    //Bottom collision
    if ((piece.getX + piece.getVerticalSize()) * BLOCK_SIZE > board.getHeigt) {
        return true
    }
    return false
}

function getRandomPiece() {
    const index = Math.floor(Math.random() * Blocks.length)
    return new Piece(Blocks[index], 0, INITIAL_BLOCK_POSITION)
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

function increaseLevel() {
    if (lines >= level * 10) {
        level++
        speed *= 1.1
    }
}

function drawNextPiece() {
    const ctx = nextPieceCanvas.getContext('2d')!
    ctx.clearRect(0, 0, nextPieceCanvas.width, nextPieceCanvas.height)
    nextPiece.drawNextPiece(ctx, nextPieceCanvas.width, nextPieceCanvas.height)
}

export function gameLoop() {
    if (!gameOver) {
        board.clear()
        board.drawBlockTiles()
        currentPiece.draw(board.getContext)
        drawNextPiece()
        moveSides(currentPiece)
        rotatePiece(currentPiece)
        increaseLevel()
        if (!checkCollision(currentPiece) && !board.checkVerticalCollision(currentPiece)) {
            moveDown()
        } else {
            board.freezePiece(currentPiece)
            if (board.checkTopCollision()) {
                console.log("Game over")
                gameOver = true
            }
            const lines_completed = board.checkLine()
            if (lines_completed > 0) {
                score += getScoreMultiplier(lines_completed) * level
                lines += lines_completed
                console.log("Lines completed", lines)
                console.log("Current score", score)
                console.log("Current level", level)
            }
            currentPiece = nextPiece
            nextPiece = getRandomPiece()
        }
        requestAnimationFrame(gameLoop)
    }
}

export function initEvents() {
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowUp':
                upPressed = true
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
