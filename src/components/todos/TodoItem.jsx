import TodoList from "./TodoList";

function TodoItem({todos, onDelete}){

    return(
        <>
        <div className="me-5">

            {todos.map(todo => (
                <TodoList key={todo.id}
                        todo={todo}
                        onDelete={onDelete}/>
            ))}
        </div>
        </>
        
    )

}

export default TodoItem;