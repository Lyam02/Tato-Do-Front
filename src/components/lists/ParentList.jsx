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

            {todos.map((todo) => (
            <Lists todo={todo} completeTask={completeTask} list={list} deleteTask={deleteTask}/>
            ))}
        </div>

    );

}


export default ParentList;