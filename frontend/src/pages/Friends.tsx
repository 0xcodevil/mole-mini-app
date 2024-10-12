import {useState, useEffect} from 'react';
import { useInitData, useUtils } from "@telegram-apps/sdk-react";
import { toast } from 'react-toastify';

import { LINK } from "@/libs/constants";
import API from "@/libs/API";
import Avatar from '@/components/Avatar';
import Footer from "@/components/Footer";

const Friends = () => {
    
    const initData = useInitData();
    const utils = useUtils();
    const [friends, setFriends] = useState<any[]>([]);
    useEffect(() => {
        fetch();
    }, [initData]);

    const fetch = () => {
        API.get('/users/friends/' + initData?.user?.id)
            .then(res => {
                setFriends(res.data.friends);
            }).catch(err => console.error(err.message));
    }

    const handleClickInviteLink = () => {
        const link = LINK.TELEGRAM_MINIAPP + '?start=' + initData?.user?.id;
        const shareText = 'Join our telegram mini app.';
        const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(shareText)}`;
        utils.openTelegramLink(fullUrl);
    }

    const handleInviteLinkCopyButton = () => {
        const link = LINK.TELEGRAM_MINIAPP + '?start=' + initData?.user?.id;
        navigator.clipboard.writeText(link)
            .then(() => toast('Invite link copied!'))
            .catch();
    }

    return (
        <div className="px-[43px] pb-[100px] overflow-y-auto">
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
                        <div className="font-poppins text-[12px]">+1 000 for you and your friend</div>
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
                        <div className="font-poppins text-[12px]">+2 000 for you and your friend</div>
                    </div>
                </div>
            </div>
            <div className="mt-[25px] relative flex p-[10px] bg-[#FF02A629] rounded-[15px] gap-3 before:content-[''] before:absolute before:inset-0 before:border before:border-transparent before:rounded-[15px] before:[background:linear-gradient(to_right,#C100FB,#00C8FF)_border-box] before:[-webkit-mask:linear-gradient(#fff_0_0)_padding-box,_linear-gradient(#fff_0_0)] before:[mask-composite:exclude] before:-z-10">
                <button className="w-full h-[45px] rounded-[8px] font-lemon text-[14px] bg-[#C100FB80]">Become a referral</button>
            </div>
            <h1 className="font-margarine text-[28px] mt-9 text-center">List of your friends</h1>
            <div className="relative rounded-[15px] bg-[#FF02A629] border mt-[72px] border-[#E600FF] pt-[30px] pb-3">
                <img src="/imgs/home.png" alt="" className="w-[90px] h-[89px] absolute top-0 right-1/2 translate-x-1/2 -translate-y-[65px]" />
                <img onClick={fetch} className="cursor-pointer w-[14px] h-[14px] absolute top-3 right-3" src="/imgs/refresh.png" alt="" />
                <div className="mt-2 max-h-[150px] px-2 flex flex-col gap-2 overflow-y-auto">
                    { friends.map((u, key) => (
                        <div key={key} className="flex items-center gap-2">
                            <Avatar userid={u.userid} width={32} height={32} username={u.username} />
                            <div className="flex flex-col justify-center gap-[6px] leading-none">
                                <div className="text-[12px] font-lemon">{ u.firstname }</div>
                                <div className="text-[10px]">{ u.point.toLocaleString() } coins</div>
                            </div>
                        </div>
                    )) }
                </div>
                <div className="flex justify-center gap-2 mt-3">
                    <button onClick={handleClickInviteLink} className="w-[100px] h-[31px] rounded-[9px] bg-white font-poppins text-[10px] text-[#590B78]">Invite a friend</button>
                    <button onClick={handleInviteLinkCopyButton} className="flex items-center justify-center w-[34px] h-[31px] rounded-[9px] bg-white">
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