import Link from "@/components/Link";
import { useApp } from "@/providers/AppProvider";
import Farm from "@/components/Farm";

const Home = () => {
    const app = useApp();

    return (
        <div className="w-screen flex flex-col items-center justify-between h-screen bg-[url('/imgs/home-background.png')] bg-contain bg-no-repeat bg-center bg-fixed pt-1 pb-5">
            <div className="flex flex-col">
                <h1 className="text-center font-margarine text-[40px]">Mole Smash</h1>
                <div className="flex items-center gap-[4px] mx-auto">
                    <p className="font-marcellus text-[22px] text-transparent bg-clip-text bg-[linear-gradient(to_right,#00D0FF,#FFDD00,#D400FF,#FF0099)]">MINI APP</p>
                    <img className="w-[16px] h-[16px]" src="/imgs/verified.png" alt="" />
                </div>
            </div>
            <div className="">
                <img className="w-[238px] h-[230px]" src="/imgs/home.png" alt="" />
            </div>
            <div className="">
                <Link to="/play" className="flex items-center justify-center w-[160px] h-[50px] rounded-full border-2 border-[#F9E813] text-[22px] font-lily shadow-[0_0_10px_#F9E813] transition-all duration-200 hover:-translate-y-1">Start</Link>
                <Farm plusPoint={(val: number) => val} />
            </div>
            {/* <p className="font-lemon text-[14px] mt-[24px]">Loading...</p> */}
            <div className="flex flex-col items-center">
                <div className="relative z-10 flex gap-[38px]">
                    <Link to="/shop" className="transition-all duration-200 translate-y-3 hover:translate-y-1">
                        <img className="w-[57px] h-[57px]" src="/imgs/shop.png" alt="" />
                    </Link>
                    <Link to="/leaderboard" className="transition-all duration-200 translate-y-10 hover:translate-y-8">
                        <img className="w-[57px] h-[57px]" src="/imgs/leaderboard.png" alt="" />
                    </Link>
                    <button onClick={app?.toggleMusic} className="transition-all duration-200 translate-y-10 hover:translate-y-8">
                        {app?.volume === "on" ?
                            <img className="w-[57px] h-[57px]" src="/imgs/music.png" alt="" /> :
                            <img className="w-[57px] h-[57px]" src="/imgs/music-muted.png" alt="" />
                        }
                    </button>
                    <Link to="/referral" className="transition-all duration-200 translate-y-3 hover:translate-y-1">
                        <img className="w-[57px] h-[57px]" src="/imgs/info.png" alt="" />
                    </Link>
                </div>
                <div className="w-[353px] h-[64px] bg-[#9A00A924] rounded-[100%] shadow-[0_4px_10px_#FFD4005C]" />
            </div>
        </div>
    )
}

export default Home;