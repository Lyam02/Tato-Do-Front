import { useState, useEffect} from 'react';
import {todoService} from '../services/api'
import TodoForm from '../components/todos/TodoForm';
import TodoItem from '../components/todos/TodoItem';

function Home(){

    const [todos, setTodos] = useState([]);
    
    useEffect(() => {
        const fetchTodos = async () => {
        const response = await todoService.getAll();
        setTodos(response.data.data);
    };
    fetchTodos();
    }, []);

    const handleCreate = async (todoData) => {
        try{
            const response = await todoService.create({
                ...todoData
            });
            setTodos([...todos, response.data.data]);
        }catch(err){
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try{
            const response = await todoService.delete(id);
            console.log("Réponse Strapi:", response);
            // console.log("Status:", response.status);

            setTodos(todos.filter(todo => todo.documentId !== id));
        }catch(error){
            console.error("Erreur de suppression : ", error);
        }
    }

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
        <TodoItem todos={todos} onDelete={handleDelete}/>

    </div>
    );

}

export default Home;