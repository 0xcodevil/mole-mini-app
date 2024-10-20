import { useState, useEffect, Fragment } from 'react';
import { useInitData, useUtils } from "@telegram-apps/sdk-react";
import { useTonWallet, useTonConnectModal, useTonAddress } from '@tonconnect/ui-react';
import Countdown from 'react-countdown';

import API from "@/libs/API";
import Footer from "@/components/Footer";
import { toast } from 'react-toastify';
import { Modal, Placeholder, Button } from '@telegram-apps/telegram-ui';

const Referral = () => {
    const utils = useUtils();
    const wallet_address = useTonAddress();
    const initData = useInitData();
    const wallet = useTonWallet();
    const { open } = useTonConnectModal();

    const [tab, setTab] = useState<'earn' | 'daily' | 'channel' | 'project'>('earn');
    const [referrals, setReferrals] = useState<any[]>([]);
    const [myReferrals, setMyReferrals] = useState<any[]>([]);

    const [dailyRemainSecond, setDailyRemainSecond] = useState(0);
    const [dailyReward, setDailyReward] = useState(500);

    useEffect(() => {
        API.get('/users/task/getall').then(res => {
            setReferrals(res.data.referrals);
        }).catch(console.log);
        getMyTaskList();

        handleClaimDailyReward();
    }, [initData]);
    const getMyTaskList = () => {
        API.get(`/users/task/getmy/${initData?.user?.id}`).then(res => {
            setMyReferrals(res.data.myReferrals);
        }).catch(console.log);
    }
    const handleClaimDailyReward = (status = 0) => {
        API.post(`/users/claim/daily`, { userid: initData?.user?.id, status }).then(res => {
            if (res.data.success) {
                setDailyRemainSecond(res.data.ms);
                setDailyReward(res.data.reward);
                if (res.data.status == 'success') {
                    toast('Claimed successfully.');
                }
            } else {
                toast.error(res.data.msg);
            }
        }).catch(console.error);
    }

    const handlePartner = (referral: any, myReferral: any) => {
        if(myReferral && myReferral.finished) {
            return;
        }
        if(referral.type == 'partner_tg_channel' || referral.type == 'partner_tg_bot') {
            utils.openTelegramLink(referral.url);
        } else if(referral.type == 'partner_social') {
            utils.openLink(referral.url);
        }
        
        API.post(`/users/task/do`, { userid: initData?.user?.id, linkid: referral.linkid }).then(() => {
            myRefferalTaskCheck(referral.linkid);
        }).catch(console.error)
    }
    const handleMyRefferalLink = (linkid: string) => {
        const myReferral = myReferrals.find(ref => ref.item.linkid === linkid);
        if(myReferral && myReferral.finished) {
            return;
        }

        if(linkid == 'wallet') {
            if(wallet) {
                myRefferalTaskCheck(linkid, wallet_address);
                return;
            } else {
                open();
                myRefferalTaskDo(linkid);
            }
        } else if(linkid == 'onion_tg_channel') {
            // setOpenChannelModal(true);
        } else if(linkid == 'onion_x_follow') {
            // setOpenFollowXModal(true);
        } else if(linkid == 'onion_x_retweet') {
            // setOpenRetweetXModal(true);
        }
    }
    const myRefferalTaskDo = (linkid: string) => {
        API.post(`/users/task/do`, { userid: initData?.user?.id, linkid }).catch(console.error)
    }
    const myRefferalTaskCheck = (linkid: string, payload = '') => {
        API.post(`/users/task/check`, { userid: initData?.user?.id, linkid, payload }).then(res => {
            if (res.data.success) {
                getMyTaskList();
                toast.success(res.data.msg);
            } else toast.error(res.data.msg);
        }).catch(console.error)
    }
    const myReferralComponent = (linkid: string, btnTitle = "Reddem") => {
        const referral = referrals.find(ref => ref.linkid === linkid);
        if(!referral) {
            return '';
        }
        const myReferral = myReferrals.find(ref => ref.item.linkid === linkid);

        if(linkid == 'wallet') {
            if(myReferral && myReferral.finished) {
                btnTitle = "Connected";
            } else if(!wallet) {
                btnTitle = "Connect";
            }
        }
        return (
            <div className="mt-[14px] relative flex justify-between items-center py-5 px-3 before:-z-10 before:content-[''] before:absolute before:inset-0 before:border before:border-transparent before:rounded-[15px] before:[background:linear-gradient(to_right,#C100FB,#00C8FF)_border-box] before:[-webkit-mask:linear-gradient(#fff_0_0)_padding-box,_linear-gradient(#fff_0_0)] before:[mask-composite:exclude]">
                <div className="flex items-center gap-3">
                    <img className="w-[34px] h-[34px]" src={`/imgs/${referral.logo}`} alt="" />
                    <div>
                        <div className="font-lemon text-[13px]">{referral.title}</div>
                        <div className="flex items-center gap-1">
                            <div className="font-poppins text-[12px]">Get Reward <span className="ml-1 text-[#F9E813] text-[8px] font-press">{referral.bonus.toLocaleString()} Coins</span></div>
                        </div>
                    </div>
                </div>
                {linkid == 'wallet' && <button disabled={myReferral && myReferral.finished} onClick={() => handleMyRefferalLink(linkid)} className="text-[#6D04A1] disabled:text-[#FFDD00] text-[8px] font-poppins font-semibold bg-[#FFDD00] disabled:bg-[#6D04A1] rounded-[5px] h-[25px] w-[69px] hover:-translate-y-1 hover:active:translate-y-0 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200">{btnTitle}</button>}
                {linkid != 'wallet' && <Modal
                    header={<Modal.Header />}
                    trigger={<button disabled={myReferral && myReferral.finished} className="text-[#6D04A1] disabled:text-[#FFDD00] text-[8px] font-poppins font-semibold bg-[#FFDD00] disabled:bg-[#6D04A1] rounded-[5px] h-[25px] w-[69px] hover:-translate-y-1 hover:active:translate-y-0 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200">{btnTitle}</button>}
                >
                    <Placeholder
                        header={<span className="text-[28px] font-lemon text-transparent bg-clip-text bg-gradient-to-b from-[#C100FB80] to-[#00C8FF] border-none leading-none">{referral.title}</span>}
                        action={
                            <Fragment>
                                <Button onClick={() => {
                                    if(referral.type == 'social') {
                                        utils.openLink(referral.url);
                                    } else {
                                        utils.openTelegramLink(referral.url);
                                    }
                                    myRefferalTaskDo(linkid);
                                }} size="m" stretched>Join</Button>
                                <Button onClick={()=> {myRefferalTaskCheck(linkid);}} size="m" stretched>Complete</Button>
                            </Fragment>
                        }
                    />
                </Modal>}
            </div>
        );
    }

    return (
        <div className="w-screen pb-[100px] overflow-y-auto">
            <div className="flex flex-col items-center mt-[6px]">
                <div className="font-margarine text-[34px]">Earn More Coins</div>
                <div className="font-madimi text-transparent bg-clip-text bg-[linear-gradient(to_right,#00D0FF,#FFDD00,#D400FF,#FF0099)]">Make our tasks to get more coins</div>
            </div>
            <div className="relative flex text-[12px] my-[20px] text-center leading-none">
                <div className={`w-[41px] border-[#880077] border-b ${tab === 'earn' ? 'border-r rounded-br-lg' : ''}`} />
                <div onClick={() => setTab('earn')} className={`flex-1 border-[#880077] cursor-pointer py-2 ${tab === 'earn' ? 'border-t' : 'border-b'} ${tab === 'daily' ? 'border-r rounded-br-lg' : ''}`}>Earn more coins</div>
                <div onClick={() => setTab('daily')} className={`flex-1 border-[#880077] cursor-pointer py-2 ${tab === 'daily' ? 'border-t' : 'border-b'} ${tab === 'earn' ? 'border-l rounded-bl-lg' : ''} ${tab === 'channel' ? 'border-r rounded-br-lg' : ''}`}>Daily<br />tasks</div>
                <div onClick={() => setTab('channel')} className={`flex-1 border-[#880077] cursor-pointer py-2 ${tab === 'channel' ? 'border-t' : 'border-b'} ${tab === 'daily' ? 'border-l rounded-bl-lg' : ''} ${tab === 'project' ? 'border-r rounded-br-lg' : ''}`}>Partner channel</div>
                <div onClick={() => setTab('project')} className={`flex-1 border-[#880077] cursor-pointer py-2 ${tab === 'project' ? 'border-t' : 'border-b'} ${tab === 'channel' ? 'border-l rounded-bl-lg' : ''}`}>Partner project</div>
                <div className={`w-[41px] border-[#880077] border-b ${tab === 'project' ? 'border-l rounded-bl-lg' : ''}`} />
                <img src="/imgs/mole.png" alt="" className="absolute bottom-0 right-0 w-16 h-20" />
            </div>
            <div className={`px-[41px] ${tab === 'earn' ? '' : 'hidden'}`}>
                { myReferralComponent('wallet') }
                { myReferralComponent('mole_tg_channel') }
                { myReferralComponent('mole_x_follow') }
            </div>
            <div className={`px-[41px] ${tab === 'daily' ? '' : 'hidden'}`}>
                <div className="mt-3 w-full relative flex items-center gap-[7px] pl-[21px] py-[15px] pr-[9px] bg-[#FF02A629] border border-[#C400FA] rounded-[15px]">
                    <img src="/imgs/reward.png" alt="" className="w-[48px] h-[48px]" />
                    <div className="flex-1">
                        <div className="flex justify-between">
                            <div className="font-lemon text-[13px]">Daily Reward</div>
                            <div className="flex gap-[7px]">
                                <button className="flex items-center justify-center gap-1 w-[59px] h-[25px] rounded-[6px] bg-[#FEFEFE33]">
                                    <img src="/imgs/coin.png" alt="" className="w-[8px]" />
                                    <span className="font-poppins font-bold text-[10px]">+{dailyReward}</span>
                                </button>
                                {
                                    dailyRemainSecond > 0 ?
                                        <button disabled={true} className="w-[59px] h-[25px] rounded-[6px] bg-gradient-to-b from-[#6700B0] to-[#00BFE1] font-poppins font-bold text-[10px]">
                                            <Countdown date={Date.now() + dailyRemainSecond} intervalDelay={1000} precision={3} onComplete={() => setDailyRemainSecond(0)} renderer={(props) => <span>{props.hours.toString().padStart(2, '0')} : {props.minutes.toString().padStart(2, '0')} : {props.seconds.toString().padStart(2, '0')}</span>} />
                                        </button> :
                                        <button onClick={() => handleClaimDailyReward(1)} className="w-[59px] h-[25px] rounded-[6px] bg-gradient-to-b from-[#6700B0] to-[#00BFE1] font-poppins font-bold text-[10px]">Claim</button>
                                }
                            </div>
                        </div>
                        <div className="font-poppins text-[8px]">Each day brings you more coins</div>
                    </div>
                </div>
                { myReferralComponent('mole_x_retweet') }
            </div>
            <div className={`px-[41px] ${tab === 'channel' ? '' : 'hidden'}`}>
                {
                    referrals.filter((referral) => referral.type === 'partner_tg_channel' || referral.type === 'partner_social').map((referral, index) => {
                        const myReferral = myReferrals.find(ref => ref.item.linkid === referral.linkid);
                        return (
                        <div key={index} className="mt-[14px] relative flex justify-between items-center py-5 px-3 before:-z-10 before:content-[''] before:absolute before:inset-0 before:border before:border-transparent before:rounded-[15px] before:[background:linear-gradient(to_right,#C100FB,#00C8FF)_border-box] before:[-webkit-mask:linear-gradient(#fff_0_0)_padding-box,_linear-gradient(#fff_0_0)] before:[mask-composite:exclude]">
                            <div className="flex items-center gap-3">
                                <img className="w-[26px] h-[26px]" src={`/imgs/referral/${referral.logo}`} alt="" />
                                <div>
                                    <div className="font-lemon text-[13px]">{referral.title}</div>
                                    <div className="flex items-center gap-1">
                                        <div className="font-poppins text-[12px]">Get Reward <span className="ml-1 text-[#F9E813] text-[8px] font-press">{referral.bonus.toLocaleString()} Coins</span></div>
                                    </div>
                                </div>
                            </div>
                            <button disabled={myReferral && myReferral.finished} onClick={() => handlePartner(referral, myReferral)} className="text-[#6D04A1] disabled:text-[#FFDD00] text-[8px] font-poppins font-semibold bg-[#FFDD00] disabled:bg-[#6D04A1] rounded-[5px] h-[25px] w-[69px] hover:-translate-y-1 hover:active:translate-y-0 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200">Redeem</button>
                        </div>
                    )})
                }
            </div>
            <div className={`px-[41px] ${tab === 'project' ? '' : 'hidden'}`}>
                {
                    referrals.filter((referral) => referral.type === 'partner_tg_bot').map((referral, index) => {
                        const myReferral = myReferrals.find(ref => ref.item.linkid === referral.linkid);
                        return (
                        <div key={index} className="mt-[14px] relative flex justify-between items-center py-5 px-3 before:-z-10 before:content-[''] before:absolute before:inset-0 before:border before:border-transparent before:rounded-[15px] before:[background:linear-gradient(to_right,#C100FB,#00C8FF)_border-box] before:[-webkit-mask:linear-gradient(#fff_0_0)_padding-box,_linear-gradient(#fff_0_0)] before:[mask-composite:exclude]">
                            <div className="flex items-center gap-3">
                                <img className="w-[26px] h-[26px]" src={`/imgs/referral/${referral.logo}`} alt="" />
                                <div>
                                    <div className="font-lemon text-[13px]">{referral.title}</div>
                                    <div className="flex items-center gap-1">
                                        <div className="font-poppins text-[12px]">Get Reward <span className="ml-1 text-[#F9E813] text-[8px] font-press">{referral.bonus.toLocaleString()} Coins</span></div>
                                    </div>
                                </div>
                            </div>
                            <button disabled={myReferral && myReferral.finished} onClick={() => handlePartner(referral, myReferral)} className="text-[#6D04A1] disabled:text-[#FFDD00] text-[8px] font-poppins font-semibold bg-[#FFDD00] disabled:bg-[#6D04A1] rounded-[5px] h-[25px] w-[69px] hover:-translate-y-1 hover:active:translate-y-0 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200">Redeem</button>
                        </div>
                    )})
                }
            </div>
            <div className="absolute w-[500px] top-[50px] left-[20%] h-[500px] -z-50 rounded-full [background:radial-gradient(#00A6FF68_0%,#00000000_50%)]" />
            <Footer />
        </div>
    )
}

export default Referral;