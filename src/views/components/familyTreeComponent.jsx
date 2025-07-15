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
  const [expandedPerson, setExpandedPerson] = useState(null);
  const [currentParentIds, setCurrentParentIds] = useState(parentIds);
  const [familyHistory, setFamilyHistory] = useState([]);

  if (!familyData || !currentParentIds || currentParentIds.length === 0) {
    return <div className="family-tree-error">No hay datos familiares disponibles</div>;
  }

  const familyTree = familyData.getFamilyTree(currentParentIds);
  const { parents, children } = familyTree;

  const handlePersonClick = (person) => {
    setSelectedPerson(selectedPerson?.id === person.id ? null : person);
    if (onPersonClick) {
      onPersonClick(person);
    }
  };

  const handleExpandPerson = (person) => {
    setExpandedPerson(person);
  };

  const handleCloseModal = () => {
    setExpandedPerson(null);
  };

  const handleModalOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setExpandedPerson(null);
    }
  };

  const loadNewFamily = (newParentIds, familyName) => {
    // Guardar la familia actual en el historial
    setFamilyHistory(prev => [...prev, {
      parentIds: currentParentIds,
      selectedPerson: selectedPerson
    }]);
    
    // Cargar la nueva familia
    setCurrentParentIds(newParentIds);
    setSelectedPerson(null);
    setExpandedPerson(null);
  };

  const goBackToFamily = () => {
    if (familyHistory.length > 0) {
      const previousFamily = familyHistory[familyHistory.length - 1];
      setCurrentParentIds(previousFamily.parentIds);
      setSelectedPerson(previousFamily.selectedPerson);
      setExpandedPerson(null);
      setFamilyHistory(prev => prev.slice(0, -1));
    }
  };

  const getNewFamilyIds = (person) => {
    // Si la persona tiene esposa, crear familia con ambos
    if (person.spouse) {
      return [person.id, person.spouse.id];
    }
    // Si solo tiene hijos, crear familia solo con esta persona
    if (person.children && person.children.length > 0) {
      return [person.id];
    }
    return null;
  };

  const isSameFamily = (newParentIds, currentIds) => {
    if (!newParentIds || !currentIds || newParentIds.length !== currentIds.length) {
      return false;
    }
    
    // Ordenar ambos arrays para comparar sin importar el orden
    const sortedNew = [...newParentIds].sort();
    const sortedCurrent = [...currentIds].sort();
    
    return sortedNew.every((id, index) => id === sortedCurrent[index]);
  };

  const canNavigateToFamily = (person) => {
    const newFamilyIds = getNewFamilyIds(person);
    if (!newFamilyIds) return false;
    
    // Verificar si no es la misma familia que ya está cargada
    return !isSameFamily(newFamilyIds, currentParentIds);
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
      <div className="family-tree-header">
        <h2 className="family-tree-title">{title}</h2>
        {familyHistory.length > 0 && (
          <button 
            className="back-button"
            onClick={goBackToFamily}
          >
            ← Regresar a familia anterior
          </button>
        )}
      </div>
      
      {/* Sección de Padres */}
      <div className="parents-section">
        <h3 className="section-title">Padres</h3>
        <div className="parents-container">
          {parents.length >= 1 && (
            <PersonCard person={parents[0]} isParent={true} />
          )}
          
          {parents.length === 2 && (
            <div className="marriage-connection">
              <div className="marriage-line-left"></div>
              <div className="marriage-heart">♥</div>
              <div className="marriage-line-right"></div>
            </div>
          )}
          
          {parents.length >= 2 && (
            <PersonCard person={parents[1]} isParent={true} />
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
          <h4>{selectedPerson.name}</h4>
          
          {selectedPerson.email && (
            <p><strong>Correo:</strong> {selectedPerson.email}</p>
          )}
          
          {selectedPerson.phone && (
            <p><strong>Teléfono:</strong> {selectedPerson.phone}</p>
          )}
          
          {selectedPerson.spouse && (
            <p><strong>Cónyuge:</strong> {selectedPerson.spouse.name}</p>
          )}
          
          <p><strong>Hijos:</strong> {
            selectedPerson.children.length > 0 
              ? selectedPerson.children.map(c => c.name).join(', ')
              : 'No tiene hijos'
          }</p>

          <button 
            className="expand-button"
            onClick={() => handleExpandPerson(selectedPerson)}
          >
            Expandir
          </button>
        </div>
      )}

      {/* Modal expandido */}
      {expandedPerson && (
        <div className="person-modal-overlay" onClick={handleModalOverlayClick}>
          <div className="person-modal">
            <button 
              className="modal-close-button"
              onClick={handleCloseModal}
            >
              ×
            </button>
            
            <div className="modal-person-photo">
              {expandedPerson.photo ? (
                <img src={expandedPerson.photo} alt={expandedPerson.name} />
              ) : (
                <div className="modal-photo-placeholder">
                  <span>{expandedPerson.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
                </div>
              )}
            </div>

            <h2 className="modal-person-name">{expandedPerson.name}</h2>
            
            {showBirthYear && expandedPerson.birthYear && (
              <p className="modal-person-birth-year">Nacido en {expandedPerson.birthYear}</p>
            )}

            <div className="modal-person-info">
              {expandedPerson.email && (
                <div className="modal-info-item">
                  <strong>Correo Electrónico</strong>
                  <span>{expandedPerson.email}</span>
                </div>
              )}
              
              {expandedPerson.phone && (
                <div className="modal-info-item">
                  <strong>Teléfono</strong>
                  <span>{expandedPerson.phone}</span>
                </div>
              )}
              
              {expandedPerson.spouse && (
                <div className="modal-info-item">
                  <strong>Cónyuge</strong>
                  <span>{expandedPerson.spouse.name}</span>
                </div>
              )}
              
              <div className="modal-info-item">
                <strong>Hijos</strong>
                <span>
                  {expandedPerson.children.length > 0 
                    ? expandedPerson.children.map(c => c.name).join(', ')
                    : 'No tiene hijos'
                  }
                </span>
              </div>
            </div>

            {/* Botones de navegación */}
            {(expandedPerson.spouse || (expandedPerson.children && expandedPerson.children.length > 0)) && (
              <div className="modal-navigation">
                <h4 className="navigation-title">Ver árbol familiar de:</h4>
                <div className="navigation-buttons">
                  {canNavigateToFamily(expandedPerson) ? (
                    <button 
                      className="family-nav-button"
                      onClick={() => loadNewFamily(
                        getNewFamilyIds(expandedPerson), 
                        expandedPerson.name
                      )}
                    >
                      {expandedPerson.spouse 
                        ? `👨‍👩‍👧‍👦 Familia de ${expandedPerson.name}` 
                        : `👤 Como padre/madre`
                      }
                    </button>
                  ) : (
                    <div className="current-family-indicator">
                      <span className="emoji">📍</span>
                      Ya estás viendo {expandedPerson.spouse 
                        ? `la familia de ${expandedPerson.name}` 
                        : `a ${expandedPerson.name} como padre/madre`
                      }
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyTreeComponent;
