"use server";

import {signOut} from "@/auth";
import { UserStatus } from "@/lib/status";
import { getSelf } from "@/services/session-service";
import { setStatusById } from "@/services/user-service";

export const logout = async () => {
    const self = await getSelf()
    await setStatusById(self?.id!, UserStatus.Offline)
    await signOut();
};