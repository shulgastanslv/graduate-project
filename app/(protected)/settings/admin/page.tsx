import { Button } from "@/components/ui/button";
import Link from "next/link";

const AdminPage = () => {
  return (
    <div className="w-full h-full flex flex-col gap-5 items-center text-muted-foreground justify-center">
      <p>Приветствую, это ваша панель управления 👋</p>
      <Button variant="secondary" asChild>
        <Link href="/">На главную</Link>
      </Button>
    </div>
  );
};

export default AdminPage;
