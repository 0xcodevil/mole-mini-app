import { Fragment, useState, useRef } from "react";
import confetti from "canvas-confetti"
import gsap from 'gsap';

import constants from "./constants";
import { useAudio, usePersistentState } from "./hooks";
import StartScreen from "./StartScreen";
import CountDown from "./CountDown";
import Mallet from "./Mallet";
import Score from "./Score";
import Timer from "./Timer";
import Mole from "./Mole";
import FinishScreen from "./FullScreen";

import "./game.css";

const generateMoles = () =>
	new Array(constants.MOLES).fill(0).map(() => ({
		speed: gsap.utils.random(0.5, 2),
		delay: gsap.utils.random(0.5, 5),
		points: constants.MOLE_SCORE,
	}))

const Game = () => {
	const { play: playCount } = useAudio(
		'/mp3/countdown-beep.mp3'
	)
	const { play: playWhack } = useAudio(
		'/mp3/pop.mp3'
	)
	const { play: playSqueak } = useAudio(
		'/mp3/squeak-in.mp3'
	)
	const { play: playSqueakOut } = useAudio(
		'/mp3/squeak-out.mp3'
	)
	const { play: playCheer } = useAudio(
		'/mp3/kids-cheering.mp3'
	)
	const { play: playThud } = useAudio(
		'/mp3/thud--small.mp3',
		0.65
	)
	const { play: playWhistle } = useAudio(
		'/mp3/whistle.mp3',
		0.65
	)
	const { play: playSparkle } = useAudio(
		'/mp3/sparkle.mp3'
	)
	const { play: playClick } = useAudio(
		'/mp3/click.mp3'
	)
	const [moles, setMoles] = useState(generateMoles())
	const [playing, setPlaying] = useState(false)
	const [starting, setStarting] = useState(false)
	const [finished, setFinished] = useState(false)
	const [score, setScore] = useState(0)
	const [newHighScore, setNewHighScore] = useState(false)
	const [muted,] = usePersistentState('whac-muted', true)
	const [highScore, setHighScore] = usePersistentState('whac-high-score', 0)
	const boardRef = useRef(null)

	const onWhack = (points: number, golden: boolean) => {
		gsap.to(boardRef.current, {
			yPercent: 2,
			repeat: 1,
			yoyo: true,
			duration: 0.05,
		})
		if (!muted) {
			playThud()
			if (golden) playSparkle()
			else {
				// Play random noise from selection
				;[playWhack, playSqueak, playSqueakOut][Math.floor(Math.random() * 3)]()
			}
		}
		setScore(score + points)
	}

	const endGame = () => {
		if (!muted) {
			playClick()
			playWhistle()
		}
		if (score > parseInt(highScore, 10)) {
			if (!muted) {
				playCheer()
			}
			confetti()
			setHighScore(score)
			setNewHighScore(true)
		}
		setPlaying(false)
		setFinished(true)
	}

	const startPlaying = () => {
		if (!muted) playClick()
		setStarting(false)
		setPlaying(true)
		if (!muted) playWhistle()
	}

	const resetGame = () => {
		if (!muted) playClick()
		setScore(0)
		setNewHighScore(false)
		setMoles(generateMoles())
		setStarting(false)
		setPlaying(false)
		setFinished(false)
	}

	const startGame = () => {
		if (!muted) playClick()
		setScore(0)
		setNewHighScore(false)
		setMoles(generateMoles())
		setStarting(true)
		setFinished(false)
	}

	return (
		<Fragment>
			{/* Fresh */}
			{!starting && !playing && !finished && (
				<StartScreen onStart={startGame} />
			)}
			{/* Starting */}
			{starting && (
				<CountDown
					onComplete={startPlaying}
					fx={() => {
						if (!muted) playCount()
					}}
				/>
			)}
			{/* Playing */}
			{playing && (
				<Fragment>
					<button className="icon-button end-button" onClick={endGame}>
						<span className="sr-only">End Game</span>
						<svg
							className="icon"
							viewBox="0 0 352 512"
							width="100">
							<path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
						</svg>
					</button>
					<Mallet />
					<Score value={score} />
				</Fragment>
			)}
			{/* Moles are always visible but not always active */}
			<main ref={boardRef} className="w-screen h-screen px-[10px] pt-[80px]">
            	<div className="absolute w-[500px] top-[30px] left-0 h-[500px] -z-50 rounded-full [background:radial-gradient(#00A6FF68_-10%,#00000000_50%)]" />
				<div className="grid grid-cols-3 justify-items-center gap-y-2">
					{moles.map(({ speed, delay, points }, id) => (
						<Mole
							key={id}
							onWhack={onWhack}
							speed={speed}
							active={playing}
							delay={delay}
							points={points}
							loading={id === 2 && !starting && !playing && !finished}
						/>
					))}
				</div>
			</main>
			<Timer started={playing} time={constants.TIME_LIMIT} onEnd={endGame} />
			{/* Finished */}
			{finished && (
				<FinishScreen
					onRestart={startGame}
					onReset={resetGame}
					newHigh={newHighScore}
					result={score}
				/>
			)}
		</Fragment>
	)
}

export default Game;