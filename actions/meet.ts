"use server"

import { UserStatus } from "@/lib/status";
import { createMeet, endMeet, getMeetById } from "@/services/meet-service";
import { getSelf } from "@/services/session-service";
import { setStatusById } from "@/services/user-service";
import { randomUUID } from "crypto";

export const startMeet = async (roomId : string) => {

    const id = randomUUID()
    
    const self = await getSelf()

    const res = await createMeet(id, roomId, self?.id!)

    await setStatusById(self?.id!, UserStatus.Online)

    if(!res) {
        return false
    }

    return true;
};

export const deleteMeet = async () => {

    const self = await getSelf()

    const res = await getMeetById(self?.id!)

    await setStatusById(self?.id!, UserStatus.Away)

    await endMeet(res?.roomId!)

    if(!res) {
        return false
    }

    return true;
};