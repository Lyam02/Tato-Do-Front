import {useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { listService } from '../../services/api';
import { todoService } from '../../services/api';

function Lists(){
    const {id} = useParams();
    const [list, setList] = useState(null);
    const [todos, setTodos] = useState([])

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

    if (!list) {
    return <div>Chargement...</div>;
  }

    return(

        <div className="container mt-4">
            <div className="d-flex align-items-center mb-4">
                <span 
                className="list-dot me-2" 
                style={{backgroundColor: list.color}}
                ></span>
                <h1>{list.name}</h1>
            </div>

            <div className="todos-list">
                {todos.map((todo) => (
                <div key={todo.documentId} className="card mb-2">
                    <div className="row align-items-center">
                        <div className="col">
                            <div className="d-flex align-items-center">
                                <input 
                                    type="checkbox" 
                                    checked={todo.finish}
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