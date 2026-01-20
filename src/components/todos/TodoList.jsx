import { useState } from "react";

function TodoList({todo, onDelete, completeTask}){


    const [isCompleted, setIsCompleted] = useState(false);
    const [isFading, setIsFading] = useState(false);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const jour = date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric' });
        const heure = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }).replace(':', 'h');
        return `${jour} ${heure}`;
    };

    const deleteTodo = () => {

        console.log(todo.documentId);

        if (window.confirm('Supprimer ?')){

            onDelete(todo.documentId)
        }
    }

    const completeTodo = (e) => {
    const isChecked = e.target.checked;
    setIsCompleted(isChecked);
    
    if (isChecked) {
        setIsFading(true);
        
        setTimeout(() => {
            completeTask(todo.documentId, {finish: true});
        }, 500);
    }
}

return(
    <>
    <div className={`row align-items-center todo-item ${isFading ? 'fading' : ''}`}>
        <div className="col">
            <div className="d-flex align-items-center">
                <input 
                    onChange={completeTodo}
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
                onClick={deleteTodo}
                className="btn btn-sm"
                aria-label="Supprimer">
                <i className="bi bi-x-lg"></i>
            </button>
        </div>
    </div>
    <hr className="my-0"></hr>
    </>
)
}

export default TodoList;