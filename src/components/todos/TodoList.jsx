function TodoList({todo, onDelete}){


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

    return(
        <>
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