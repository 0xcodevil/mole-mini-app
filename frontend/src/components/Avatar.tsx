import Link from "./Link"

interface AvatarProps {
    userid?: number
    width: number
    height: number
    className?: string
    username?: String
}

const Avatar = ({ userid, width, className, height, username }: AvatarProps) => {
    return (
        <div className="relative">
            { username ?
            <Link to={`https://t.me/${username}`}><img className={`rounded-full ${ className }`} src={`/api/v1/users/avatar/${userid}`}  alt="avatar" width={width} height={height} /></Link> :
            <img className="rounded-full" src={`/api/v1/users/avatar/${userid}`}  alt="avatar" width={width} height={height} /> }
            {/* <img className="absolute bottom-0 right-0 translate-x-[4px] translate-y-[4px] rounded-[4px]" src="/imgs/ca.svg" alt="" /> */}
        </div>
    );
}

export default Avatar;