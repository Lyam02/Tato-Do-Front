import {useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { listService } from '../../services/api';
import { todoService } from '../../services/api';
import { useNavigate } from 'react-router-dom';

function Lists(){
    const {id} = useParams();
    const [list, setList] = useState(null);
    const [todos, setTodos] = useState([])
    const [isCompleted, setIsCompleted] = useState(false);
    const [isFading, setIsFading] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {

        const fetchList = async () => {
        const listResp = await listService.getOne(id)

        setList(listResp.data.data);

        const todosResp = await todoService.getTodoFromList(id)

        setTodos(todosResp.data.data);
    }

        fetchList();
    }, [id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const jour = date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric' });
        const heure = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }).replace(':', 'h');
        return `${jour} ${heure}`;
    };

    const deleteTodo = async (id) => {
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

    const completeTodo = (todoid) => (e) => {
    const isChecked = e.target.checked;
    setIsCompleted(isChecked);
    
        if (isChecked) {
            setIsFading(true);
            
            setTimeout(() => {
                completeTask(todoid, {finish: true});
            }, 500);
        }
    }

    const deleteList = async () => {
    if (window.confirm(`Supprimer la liste "${list.name}" ?`)) {
        try {
            await listService.delete(list.documentId);
            navigate('/home');
        } catch(error) {
            console.error("Erreur de suppression : ", error);
        }
        window.location.reload();
    }
}


    if (!list) {
    return <div>Chargement...</div>;
    }

    return(

        <div className="container mt-4">
            <div className="d-flex align-items-center mb-4">
                <span className="list-dot me-2" style={{backgroundColor: list.color}}></span>
                <h1 className="mb-0">{list.name}</h1>
                <button 
                    onClick={deleteList}
                    className="btn btn-link text-danger ms-3 p-0 delete-list-btn"
                    aria-label="Supprimer la liste">
                    <i className="bi bi-trash" style={{fontSize: '1rem'}}></i>
                </button>
            </div>

            <div className="todos-list">
                {todos.map((todo) => (
                <div key={todo.documentId} className="card mb-2">
                    <div className={`row align-items-center todo-item ${isFading ? 'fading' : ''}`}>
                        <div className="col">
                            <div className="d-flex align-items-center">
                                <input 
                                    onChange={completeTodo(todo.documentId)}
                                    type="checkbox" 
                                    checked={isCompleted}
                                    className="form-check-input border border-1 border-secondary me-3"/>
                                
                                <div>
                                    <p className="mb-0">{todo.content}</p>
                                    <p className="text-muted mb-0">
                                        {formatDate(todo.dateDebut)} - {formatDate(todo.dateFin)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-auto">
                            <button 
                                onClick={() => deleteTodo(todo.documentId)}
                                className="btn btn-sm"
                                aria-label="Supprimer">
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>
                    </div>
                    <hr className="my-0"></hr>
                </div>
                ))}
            </div>
        </div>

    );

}

export default Lists;