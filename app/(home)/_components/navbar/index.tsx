import {Actions} from "./actions";
import {Logo} from "./logo";
import {Search} from "./search";

export const Navbar = () => {
    return (
        <nav 
            className="fixed top-0 bg-white w-full h-16 z-50 px-2 border-b border-border/40 lg:px-4 flex justify-between items-center shadow-md">
            <div className="items-center m-0">
                <Logo></Logo>
            </div>
            <div className="items-center">
                <Search></Search>
            </div>
            <div className="items-center m-0">
                <Actions/>
            </div>
        </nav>
    );
};

export default Navbar;