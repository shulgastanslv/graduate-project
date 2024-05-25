import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { getSelf } from "@/services/session-service";
import { Menu } from "../menu";

export const Actions = async () => {
  const user = await getSelf();

  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
      {!user && (
        <div className="flex items-center">
          <LoginButton>
            <Button size="sm" variant="default">
              Войти
            </Button>
          </LoginButton>
        </div>
      )}
      {!!user && (
        <div className="flex items-center mr-5">
          <Menu></Menu>
        </div>
      )}
    </div>
  );
};
