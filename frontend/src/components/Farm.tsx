import { useState, useEffect, Fragment } from "react";
import Countdown from 'react-countdown';
import { toast } from 'react-toastify';
import API from '@/libs/API';

const Farm = ({ plusPoint }: { plusPoint: (val: number) => void }) => {
    const [farmStarted, setFarmStarted] = useState(false);
    const [claimable, setClaimable] = useState(false);
    const [reward, setReward] = useState(0);
    const [duration, setDuration] = useState(1);
    const [remainTime, setRemainTime] = useState(0);
    const [endTimeToClaim, setEndTimeToClaim] = useState(Date.now() + 1000000000);

    useEffect(() => {
        API.get('/farm/status').then(res => {
            setReward(res.data.reward);
            setDuration(res.data.duration);
            if (res.data.started) {
                setFarmStarted(true);
                if (res.data.remainTime > 0) {
                    setClaimable(false);
                } else setClaimable(true);
                setEndTimeToClaim(Date.now() + res.data.remainTime);
                setRemainTime(res.data.remainTime);
            }
        });
    }, []);

    const handleClickFarm = () => {
        if (claimable) {
            API.post('/farm/claim').then(res => {
                if (res.data.success) {
                    setFarmStarted(false);
                    setClaimable(false);
                    plusPoint(res.data.reward);
                    toast.success(`You claimed ${res.data.reward} onions`);
                } else {
                    toast.error(res.data.msg);
                }
            }).catch(err => {
                console.error(err);
                toast.error('Somthing went wrong.');
            });
        } else if (!farmStarted) {
            API.post('/farm/start').then(res => {
                if (res.data.success) {
                    setFarmStarted(true);
                    setClaimable(false);
                    setEndTimeToClaim(Date.now() + res.data.remainTime);
                    setRemainTime(res.data.remainTime);
                    toast.success(`Farm started.`);
                } else {
                    toast.error(res.data.msg);
                }
            }).catch(err => {
                console.error(err);
                toast.error('Somthing went wrong.');
            });
        }
    }

    return (
        <button disabled={farmStarted && !claimable} onClick={handleClickFarm} className={`relative disabled:cursor-not-allowed flex items-center justify-center mt-5 border-2 border-[#F9E813] shadow-[0_0_10px_#F9E813] bg-opacity-80 transition-all duration-300 rounded-full w-[160px] h-[50px] font-poppins overflow-hidden`}>
            <div className="absolute top-0 left-0 h-full transition-all duration-200 bg-[#8A008E]" style={{ width: (duration - remainTime) / duration * 100 + '%' }} />
            <div className="relative flex flex-col items-center justify-center w-full text-center text-white">
                {farmStarted ?
                    (claimable ?
                        'Claim' :
                        <Fragment>
                            <div className="text-sm text-center flex-2">Farming +{ reward }</div>
                            <Countdown
                                date={endTimeToClaim}
                                intervalDelay={1000}
                                precision={3}
                                onTick={() => setRemainTime(prev => (prev - 1000) - prev % 1000)}
                                onComplete={() => { setClaimable(true) }}
                                renderer={(props) => <div className="flex-1 text-sm text-end">{props.hours.toString()} : {props.minutes.toString().padStart(2, '0')} : {props.seconds.toString().padStart(2, '0')}</div>}
                            />
                        </Fragment>
                    ) :
                    'Start Farming'
                }
            </div>
        </button>
    )
}

export default Farm;