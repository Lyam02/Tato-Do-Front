import TodoList from "./TodoList";

function TodoItem({todos, onDelete, completeTask}){

    return(
        <>
        <div className="me-5">

            {todos.map(todo => (
                <TodoList key={todo.id}
                        todo={todo}
                        onDelete={onDelete}
                        completeTask={completeTask}/>
            ))}
        </div>
        </>
        
    )

}

export default TodoItem;