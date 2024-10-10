import { useState, useEffect, useRef } from "react"

interface TimerProps {
	time: number;
	started: boolean;
	interval?: number;
	onEnd: () => any;
}

const Timer = ({ time, started, interval = 1000, onEnd }: TimerProps) => {
	const [internalTime, setInternalTime] = useState(time)
	const timerRef = useRef<any>(time)
	useEffect(() => {
		console.log(internalTime);
		if (started && internalTime === 0 && onEnd) {
			onEnd()
			setInternalTime(time);
			
		}
	}, [internalTime, onEnd, started])
	useEffect(() => {
		if (!started) return () => void(0);
		timerRef.current = setInterval(() => {
			setInternalTime(prev => prev - interval)
		}, interval)
		return () => {
			clearInterval(timerRef.current)
		}
	}, [interval, started])
	return (
		<div className="fixed z-10 left-0 bottom-0 w-screen h-[64px] bg-[linear-gradient(to_right,#00DDFF5C,#FF00BB5C,#B000D05C)] px-[40px] flex items-center">
			<div className="relative w-full rounded-full h-[31px] bg-[#C100FB4D] border-[3px] border-[#FF00BF4D]">
				<div className="h-full rounded-full bg-[#00C8FF52] transition-all duration-300" style={{ width: internalTime / time * 100 + '%' }} />
				<span className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">{ started && internalTime > 0 ? `00:${ (internalTime / 1000).toFixed(0).padStart(2, '0') }` : '00:00' }</span>
			</div>
		</div>
	)
}

export default Timer;