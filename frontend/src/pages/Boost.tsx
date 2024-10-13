import { useState, useEffect } from 'react';
import { useInitData } from '@telegram-apps/sdk-react';
import { useTonWallet, useTonConnectUI, CHAIN } from '@tonconnect/ui-react';
import { toast } from 'react-toastify';
import Countdown from 'react-countdown';

import API from '@/libs/API';
import Footer from "@/components/Footer";
import { OWNER_ADDRESS, IS_MAINNET } from "@/libs/constants";

const Boost = () => {
    const initData = useInitData();

    const wallet = useTonWallet();
    const [tonConnectUI, ] = useTonConnectUI();

    const [items, setItems] = useState<any>([]);
    // const [totalPrice, setTotalPrice] = useState({usersCount: 0, price: 0});
    // const [totalUsers, setTotalUsers] = useState(0);
    const [purchasedItem, setPurchasedItem] = useState<any>();
    const [endTime, setEndTime] = useState(0);

    useEffect(() => {
        API.get('/play/boost/getall').then(res => {
                setItems(res.data.boosts);
            }).catch(err => {
                toast.error('Something went wrong.');
                console.error(err);
            });
        API.get('/play/boost/getmy/' + initData?.user?.id).then(res => {
                if (res.data.success) {
                    setPurchasedItem(res.data.boost.item);
                    setEndTime(res.data.boost.endTime);
                }
                if (res.data.success || res.data.status == 'noboost') {
                    // setTotalPrice(res.data.total);
                }
            }).catch(err => {
                toast.error('Something went wrong.');
                console.error(err);
            });
    }, []);

    useEffect(() => {
        if (!wallet) return;
        if (tonConnectUI?.wallet?.account.chain !== CHAIN.MAINNET) {
            console.log("You're not in mainnet.");
        }
    }, [wallet]);

    const handleConnectWallet = () => {
        if (wallet) tonConnectUI.disconnect();
        else tonConnectUI.openModal();
    }

    const handlePayment = (item: any) => {
        if (!wallet) return handleConnectWallet();
        const amount = (item.price * Math.pow(10, 9)).toString();
        tonConnectUI.sendTransaction({
                validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
                network: IS_MAINNET ? CHAIN.MAINNET : CHAIN.TESTNET,
                messages: [
                    {
                        address: OWNER_ADDRESS,
                        amount: amount,
                    }
                ]
            }).then(res => {
                console.log('Transaction success:', res);
                return API.post('users/boost/purchase', { userid: initData?.user?.id, boostid: item._id });
            }).then(res => {
                if (res.data.success) {
                    toast(res.data.msg);
                    setPurchasedItem(items?.find((i: any) => i._id === item._id));
                    setEndTime(res.data.boost.endTime);
                    // setTotalUsers(prev => prev + 1);
                    // setTotalPrice(prev => prev + res.data.boost.item.price);
                } else {
                    toast.error(res.data.msg);
                }
            }).catch(err => {
                toast.error('Something went wrong.');
                console.error(err);
            });
    }

    return (
        <div className="px-[43px] w-screen flex flex-col items-center overflow-y-auto pt-[6px] pb-[100px]">
            <h1 className="font-margarine text-[34px] text-center ">Boost</h1>
            <img src="/imgs/boost.png" alt="" className="w-[198px] h-[204px]" />
            {
                items.map((item: any, key: number) => (
                <div key={key} className="mt-6 w-full relative flex items-center gap-[6px] px-[14px] py-[18px] bg-[#FF02A629] border border-[#C400FA] rounded-[15px]">
                    <img src="/imgs/rocket-vector.png" alt="" className="w-[42px] h-[42px]" />
                    <div className="flex-1">
                        <div className="font-lemon text-[13px] tracking-tighter">{ item.name }</div>
                        <div className="flex justify-between">
                            <p className="font-poppins text-[8px] w-[150px]">{ item.title }</p>
                            {
                                purchasedItem ? 
                                <button onClick={() => handlePayment(item)} className="w-[45px] h-[18px] rounded-[6px] bg-gradient-to-b from-[#6700B0] to-[#00BFE1] font-poppins font-bold text-[6px]">
                                    { purchasedItem._id === item._id ? <Countdown date={endTime} intervalDelay={1000} precision={3} onComplete={() => setPurchasedItem(null)} renderer={(props) => <span>{props.days ? props.days.toString() + 'd' : ''} {props.hours.toString()} : {props.minutes.toString().padStart(2, '0')} : {props.seconds.toString().padStart(2, '0')}</span>} /> : '---' }
                                </button> :
                                <button onClick={() => handlePayment(item)} className="w-[45px] h-[18px] rounded-[6px] bg-gradient-to-b from-[#6700B0] to-[#00BFE1] font-poppins font-bold text-[6px]">Claim</button>
                            }
                        </div>
                    </div>
                </div>))
            }

            <div className="absolute w-[500px] top-[80px] left-[30%] h-[500px] -z-50 rounded-full [background:radial-gradient(#00A6FF68_-30%,#00000000_50%)]" />
            <div className="absolute w-[500px] -top-[150px] -left-[60%] h-[500px] -z-50 rounded-full [background:radial-gradient(#00A6FF68_10%,#00000000_50%)]" />
            <Footer />
        </div>
    )
}

export default Boost;