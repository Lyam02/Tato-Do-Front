import { useState, useEffect} from 'react';
import {todoService} from '../services/api'
import TodoForm from '../components/todos/TodoForm';
import TodoItem from '../components/todos/TodoItem';

function Home(){

    const [todos, setTodos] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    
    useEffect(() => {
        const fetchTodos = async () => {
        const response = await todoService.getTodoUserNotCompleted(user.documentId);
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
            await todoService.delete(id);

            setTodos(todos.filter(todo => todo.documentId !== id));
        }catch(error){
            console.error("Erreur de suppression : ", error);
        }
    }

    const completeTask = async (id, todoData) => {
        try{
            await todoService.update(id, todoData);

            setTodos(todos.filter(todo => todo.documentId !== id));
        }catch(error){
            console.error("Erreur de suppression : ", error);
        }
    }

    // const date = new Date();

    // const dateFormatee = date.toLocaleDateString('fr-FR', {
    //     weekday: 'long',
    //     day: 'numeric',
    //     month: 'long',
    //     year: 'numeric'
    // });

    return (
    <div className="">
        <div className="d-flex align-items-center gap-2">
            <h1 className="mb-0">Tâches à faire</h1>
        </div>
        
        <TodoForm onSubmit={handleCreate} />
        <TodoItem todos={todos} onDelete={handleDelete} completeTask={completeTask}/>

    </div>
    );

}

export default Home;