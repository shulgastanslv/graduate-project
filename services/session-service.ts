import { auth } from "@/auth";
import { db } from "@/db";


export const currentUser = async () => {
    const session = await auth();

    return session?.user;
};

export const currentRole = async () => {
    const session = await auth();

    return session?.user?.role;
};

export const getSelf = async () => {

    const self = await currentUser();

    if(!self?.id || self?.id == undefined) {
        return null;
    }

    const user = await db.user.findUnique({
        where: { username: self?.name! },
    });

    if(!user) {
        return null;
    }

    return user;
};
