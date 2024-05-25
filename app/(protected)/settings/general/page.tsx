import {AvatarCard} from "./_components/avatar-card";
import {UserInfoCard} from "./_components/user-info-card";

const ProfilePage = () => {
    return (
        <div className="flex flex-col p-6 w-full gap-4">
            <AvatarCard/>
            <UserInfoCard/>
        </div>
    );
}

export default ProfilePage;