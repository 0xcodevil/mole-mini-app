import Footer from "@/components/Footer";

const Boost = () => {
    return (
        <div className="px-[43px] flex flex-col items-center h-[calc(100vh-100px)] overflow-y-auto pt-[6px]">
            <h1 className="font-margarine text-[34px] text-center ">Boost</h1>
            <img src="/imgs/boost.png" alt="" className="w-[198px] h-[204px]" />
            <div className="mt-6 w-full relative flex items-center gap-[6px] px-[14px] py-[18px] bg-[#FF02A629] border border-[#C400FA] rounded-[15px]">
                <img src="/imgs/rocket-vector.png" alt="" className="w-[42px] h-[42px]" />
                <div className="flex-1">
                    <div className="font-lemon text-[13px] tracking-tighter">Double Tap 1-Day Boost</div>
                    <p className="font-poppins text-[8px]">A quick and powerful booster that doubles your points for <span className="text-[#F9E813]">1 day</span>.</p>
                </div>
                <button className="w-[45px] h-[18px] rounded-[6px] bg-gradient-to-b from-[#6700B0] to-[#00BFE1] font-poppins font-bold text-[6px]">Claim</button>
            </div>
            <div className="mt-6 w-full relative flex items-center gap-[6px] px-[14px] py-[18px] bg-[#FF02A629] border border-[#C400FA] rounded-[15px]">
                <img src="/imgs/rocket-vector.png" alt="" className="w-[42px] h-[42px]" />
                <div className="flex-1">
                    <div className="font-lemon text-[13px] tracking-tighter">Mega Mole 7-Day Boost</div>
                    <p className="font-poppins text-[8px]">A strong booster that lasts for <span className="text-[#F9E813]">1 days</span>, perfect for dedicated players.</p>
                </div>
                <button className="w-[45px] h-[18px] rounded-[6px] bg-gradient-to-b from-[#6700B0] to-[#00BFE1] font-poppins font-bold text-[6px]">Claim</button>
            </div>
            <div className="mt-6 w-full relative flex items-center gap-[6px] px-[14px] py-[18px] bg-[#FF02A629] border border-[#C400FA] rounded-[15px]">
                <img src="/imgs/rocket-vector.png" alt="" className="w-[42px] h-[42px]" />
                <div className="flex-1">
                    <div className="font-lemon text-[13px] tracking-tighter">Ultimate Mole 30-Day Boost</div>
                    <div className="flex justify-between">
                        <p className="font-poppins text-[8px]">The ultimate booster that doubles your<br />points for a full <span className="text-[#F9E813]">30 days</span>.</p>
                        <button className="w-[45px] h-[18px] rounded-[6px] bg-gradient-to-b from-[#6700B0] to-[#00BFE1] font-poppins font-bold text-[6px]">Claim</button>
                    </div>
                </div>
            </div>

            <div className="absolute w-[500px] top-[80px] left-[30%] h-[500px] -z-50 rounded-full [background:radial-gradient(#00A6FF68_-30%,#00000000_50%)]" />
            <div className="absolute w-[500px] -top-[150px] -left-[60%] h-[500px] -z-50 rounded-full [background:radial-gradient(#00A6FF68_10%,#00000000_50%)]" />
            <Footer />
        </div>
    )
}

export default Boost;