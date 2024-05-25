import {getAllUsers} from '@/services/user-service';
import {format} from "util";
import {columnsUsersDt} from '../_components/columns-users-dt';
import {UsersDataTable} from '../_components/users-data-table';


const AdminUsersPage = async () => {

    const users = await getAllUsers();

    const formattedDataUsers = users.map((user) => ({
        ...user,
        userId: user.id,
        imageUrl: user.imageUrl,
        username: user.username,
    }));

    return (
        <div className="w-full h-full flex flex-col gap-5 items-center pt-14 text-muted-foreground justify-center">
            <UsersDataTable columns={columnsUsersDt} data={formattedDataUsers!}/>
        </div>
    );
}

export default AdminUsersPage;