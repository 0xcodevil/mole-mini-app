import Footer from "@/components/Footer";

const Friends = () => {
    return (
        <div className="px-[43px] h-[calc(100vh-100px)] overflow-y-auto">
            <div className="flex flex-col items-center mt-[6px]">
                <div className="font-margarine text-[34px]">Invite Friends!</div>
                <div className="font-madimi text-transparent bg-clip-text bg-[linear-gradient(to_right,#00D0FF,#FFDD00,#D400FF,#FF0099)]">You & your friend  will receive bonuses</div>
            </div>
            <div className="mt-[25px] relative flex py-4 pl-5 gap-3 before:content-[''] before:absolute before:inset-0 before:border before:border-transparent before:rounded-[15px] before:[background:linear-gradient(to_right,#C100FB,#00C8FF)_border-box] before:[-webkit-mask:linear-gradient(#fff_0_0)_padding-box,_linear-gradient(#fff_0_0)] before:[mask-composite:exclude]">
                <img className="w-[30px] h-[30px]" src="/imgs/gift.png" alt="" />
                <div>
                    <div className="font-lemon text-[13px]">Invite a friend</div>
                    <div className="flex items-center gap-1">
                        <div className="w-[3px] h-[3px] rounded-full bg-[#FEC83A]" />
                        <img className="w-4 h-4" src="/imgs/coin.png" alt="" />
                        <div className="font-poppins text-[12px]">+0.1 for you and your friend</div>
                    </div>
                </div>
            </div>
            <div className="mt-[25px] relative flex py-4 pl-5 gap-3 before:content-[''] before:absolute before:inset-0 before:border before:border-transparent before:rounded-[15px] before:[background:linear-gradient(to_right,#C100FB,#00C8FF)_border-box] before:[-webkit-mask:linear-gradient(#fff_0_0)_padding-box,_linear-gradient(#fff_0_0)] before:[mask-composite:exclude]">
                <img className="w-[30px] h-[30px]" src="/imgs/gift-2.png" alt="" />
                <div>
                    <div className="font-lemon text-[13px]">Invite a friend with teelgram premium</div>
                    <div className="flex items-center gap-1">
                        <div className="w-[3px] h-[3px] rounded-full bg-[#FEC83A]" />
                        <img className="w-4 h-4" src="/imgs/coin.png" alt="" />
                        <div className="font-poppins text-[12px]">+0.3 for you and your friend</div>
                    </div>
                </div>
            </div>
            <div className="mt-[25px] relative flex p-[10px] bg-[#FF02A629] rounded-[15px] gap-3 before:content-[''] before:absolute before:inset-0 before:border before:border-transparent before:rounded-[15px] before:[background:linear-gradient(to_right,#C100FB,#00C8FF)_border-box] before:[-webkit-mask:linear-gradient(#fff_0_0)_padding-box,_linear-gradient(#fff_0_0)] before:[mask-composite:exclude] before:-z-10">
                <button className="w-full h-[45px] rounded-[8px] font-lemon text-[14px] bg-[#C100FB80]">Become a referral</button>
            </div>
            <h1 className="font-margarine text-[28px] mt-9 text-center">List of your friends</h1>
            <div className="relative h-[250px] rounded-[15px] bg-[#FF02A629] border mt-[72px] border-[#E600FF] pt-[30px]">
                <img src="/imgs/home.png" alt="" className="w-[90px] h-[89px] absolute top-0 right-1/2 translate-x-1/2 -translate-y-[65px]" />
                <img className="w-[14px] h-[14px] absolute top-3 right-3" src="/imgs/refresh.png" alt="" />
                <div className="h-[150px]"></div>
                <div className="flex justify-center gap-2 mt-5">
                    <button className="w-[100px] h-[31px] rounded-[9px] bg-white font-poppins text-[10px] text-[#590B78]">Invite a friend</button>
                    <button className="flex items-center justify-center w-[34px] h-[31px] rounded-[9px] bg-white">
                        <img src="/imgs/copy.png" alt="" className="w-[16px] h-[15px]" />
                    </button>
                </div>
            </div>
            <div className="absolute w-[500px] top-0 left-[20%] h-[500px] -z-50 rounded-full [background:radial-gradient(#00A6FF68_-30%,#00000000_50%)]" />
            <Footer />
        </div>
    )
}

export default Friends;