import { useState, useEffect } from 'react';
import { todoService } from '../services/api';
import TodoForm from '../components/todos/TodoForm';
import TodoItem from '../components/todos/TodoItem';
import PlanningLayout from "../components/layout/PlanningLayout.jsx";

function Today() {
    const [todos, setTodos] = useState([]);
    const user = JSON.parse(sessionStorage.getItem('user'));

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

    const handleCreate = async (todoData) => {
        try {
            const response = await todoService.create({ ...todoData });
            setTodos([...todos, response.data.data]);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Supprimer cette tâche ?")) return;
        try {
            await todoService.delete(id);
            setTodos(todos.filter(todo => todo.documentId !== id));
        } catch (error) {
            console.error("Erreur de suppression : ", error);
        }
    };

    const todayStr = new Date().toDateString();
    const todayTodos = todos.filter(todo => {
        if (!todo.dateDebut) return false;
        return new Date(todo.dateDebut).toDateString() === todayStr;
    });

    const date = new Date();
    const dateFormatee = date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="">
            <div className="d-flex align-items-center gap-2">
                <h1 className="mb-0">Aujourd'hui</h1>
                <h5 className="mb-0">{dateFormatee}</h5>
            </div>

            <TodoForm onSubmit={handleCreate} />
            <TodoItem todos={todayTodos} onDelete={handleDelete}/>

            <PlanningLayout todos={todos} onDelete={handleDelete} />
        </div>
    );
}

export default Today;