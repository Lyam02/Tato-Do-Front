import Navbar from "./Navbar"

function Layout({children}){
    return (
        <div className="container-fluid p-0">
            <div className="row g-0 min-vh-100">

                <div className="col-auto">
                    <Navbar />
                </div>

                <div className="col p-4 ms-5 mt-5">
                    <main>{children}</main>
                </div>

            </div>
        </div>
    );
}

export default Layout;