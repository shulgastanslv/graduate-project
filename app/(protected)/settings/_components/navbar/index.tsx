import {Actions} from "./actions";
import {Logo} from "./logo";

export const Navbar = () => {
    return (
        <nav
            className="fixed top-0 w-full h-16 z-[49] bg-background border-b border-border/40 px-2 lg:px-4 flex justify-between items-center shadow-md">
            <div className="items-start m-0">
                <Logo/>
            </div>
            <div className="items-end m-0">
                <Actions/>
            </div>
        </nav>
    );
};