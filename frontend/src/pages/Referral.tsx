import Footer from "@/components/Footer";

const Referral = () => {
    return (
        <div className="px-[41px] h-[calc(100vh-100px)] overflow-y-auto">
            <div className="flex flex-col items-center mt-[6px]">
                <div className="font-margarine text-[34px]">Earn More Coins</div>
                <div className="font-madimi text-transparent bg-clip-text bg-[linear-gradient(to_right,#00D0FF,#FFDD00,#D400FF,#FF0099)]">Make our tasks to get more coins</div>
            </div>
            <div className="mt-[14px] relative flex justify-between items-center py-5 px-3 before:content-[''] before:absolute before:inset-0 before:border before:border-transparent before:rounded-[15px] before:[background:linear-gradient(to_right,#C100FB,#00C8FF)_border-box] before:[-webkit-mask:linear-gradient(#fff_0_0)_padding-box,_linear-gradient(#fff_0_0)] before:[mask-composite:exclude]">
                <div className="flex items-center gap-3">
                    <img className="w-[34px] h-[34px]" src="/imgs/wallet.png" alt="" />
                    <div>
                        <div className="font-lemon text-[13px]">Wallet Connect</div>
                        <div className="flex items-center gap-1">
                            <div className="font-poppins text-[12px]">Get Reward <span className="ml-1 text-[#F9E813] text-[8px] font-press">100 Token</span></div>
                        </div>
                    </div>
                </div>
                <button className="text-[#6D04A1] text-[8px] font-poppins font-semibold bg-[#FFDD00] rounded-[5px] h-[25px] w-[69px]">Redeem</button>
            </div>
            <div className="mt-[14px] relative flex justify-between items-center py-5 px-3 before:content-[''] before:absolute before:inset-0 before:border before:border-transparent before:rounded-[15px] before:[background:linear-gradient(to_right,#C100FB,#00C8FF)_border-box] before:[-webkit-mask:linear-gradient(#fff_0_0)_padding-box,_linear-gradient(#fff_0_0)] before:[mask-composite:exclude]">
                <div className="flex items-center gap-3">
                    <img className="w-[27px] h-[27px]" src="/imgs/telegram.png" alt="" />
                    <div>
                        <div className="font-lemon text-[13px]">Wallet Connect</div>
                        <div className="flex items-center gap-1">
                            <div className="font-poppins text-[12px]">Get Reward <span className="ml-1 text-[#F9E813] text-[8px] font-press">300 Token</span></div>
                        </div>
                    </div>
                </div>
                <button className="text-[#6D04A1] text-[8px] font-poppins font-semibold bg-[#FFDD00] rounded-[5px] h-[25px] w-[69px]">Redeem</button>
            </div>
            <div className="mt-[14px] relative flex justify-between items-center py-5 px-3 before:content-[''] before:absolute before:inset-0 before:border before:border-transparent before:rounded-[15px] before:[background:linear-gradient(to_right,#C100FB,#00C8FF)_border-box] before:[-webkit-mask:linear-gradient(#fff_0_0)_padding-box,_linear-gradient(#fff_0_0)] before:[mask-composite:exclude]">
                <div className="flex items-center gap-3">
                    <img className="w-[26px] h-[26px]" src="/imgs/twitter.png" alt="" />
                    <div>
                        <div className="font-lemon text-[13px]">Wallet Connect</div>
                        <div className="flex items-center gap-1">
                            <div className="font-poppins text-[12px]">Get Reward <span className="ml-1 text-[#F9E813] text-[8px] font-press">500 Token</span></div>
                        </div>
                    </div>
                </div>
                <button className="text-[#6D04A1] text-[8px] font-poppins font-semibold bg-[#FFDD00] rounded-[5px] h-[25px] w-[69px]">Redeem</button>
            </div>
            <div className="relative flex items-center gap-4 my-[34px]">
                <img className="w-9 h-[61px] -scale-x-100" src="/imgs/coins.png" alt="" />
                <h1 className="font-margarine text-[34px]">Daily Tasks</h1>
            </div>
            <div className="mt-[25px] relative flex justify-between items-center py-5 px-3 bg-[#FF02A629] border border-[#C400FA] rounded-[15px]">
                <img src="/imgs/mole.png" alt="" className="absolute top-0 right-0 w-16 h-20 -translate-y-16" />
                <div className="flex items-center gap-3">
                    <img className="w-[26px] h-[26px]" src="/imgs/twitter.png" alt="" />
                    <div>
                        <div className="font-lemon text-[13px]">Daily Reward</div>
                        <div className="flex items-center gap-1">
                            <div className="font-poppins text-[12px]">Get Reward <span className="ml-1 text-[#F9E813] text-[8px] font-press">900 Token</span></div>
                        </div>
                    </div>
                </div>
                <button className="text-[#6D04A1] text-[8px] font-poppins font-semibold bg-[#FFDD00] rounded-[5px] h-[25px] w-[69px]">Redeem</button>
            </div>
            <div className="mt-[10px] relative flex justify-between items-center py-5 px-3 bg-[#FF02A629] border border-[#C400FA] rounded-[15px]">
                <div className="flex items-center gap-3">
                    <img className="w-[27px] h-[27px]" src="/imgs/telegram.png" alt="" />
                    <div>
                        <div className="font-lemon text-[13px]">Daily Reward</div>
                        <div className="flex items-center gap-1">
                            <div className="font-poppins text-[12px]">Get Reward <span className="ml-1 text-[#F9E813] text-[8px] font-press">900 Token</span></div>
                        </div>
                    </div>
                </div>
                <button className="text-[#6D04A1] text-[8px] font-poppins font-semibold bg-[#FFDD00] rounded-[5px] h-[25px] w-[69px]">Redeem</button>
            </div>
            <div className="absolute w-[500px] top-[50px] left-[20%] h-[500px] -z-50 rounded-full [background:radial-gradient(#00A6FF68_0%,#00000000_50%)]" />
            <Footer />
        </div>
    )
}

export default Referral;