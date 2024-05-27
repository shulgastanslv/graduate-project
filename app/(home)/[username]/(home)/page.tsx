import {notFound} from "next/navigation";
import {getUserByUsername} from "@/services/user-service";
import {getInventoryByUserId} from "@/services/inventory-service";
import ItemCard from "./_components/item-card";
import {Suspense} from "react";


interface UserPageProps {
    params: {
        username: string;
    };
};

const UserPage = async ({
                            params
                        }: UserPageProps) => {

                            
    const user = await getUserByUsername(params.username)!;

    const userInventory = await getInventoryByUserId(user?.id!);

    if (!userInventory || userInventory.items.length === 0) {
        return (
            <div>
                <p>Нет никаких предметов!</p>
            </div>
        );
    }

    return (
        <div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {userInventory?.items.map((item) => (
                    <li key={item.id}>
                        <ItemCard item={item}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserPage;