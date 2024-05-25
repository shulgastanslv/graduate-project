import {Actions} from "./actions";


export const Navbar = () => {
    return (
        <nav
            className="fixed top-16 w-full bg-background h-16 z-[49] px-2 border-b border-border/40 lg:px-4 flex items-center justify-between shadow-md">
            <div className="items-end">
                <Actions/>
            </div>
        </nav>
    );
};

export default Navbar;