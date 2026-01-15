
import {useState} from 'react';

function TodoForm({onSubmit}){

    const [content, setContent] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');


    const handleSubmit = (e) => {

        e.preventDefault()

        onSubmit({
        content: content,
        dateDebut: dateDebut,
        dateFin: dateFin
        });

        setContent('');
        setDateDebut('');
        setDateFin('');

    };


    return(

        <form onSubmit={handleSubmit} className="me-5">
            <div class="card new-task-card mb-3 mt-2 me-5">
                <div class="card-body p-0">
                    <div class="d-flex gap-3">
                        <div class="flex-grow-1">
                            <div className="input-group mb-3">
                                <button type="submit" className="btn border-0 rounded-start">
                                    <i className="fs-3 bi-plus-circle"></i>
                                </button>
                                <input 
                                    type="text" 
                                    className="form-control task-input rounded-end" 
                                    value={content} 
                                    onChange={(e) => setContent(e.target.value)} 
                                    placeholder="Nouvelle tâche"/>
                            </div>
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label for="date-debut" class="form-label date-label">Date de début</label>
                                    <input type="datetime-local" 
                                            class="form-control" 
                                            id="date-debut"
                                            value={dateDebut}
                                            onChange={(e) => setDateDebut(e.target.value)}/>
                                </div>
                                <div class="col-md-6">
                                    <label for="date-fin" class="form-label date-label">Date de fin</label>
                                    <input type="datetime-local" 
                                            class="form-control" 
                                            id="date-fin"
                                            value={dateFin}
                                            onChange={(e) => setDateFin(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        

    )

}

export default TodoForm;