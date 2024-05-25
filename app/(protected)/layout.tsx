const ProtectedLayout = ({
                             children
                         }: {
    children: React.ReactNode
}) => {
    return (
        <div className="h-96 flex flex-col">
            {children}
        </div>
    );
}

export default ProtectedLayout;