import { useEffect, useState, useRef, useCallback, MouseEvent } from "react";
import gsap from "gsap";
import { GAME } from "@/libs/constants";

interface MoleProps {
	active: boolean;
	loading: boolean;
	onWhack: (points: number, golden: boolean) => any;
	speed: number;
	delay: number;
	points: number;
	pointsMin?: number;
}

const Mole = ({
	active = false,
	loading = false,
	onWhack,
	speed,
	delay,
	points,
	pointsMin = 10,
}: MoleProps) => {
	const [image, setImage] = useState('mole-0.png');
	const [whacked, setWhacked] = useState(false)
	const delayedRef = useRef<any>(null)
	const pointsRef = useRef(points)
	const buttonRef = useRef(null)
	const moleRef = useRef(null)
	const loadingRef = useRef<any>(null)
	const moleContainerRef = useRef(null)
	const bobRef = useRef<any>(null)

	// Use a callback to cache the function and share it between effects.
	const setMole = useCallback((override = false) => {
		// Give a 1% chance of getting the "Golden" Mole.
		if (override) {
			pointsRef.current = GAME.NORMAL_SCORE
			setImage('mole-0.png');
			return;
		}

		let random = Math.random()
		if (random < GAME.GOLDEN_CHANCE) {
			// Create the "Golden" Mole
			pointsRef.current = GAME.GOLDEN_SCORE
			setImage('mole-2.png')
		} else if (random < GAME.BOMB_CHANCE) {
			pointsRef.current = GAME.BOMB_SCORE
			setImage('bomb.png')
		} else if (random < GAME.SPECIAL_CHANCE) {
			pointsRef.current = GAME.SPECIAL_SCORE
			setImage('mole-1.png')
		} else {
			// Create a "Regular" Mole
			pointsRef.current = GAME.NORMAL_SCORE
			setImage('mole-0.png');
		}
	}, [])

	// Use an effect to get the Mole moving
	useEffect(() => {
		// Set the Mole position and overlay button to underground
		gsap.set([moleRef.current, buttonRef.current], {
			yPercent: 100,
		})
		// Show Mole
		gsap.set(moleRef.current, { display: 'block' })
		// Create the bobbing timeline and store a ref so we can kill it on unmount.
		// Timeline behavior defined by props
		if (active) {
			// Set characteristics for the Mole.
			setMole()
			bobRef.current = gsap.to([buttonRef.current, moleRef.current], {
				yPercent: 0,
				duration: speed,
				yoyo: true,
				repeat: -1,
				delay,
				repeatDelay: delay,
				onRepeat: () => {
					if (pointsRef.current < 0) return;
					pointsRef.current = Math.floor(
						Math.max(pointsRef.current * GAME.POINTS_MULTIPLIER, pointsMin)
					)
				},
			})
		}
		// Cleanup the timeline on unmount
		return () => {
			if (bobRef.current) bobRef.current.kill()
		}
	}, [active, delay, pointsMin, speed, setMole])

	// When a Mole is whacked, animate it underground
	// Swap out the Mole style, reset it, and speed up the bobbing timeline.
	useEffect(() => {
		if (whacked) {
			// Render something in the body
			bobRef.current.pause()
			gsap.to([moleRef.current, buttonRef.current], {
				yPercent: 100,
				duration: 0.1,
				onComplete: () => {
					delayedRef.current = gsap.delayedCall(gsap.utils.random(1, 3), () => {
						setMole()
						setWhacked(false)
						bobRef.current
							.restart()
							.timeScale(bobRef.current.timeScale() * GAME.TIME_MULTIPLIER)
					})
				},
			})
		}
		// If the delayed restart isn't started and we unmount, it will need cleaning up.
		return () => {
			if (delayedRef.current) delayedRef.current.kill()
		}
	}, [whacked, setMole])

	// If a Mole is set to loading, play the loading animation version
	useEffect(() => {
		if (loading) {
			setMole(true)
			loadingRef.current = gsap
				.timeline({
					repeat: -1,
					repeatDelay: 1,
				})
				// Shooting up!
				.to(moleRef.current, {
					yPercent: 5,
					ease: 'back.out(1)',
				})
				.to(moleRef.current, {
					yPercent: 100,
					delay: 0.2,
					ease: 'power4.in',
				})
		}
		return () => {
			if (loadingRef.current) loadingRef.current.kill()
		}
	}, [loading])

	// To render the score, we don't need React elements.
	// We can render them straight to the DOM and remove them once they've animated.
	// Alternatively, we could use a React DOM Portal. However, our element has
	// a short lifespan and doesn't update, etc.
	const renderScore = (x: number, y: number) => {
		const SCORE_HOLDER = document.createElement('div')
		SCORE_HOLDER.className = 'mole__points-holder'
		const SCORE = document.createElement('div')
		SCORE.className = 'mole__points'
		SCORE.innerText = pointsRef.current.toString()
		SCORE_HOLDER.appendChild(SCORE)
		document.body.appendChild(SCORE_HOLDER)
		gsap.set(SCORE_HOLDER, {
			'--angle': gsap.utils.random(-35, 35),
			'--accent': gsap.utils.random(0, 359),
		})
		gsap
			.timeline({
				onComplete: () => SCORE_HOLDER.remove(),
			})
			.set(SCORE_HOLDER, {
				left: x,
				top: y,
			})
			.to(SCORE, {
				yPercent: -100,
				duration: 0.35,
			})
			.to(
				SCORE,
				{
					opacity: 0,
					duration: 0.1,
				},
				'>-0.1'
			)
	}

	// On Whack, set "whacked" to true.
	// At the same time, render a score in the appropriate spot
	// And fire the callback so the Game can track the score.
	// If the pointsRef is higher than half the golden score
	// We know it's golden Mole so we can play a different sound.
	const whack = (e: MouseEvent) => {
		setWhacked(true)
		renderScore(e.pageX, e.pageY)
		onWhack(pointsRef.current, pointsRef.current > GAME.GOLDEN_SCORE * 0.5)
	}

	// Much of what is rendered is the Mole SVG and the Hole.
	// You could do this with images and CSS based on your design.

	return (
		<div className="mole__hole" ref={moleContainerRef}>
			<div className="relative w-[80px] h-[80px] overflow-hidden">
				<div className="relative w-[80px] h-[75px] z-[1] overflow-hidden">
					<img draggable={false} ref={moleRef} className="w-[80px] absolute bottom-0" src={`/imgs/${image}`} alt="" />
				</div>
				<img draggable={false} className="w-[80px] z-0 absolute bottom-0" src="/imgs/hole-top.png" alt="" />
				<img draggable={false} className="w-[80px] z-[2] absolute bottom-0" src="/imgs/hole-bottom.png" alt="" />
				<button ref={buttonRef} onClick={whack} className="absolute z-[3] inset-0" />
			</div>
		</div>
	)
}

export default Mole;