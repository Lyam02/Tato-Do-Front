import Navbar from "./Navbar"
import { useState, useEffect} from 'react';
import { listService } from "../../services/api";

function Layout({children}){

    const [lists, setLists] = useState([]);

    const user = JSON.parse(localStorage.getItem('user'));

    
    useEffect(() => {
        const fetchLists = async () => {
        const response = await listService.getListUser(user.documentId);
        setLists(response.data.data);
    };
    fetchLists();
    }, []);

    return (
        <div className="container-fluid p-0">
            <div className="row g-0 min-vh-100">

                <div className="col-auto">
                    <Navbar lists={lists} />
                </div>

                <div className="col p-4 ms-5 mt-5">
                    <main>{children}</main>
                </div>

            </div>
        </div>
    );
}

export default Layout;