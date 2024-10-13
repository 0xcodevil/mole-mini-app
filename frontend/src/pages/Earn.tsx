import { useState, useEffect } from 'react';
import { useInitData } from "@telegram-apps/sdk-react";

import API from "@/libs/API";
import Footer from "@/components/Footer";
import Link from "@/components/Link";

const Earn = () => {
    const initData = useInitData();
    const [points, setPoints] = useState(0);

    useEffect(() => {
        API.get(`/users/get/${initData?.user?.id}`).then(res => {
            setPoints(res.data.point);
        }).catch(console.error);
    }, []);

    return (
        <div className="px-[43px] flex flex-col items-center overflow-y-auto pt-[6px] pb-[100px]">
            <h1 className="font-margarine text-[34px] text-center ">Earn Coins</h1>
            <div className="w-[198px] h-[204px] mx-auto mt-[25px]">
                <img src="/imgs/earn.png" alt="" className="w-" />
            </div>
            <div className="mt-[32px] w-full relative flex justify-between items-center py-2 px-8 bg-[#FF02A629] border border-[#C400FA] rounded-[15px]">
                <img src="/imgs/hammer.png" alt="" className="absolute top-0 w-16 right-1 -translate-y-7" />
                <div className="font-lemon text-[21px]">Hit The Mole</div>
                <img className="w-[72px]" src="/imgs/hit-mole.png" alt="" />
            </div>
            <Link to="/shop" className="relative z-10 flex items-center justify-center w-full gap-2 pr-3 mt-6">
                <div className="border flex-1 w-full border-b-[3px] border-t-0 border-dashed border-[#8A008E]" />
                <img src="/imgs/rocket.png" alt="" className="w-[44px]" />
                <span className="font-lemon text-[24px]">Boost</span>
                <img src="/imgs/arrow.png" alt="" className="w-[15px] h-[15px]" />
                <div className="border flex-1 w-full border-b-[3px] border-t-0 border-dashed border-[#8A008E]" />
            </Link>
            <div className="mt-6 w-full relative flex justify-around items-center p-[18px] bg-[#FF02A629] border border-[#C400FA] rounded-[15px]">
                <img src="/imgs/point.png" alt="" className="w-[42px] h-[42px]" />
                <span className="font-lemon text-[20px]">{points.toLocaleString()}</span>
                {/* <span className="font-poppins text-[14px]">1000 / 1000</span> */}
            </div>
            <div className="absolute w-[500px] top-[80px] left-[20%] h-[500px] -z-50 rounded-full [background:radial-gradient(#00A6FF68_-30%,#00000000_50%)]" />
            <div className="absolute w-[500px] -top-[150px] -left-[60%] h-[500px] -z-50 rounded-full [background:radial-gradient(#00A6FF68_10%,#00000000_50%)]" />
            <Footer />
        </div>
    )
}

export default Earn;