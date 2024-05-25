import {db} from "@/db"
import { UserLevel } from "@/lib/level";
import { UserStatus } from "@/lib/status";
import { WorkingTime } from "@/lib/working-time";

export const getUserByUsername = async (username: string) => {
    const user = await db.user.findUnique({
        where: {
            username,
        },
        select: {
            id: true,
            username: true,
            level: true,
            status: true,
            lastLogin: true,
            meet: true,
            role: true,
            startedWorking: true,
            updatedAt: true,
            bio: true,
            imageUrl: true,
            password: true,
            createdAt: true,
            _count: {
                select: {
                    followedBy: true,
                },
            },
            inventory: {
                select: {
                    items: {
                        select: {
                            id: true,
                            name: true,
                            imageUrl: true,
                            description: true,
                        }
                    }
                }
            }
        },
    });

    return user;
};

export const getUserById = async (id: string) => {

    const user = await db.user.findUnique({
        where: {id},
        select: {
            id: true,
            username: true,
            level: true,
            status: true,
            lastLogin: true,
            meet: true,
            role: true,
            startedWorking: true,
            updatedAt: true,
            bio: true,
            imageUrl: true,
            password: true,
            createdAt: true,
        },
    });

    return user;
};

export const setLastLoginById = async (id: string) => {

    const user = await db.user.update({
        where: 
        {
            id
        },
        data: {
            lastLogin: new Date()
        }
    });

    return user;
};


export const setStatusById = async (id: string, status : UserStatus) => {

    const user = await db.user.update({
        where: 
        {
            id
        },
        data: {
            status: status
        }
    });

    return user;
};

export const getAllUsersByLevel = async (level : UserLevel) => {

    const users = await db.user.findMany({
        where: 
        {
            level: level
        },
    });

    return users;
};

export const getAllUsersWithWorkingTimeLessThanYear = async () => {

    const users = await db.user.findMany({
        where: {
          workExperience: {
            lt: 1
          }
        }
    });

   return users
};

export const getAllUsersWithWorkingTimeoneToThreeYears = async () => {

    const users = await db.user.findMany({
        where: {
          workExperience: {
            gte: 1,
            lt: 3
          }
        }
    });

   return users
};

export const getAllUsersWithWorkingThanThreeYears = async () => {

    const users = await db.user.findMany({
        where: {
          workExperience: {
            gte: 3
          }
        }
    });

   return users
};

export const getAllUsersByStatus = async (status : UserStatus) => {

    const users = await db.user.findMany({
        where: 
        {
            status: status
        },
    });

    return users;
};



export const getAllUsers = async () => {
    try {
        const users = await db.user.findMany();
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}






