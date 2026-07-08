import { Outlet } from "react-router-dom";
const AdminLayout = () => {
    return (
        <div className="flex min-h-screen">

            <div className="flex-1 flex flex-col">

                <main className="flex-1 p-6 bg-gray-100">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;