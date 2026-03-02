import { getServerSession } from "next-auth"
import { authConfig } from "../configs/auth"
import Image from "next/image"
import SignOutBtn from "./SignOutBtn"


export default async function UserProile() {
    const session = await getServerSession(authConfig)
    
    const profileName = session?.user?.name
    const profileImg = session?.user?.image
    const profileEmail = session?.user?.email


    return (
        <div>
           {profileImg && <Image src={profileImg} width={100} height={100} loading="eager" alt="user profile photo"></Image>}
            <p>{profileName}</p>
           <p> {profileEmail}</p>
           <SignOutBtn />

        </div>
    )
}