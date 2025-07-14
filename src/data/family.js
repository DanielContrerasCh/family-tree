// Estructura de datos familiar usando clases para mejor organización

class Person {
  constructor(id, name, birthYear = null, photo = null) {
    this.id = id;
    this.name = name;
    this.birthYear = birthYear;
    this.photo = photo;
    this.children = [];
    this.parents = [];
    this.spouse = null;
  }

  addChild(child) {
    if (!this.children.includes(child)) {
      this.children.push(child);
    }
  }

  addParent(parent) {
    if (!this.parents.includes(parent)) {
      this.parents.push(parent);
    }
  }

  setSpouse(spouse) {
    this.spouse = spouse;
  }
}

class Family {
  constructor() {
    this.members = new Map();
  }

  addMember(id, name, birthYear = null, photo = null) {
    const person = new Person(id, name, birthYear, photo);
    this.members.set(id, person);
    return person;
  }

  getMember(id) {
    return this.members.get(id);
  }

  addRelationship(parentId, childId) {
    const parent = this.getMember(parentId);
    const child = this.getMember(childId);
    
    if (parent && child) {
      parent.addChild(child);
      child.addParent(parent);
    }
  }

  addSpouseRelationship(spouse1Id, spouse2Id) {
    const spouse1 = this.getMember(spouse1Id);
    const spouse2 = this.getMember(spouse2Id);
    
    if (spouse1 && spouse2) {
      spouse1.setSpouse(spouse2);
      spouse2.setSpouse(spouse1);
    }
  }

  getParents() {
    return Array.from(this.members.values()).filter(person => 
      person.parents.length === 0 && person.children.length > 0
    );
  }

  getChildren(parentId) {
    const parent = this.getMember(parentId);
    return parent ? parent.children : [];
  }

  // Obtener una familia específica (padres + hijos) para el árbol
  getFamilyTree(parentIds) {
    const parents = parentIds.map(id => this.getMember(id)).filter(Boolean);
    const allChildren = [];
    
    parents.forEach(parent => {
      parent.children.forEach(child => {
        if (!allChildren.find(c => c.id === child.id)) {
          allChildren.push(child);
        }
      });
    });

    return {
      parents,
      children: allChildren
    };
  }
}

// Instancia de la familia con datos de ejemplo
const familyData = new Family();

// Agregar miembros de la familia Álvarez Mejía
// Abuelos/Padres principales
familyData.addMember('juan-alvarez', 'Juan Álvarez', 1950, 'https://picsum.photos/150/150?random=1');
familyData.addMember('maria-mejia', 'María Mejía', 1952, 'https://picsum.photos/150/150?random=2');

// Hijos de Juan y María
familyData.addMember('pepe-alvarez', 'Pepe Álvarez Mejía', 1975, 'https://picsum.photos/150/150?random=3');
familyData.addMember('luz-alvarez', 'Luz Álvarez Mejía', 1977, 'https://picsum.photos/150/150?random=4');
familyData.addMember('dan-alvarez', 'Daniel Álvarez Mejía', 1980, 'https://picsum.photos/150/150?random=5');
familyData.addMember('itzel-alvarez', 'Itzel Álvarez Mejía', 1985, 'https://picsum.photos/150/150?random=6');

// Establecer relaciones familiares
familyData.addSpouseRelationship('juan-alvarez', 'maria-mejia');
familyData.addRelationship('juan-alvarez', 'pepe-alvarez');
familyData.addRelationship('juan-alvarez', 'luz-alvarez');
familyData.addRelationship('juan-alvarez', 'dan-alvarez');
familyData.addRelationship('juan-alvarez', 'itzel-alvarez');
familyData.addRelationship('maria-mejia', 'pepe-alvarez');
familyData.addRelationship('maria-mejia', 'luz-alvarez');
familyData.addRelationship('maria-mejia', 'dan-alvarez');
familyData.addRelationship('maria-mejia', 'itzel-alvarez');

// Agregar más familias si es necesario...
// Familia Contreras Álvarez (ejemplo)
familyData.addMember('carlos-contreras', 'Carlos Contreras', 1948);
familyData.addMember('ana-alvarez', 'Ana Álvarez', 1950);
familyData.addMember('luis-contreras', 'Luis Contreras Álvarez', 1972);
familyData.addMember('sofia-contreras', 'Sofía Contreras Álvarez', 1974);

familyData.addSpouseRelationship('carlos-contreras', 'ana-alvarez');
familyData.addRelationship('carlos-contreras', 'luis-contreras');
familyData.addRelationship('carlos-contreras', 'sofia-contreras');
familyData.addRelationship('ana-alvarez', 'luis-contreras');
familyData.addRelationship('ana-alvarez', 'sofia-contreras');

export default familyData;
export { Family, Person };
