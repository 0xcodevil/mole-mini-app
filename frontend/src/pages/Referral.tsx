import { useState, useEffect, Fragment } from 'react';
import { useInitData, useUtils } from "@telegram-apps/sdk-react";
import { useTonWallet, useTonConnectModal } from '@tonconnect/ui-react';

import API from "@/libs/API";
import Footer from "@/components/Footer";
import Link from "@/components/Link";
import { LINK, PLATFORM } from "@/libs/constants";
import { toast } from 'react-toastify';
import { Modal, Placeholder, Button } from '@telegram-apps/telegram-ui';

const Referral = () => {
    const utils = useUtils();
    const initData = useInitData();
    const wallet = useTonWallet();
    const { open } = useTonConnectModal();

    const [isConnectedWallet, setConnectedWallet] = useState(false);
    // const [dailyRemainSecond, setDailyRemainSecond] = useState(0);
    const [isJoinedTelegramGroup, setJoinedTelegramGroup] = useState(false);
    const [isJoinedTelegramChannel, setJoinedTelegramChannel] = useState(false);
    // const [isFollowingYouTube, setFollowingYouTube] = useState(false);
    // const [isFollowingX, setFollowingX] = useState(false);
    // const [isInviteFive, setInviteFive] = useState(false);
    // const [dailyReward, setDailyReward] = useState(100);

    const handleConnectWallet = () => {
        if (isConnectedWallet) return;
        if (wallet) {
            API.post(`/users/connect_wallet`, { userid: initData?.user?.id }).then(res => {
                if (res.data.success) {
                    setConnectedWallet(true);
                    toast.success(res.data.msg);
                } else toast.error(res.data.msg);
            }).catch(console.error)
        } else {
            open();
        }
    }


    useEffect(() => {
        API.get(`/users/get/${initData?.user?.id}`).then(res => {
            // setFollowingX(res.data.xFollowed);
            // setFollowingYouTube(res.data.youtubeSubscribed);
            setJoinedTelegramChannel(res.data.telegramChannelJoined);
            setJoinedTelegramGroup(res.data.telegramGroupJoined);
            // setInviteFive(res.data.inviteFive);
        }).catch(console.error);
        // handleClaimDailyReward();
    }, [initData]);

    // const handleClaimDailyReward = (status = 0) => {
    //     API.post(`/users/claim/daily`, { userid: initData?.user?.id, status }).then(res => {
    //         if (res.data.success) {
    //             setDailyRemainSecond(res.data.ms);
    //             setDailyReward(res.data.reward);
    //             if (res.data.status == 'success') {
    //                 toast.success('Claimed successfully.');
    //             }
    //         } else {
    //             toast.error(res.data.msg);
    //         }
    //     }).catch(console.error);
    // }

    const handleJoinTelegramGroup = () => {
        API.post('/users/jointg', {
            userid: initData?.user?.id,
            type: 'group'
        }).then(res => {
            if (res.data.success) {
                setJoinedTelegramGroup(true);
                // setOpenGroupModal(false);
                toast.success(res.data.msg);
            }
            else toast.error(res.data.msg);
        }).catch(console.error);
    }

    const handleJoinTelegramChannel = () => {
        API.post('/users/jointg', {
            userid: initData?.user?.id,
            type: 'channel'
        }).then(res => {
            if (res.data.success) {
                setJoinedTelegramChannel(true);
                // setOpenChannelModal(false);
                toast.success(res.data.msg);
            }
            else toast.error(res.data.msg);
        }).catch(console.error);
    }

    // const handleFollowX = () => {
    //     API.post('/users/followx', { userid: initData?.user?.id, username: initData?.user?.username }).then(res => {
    //         if (res.data.success) {
    //             setFollowingX(true);
    //             // setOpenFollowXModal(false);
    //             toast.success(res.data.msg);
    //         }
    //         else toast.error(res.data.msg);
    //     }).catch(console.error);
    // }

    // const handleFollowYoutube = () => {
    //     API.post('/users/subscribe_youtube', { userid: initData?.user?.id, username: initData?.user?.username }).then(res => {
    //         if (res.data.success) {
    //             setFollowingYouTube(true);
    //             // setOpenRetweetXModal(false);
    //             toast.success(res.data.msg);
    //         }
    //         else toast.error(res.data.msg);
    //     }).catch(console.error);
    // }

    const handleTGGroupLink = () => {
        utils.openTelegramLink(LINK.TELEGRAM_GROUP);
    }

    const handleTGChannelLink = () => {
        utils.openTelegramLink(LINK.TELEGRAM_CHANNEL);
    }

    const handleXLink = () => {
        API.post('/users/follow', { userid: initData?.user?.id, platform: PLATFORM.X }).catch(console.error);
        utils.openLink(LINK.X);
    }

    const handleYoutubeLink = () => {
        API.post('/users/follow', { userid: initData?.user?.id, platform: PLATFORM.YOUTUBE }).catch(console.error);
        utils.openLink(LINK.YOUTUBE);
    }

    // const handleInviteFiveFriends = () => {
    //     API.post('/users/invite/task', { userid: initData?.user?.id, count: 5 }).then(res => {
    //         if (res.data.success) {
    //             setInviteFive(true);
    //         } else {
    //             toast.error(res.data.msg);
    //         }
    //     }).catch(console.error);
    // }

    return (
        <div className="px-[41px] pb-[100px] overflow-y-auto">
            <div className="flex flex-col items-center mt-[6px]">
                <div className="font-margarine text-[34px]">Earn More Coins</div>
                <div className="font-madimi text-transparent bg-clip-text bg-[linear-gradient(to_right,#00D0FF,#FFDD00,#D400FF,#FF0099)]">Make our tasks to get more coins</div>
            </div>
            <div className="mt-[14px] relative flex justify-between items-center py-5 px-3 before:-z-10 before:content-[''] before:absolute before:inset-0 before:border before:border-transparent before:rounded-[15px] before:[background:linear-gradient(to_right,#C100FB,#00C8FF)_border-box] before:[-webkit-mask:linear-gradient(#fff_0_0)_padding-box,_linear-gradient(#fff_0_0)] before:[mask-composite:exclude]">
                <div className="flex items-center gap-3">
                    <img className="w-[34px] h-[34px]" src="/imgs/wallet.png" alt="" />
                    <div>
                        <div className="font-lemon text-[13px]">Wallet Connect</div>
                        <div className="flex items-center gap-1">
                            <div className="font-poppins text-[12px]">Get Reward <span className="ml-1 text-[#F9E813] text-[8px] font-press">100 Token</span></div>
                        </div>
                    </div>
                </div>
                <button onClick={handleConnectWallet} className="text-[#6D04A1] text-[8px] font-poppins font-semibold bg-[#FFDD00] rounded-[5px] h-[25px] w-[69px]">Redeem</button>
            </div>
            <div className="mt-[14px] relative flex justify-between items-center py-5 px-3 before:-z-10 before:content-[''] before:absolute before:inset-0 before:border before:border-transparent before:rounded-[15px] before:[background:linear-gradient(to_right,#C100FB,#00C8FF)_border-box] before:[-webkit-mask:linear-gradient(#fff_0_0)_padding-box,_linear-gradient(#fff_0_0)] before:[mask-composite:exclude]">
                <div className="flex items-center gap-3">
                    <img className="w-[27px] h-[27px]" src="/imgs/telegram.png" alt="" />
                    <div>
                        <div className="font-lemon text-[13px]">Join our TG Chat</div>
                        <div className="flex items-center gap-1">
                            <div className="font-poppins text-[12px]">Get Reward <span className="ml-1 text-[#F9E813] text-[8px] font-press">300 Token</span></div>
                        </div>
                    </div>
                </div>
                <Modal
                    header={<Modal.Header />}
                    trigger={<button disabled={isJoinedTelegramGroup} className="text-[#6D04A1] text-[8px] font-poppins font-semibold bg-[#FFDD00] rounded-[5px] h-[25px] w-[69px]">Redeem</button>}
                >
                    <Placeholder
                        header="Follow TG Chat"
                        action={
                            <Fragment>
                                <Button onClick={handleTGGroupLink} size="m" stretched>Follow</Button>
                                <Button onClick={handleJoinTelegramGroup} size="m" stretched>Check now</Button>
                            </Fragment>
                        }
                    />
                </Modal>
            </div>
            <div className="mt-[14px] relative flex justify-between items-center py-5 px-3 before:-z-10 before:content-[''] before:absolute before:inset-0 before:border before:border-transparent before:rounded-[15px] before:[background:linear-gradient(to_right,#C100FB,#00C8FF)_border-box] before:[-webkit-mask:linear-gradient(#fff_0_0)_padding-box,_linear-gradient(#fff_0_0)] before:[mask-composite:exclude]">
                <div className="flex items-center gap-3">
                    <img className="w-[26px] h-[26px]" src="/imgs/twitter.png" alt="" />
                    <div>
                        <div className="font-lemon text-[13px]">Join our TG channel</div>
                        <div className="flex items-center gap-1">
                            <div className="font-poppins text-[12px]">Get Reward <span className="ml-1 text-[#F9E813] text-[8px] font-press">500 Token</span></div>
                        </div>
                    </div>
                </div>
                <Modal
                    header={<Modal.Header />}
                    trigger={<button disabled={isJoinedTelegramChannel} className="text-[#6D04A1] text-[8px] font-poppins font-semibold bg-[#FFDD00] rounded-[5px] h-[25px] w-[69px]">Redeem</button>}
                >
                    <Placeholder
                        header="Join our TG channel"
                        action={
                            <Fragment>
                                <Button onClick={handleTGChannelLink} size="m" stretched>Join</Button>
                                <Button onClick={handleJoinTelegramChannel} size="m" stretched>Complete</Button>
                            </Fragment>
                        }
                    />
                </Modal>
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