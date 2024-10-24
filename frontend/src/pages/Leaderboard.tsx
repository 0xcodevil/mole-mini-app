import Footer from "@/components/Footer";
import { useEffect, useState } from 'react';
import { useInitData } from "@telegram-apps/sdk-react";
import API from '@/libs/API';
import Avatar from '@/components/Avatar';
import { toBMK } from '@/libs/utils';

const Leaderboard = () => {
    const initData = useInitData();

    const [users, setUsers] = useState<any[]>([]);
    // const [type, setType] = useState("total");
    const [selfRank, setSelfRank] = useState('');
    const [self, setSelf] = useState<any>(null);

    const [userCount, setUserCount] = useState(0);
    // const [isCounting, setCounting] = useState(false);

    useEffect(() => {
        API.get('/users/count/all')
            .then(res => {
                setUserCount(res.data.count);
                // setCounting(true);
            })
            .catch(console.error);
    }, []);
    useEffect(() => {
        API.get(`/users/ranking/${initData?.user?.id}/total`)
            .then(res => {
                setUsers(res.data.users);
                setSelfRank(res.data.rank);
                setSelf(res.data.self);
            }).catch(console.error);
    }, [])

    // const handleClickType = (type: "total" | "week") => (e: MouseEvent) => {
    //     e.preventDefault();
    //     setType(type);
    // }

    return (
        <div className="px-[18px] py-4 w-screen h-screen">
            <div className="flex flex-col items-center">
                <h1 className="font-margarine text-[27px] text-center">Wall of Fame</h1>
                <span className="font-madimi text-[16px] text-center text-transparent bg-clip-text bg-[linear-gradient(to_right,#00D0FF,#FFDD00,#D400FF,#FF0099)]">Leaderboard</span>  
            </div>
            <div className="mt-[31px] border border-[#E600FF] rounded-[15px] bg-[#FF02A629] pl-[13px] pr-[66px] py-[10px] flex justify-between items-center">
                <div className="flex items-center gap-[12px]">
                    <Avatar userid={initData?.user?.id} width={42} height={42} username={initData?.user?.username} />
                    <div className="">
                        <div className="font-lemon text-[12px]">{ self?.firstname }</div>
                        <div className="font-poppins">{toBMK(self?.point)} coins</div>
                    </div>
                </div>
                <div className="font-poppins text-[20px]"># {selfRank}</div>
            </div>
            <h1 className="font-lemon text-[13px] my-[28px]">{userCount} holders</h1>
            <div className="h-[calc(100vh-330px)] overflow-y-auto flex flex-col gap-[28px]">
                { users.map((u, key) => (
                    <div key={key} className="flex items-center justify-between pr-[20px]">
                        <div className="flex gap-[10px] items-center">
                            <Avatar userid={u.userid} width={32} height={32} username={u.username} />
                            <div className="flex flex-col justify-center gap-[6px] leading-none">
                                <div className="text-[12px] font-lemon">{ u.firstname }</div>
                                <div className="text-[10px]">{ toBMK(u.point) } coins</div>
                            </div>
                        </div>
                        { key === 0 ? <div><img className="w-[17px] h-[25px]" src="/imgs/gold-medal.png" alt="" /></div> :
                            key === 1 ? <div><img className="w-[17px] h-[25px]" src="/imgs/silver-medal.png" alt="" /></div> :
                                key === 2 ? <div><img className="w-[17px] h-[25px]" src="/imgs/bronze-medal.png" alt="" /></div> :
                            <div>#{ key + 1}</div>
                        }
                    </div>
                )) }
            </div>
            <Footer />
        </div>
    )
}

export default Leaderboard;