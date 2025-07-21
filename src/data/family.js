// Estructura de datos familiar usando clases para mejor organización

class Person {
  constructor(id, name, isDeceased = false, photo = null, email = null, phone = null) {
    this.id = id;
    this.name = name;
    this.isDeceased = isDeceased;
    this.photo = photo;
    this.email = email;
    this.phone = phone;
    this.children = [];
    this.parents = [];
    this.spouse = null;
  }

  getDisplayName() {
    return this.name;
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

  addMember(id, name, isDeceased = false, photo = null, email = null, phone = null) {
    const person = new Person(id, name, isDeceased, photo, email, phone);
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

// Familia Álvarez Mejía
familyData.addMember('salvador-alvarez-pulido', 'Salvador Álvarez Pulido', true, 'https://picsum.photos/150/150?random=1', null, null);
familyData.addMember('regina-mejia-mendoza', 'Regina Mejía Mendoza', true, 'https://picsum.photos/150/150?random=1', null, null);
familyData.addSpouseRelationship('salvador-alvarez', 'regina-mejia');

familyData.addMember('maria-del-refugio-alvarez-mejia', 'María del Refugío Álvarez Mejía', true, 'https://picsum.photos/150/150?random=1', null, null); // 1
familyData.addMember('maria-del-carmen-alvarez-mejia', 'María del Carmen Álvarez Mejía', true, 'https://picsum.photos/150/150?random=1', null, null); // 3 
familyData.addMember('francisca-alvarez-mejia', 'francisca Álvarez Mejía', true, 'https://picsum.photos/150/150?random=1', null, null); // 2
familyData.addMember('salvador-alvarez-mejia', 'Salvador Álvarez Mejía', true, 'https://picsum.photos/150/150?random=1', null, null);  // 6
familyData.addMember('maria-guadalupe-alvarez-mejia', 'María Guadalupe Álvarez Mejía', true, 'https://picsum.photos/150/150?random=1', null, null); // 5
familyData.addMember('ezequiel-alvarez-mejia', 'Ezequiel Álvarez Mejía', true, 'https://picsum.photos/150/150?random=1', null, null); // 4
familyData.addMember('luz-maria-alvarez-mejia', 'Luz María Álvarez Mejía', false, 'https://picsum.photos/150/150?random=1', null, null); // 7

familyData.addRelationship('salvador-alvarez-pulido', 'maria-del-refugio-alvarez-mejia');
familyData.addRelationship('salvador-alvarez-pulido', 'maria-del-carmen-alvarez-mejia');
familyData.addRelationship('salvador-alvarez-pulido', 'francisca-alvarez-mejia');
familyData.addRelationship('salvador-alvarez-pulido', 'salvador-alvarez-mejia');
familyData.addRelationship('salvador-alvarez-pulido', 'maria-guadalupe-alvarez-mejia');
familyData.addRelationship('salvador-alvarez-pulido', 'ezequiel-alvarez-mejia');
familyData.addRelationship('salvador-alvarez-pulido', 'luz-maria-alvarez-mejia');

familyData.addRelationship('regina-mejia-mendoza', 'maria-del-refugio-alvarez-mejia');
familyData.addRelationship('regina-mejia-mendoza', 'maria-del-carmen-alvarez-mejia');
familyData.addRelationship('regina-mejia-mendoza', 'francisca-alvarez-mejia');
familyData.addRelationship('regina-mejia-mendoza', 'salvador-alvarez-mejia');
familyData.addRelationship('regina-mejia-mendoza', 'maria-guadalupe-alvarez-mejia');
familyData.addRelationship('regina-mejia-mendoza', 'ezequiel-alvarez-mejia');
familyData.addRelationship('regina-mejia-mendoza', 'luz-maria-alvarez-mejia');

// Familia Blanco Álvarez
familyData.addMember('manuel-blanco-cuevas', 'Manuel Blanco Cuevas', true, 'https://picsum.photos/150/150?random=1', null, null);
familyData.addSpouseRelationship('maria-del-refugio-alvarez-mejia', 'manuel-blanco-cuevas');

familyData.addMember('apolinar-blanco-alvarez', 'Apolinar Blanco Alvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 2
familyData.addMember('gonzalo-blanco-alvarez', 'Gonzalo Blanco Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 4
familyData.addMember('benita-blanco-alvarez', 'Benita Blanco Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 6
familyData.addMember('maria-de-jesus-blanco-alvarez', 'María de Jesús Blanco Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 5
familyData.addMember('maria-del-carmen-blanco-alvarez', 'María del Carmen Blanco Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 8
familyData.addMember('francisca-blanco-alvarez', 'Francisca Blanco Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 7
familyData.addMember('cecilia-blanco-alvarez', 'Cecilia Blanco Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 9
familyData.addMember('juan-blanco-alvarez', 'Juan Blanco Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 10
familyData.addMember('ruben-blanco-alvarez', 'Rubén Blanco Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 1
familyData.addMember('maria-luisa-blanco-alvarez', 'María Luisa Blanco Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 3

// Relaciones familiares Blanco Álvarez (hijos de María del Refugio y Manuel Blanco)
familyData.addRelationship('maria-del-refugio-alvarez-mejia', 'apolinar-blanco-alvarez');
familyData.addRelationship('maria-del-refugio-alvarez-mejia', 'gonzalo-blanco-alvarez');
familyData.addRelationship('maria-del-refugio-alvarez-mejia', 'benita-blanco-alvarez');
familyData.addRelationship('maria-del-refugio-alvarez-mejia', 'maria-de-jesus-blanco-alvarez');
familyData.addRelationship('maria-del-refugio-alvarez-mejia', 'maria-del-carmen-blanco-alvarez');
familyData.addRelationship('maria-del-refugio-alvarez-mejia', 'francisca-blanco-alvarez');
familyData.addRelationship('maria-del-refugio-alvarez-mejia', 'cecilia-blanco-alvarez');
familyData.addRelationship('maria-del-refugio-alvarez-mejia', 'juan-blanco-alvarez');
familyData.addRelationship('maria-del-refugio-alvarez-mejia', 'ruben-blanco-alvarez');
familyData.addRelationship('maria-del-refugio-alvarez-mejia', 'maria-luisa-blanco-alvarez');

familyData.addRelationship('manuel-blanco-cuevas', 'apolinar-blanco-alvarez');
familyData.addRelationship('manuel-blanco-cuevas', 'gonzalo-blanco-alvarez');
familyData.addRelationship('manuel-blanco-cuevas', 'benita-blanco-alvarez');
familyData.addRelationship('manuel-blanco-cuevas', 'maria-de-jesus-blanco-alvarez');
familyData.addRelationship('manuel-blanco-cuevas', 'maria-del-carmen-blanco-alvarez');
familyData.addRelationship('manuel-blanco-cuevas', 'francisca-blanco-alvarez');
familyData.addRelationship('manuel-blanco-cuevas', 'cecilia-blanco-alvarez');
familyData.addRelationship('manuel-blanco-cuevas', 'juan-blanco-alvarez');
familyData.addRelationship('manuel-blanco-cuevas', 'ruben-blanco-alvarez');
familyData.addRelationship('manuel-blanco-cuevas', 'maria-luisa-blanco-alvarez');

// Familia Castañeda Álvarez
familyData.addMember('salvador-castañeda-espinosa', 'Salvador Castañeda Espinosa', true, 'https://picsum.photos/150/150?random=1', null, null);
familyData.addSpouseRelationship('maria-del-carmen-alvarez-mejia', 'salvador-castañeda-espinosa');

familyData.addMember('david-castañeda-alvarez', 'David Castañeda Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 1
familyData.addMember('jorge-castañeda-alvarez', 'Jorge Castañeda Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 2
familyData.addMember('lucia-castañeda-alvarez', 'Lucía Castañeda Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 3
familyData.addMember('gloria-castañeda-alvarez', 'Gloria Castañeda Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 4
familyData.addMember('lourdes-castañeda-alvarez', 'Lourdes Castañeda Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 5

// Relaciones familiares Castañeda Álvarez (hijos de María del Carmen y Salvador Castañeda)
familyData.addRelationship('maria-del-carmen-alvarez-mejia', 'david-castañeda-alvarez');
familyData.addRelationship('maria-del-carmen-alvarez-mejia', 'jorge-castañeda-alvarez');
familyData.addRelationship('maria-del-carmen-alvarez-mejia', 'lucia-castañeda-alvarez');
familyData.addRelationship('maria-del-carmen-alvarez-mejia', 'gloria-castañeda-alvarez');
familyData.addRelationship('maria-del-carmen-alvarez-mejia', 'lourdes-castañeda-alvarez');

familyData.addRelationship('salvador-castañeda-espinosa', 'david-castañeda-alvarez');
familyData.addRelationship('salvador-castañeda-espinosa', 'jorge-castañeda-alvarez');
familyData.addRelationship('salvador-castañeda-espinosa', 'lucia-castañeda-alvarez');
familyData.addRelationship('salvador-castañeda-espinosa', 'gloria-castañeda-alvarez');
familyData.addRelationship('salvador-castañeda-espinosa', 'lourdes-castañeda-alvarez');

// Familia Contreras Álvarez
familyData.addMember('jose-contreras-galarza', 'José Contreras Galarza', true, 'https://picsum.photos/150/150?random=1', null, null);
familyData.addSpouseRelationship('francisca-alvarez-mejia', 'jose-contreras-galarza');

familyData.addMember('arturo-contreras-alvarez', 'Arturo Contreras Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 11
familyData.addMember('aurora-contreras-alvarez', 'Aurora Contreras Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 1
familyData.addMember('maria-martina-contreras-alvarez', 'María Martina Contreras Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 10
familyData.addMember('juan-carlos-contreras-alvarez', 'Juan Carlos Contreras Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 9
familyData.addMember('ana-maria-contreras-alvarez', 'Ana María Contreras Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 2
familyData.addMember('evangelina-contreras-alvarez', 'Evangelina Contreras Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 8
familyData.addMember('jose-luis-contreras-alvarez', 'José Luis Contreras Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 3
familyData.addMember('salvador-contreras-alvarez', 'Salvador Contreras Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 7
familyData.addMember('bertha-contreras-alvarez', 'Bertha Contreras Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 5
familyData.addMember('francisco-javier-contreras-alvarez', 'Francisco Javier Contreras Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 4
familyData.addMember('jose-de-jesus-contreras-alvarez', 'José de Jesús Contreras Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 6

// Relaciones familiares Contreras Álvarez (hijos de Francisca y José Contreras)
familyData.addRelationship('francisca-alvarez-mejia', 'arturo-contreras-alvarez');
familyData.addRelationship('francisca-alvarez-mejia', 'aurora-contreras-alvarez');
familyData.addRelationship('francisca-alvarez-mejia', 'maria-martina-contreras-alvarez');
familyData.addRelationship('francisca-alvarez-mejia', 'juan-carlos-contreras-alvarez');
familyData.addRelationship('francisca-alvarez-mejia', 'ana-maria-contreras-alvarez');
familyData.addRelationship('francisca-alvarez-mejia', 'evangelina-contreras-alvarez');
familyData.addRelationship('francisca-alvarez-mejia', 'jose-luis-contreras-alvarez');
familyData.addRelationship('francisca-alvarez-mejia', 'salvador-contreras-alvarez');
familyData.addRelationship('francisca-alvarez-mejia', 'bertha-contreras-alvarez');
familyData.addRelationship('francisca-alvarez-mejia', 'francisco-javier-contreras-alvarez');
familyData.addRelationship('francisca-alvarez-mejia', 'jose-de-jesus-contreras-alvarez');

familyData.addRelationship('jose-contreras-galarza', 'arturo-contreras-alvarez');
familyData.addRelationship('jose-contreras-galarza', 'aurora-contreras-alvarez');
familyData.addRelationship('jose-contreras-galarza', 'maria-martina-contreras-alvarez');
familyData.addRelationship('jose-contreras-galarza', 'juan-carlos-contreras-alvarez');
familyData.addRelationship('jose-contreras-galarza', 'ana-maria-contreras-alvarez');
familyData.addRelationship('jose-contreras-galarza', 'evangelina-contreras-alvarez');
familyData.addRelationship('jose-contreras-galarza', 'jose-luis-contreras-alvarez');
familyData.addRelationship('jose-contreras-galarza', 'salvador-contreras-alvarez');
familyData.addRelationship('jose-contreras-galarza', 'bertha-contreras-alvarez');
familyData.addRelationship('jose-contreras-galarza', 'francisco-javier-contreras-alvarez');
familyData.addRelationship('jose-contreras-galarza', 'jose-de-jesus-contreras-alvarez');

// Familia Alvarez Ramos
familyData.addMember('judith-ramos-parra', 'Judith Ramos Parra', true, 'https://picsum.photos/150/150?random=1', null, null);
familyData.addSpouseRelationship('salvador-alvarez-mejia', 'judith-ramos-parra');

familyData.addMember('rodrigo-alvarez-ramos', 'Rodrigo Álvarez Ramos', false, 'https://picsum.photos/150/150?random=1', null, null); // 3
familyData.addMember('salvador-alvarez-ramos', 'Salvador Álvarez Ramos', false, 'https://picsum.photos/150/150?random=1', null, null); // 1
familyData.addMember('judith-alvarez-ramos', 'Judith Álvarez Ramos', false, 'https://picsum.photos/150/150?random=1', null, null); // 2

// Relaciones familiares Álvarez Ramos (hijos de Salvador y Judith)
familyData.addRelationship('salvador-alvarez-mejia', 'rodrigo-alvarez-ramos');
familyData.addRelationship('salvador-alvarez-mejia', 'salvador-alvarez-ramos');
familyData.addRelationship('salvador-alvarez-mejia', 'judith-alvarez-ramos');

familyData.addRelationship('judith-ramos-parra', 'rodrigo-alvarez-ramos');
familyData.addRelationship('judith-ramos-parra', 'salvador-alvarez-ramos');
familyData.addRelationship('judith-ramos-parra', 'judith-alvarez-ramos');

// Familia García Álvarez
familyData.addMember('rafael-garcia-delgado', 'Rafael García Delgado', true, 'https://picsum.photos/150/150?random=1', null, null);
familyData.addSpouseRelationship('maria-guadalupe-alvarez-mejia', 'rafael-garcia-delgado');

familyData.addMember('regina-guadalupe-garcia-alvarez', 'Regina Guadalupe García Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 8
familyData.addMember('rodrigo-salvador-garcia-alvarez', 'Rodrigo Salvador García Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 7
familyData.addMember('marisela-garcia-alvarez', 'Marisela García Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 6
familyData.addMember('miguel-angel-garcia-alvarez', 'Miguel Ángel García Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 5
familyData.addMember('rafael-garcia-alvarez', 'Rafael García Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 2
familyData.addMember('antonio-garcia-alvarez', 'Antonio García Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 1
familyData.addMember('ofelia-garcia-alvarez', 'Ofelia García Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 3
familyData.addMember('rosa-maria-garcia-alvarez', 'Rosa María García Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 4

// Relaciones familiares García Álvarez (hijos de María Guadalupe y Rafael García)
familyData.addRelationship('maria-guadalupe-alvarez-mejia', 'regina-guadalupe-garcia-alvarez');
familyData.addRelationship('maria-guadalupe-alvarez-mejia', 'rodrigo-salvador-garcia-alvarez');
familyData.addRelationship('maria-guadalupe-alvarez-mejia', 'marisela-garcia-alvarez');
familyData.addRelationship('maria-guadalupe-alvarez-mejia', 'miguel-angel-garcia-alvarez');
familyData.addRelationship('maria-guadalupe-alvarez-mejia', 'rafael-garcia-alvarez');
familyData.addRelationship('maria-guadalupe-alvarez-mejia', 'antonio-garcia-alvarez');
familyData.addRelationship('maria-guadalupe-alvarez-mejia', 'ofelia-garcia-alvarez');
familyData.addRelationship('maria-guadalupe-alvarez-mejia', 'rosa-maria-garcia-alvarez');

familyData.addRelationship('rafael-garcia-delgado', 'regina-guadalupe-garcia-alvarez');
familyData.addRelationship('rafael-garcia-delgado', 'rodrigo-salvador-garcia-alvarez');
familyData.addRelationship('rafael-garcia-delgado', 'marisela-garcia-alvarez');
familyData.addRelationship('rafael-garcia-delgado', 'miguel-angel-garcia-alvarez');
familyData.addRelationship('rafael-garcia-delgado', 'rafael-garcia-alvarez');
familyData.addRelationship('rafael-garcia-delgado', 'antonio-garcia-alvarez');
familyData.addRelationship('rafael-garcia-delgado', 'ofelia-garcia-alvarez');
familyData.addRelationship('rafael-garcia-delgado', 'rosa-maria-garcia-alvarez');

// Familia Álvarez Cejudo
familyData.addMember('ezequiel-alvarez-mejia', 'Ezequiel Álvarez Mejía', true, 'https://picsum.photos/150/150?random=1', null, null);
familyData.addMember('yolanda-cejudo-uribe', 'Yolanda Cejudo Uribe', false, 'https://picsum.photos/150/150?random=1', null, null);
familyData.addSpouseRelationship('ezequiel-alvarez-mejia', 'yolanda-cejudo-uribe');

familyData.addMember('cuauhtemoc-alvarez-cejudo', 'Cuauhtémoc Álvarez Cejudo', false, 'https://picsum.photos/150/150?random=1', null, null); // 1
familyData.addMember('iztaccihuatl-alvarez-cejudo', 'Iztaccíhuatl Álvarez Cejudo', false, 'https://picsum.photos/150/150?random=1', null, null); // 4
familyData.addMember('netzahualcoyotl-alvarez-cejudo', 'Nezahualcóyotl Álvarez Cejudo', false, 'https://picsum.photos/150/150?random=1', null, null); // 3
familyData.addMember('cuitlahuac-alvarez-cejudo', 'Cuitláhuac Álvarez Cejudo', false, 'https://picsum.photos/150/150?random=1', null, null); // 2

// Relaciones familiares Álvarez Cejudo (hijos de Ezequiel y Yolanda)
familyData.addRelationship('ezequiel-alvarez-mejia', 'cuauhtemoc-alvarez-cejudo');
familyData.addRelationship('ezequiel-alvarez-mejia', 'iztaccihuatl-alvarez-cejudo');
familyData.addRelationship('ezequiel-alvarez-mejia', 'netzahualcoyotl-alvarez-cejudo');
familyData.addRelationship('ezequiel-alvarez-mejia', 'cuitlahuac-alvarez-cejudo');

familyData.addRelationship('yolanda-cejudo-uribe', 'cuauhtemoc-alvarez-cejudo');
familyData.addRelationship('yolanda-cejudo-uribe', 'iztaccihuatl-alvarez-cejudo');
familyData.addRelationship('yolanda-cejudo-uribe', 'netzahualcoyotl-alvarez-cejudo');
familyData.addRelationship('yolanda-cejudo-uribe', 'cuitlahuac-alvarez-cejudo');

// Familia Ortega Álvarez
familyData.addMember('alejando-ortega-muñoz', 'Alejando Ortega Muñoz', false, 'https://picsum.photos/150/150?random=1', null, null);
familyData.addSpouseRelationship('luz-maria-alvarez-mejia', 'alejando-ortega-muñoz');

familyData.addMember('ezequiel-ernesto-ortega-alvarez', 'Ezequiel Ernesto Ortega Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 1
familyData.addMember('regina-de-la-luz-ortega-alvarez', 'Regina de la Luz Ortega Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 4
familyData.addMember('alejandro-ortega-alvarez', 'Alejandro Ortega Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 3
familyData.addMember('hector-manuel-ortega-alvarez', 'Héctor Manuel Ortega Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null); // 2

// Relaciones familiares Ortega Álvarez (hijos de Luz María y Alejandro Ortega)
familyData.addRelationship('luz-maria-alvarez-mejia', 'ezequiel-ernesto-ortega-alvarez');
familyData.addRelationship('luz-maria-alvarez-mejia', 'regina-de-la-luz-ortega-alvarez');
familyData.addRelationship('luz-maria-alvarez-mejia', 'alejandro-ortega-alvarez');
familyData.addRelationship('luz-maria-alvarez-mejia', 'hector-manuel-ortega-alvarez');

familyData.addRelationship('alejando-ortega-muñoz', 'ezequiel-ernesto-ortega-alvarez');
familyData.addRelationship('alejando-ortega-muñoz', 'regina-de-la-luz-ortega-alvarez');
familyData.addRelationship('alejando-ortega-muñoz', 'alejandro-ortega-alvarez');
familyData.addRelationship('alejando-ortega-muñoz', 'hector-manuel-ortega-alvarez');



export default familyData;
export { Family, Person };
