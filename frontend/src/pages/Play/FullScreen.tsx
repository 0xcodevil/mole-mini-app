import { useEffect } from "react";
import { toast } from "react-toastify";
import { useInitData } from "@telegram-apps/sdk-react";

import Crypto from "@/libs/crypto";
import API from "@/libs/API";
import Link from "@/components/Link";

interface FinishScreenProps {
	newHigh?: boolean;
	onRestart: () => any;
	onReset: () => any;
	result: number;
	gameId: string;
}

const FinishScreen = ({ onRestart, result, gameId }: FinishScreenProps) => {
	const initData = useInitData();
	useEffect(() => {
		if (!result) return;
		const data = Crypto.encrypt({ score: result, gameId });
		API.post('/play/result', { userid: initData?.user?.id, data })
			.then(res => {
				if (!res.data.success) console.error(res.data.msg);
			}).catch(err => {
				console.error(err);
				toast.error(err.message);
			});
	}, [result, gameId]);

	return (
		<div className="z-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[272px] rounded-[17px] bg-[#FF02D542] border border-[#C400FA] flex flex-col justify-end items-center pb-[40px]">
			<h1 className="text-[35px] font-lemon text-transparent bg-clip-text bg-gradient-to-b from-[#C100FB80] to-[#00C8FF] border-none leading-none" style={{ WebkitTextStroke: '1px white' }}>Game Over</h1>
			<p className="text-center text-[60px] text-green-400">{ result }</p>
			<div className="flex justify-center gap-2">
				<button className="flex items-center justify-center w-[121px] h-[50px] bg-black rounded-full border-2 border-[#C100FB] text-[22px] font-lily shadow-[0_0_10px_#C100FB] hover:shadow-[0_4px_10px_#C100FB] transition-all duration-200 hover:-translate-y-1" onClick={onRestart}>Replay</button>
				<Link to="/" className="flex items-center justify-center w-[121px] h-[50px] bg-black rounded-full border-2 border-[#C100FB] text-[22px] font-lily shadow-[0_0_10px_#C100FB] hover:shadow-[0_4px_10px_#C100FB] transition-all duration-200 hover:-translate-y-1">Back</Link>
			</div>
		</div>
	);
}

export default FinishScreen;