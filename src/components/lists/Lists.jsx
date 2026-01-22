import { useState} from 'react';

function Lists({completeTask, list, todo, deleteTask}){

    const [isCompleted, setIsCompleted] = useState(todo.finish);
    const [isFading, setIsFading] = useState(false);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const jour = date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric' });
        const heure = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }).replace(':', 'h');
        return `${jour} ${heure}`;
    };

    const today = new Date();

    const uncheckedTodo = (todoid) => (e) => {
    const isChecked = e.target.checked;
    setIsCompleted(isChecked);
    
        if (!isChecked) {
            setIsFading(true);
            
            setTimeout(() => {
                completeTask(todoid, {finish: false});
            },100);
        }
    }

    const completeTodo = (todoid) => (e) => {
    const isChecked = e.target.checked;
    setIsCompleted(isChecked);
    
        if (isChecked) {
            setIsFading(true);
            
            setTimeout(() => {
                completeTask(todoid, {finish: true});
            },100);
        }
    }

    const deleteTodo = () => {
        if (window.confirm('Supprimer ?')){

            deleteTask(todo.documentId)
        }
    }

    if (!list) {
    return <div>Chargement...</div>;
    }

    return(

        <div className="todos-list">
            <div className="d-flex align-items-center gap-2">
                {new Date(todo.dateFin) < today && !todo.finish ? (
                    <i className="bi bi-exclamation-triangle text-danger fs-5"></i>
                ) : (
                    <div style={{width: '20px'}}></div>
                )}
                
                <div key={todo.documentId} 
                    className={`todo-item ${isFading ? 'fading' : ''} rounded-2 border mb-2 px-3 py-2 flex-grow-1`} 
                    style={{
                        backgroundColor: todo.finish ? '#d3d3d3' : (new Date(todo.dateFin) < today ? '#f7d6e5': '#f8f9fa'),
                        opacity: todo.finish ? 0.65 : 1,
                        transition: 'all 0.3s ease'}}>
                    <div className="d-flex align-items-center gap-3">
                        <input 
                            onChange={!todo.finish ? completeTodo(todo.documentId) : uncheckedTodo(todo.documentId)}
                            type="checkbox" 
                            checked={isCompleted}
                            className="form-check-input m-0 flex-shrink-0"
                            id={`todo-${todo.documentId}`}
                            style={{opacity: 1}}/>
                        
                        <div className="flex-grow-1" style={{
                            textDecoration: todo.finish ? 'line-through' : 'none',
                            color: todo.finish ? '#666' : 'inherit'
                        }}>
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
                        
                        <button 
                            onClick={deleteTodo} 
                            className="btn btn-sm btn-outline-danger flex-shrink-0" 
                            aria-label="Supprimer"
                            style={{opacity: 1}}> 
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );

 

   
}
export default Lists;