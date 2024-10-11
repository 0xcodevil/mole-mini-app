import { useState, useEffect } from "react";
import { useInitData } from "@telegram-apps/sdk-react";
import { toast } from "react-toastify";

import Footer from "@/components/Footer";
import API from "@/libs/API";
// import Link from "@/components/Link";

const Shop = () => {
    const initData = useInitData();

    const [ticket, setTicket] = useState(0);
    const [point, setPoint] = useState(0);

    useEffect(() => {
        API.get(`/users/get/${initData?.user?.id}`).then(res => {
            setPoint(res.data.point);
            setTicket(res.data.ticket);
        }).catch(console.error);
    }, []);

    const handleSwapClick = (points: number) => {
        const yes = confirm('Are you sure?');
        if (yes) API.post('/play/swap', { userid: initData?.user?.id, point: points })
            .then(res => {
                if (res.data.success) {
                    toast.success('You got tickets.');
                    setTicket(res.data.ticket);
                    setPoint(res.data.point);
                } else {
                    toast.error(res.data.msg);
                }
            }).catch(err => {
                console.error(err);
                toast.error(err.message);
            });
    }

    return (
        <div className="px-[43px] w-screen flex flex-col items-center overflow-y-auto pt-[6px] pb-[100px]">
            <h1 className="font-margarine text-[34px] text-center ">Buy Items</h1>
            <div className="flex justify-between w-full mt-[25px]">
                <div className="flex flex-col items-start justify-center gap-3">
                    <div className="flex items-center gap-3">
                        <img className="w-[34px]" src="/imgs/ticket.png" alt="" />
                        <span className="text-[#F9E813]">{ ticket.toLocaleString() }</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <img className="w-[30px]" src="/imgs/point.png" alt="" />
                        <span className="text-[#F9E813]">{ point.toLocaleString() }</span>
                    </div>
                </div>
                <img src="/imgs/earn.png" alt="" className="w-[100px]" />
            </div>
            <div className="w-full mt-[14px] relative flex justify-between items-center py-3 px-3 before:-z-10 before:content-[''] before:absolute before:inset-0 before:border before:border-transparent before:rounded-[15px] before:[background:linear-gradient(to_right,#C100FB,#00C8FF)_border-box] before:[-webkit-mask:linear-gradient(#fff_0_0)_padding-box,_linear-gradient(#fff_0_0)] before:[mask-composite:exclude]">
                <div className="flex items-center gap-3">
                    <img className="w-[34px]" src="/imgs/ticket.png" alt="" />
                    <div>
                        <div className="font-lemon text-[13px]"><span className="text-[#F9E813]">1</span> Ticket</div>
                        <div className="flex items-center gap-1">
                            <div className="font-poppins text-[12px]">1 ticket with <span className="ml-1 text-[#F9E813] text-[8px] font-press tracking-tighter">100</span> point</div>
                        </div>
                    </div>
                </div>
                <button disabled={false} onClick={() => handleSwapClick(100)} className="text-[#6D04A1] disabled:text-[#FFDD00] text-[8px] font-poppins font-semibold bg-[#FFDD00] disabled:bg-[#6D04A1] rounded-[5px] h-[25px] w-[69px] hover:-translate-y-1 hover:active:translate-y-0 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200">Swap</button>
            </div>
            <div className="w-full mt-[14px] relative flex justify-between items-center py-3 px-3 before:-z-10 before:content-[''] before:absolute before:inset-0 before:border before:border-transparent before:rounded-[15px] before:[background:linear-gradient(to_right,#C100FB,#00C8FF)_border-box] before:[-webkit-mask:linear-gradient(#fff_0_0)_padding-box,_linear-gradient(#fff_0_0)] before:[mask-composite:exclude]">
                <div className="flex items-center gap-3">
                    <img className="w-[34px]" src="/imgs/ticket.png" alt="" />
                    <div>
                        <div className="font-lemon text-[13px]"><span className="text-[#F9E813]">3</span> Ticket</div>
                        <div className="flex items-center gap-1">
                            <div className="font-poppins text-[12px]">3 ticket with <span className="ml-1 text-[#F9E813] text-[8px] font-press tracking-tighter">250</span> point</div>
                        </div>
                    </div>
                </div>
                <button disabled={false} onClick={() => handleSwapClick(250)} className="text-[#6D04A1] disabled:text-[#FFDD00] text-[8px] font-poppins font-semibold bg-[#FFDD00] disabled:bg-[#6D04A1] rounded-[5px] h-[25px] w-[69px] hover:-translate-y-1 hover:active:translate-y-0 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200">Swap</button>
            </div>
            <div className="w-full mt-[14px] relative flex justify-between items-center py-3 px-3 before:-z-10 before:content-[''] before:absolute before:inset-0 before:border before:border-transparent before:rounded-[15px] before:[background:linear-gradient(to_right,#C100FB,#00C8FF)_border-box] before:[-webkit-mask:linear-gradient(#fff_0_0)_padding-box,_linear-gradient(#fff_0_0)] before:[mask-composite:exclude]">
                <div className="flex items-center gap-3">
                    <img className="w-[34px]" src="/imgs/ticket.png" alt="" />
                    <div>
                        <div className="font-lemon text-[13px]"><span className="text-[#F9E813]">5</span> Ticket</div>
                        <div className="flex items-center gap-1">
                            <div className="font-poppins text-[12px]">5 ticket with <span className="ml-1 text-[#F9E813] text-[8px] font-press tracking-tighter">400</span> point</div>
                        </div>
                    </div>
                </div>
                <button disabled={false} onClick={() => handleSwapClick(400)} className="text-[#6D04A1] disabled:text-[#FFDD00] text-[8px] font-poppins font-semibold bg-[#FFDD00] disabled:bg-[#6D04A1] rounded-[5px] h-[25px] w-[69px] hover:-translate-y-1 hover:active:translate-y-0 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200">Swap</button>
            </div>
            {/* <div className="mt-6 w-full relative flex justify-between items-center p-[18px] bg-[#FF02A629] border border-[#C400FA] rounded-[15px]">
                <img src="/imgs/golden-hammer.png" alt="" className="w-[42px] h-[42px]" />
                <span className="font-poppins text-[14px]">1000 / 1000</span>
            </div>
            <div className="mt-2 w-full relative flex justify-between items-center p-[18px] bg-[#FF02A629] border border-[#C400FA] rounded-[15px]">
                <img src="/imgs/wooden-hammer.png" alt="" className="w-[42px] h-[42px]" />
                <span className="font-poppins text-[14px]">1000 / 1000</span>
            </div> */}
            <div className="absolute w-[500px] top-[80px] left-[20%] h-[500px] -z-50 rounded-full [background:radial-gradient(#00A6FF68_-30%,#00000000_50%)]" />
            <div className="absolute w-[500px] -top-[150px] -left-[60%] h-[500px] -z-50 rounded-full [background:radial-gradient(#00A6FF68_10%,#00000000_50%)]" />
            <Footer />
        </div>
    )
}

export default Shop;