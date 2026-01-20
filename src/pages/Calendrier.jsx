import { useState, useEffect } from 'react';
import { todoService } from '../services/api';
import PlanningLayout from "../components/layout/PlanningLayout.jsx";

function Calendrier() {
    const [todos, setTodos] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await todoService.getTodoUserNotCompleted(user.documentId);
                setTodos(response.data.data);
            } catch (err) {
                console.error("Erreur fetch:", err);
            }
        };
        fetchTodos();
    }, [user.documentId]);

    return (
        <div className="container-fluid p-4">
            <PlanningLayout todos={todos}/>
        </div>
    );
}

export default Calendrier;