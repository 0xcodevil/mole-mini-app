import { useEffect } from "react";
import { toast } from "react-toastify";
import { useInitData } from "@telegram-apps/sdk-react";

import API from "@/libs/API";

interface FinishScreenProps {
	newHigh: boolean;
	onRestart: () => any;
	onReset: () => any;
	result: number;
}

const FinishScreen = ({ newHigh, onRestart, result }: FinishScreenProps) => {
	const initData = useInitData();
	useEffect(() => {
		if (!result) return;
		API.post('/play/result', { userid: initData?.user?.id, point: result })
			.then(res => {
				if (res.data.success) {
					if (newHigh) toast.success(`New High Score. You Scored ${result}.`);
					else toast.success(`You Scored ${result}.`);
				} else {
					toast.error(res.data.msg);
				}
			}).catch(err => {
				console.error(err);
				toast.error(err.message);
			});

	}, [result]);

	return (
		<div className="z-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[272px] rounded-[17px] bg-[#FF02D542] border border-[#C400FA] flex flex-col justify-end items-center pb-[60px]">
			<h1 className="text-[35px] font-lemon text-transparent bg-clip-text bg-gradient-to-b from-[#C100FB80] to-[#00C8FF] border-none leading-none" style={{ WebkitTextStroke: '1px white' }}>Game Over</h1>
			<button className="mt-[12px] flex items-center justify-center w-[121px] h-[50px] bg-black rounded-full border-2 border-[#C100FB] text-[22px] font-lily shadow-[0_0_10px_#C100FB] hover:shadow-[0_4px_10px_#C100FB] transition-all duration-200 hover:-translate-y-1" onClick={onRestart}>Replay</button>
		</div>
	);
}

export default FinishScreen;