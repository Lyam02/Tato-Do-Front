import {useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { listService } from '../../services/api';
import { todoService } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import Lists from './Lists';

function ParentList(){

    const {id} = useParams();
    console.log({id});
    const [list, setList] = useState(null);
    const [todos, setTodos] = useState([]);
    const {navigate} = useNavigate();

    useEffect(() => {

        const fetchList = async () => {
        const listResp = await listService.getOne(id)

        console.log({listResp});

        setList(listResp.data.data);

        const todosResp = await todoService.getTodoFromList(id)

        setTodos(todosResp.data.data);
    }

        fetchList();
    }, [id]);

    const completeTask = async (id, todoData) => {
        try{
            await todoService.update(id, todoData);

            setTodos(todos.filter(todo => todo.documentId !== id));
        }catch(error){
            console.error("Erreur de suppression : ", error);
        }

        window.location.href=`/ParentList/${list.documentId}`;
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

    const deleteTask = async (id) => {
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

        <div className="container mt-1">
            <div className="d-flex align-items-center justify-content-center mb-4 position-relative">
                <div className="d-flex align-items-center mb-2">
                    <span className="list-dot me-2" style={{backgroundColor: list.color}}></span>
                    <h1 className="mb-0">{list.name}</h1>
                </div>
                <button 
                    onClick={deleteList}
                    className="btn btn-link text-danger p-0 delete-list-btn position-absolute end-0"
                    aria-label="Supprimer la liste">
                    <i className="bi bi-trash" style={{fontSize: '1rem'}}></i>
                </button>
            </div>

            <div className="mb-4">
                <h5 className="text-muted mb-3">
                    <i className="bi bi-circle me-2"></i>À faire
                </h5>
                {todos.filter(todo => todo.finish == false).map((todo) => (
                    <Lists key={todo.documentId} todo={todo} completeTask={completeTask} list={list} deleteTask={deleteTask}/>
                ))}
            </div>

            <div className="mb-4">
                <h5 className="text-muted mb-3">
                    <i className="bi bi-check-circle me-2"></i>Fait
                </h5>
                {todos.filter(todo => todo.finish == true).map((todo) => (
                    <Lists key={todo.documentId} todo={todo} completeTask={completeTask} list={list} deleteTask={deleteTask}/>
                ))}
            </div>
        </div>

    );

}


export default ParentList;