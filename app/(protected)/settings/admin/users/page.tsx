import { getAllUsers } from "@/services/user-service";
import { format } from "util";
import { columnsUsersDt } from "../_components/columns-users-dt";
import { UsersDataTable } from "../_components/users-data-table";

const AdminUsersPage = async () => {
  const formatDate = (format: Date) => {
    const yyyy = format.getFullYear();
    const mm = String(format.getMonth() + 1).padStart(2, "0");
    const dd = String(format.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const users = await getAllUsers();

  const formattedDataUsers = users.map((user) => ({
    ...user,
    userId: user.id,
    imageUrl: user.imageUrl,
    username: user.username,
    createdAt: formatDate(user.createdAt),
  }));

  return (
    <div className="w-full h-full items-stretch justify-stretch m-10">
      <UsersDataTable columns={columnsUsersDt} data={formattedDataUsers!} />
    </div>
  );
};

export default AdminUsersPage;
