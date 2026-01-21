import { useState } from "react";
import { listService } from "../../services/api";
import { useNavigate } from 'react-router-dom';

function CreateLists (){

    const [color, setColor] = useState('#efbdbd');
    const [name, setName] = useState('');
    const [isPublic, setIsPublic] = useState(false);

    const navigate = useNavigate();

    const createList = async (e) => {

        e.preventDefault();

        const response = await listService.create({
            color,
            name,
            isPublic
        });

        setColor('#efbdbd');
        setName('');
        setIsPublic(false);

        navigate(`/lists/${response.data.data.documentId}`);

        window.location.reload();
    }

    return (

      <form onSubmit={createList}>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="floatingInput" value={name} onChange={(e) => setName(e.target.value)} required/>
          <label for="floatingInput">Nom de la liste</label>
        </div>

        <div className="mb-3">
          <label className="form-label">Couleur</label>
          <input
            type="color"
            className="form-control form-control-color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          <label className="form-check-label">Liste publique</label>
        </div>

        <button type="submit" className="btn btn-primary">
          Créer
        </button>
      </form>

    );

}

export default CreateLists;