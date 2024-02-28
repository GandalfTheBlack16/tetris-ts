import './styles.css'
import { gameLoop, initEvents } from './game'

initEvents()
requestAnimationFrame(gameLoop)
