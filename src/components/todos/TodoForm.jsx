
import {useState} from 'react';
import { useEffect } from 'react';
import { listService } from '../../services/api';

function TodoForm({onSubmit}){

    const [content, setContent] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [selectedListId, setSelectedListId] = useState('');
    const [lists, setLists] = useState([]);

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await listService.getListUser(user.documentId);
        setLists(response.data.data);
        
      } catch (error) {
        console.error('Erreur chargement listes:', error);
      }
    };
    
    fetchLists();
  }, []);

    const handleSubmit = (e) => {

        e.preventDefault()

        onSubmit({
        content: content,
        dateDebut: dateDebut,
        dateFin: dateFin,
        list: selectedListId,
        finish: false
        });

        setContent('');
        setDateDebut('');
        setDateFin('');
        setSelectedListId('');

    };


    return(

        <form onSubmit={handleSubmit} className="me-5">
      <div className="card new-task-card mb-3 mt-2 me-5">
        <div className="card-body p-0">
          <div className="d-flex gap-3">
            <div className="flex-grow-1">
              <div className="input-group mb-3">
                <button type="submit" className="btn border-0 rounded-start">
                  <i className="fs-3 bi-plus-circle"></i>
                </button>
                <input 
                  type="text" 
                  className="form-control task-input rounded-end" 
                  value={content} 
                  onChange={(e) => setContent(e.target.value)} 
                  placeholder="Nouvelle tâche"
                  required
                />
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="date-debut" className="form-label date-label">
                    <i className="bi bi-calendar3 me-2"></i>
                    Date de début
                    </label>
                    <input 
                    type="datetime-local" 
                    className="form-control" 
                    id="date-debut"
                    value={dateDebut}
                    onChange={(e) => setDateDebut(e.target.value)}
                    />
                </div>
                
                <div className="col-md-6">
                    <label htmlFor="date-fin" className="form-label date-label">
                    <i className="bi bi-calendar3 me-2"></i>
                    Date de fin
                    </label>
                    <input 
                    type="datetime-local" 
                    className="form-control" 
                    id="date-fin"
                    value={dateFin}
                    onChange={(e) => setDateFin(e.target.value)}
                    />
                </div>
            </div>

              <div className="mt-3">
                <label htmlFor="liste" className="form-label date-label">
                  Liste
                </label>
                <select
                  className="form-select"
                  id="liste"
                  value={selectedListId}
                  onChange={(e) => setSelectedListId(e.target.value)}
                  required
                >
                  <option value="">Sélectionner une liste</option>
                  {lists.map((list) => (
                    <option key={list.documentId} value={list.documentId}>
                      {list.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
        

    )

}

export default TodoForm;