import { useState, useEffect } from "react";
import { useInitData, useInvoice } from "@telegram-apps/sdk-react";
import { Modal, Placeholder, Button } from '@telegram-apps/telegram-ui';
import { toast } from "react-toastify";
import Countdown from 'react-countdown';

import Footer from "@/components/Footer";
import API from "@/libs/API";
// import Link from "@/components/Link";

const Shop = () => {
    const initData = useInitData();
    const invoice = useInvoice();

    const [ticket, setTicket] = useState(0);
    const [point, setPoint] = useState(0);
    const [items, setItems] = useState<any[]>([]);
    const [purchasedItem, setPurchasedItem] = useState<any>();
    const [endTime, setEndTime] = useState('');

    const [isModalOpen1, setModalOpen1] = useState(false);
    const [isModalOpen2, setModalOpen2] = useState(false);
    const [isModalOpen3, setModalOpen3] = useState(false);

    useEffect(() => {
        API.get('/play/boost/getall').then(res => {
            setItems(res.data.boosts);
        }).catch(err => {
            toast.error('Something went wrong.');
            console.error(err);
        });
        API.get(`/users/get/${initData?.user?.id}`).then(res => {
            setPoint(res.data.point);
            setTicket(res.data.ticket);
        }).catch(console.error);

        getMyBoostItem();
    }, []);

    const getMyBoostItem = () => {
        API.get(`/play/boost/getmy/${initData?.user?.id}`).then(res => {
            if (res.data.success) {
                setPurchasedItem(res.data.boost.item);
                setEndTime(res.data.boost?.endTime);
            }
        }).catch(console.error);
    }

    const handlePurchase = (item: any) => {
        API.post('/play/invoice', { userid: initData?.user?.id, boostid: item.boostid })
            .then(res => {
                console.log(res.data);
                invoice.open(res.data.link, 'url').then(invoiceRes => {
                    console.log("invoice res=", invoiceRes);
                    if (invoiceRes === 'paid') {
                        getMyBoostItem();
                    } else {
                        toast.error('Something went wrong.');
                    }
                });
            }).catch(err => {
                console.error(err);
                toast.error(err.message);
            });
    }

    const handleSwapClick = (points: number) => {
        setModalOpen1(false);
        setModalOpen2(false);
        setModalOpen3(false);
        API.post('/play/swap', { userid: initData?.user?.id, point: points })
            .then(res => {
                if (res.data.success) {
                    toast('You got tickets.');
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
                        <span className="text-[#F9E813]">{ticket.toLocaleString()} <small>tickets</small></span>
                    </div>
                    <div className="flex items-center gap-3">
                        <img className="w-[30px]" src="/imgs/point.png" alt="" />
                        <span className="text-[#F9E813]">{point.toLocaleString()} <small>coins</small></span>
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
                <Modal
                    header={<Modal.Header />}
                    trigger={<button onClick={() => setModalOpen1(true)} className="text-[#6D04A1] disabled:text-[#FFDD00] text-[8px] font-poppins font-semibold bg-[#FFDD00] disabled:bg-[#6D04A1] rounded-[5px] h-[25px] w-[69px] hover:-translate-y-1 hover:active:translate-y-0 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200">Swap</button>}
                    open={isModalOpen1}
                    onOpenChange={setModalOpen1}
                >
                    <Placeholder
                        header={<span className="text-black dark:text-white">Are you sure?</span>}
                        action={<Button onClick={() => handleSwapClick(100)} size="m" stretched>Yes, I'm sure!</Button>}
                    />
                </Modal>
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
                <Modal
                    header={<Modal.Header />}
                    trigger={<button onClick={() => setModalOpen2(true)} className="text-[#6D04A1] disabled:text-[#FFDD00] text-[8px] font-poppins font-semibold bg-[#FFDD00] disabled:bg-[#6D04A1] rounded-[5px] h-[25px] w-[69px] hover:-translate-y-1 hover:active:translate-y-0 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200">Swap</button>}
                    open={isModalOpen2}
                    onOpenChange={setModalOpen2}
                >
                    <Placeholder
                        header={<span className="text-black dark:text-white">Are you sure?</span>}
                        action={<Button onClick={() => handleSwapClick(250)} size="m" stretched>Yes, I'm sure!</Button>}
                    />
                </Modal>
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
                <Modal
                    header={<Modal.Header />}
                    trigger={<button onClick={() => setModalOpen3(true)} className="text-[#6D04A1] disabled:text-[#FFDD00] text-[8px] font-poppins font-semibold bg-[#FFDD00] disabled:bg-[#6D04A1] rounded-[5px] h-[25px] w-[69px] hover:-translate-y-1 hover:active:translate-y-0 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200">Swap</button>}
                    open={isModalOpen3}
                    onOpenChange={setModalOpen3}
                >
                    <Placeholder
                        header={<span className="text-black dark:text-white">Are you sure?</span>}
                        action={<Button onClick={() => handleSwapClick(400)} size="m" stretched>Yes, I'm sure!</Button>}
                    />
                </Modal>
            </div>
            <h1 className="mt-6 font-margarine text-[34px] text-center leading-none">Boost hammer</h1>
            {items.map((item, key) =>
                <div key={key} className="mt-3 w-full relative flex justify-between items-center px-3 py-3 bg-[#FF02A629] border border-[#C400FA] rounded-[15px]">
                    <div className="flex flex-1 gap-2">
                        <img src={`/imgs/${item.boostid}.png`} alt="" className="w-[42px] h-[42px]" />
                        <div className="flex flex-col justify-center">
                            <div className="flex items-end justify-between">
                                <div className="font-lemon text-[13px]">{item.title}</div>
                                {purchasedItem && purchasedItem._id === item._id ? <Countdown date={endTime} intervalDelay={1000} precision={3} onComplete={() => setPurchasedItem(null)} renderer={(props) => <span className="font-poppins text-[10px] text-[#F9E813]">{props.days ? props.days.toString() + 'd' : ''} {props.hours.toString()} : {props.minutes.toString().padStart(2, '0')} : {props.seconds.toString().padStart(2, '0')}</span>} /> : null}
                            </div>
                            <div className="font-poppins text-[8px]">{item.description}</div>
                        </div>
                    </div>
                    {purchasedItem ? null : <button onClick={() => handlePurchase(item)} className="flex items-center justify-center gap-1 bg-[#FFDD00] rounded-[5px] h-[25px] w-[60px] hover:-translate-y-1 hover:active:translate-y-0 transition-all duration-200">
                        <img src="/imgs/star.png" className="w-3 h-3" alt="" />
                        <span className="text-blue-400">{item.price}</span>
                    </button>}
                </div>
            )}
            <div className="absolute w-[500px] top-[80px] left-[20%] h-[500px] -z-50 rounded-full [background:radial-gradient(#00A6FF68_-30%,#00000000_50%)]" />
            <div className="absolute w-[500px] -top-[150px] -left-[60%] h-[500px] -z-50 rounded-full [background:radial-gradient(#00A6FF68_10%,#00000000_50%)]" />
            <Footer />
        </div>
    )
}

export default Shop;