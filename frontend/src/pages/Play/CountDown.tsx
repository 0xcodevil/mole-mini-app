import { Fragment, useRef, useEffect } from "react"
import gsap from "gsap";

interface CountDownProps {
    fx: () => any;
    onComplete: () => any;
}

const CountDown = ({ fx, onComplete }: CountDownProps) => {
	const count = useRef<GSAPTimeline>(null!)
	const three = useRef(null)
	const two = useRef(null)
	const one = useRef(null)

	useEffect(() => {
		gsap.set([three.current, two.current, one.current], { display: 'none' })
		count.current = gsap
			.timeline({
				delay: 0.5,
				onComplete,
			})
			.set(three.current, { display: 'block' })
			.fromTo(
				three.current,
				{
					scale: 1,
					rotate: gsap.utils.random(-30, 30),
				},
				{
					scale: 0,
					rotate: gsap.utils.random(-30, 30),
					duration: 1,
					onStart: () => fx(),
				}
			)
			.set(two.current, { display: 'block' })
			.fromTo(
				two.current,
				{
					scale: 1,
					rotate: gsap.utils.random(-30, 30),
				},
				{
					scale: 0,
					rotate: gsap.utils.random(-30, 30),
					duration: 1,
					onStart: () => fx(),
				}
			)
			.set(one.current, { display: 'block' })
			.fromTo(
				one.current,
				{
					scale: 1,
					rotate: gsap.utils.random(-30, 30),
				},
				{
					scale: 0,
					rotate: gsap.utils.random(-30, 30),
					duration: 1,
					onStart: () => fx(),
				}
			)

		return () => {
			if (count.current) count.current.kill()
		}
	}, [])
	return (
		<Fragment>
			<h2 ref={three} className="countdown-number" style={{ display: 'none' }}>
				3
			</h2>
			<h2 ref={two} className="countdown-number" style={{ display: 'none' }}>
				2
			</h2>
			<h2 ref={one} className="countdown-number" style={{ display: 'none' }}>
				1
			</h2>
		</Fragment>
	)
}

export default CountDown;