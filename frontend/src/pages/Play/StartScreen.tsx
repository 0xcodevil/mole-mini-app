const StartScreen = ({ onStart }: { onStart: () => any}) => (
	<div className="z-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[272px] rounded-[17px] bg-[#FF02D542] border border-[#C400FA] flex justify-center items-center">
		<button className="text-[35px] font-lemon text-transparent bg-clip-text bg-gradient-to-b from-[#C100FB80] to-[#00C8FF] border-none leading-none" style={{ WebkitTextStroke: '1px white' }} onClick={onStart}>Start</button>
	</div>
)

export default StartScreen;