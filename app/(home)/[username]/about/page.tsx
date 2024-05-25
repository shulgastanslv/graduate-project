import {AboutCard} from "./_components/about-card";
import {getUserByUsername} from "@/services/user-service";

interface AboutPageProps {
    params: {
        username: string
    };
}

const AboutPage = async ({params}: AboutPageProps) => {

    const user = await getUserByUsername(params.username);

    let level

    if (user?.level == 0) {
        level = "Junior Developer"
    }
    if (user?.level == 1) {
        level = "Middle Developer"
    }
    if (user?.level == 2) {
        level = "Senior Developer"
    }

    const startedWorking = user?.startedWorking;

    return (
        <div className="flex flex-col">
            <AboutCard
                hostName={user?.username!}
                hostIdentity={user?.id!}
                bio={user?.bio!}
                level={level?.toString()!}
                startedWorking={startedWorking?.toLocaleString()!}
                createdAt={user?.createdAt!} 
                followedByCount={0}               
                 />
        </div>);
}

export default AboutPage;