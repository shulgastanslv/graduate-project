import {Container} from "./_components/container";
import {Navbar} from "./_components/navbar";
import {Sidebar} from "./_components/sidebar";

const SettingsLayout = (
    {
        children
    }: {
        children: React.ReactNode
    }) => {

    return (
        <>
            <Navbar/>
            <div className="flex h-full w-full pt-16">
                <Sidebar/>
                <Container>
                    {children}
                </Container>
            </div>
        </>
    )
}

export default SettingsLayout;
