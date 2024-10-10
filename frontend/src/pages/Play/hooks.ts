import { useState, useEffect } from "react"

export const useAudio = (src: string, volume = 1) => {
	const [audio, setAudio] = useState<HTMLAudioElement>(null!)
	useEffect(() => {
		const AUDIO = new Audio(src)
		AUDIO.volume = volume
		setAudio(AUDIO)
	}, [src])
	return {
		play: () => audio.play(),
		pause: () => audio.pause(),
		stop: () => {
			audio.pause()
			audio.currentTime = 0
		},
	}
}

export const usePersistentState = (key: string, initialValue: number | string | boolean) => {
	const [state, setState] = useState(
		window.localStorage.getItem(key)
			? JSON.parse(window.localStorage.getItem(key) || "")
			: initialValue
	)
	useEffect(() => {
		window.localStorage.setItem(key, state)
	}, [key, state])
	return [state, setState]
}