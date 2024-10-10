import Footer from "@/components/Footer";
import Link from "@/components/Link";

const Earn = () => {
    return (
        <div className="px-[43px] flex flex-col items-center h-[calc(100vh-100px)] overflow-y-auto pt-[6px]">
            <h1 className="font-margarine text-[34px] text-center ">Earn Coins</h1>
            <div className="w-[198px] h-[204px] mx-auto mt-[25px]">
                <img src="/imgs/earn.png" alt="" className="w-" />
            </div>
            <div className="mt-[32px] w-full relative flex justify-between items-center py-2 px-8 bg-[#FF02A629] border border-[#C400FA] rounded-[15px]">
                <img src="/imgs/hammer.png" alt="" className="absolute top-0 w-16 right-1 -translate-y-7" />
                <div className="font-lemon text-[21px]">Hit The Mole</div>
                <img className="w-[72px]" src="/imgs/hit-mole.png" alt="" />
            </div>
            <Link to="/boost" className="relative z-10 flex items-center justify-center w-full gap-2 pr-3 mt-6">
                <div className="border flex-1 w-full border-b-[3px] border-t-0 border-dashed border-[#8A008E]" />
                <img src="/imgs/rocket.png" alt="" className="w-[44px]" />
                <span className="font-lemon text-[24px]">Boost</span>
                <img src="/imgs/arrow.png" alt="" className="w-[15px] h-[15px]" />
                <div className="border flex-1 w-full border-b-[3px] border-t-0 border-dashed border-[#8A008E]" />
            </Link>
            <div className="mt-6 w-full relative flex justify-between items-center p-[18px] bg-[#FF02A629] border border-[#C400FA] rounded-[15px]">
                <img src="/imgs/point.png" alt="" className="w-[42px] h-[42px]" />
                <span className="font-lemon text-[20px]">10356</span>
                <span className="font-poppins text-[14px]">987 / 1000</span>
            </div>
            <div className="mt-3 w-full relative flex items-center gap-[7px] pl-[21px] py-[15px] pr-[9px] bg-[#FF02A629] border border-[#C400FA] rounded-[15px]">
                <img src="/imgs/reward.png" alt="" className="w-[48px] h-[48px]" />
                <div className="flex-1">
                    <div className="flex justify-between">
                        <div className="font-lemon text-[13px]">Daily Reward</div>
                        <div className="flex gap-[7px]">
                            <button className="flex items-center justify-center gap-1 w-[59px] h-[25px] rounded-[6px] bg-[#FEFEFE33]">
                                <img src="/imgs/coin.png" alt="" className="w-[8px]" />
                                <span className="font-poppins font-bold text-[10px]">+500</span>
                            </button>
                            <button className="w-[59px] h-[25px] rounded-[6px] bg-gradient-to-b from-[#6700B0] to-[#00BFE1] font-poppins font-bold text-[10px]">Claim</button>
                        </div>
                    </div>
                    <div className="font-poppins text-[8px]">Each day brings you more coins</div>
                </div>
            </div>
            <div className="absolute w-[500px] top-[80px] left-[20%] h-[500px] -z-50 rounded-full [background:radial-gradient(#00A6FF68_-30%,#00000000_50%)]" />
            <div className="absolute w-[500px] -top-[150px] -left-[60%] h-[500px] -z-50 rounded-full [background:radial-gradient(#00A6FF68_10%,#00000000_50%)]" />
            <Footer />
        </div>
    )
}

export default Earn;