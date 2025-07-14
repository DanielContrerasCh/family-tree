import { useState } from 'react';
import '../../styles/familyTree.css';

const FamilyTreeComponent = ({ 
  familyData, 
  parentIds, 
  title = "Árbol Familiar",
  showBirthYear = true,
  onPersonClick = null 
}) => {
  const [selectedPerson, setSelectedPerson] = useState(null);

  if (!familyData || !parentIds || parentIds.length === 0) {
    return <div className="family-tree-error">No hay datos familiares disponibles</div>;
  }

  const familyTree = familyData.getFamilyTree(parentIds);
  const { parents, children } = familyTree;

  const handlePersonClick = (person) => {
    setSelectedPerson(selectedPerson?.id === person.id ? null : person);
    if (onPersonClick) {
      onPersonClick(person);
    }
  };

  const PersonCard = ({ person, isParent = false }) => (
    <div 
      className={`person-card ${isParent ? 'parent' : 'child'} ${
        selectedPerson?.id === person.id ? 'selected' : ''
      }`}
      onClick={() => handlePersonClick(person)}
    >
      <div className="person-photo">
        {person.photo ? (
          <img src={person.photo} alt={person.name} />
        ) : (
          <div className="photo-placeholder">
            <span>{person.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
          </div>
        )}
      </div>
      <div className="person-info">
        <h3 className="person-name">{person.name}</h3>
        {showBirthYear && person.birthYear && (
          <p className="person-birth-year">{person.birthYear}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="family-tree-container">
      <h2 className="family-tree-title">{title}</h2>
      
      {/* Sección de Padres */}
      <div className="parents-section">
        <h3 className="section-title">Padres</h3>
        <div className="parents-container">
          {parents.map((parent) => (
            <PersonCard key={parent.id} person={parent} isParent={true} />
          ))}
          {parents.length === 2 && (
            <div className="marriage-line"></div>
          )}
        </div>
      </div>

      {/* Línea de conexión */}
      {children.length > 0 && (
        <div className="connection-line">
          <div className="vertical-line"></div>
          <div className="horizontal-line"></div>
        </div>
      )}

      {/* Sección de Hijos */}
      {children.length > 0 && (
        <div className="children-section">
          <h3 className="section-title">Hijos</h3>
          <div className="children-container">
            {children.map((child) => (
              <div key={child.id} className="child-wrapper">
                <div className="child-connection-line"></div>
                <PersonCard person={child} isParent={false} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Información adicional del miembro seleccionado */}
      {selectedPerson && (
        <div className="person-details">
          <h4>Información de {selectedPerson.name}</h4>
          <p><strong>Año de nacimiento:</strong> {selectedPerson.birthYear || 'No disponible'}</p>
          <p><strong>Padres:</strong> {
            selectedPerson.parents.length > 0 
              ? selectedPerson.parents.map(p => p.name).join(', ')
              : 'No disponible'
          }</p>
          <p><strong>Hijos:</strong> {
            selectedPerson.children.length > 0 
              ? selectedPerson.children.map(c => c.name).join(', ')
              : 'No disponible'
          }</p>
          {selectedPerson.spouse && (
            <p><strong>Cónyuge:</strong> {selectedPerson.spouse.name}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FamilyTreeComponent;
