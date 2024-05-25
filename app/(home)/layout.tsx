import {Suspense} from "react";
import {Container} from "./_components/container";
import {Sidebar} from "./_components/sidebar";
import Navbar from "./_components/navbar";

const HomeLayout = (
    {
        children
    }: {
        children: React.ReactNode
    }) => {

    return (
        <>
            <Navbar/>
            <div className="flex h-full pt-16">
                    <Sidebar/>
                <Container>
                    {children}
                </Container>
            </div>
        </>
    );
}

export default HomeLayout;