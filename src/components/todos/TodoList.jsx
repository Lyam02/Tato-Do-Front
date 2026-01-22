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
                
                <div className="flex-grow-1">
                        <span className="d-block mb-1">{todo.content}</span>
                        <div className="d-flex align-items-center gap-2">
                            <span className="badge bg-primary bg-opacity-10 text-primary">
                                <i className="bi bi-calendar-event me-1"></i>{formatDate(todo.dateDebut)}
                            </span>
                            <i className="bi bi-arrow-right text-muted"></i>
                            <span className="badge bg-success bg-opacity-10 text-success">
                                <i className="bi bi-calendar-check me-1"></i>{formatDate(todo.dateFin)}
                            </span>
                        </div>
                    </div>
            </div>
        </div>
        <div className="col-auto">
            <button 
                onClick={deleteTodo} className="btn btn-sm btn-outline-danger flex-shrink-0" aria-label="Supprimer"> <i className="bi bi-trash"></i>
            </button>
        </div>
    </div>
    <hr className="my-0"></hr>
    </>
)
}

export default TodoList;