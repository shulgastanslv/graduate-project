import Navbar from "./_components/navbar";

const AdminLayout = (
    {
        children
    }: {
        children: React.ReactNode
    }) => {

    return (
        <>
            <Navbar/>
            <div className="flex h-full w-auto pt-16">
                {children}
            </div>
        </>
    )
}

export default AdminLayout;
