// Estructura de datos familiar usando clases para mejor organización

class Person {
  constructor(id, name, isDeceased = false, photo = null, email = null, phone = null, birthOrder = null) {
    this.id = id;
    this.name = name;
    this.isDeceased = isDeceased;
    this.photo = photo;
    this.email = email;
    this.phone = phone;
    this.birthOrder = birthOrder;
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

  addMember(id, name, isDeceased = false, photo = null, email = null, phone = null, birthOrder = null) {
    const person = new Person(id, name, isDeceased, photo, email, phone, birthOrder);
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

    // Ordenar hijos por orden de nacimiento (1 = mayor, 2 = siguiente, etc.)
    allChildren.sort((a, b) => {
      if (a.birthOrder === null && b.birthOrder === null) return 0;
      if (a.birthOrder === null) return 1;
      if (b.birthOrder === null) return -1;
      return a.birthOrder - b.birthOrder;
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
familyData.addMember('salvador-alvarez-pulido', 'Salvador Álvarez Pulido', true, '/src/views/public/salvadorAlvarez.jpg', null, null);
familyData.addMember('regina-mejia-mendoza', 'Regina Mejía Mendoza', true, '/src/views/public/reginaMejia.jpg', null, null);
familyData.addSpouseRelationship('salvador-alvarez-pulido', 'regina-mejia-mendoza');

familyData.addMember('maria-del-refugio-alvarez-mejia', 'María del Refugío Álvarez Mejía', true, 'https://picsum.photos/150/150?random=1', null, null, 1); // 1
familyData.addMember('maria-del-carmen-alvarez-mejia', 'María del Carmen Álvarez Mejía', true, '/src/views/public/carmenAlvarezMejia.jpg', null, null, 3); // 3 
familyData.addMember('francisca-alvarez-mejia', 'francisca Álvarez Mejía', true, '/src/views/public/mamiPachis.jpg', null, null, 2); // 2
familyData.addMember('salvador-alvarez-mejia', 'Salvador Álvarez Mejía', true, '/src/views/public/salvadorAlvarezMejia.jpg', null, null, 6);  // 6
familyData.addMember('maria-guadalupe-alvarez-mejia', 'María Guadalupe Álvarez Mejía', true, '/src/views/public/lupeAlvarezMejia.jpg', null, null, 5); // 5
familyData.addMember('ezequiel-alvarez-mejia', 'Ezequiel Álvarez Mejía', true, '/src/views/public/ezequielAlvarezMejia.jpg', null, null, 4); // 4
familyData.addMember('luz-maria-alvarez-mejia', 'Luz María Álvarez Mejía', false, '/src/views/public/luzmariaAlvarezMejia.jpg', null, null, 7); // 7

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
familyData.addMember('manuel-blanco-cuevas', 'Manuel Blanco Cuevas', true, '/src/views/public/manuelBlancoCuevas.jpg', null, null);
familyData.addSpouseRelationship('maria-del-refugio-alvarez-mejia', 'manuel-blanco-cuevas');

familyData.addMember('apolinar-blanco-alvarez', 'Apolinar Blanco Alvarez', false, 'https://picsum.photos/150/150?random=1', null, null, 3); // 2
familyData.addMember('gonzalo-blanco-alvarez', 'Gonzalo Blanco Álvarez', true, 'https://picsum.photos/150/150?random=1', null, null, 4); // 4
familyData.addMember('benita-blanco-alvarez', 'Benita Blanco Álvarez', false, '/src/views/public/benitaBlancoAlvarez.jpg', null, null, 5); // 6
familyData.addMember('maria-de-jesus-blanco-alvarez', 'María de Jesús Blanco Álvarez', true, '/src/views/public/chuyBlancoAlvarez.jpg', null, null, 6); // 5
familyData.addMember('maria-del-carmen-blanco-alvarez', 'María del Carmen Blanco Álvarez', false, '/src/views/public/carmelitaBlancoAlvarez.jpg', null, null, 7); // 8
familyData.addMember('francisca-blanco-alvarez', 'Francisca Blanco Álvarez', false, '/src/views/public/franciscaBlancoAlvarez.jpg', null, null, 8); // 7
familyData.addMember('cecilia-blanco-alvarez', 'Cecilia Blanco Álvarez', false, '/src/views/public/ceciliaBlancoAlvarez.jpg', null, null, 9); // 9
familyData.addMember('juan-blanco-alvarez', 'Juan Blanco Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null, 10); // 10
familyData.addMember('alma-rosa-blanco-alvarez', 'Alma Rosa Blanco Álvarez', true, 'https://picsum.photos/150/150?random=1', null, null, 11); // 10
familyData.addMember('ruben-blanco-alvarez', 'Rubén Blanco Álvarez', true, 'https://picsum.photos/150/150?random=1', null, null, 2); // 1
familyData.addMember('maria-luisa-blanco-alvarez', 'María Luisa Blanco Álvarez', true, 'https://picsum.photos/150/150?random=1', null, null, 1); // 3

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
familyData.addRelationship('maria-del-refugio-alvarez-mejia', 'alma-rosa-blanco-alvarez');

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
familyData.addRelationship('manuel-blanco-cuevas', 'alma-rosa-blanco-alvarez');

// Familia de cecilia Blanco Álvarez
familyData.addMember('alma-blanco-TODO', 'Alma Blanco TODO', false, '/src/views/public/almaBlancoTODO.jpg', null, null);
familyData.addRelationship('cecilia-blanco-alvarez', 'alma-blanco-TODO');

// Familia Castañeda Álvarez
familyData.addMember('salvador-castañeda-espinosa', 'Salvador Castañeda Espinosa', true, 'https://picsum.photos/150/150?random=1', null, null);
familyData.addSpouseRelationship('maria-del-carmen-alvarez-mejia', 'salvador-castañeda-espinosa');

familyData.addMember('david-castañeda-alvarez', 'David Castañeda Álvarez', false, '/src/views/public/davidCastanedaAlvarez.jpg', null, null, 1); // 1
familyData.addMember('jorge-castañeda-alvarez', 'Jorge Castañeda Álvarez', true, 'https://picsum.photos/150/150?random=1', null, null, 2); // 2
familyData.addMember('lucia-castañeda-alvarez', 'Lucía Castañeda Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null, 3); // 3
familyData.addMember('gloria-castañeda-alvarez', 'Gloria Castañeda Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null, 4); // 4
familyData.addMember('lourdes-castañeda-alvarez', 'Lourdes Castañeda Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null, 5); // 5

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
familyData.addMember('jose-contreras-galarza', 'José Contreras Galarza', true, '/src/views/public/joseContreras.jpg', null, null);
familyData.addSpouseRelationship('francisca-alvarez-mejia', 'jose-contreras-galarza');

familyData.addMember('arturo-contreras-alvarez', 'Arturo Contreras Álvarez', true, '/src/views/public/arturoContrerasAlvarez.jpg', null, null, 11); // 11
familyData.addMember('aurora-contreras-alvarez', 'Aurora Contreras Álvarez', true, '/src/views/public/yayisContrerasAlvarez.jpg', null, null, 1); // 1
familyData.addMember('maria-martina-contreras-alvarez', 'María Martina Contreras Álvarez', false, '/src/views/public/tinaContrerasAlvarez.jpg', null, null, 10); // 10
familyData.addMember('juan-carlos-contreras-alvarez', 'Juan Carlos Contreras Álvarez', false, '/src/views/public/papa.jpg', null, null, 9); // 9
familyData.addMember('ana-maria-contreras-alvarez', 'Ana María Contreras Álvarez', true, '/src/views/public/anaContrerasAlvarez.jpg', null, null, 2); // 2
familyData.addMember('evangelina-contreras-alvarez', 'Evangelina Contreras Álvarez', false, '/src/views/public/evaContrerasAlvarez.jpg', null, null, 8); // 8
familyData.addMember('jose-luis-contreras-alvarez', 'José Luis Contreras Álvarez', false, '/src/views/public/joseLuisContrerasAlvarez.jpg', null, null, 3); // 3
familyData.addMember('salvador-contreras-alvarez', 'Salvador Contreras Álvarez', false, '/src/views/public/salvadorContrerasAlvarez.jpg', null, null, 7); // 7
familyData.addMember('bertha-contreras-alvarez', 'Bertha Contreras Álvarez', false, '/src/views/public/berthaContrerasAlvarez.jpg', null, null, 5); // 5
familyData.addMember('francisco-javier-contreras-alvarez', 'Francisco Javier Contreras Álvarez', false, '/src/views/public/javierContrerasAlvarez.jpg', null, null, 4); // 4
familyData.addMember('jose-de-jesus-contreras-alvarez', 'José de Jesús Contreras Álvarez', false, '/src/views/public/chuyContrerasAlvarez.jpg', null, null, 6); // 6

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

// Hijos de Jose Luis Contreras Álvarez
familyData.addMember('luis-ivan-contreras-ley', 'Luis Iván Contreras Ley', false, 'https://picsum.photos/150/150?random=1', null, null, 1); // 1
familyData.addMember('julio-contreras-ley', 'Julio Contreras Ley', false, 'https://picsum.photos/150/150?random=1', null, null, 2); // 2
familyData.addMember('eduardo-contreras-ley', 'Eduardo Contreras Ley', false, 'https://picsum.photos/150/150?random=1', null, null, 3); // 3

// Relaciones familiares hijos de José Luis Contreras Álvarez
familyData.addRelationship('jose-luis-contreras-alvarez', 'luis-ivan-contreras-ley');
familyData.addRelationship('jose-luis-contreras-alvarez', 'julio-contreras-ley');
familyData.addRelationship('jose-luis-contreras-alvarez', 'eduardo-contreras-ley');

// Pareja de Ana María Contreras Álvarez
familyData.addMember('marco-antonio-espinoza', 'Marco Antonio Espinoza', true, 'https://picsum.photos/150/150?random=1', null, null);
familyData.addSpouseRelationship('ana-maria-contreras-alvarez', 'marco-antonio-espinoza');

// Hijos de Ana María Contreras Álvarez
familyData.addMember('guadalupe-espinoza-contreras', 'Guadalupe Espinoza Contreras', false, 'https://picsum.photos/150/150?random=1', null, null, 1);
familyData.addMember('ana-espinoza-contreras', 'Ana Espinoza Contreras', false, 'https://picsum.photos/150/150?random=1', null, null, 3);
familyData.addMember('tere-espinoza-contreras', 'Tere Espinoza Contreras', false, 'https://picsum.photos/150/150?random=1', null, null, 2);
familyData.addMember('angelita-espinoza-contreras', 'Angelita Espinoza Contreras', false, 'https://picsum.photos/150/150?random=1', null, null, 4);

// Relaciones familiares hijos de Ana María Contreras Álvarez
familyData.addRelationship('ana-maria-contreras-alvarez', 'guadalupe-espinoza-contreras');
familyData.addRelationship('ana-maria-contreras-alvarez', 'ana-espinoza-contreras');
familyData.addRelationship('ana-maria-contreras-alvarez', 'tere-espinoza-contreras');

// Pareja de Francisco Javier Contreras Álvarez
familyData.addMember('maria-del-pilar-garcia', 'María del Pilar García', false, '/src/views/public/piliGarcia.jpg', null, null);
familyData.addSpouseRelationship('francisco-javier-contreras-alvarez', 'maria-del-pilar-garcia');

// Hijos de Francisco Javier Contreras Álvarez
familyData.addMember('panchito-contreras-garcia', 'Francisco Javier Contreras García', false, 'https://picsum.photos/150/150?random=1', null, null, 1);
familyData.addMember('jose-antonio-contreras-garcia', 'José Antonio Contreras García', false, 'https://picsum.photos/150/150?random=1', null, null, 2);
familyData.addMember('eva-contreras-garcia', 'Eva Contreras García', false, 'https://picsum.photos/150/150?random=1', null, null, 3);
familyData.addMember('jorge-luis-contreras-garcia', 'Jorge Luis Contreras García', false, 'https://picsum.photos/150/150?random=1', null, null, 4);
familyData.addMember('miguel-angel-contreras-garcia', 'Miguel Ángel Contreras García', false, 'https://picsum.photos/150/150?random=1', null, null, 5);

// Relaciones familiares hijos de Francisco Javier Contreras Álvarez
familyData.addRelationship('francisco-javier-contreras-alvarez', 'panchito-contreras-garcia');
familyData.addRelationship('francisco-javier-contreras-alvarez', 'jose-antonio-contreras-garcia');
familyData.addRelationship('francisco-javier-contreras-alvarez', 'eva-contreras-garcia');
familyData.addRelationship('francisco-javier-contreras-alvarez', 'jorge-luis-contreras-garcia');
familyData.addRelationship('francisco-javier-contreras-alvarez', 'miguel-angel-contreras-garcia');

familyData.addRelationship('maria-del-pilar-garcia', 'panchito-contreras-garcia');
familyData.addRelationship('maria-del-pilar-garcia', 'jose-antonio-contreras-garcia');
familyData.addRelationship('maria-del-pilar-garcia', 'eva-contreras-garcia');
familyData.addRelationship('maria-del-pilar-garcia', 'jorge-luis-contreras-garcia');
familyData.addRelationship('maria-del-pilar-garcia', 'miguel-angel-contreras-garcia');

// Pareja de Bertha Contreras Álvarez
familyData.addMember('leoncio-terrones-ortega', 'Leoncio Terrones Ortega', false, '/src/views/public/leonTerrones.jpg', null, null, 1);
familyData.addSpouseRelationship('bertha-contreras-alvarez', 'leoncio-terrones-ortega');

// Hijos de Bertha Contreras Álvarez
familyData.addMember('jose-ramon-terrones-contreras', 'José Ramón Terrones Contreras', false, 'https://picsum.photos/150/150?random=1', null, null, 1);
familyData.addMember('alma-patricia-terrones-contreras', 'Alma Patricia Terrones Contreras', false, 'https://picsum.photos/150/150?random=1', null, null, 2);
familyData.addMember('leon-sergio-terrones-contreras', 'Leon Sergio Terrones Contreras', false, 'https://picsum.photos/150/150?random=1', null, null, 3);
familyData.addMember('jazmin-terrones-contreras', 'Jazmín Terrones Contreras', false, 'https://picsum.photos/150/150?random=1', null, null, 4);
familyData.addMember('mario-alberto-terrones-contreras', 'Mario Alberto Terrones Contreras', false, 'https://picsum.photos/150/150?random=1', null, null, 5);

// Relaciones familiares hijos de Bertha Contreras Álvarez
familyData.addRelationship('bertha-contreras-alvarez', 'jose-ramon-terrones-contreras');
familyData.addRelationship('bertha-contreras-alvarez', 'alma-patricia-terrones-contreras');
familyData.addRelationship('bertha-contreras-alvarez', 'leon-sergio-terrones-contreras');
familyData.addRelationship('bertha-contreras-alvarez', 'jazmin-terrones-contreras');
familyData.addRelationship('bertha-contreras-alvarez', 'mario-alberto-terrones-contreras');

// Pareja de Salvador Contreras Álvarez
familyData.addMember('celia-galvan-perez', 'Celia Galván Perez', false, 'https://picsum.photos/150/150?random=1', null, null, 1);
familyData.addSpouseRelationship('salvador-contreras-alvarez', 'celia-galvan-perez');

// Hijos de Salvador Contreras Álvarez
familyData.addMember('mayra-contreras-rios', 'Mayra Contreras Ríos', false, 'https://picsum.photos/150/150?random=1', null, null, 1);
familyData.addMember('mireya-contreras-rios', 'Mireya Contreras Ríos', false, 'https://picsum.photos/150/150?random=1', null, null, 2);
familyData.addMember('samantha-contreras-rios', 'Samantha Contreras Ríos', false, 'https://picsum.photos/150/150?random=1', null, null, 3);
familyData.addMember('salvador-contreras-galvan', 'Salvador Contreras Galván', false, 'https://picsum.photos/150/150?random=1', null, null, 4);

// Relaciones familiares hijos de Salvador Contreras Álvarez
familyData.addRelationship('salvador-contreras-alvarez', 'mayra-contreras-rios');
familyData.addRelationship('salvador-contreras-alvarez', 'mireya-contreras-rios');
familyData.addRelationship('salvador-contreras-alvarez', 'samantha-contreras-rios');
familyData.addRelationship('salvador-contreras-alvarez', 'salvador-contreras-galvan');

familyData.addRelationship('celia-galvan-perez', 'salvador-contreras-galvan');

// Pareja de Evangelina Contreras Álvarez
familyData.addMember('carlos-romero-martinez', 'Carlos Romero Martínez', false, 'https://picsum.photos/150/150?random=1', null, null, 1);
familyData.addSpouseRelationship('evangelina-contreras-alvarez', 'carlos-romero-martinez');

// Hijos de Evangelina Contreras Álvarez
familyData.addMember('jennifer-romero-contreras', 'Jennifer Romero Contreras', false, 'https://picsum.photos/150/150?random=1', null, null, 1);

// RElaciones familiares hijos de Evangelina Contreras Álvarez
familyData.addRelationship('evangelina-contreras-alvarez', 'jennifer-romero-contreras');
familyData.addRelationship('carlos-romero-martinez', 'jennifer-romero-contreras');

// Pareja de Juan Carlos Contreras Álvarez
familyData.addMember('monica-chavez-hernandez', 'Mónica Chávez Hernández', false, '/src/views/public/mama.jpg', null, null, 1);
familyData.addSpouseRelationship('juan-carlos-contreras-alvarez', 'monica-chavez-hernandez');

// Hijos de Juan Carlos Contreras Álvarez
familyData.addMember('israel-contreras-chavez', 'Israel Contreras Chávez', false, 'https://picsum.photos/150/150?random=1', null, null, 1);
familyData.addMember('itzel-contreras-chavez', 'Itzel Contreras Chávez', false, 'https://picsum.photos/150/150?random=1', null, null, 2);
familyData.addMember('daniel-contreras-chavez', 'Daniel Contreras Chávez', false, 'https://picsum.photos/150/150?random=1', null, null, 3);

// Relaciones familiares hijos de Juan Carlos Contreras Álvarez
familyData.addRelationship('juan-carlos-contreras-alvarez', 'israel-contreras-chavez');
familyData.addRelationship('juan-carlos-contreras-alvarez', 'itzel-contreras-chavez');
familyData.addRelationship('juan-carlos-contreras-alvarez', 'daniel-contreras-chavez');
familyData.addRelationship('monica-chavez-hernandez', 'israel-contreras-chavez');
familyData.addRelationship('monica-chavez-hernandez', 'itzel-contreras-chavez');
familyData.addRelationship('monica-chavez-hernandez', 'daniel-contreras-chavez');

// Hijos de María Martina Contreras Álvarez
familyData.addMember('andrea-trevino-contreras', 'Andrea Treviño Contreras', false, 'https://picsum.photos/150/150?random=1', null, null, 1);
familyData.addMember('sofia-trevino-contreras', 'Sofía Treviño Contreras', false, 'https://picsum.photos/150/150?random=1', null, null, 2);
familyData.addMember('erika-trevino-contreras', 'Erika Treviño Contreras', false, 'https://picsum.photos/150/150?random=1', null, null, 3);
familyData.addMember('regina-trevino-contreras', 'Regina Treviño Contreras', false, 'https://picsum.photos/150/150?random=1', null, null, 4);

// Relaciones familiares hijos de María Martina Contreras Álvarez
familyData.addRelationship('maria-martina-contreras-alvarez', 'andrea-trevino-contreras');
familyData.addRelationship('maria-martina-contreras-alvarez', 'sofia-trevino-contreras');
familyData.addRelationship('maria-martina-contreras-alvarez', 'erika-trevino-contreras');
familyData.addRelationship('maria-martina-contreras-alvarez', 'regina-trevino-contreras');

// Familia Alvarez Ramos
familyData.addMember('judith-ramos-parra', 'Judith Ramos Parra', true, '/src/views/public/judithRamosParra.jpg', null, null);
familyData.addSpouseRelationship('salvador-alvarez-mejia', 'judith-ramos-parra');

familyData.addMember('rodrigo-alvarez-ramos', 'Rodrigo Álvarez Ramos', true, '/src/views/public/rodrigoAlvarezRamos.jpg', null, null, 3); // 3
familyData.addMember('salvador-alvarez-ramos', 'Salvador Álvarez Ramos', true, 'https://picsum.photos/150/150?random=1', null, null, 1); // 1
familyData.addMember('judith-alvarez-ramos', 'Judith Álvarez Ramos', false, 'https://picsum.photos/150/150?random=1', null, null, 2); // 2

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

familyData.addMember('regina-guadalupe-garcia-alvarez', 'Regina Guadalupe García Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null, 8); // 8
familyData.addMember('rodrigo-salvador-garcia-alvarez', 'Rodrigo Salvador García Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null, 7); // 7
familyData.addMember('marisela-garcia-alvarez', 'Marisela García Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null, 6); // 6
familyData.addMember('miguel-angel-garcia-alvarez', 'Miguel Ángel García Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null, 5); // 5
familyData.addMember('rafael-garcia-alvarez', 'Rafael García Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null, 2); // 2
familyData.addMember('antonio-garcia-alvarez', 'Antonio García Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null, 1); // 1
familyData.addMember('ofelia-garcia-alvarez', 'Ofelia García Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null, 3); // 3
familyData.addMember('rosa-maria-garcia-alvarez', 'Rosa María García Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null, 4); // 4

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

// Pareja de antonio García Álvarez
familyData.addMember('margarita-maldonado-villanueva', 'Margarita Maldonado Villanueva', false, 'https://picsum.photos/150/150?random=1', null, null, 1);
familyData.addSpouseRelationship('antonio-garcia-alvarez', 'margarita-maldonado-villanueva');

// Hijos de Antonio García Álvarez
familyData.addMember('cynthia-maria-garcia-maldonado', 'Cynthia María García Maldonado', false, 'https://picsum.photos/150/150?random=1', null, null, 1);
familyData.addMember('jose-antonio-garcia-maldonado', 'José Antonio García Maldonado', false, 'https://picsum.photos/150/150?random=1', null, null, 2);
familyData.addMember('flor-margarita-garcia-maldonado', 'Flor Margarita García Maldonado', false, 'https://picsum.photos/150/150?random=1', null, null, 3);
familyData.addMember('rafael-manuel-garcia-maldonado', 'Rafael Manuel García Maldonado', false, 'https://picsum.photos/150/150?random=1', null, null, 4);

// Relaciones familiares hijos de Antonio García Álvarez
familyData.addRelationship('antonio-garcia-alvarez', 'cynthia-maria-garcia-maldonado');
familyData.addRelationship('antonio-garcia-alvarez', 'jose-antonio-garcia-maldonado');
familyData.addRelationship('antonio-garcia-alvarez', 'flor-margarita-garcia-maldonado');
familyData.addRelationship('antonio-garcia-alvarez', 'rafael-manuel-garcia-maldonado');
familyData.addRelationship('margarita-maldonado-villanueva', 'cynthia-maria-garcia-maldonado');
familyData.addRelationship('margarita-maldonado-villanueva', 'jose-antonio-garcia-maldonado');
familyData.addRelationship('margarita-maldonado-villanueva', 'flor-margarita-garcia-maldonado');
familyData.addRelationship('margarita-maldonado-villanueva', 'rafael-manuel-garcia-maldonado');

// Pareja de Rosa María García Álvarez
familyData.addMember('cecilio-sanchez', 'Cecilio Sánchez', false, 'https://picsum.photos/150/150?random=1', null, null, 1);
familyData.addSpouseRelationship('rosa-maria-garcia-alvarez', 'cecilio-sanchez');

// Hijos de Rosa María García Álvarez
familyData.addMember('cecilia-sanchez-garcia', 'Cecilia Sanchez García', false, 'https://picsum.photos/150/150?random=1', null, null, 1);
familyData.addMember('rosa-sanchez-garcia', 'Rosa Sanchez García', false, 'https://picsum.photos/150/150?random=1', null, null, 2);
familyData.addMember('luis-sanchez-garcia', 'Luis Sanchez García', false, 'https://picsum.photos/150/150?random=1', null, null, 3);

// Relaciones familiares hijos de Rosa María García Álvarez
familyData.addRelationship('rosa-maria-garcia-alvarez', 'cecilia-sanchez-garcia');
familyData.addRelationship('rosa-maria-garcia-alvarez', 'rosa-sanchez-garcia');
familyData.addRelationship('rosa-maria-garcia-alvarez', 'luis-sanchez-garcia');
familyData.addRelationship('cecilio-sanchez', 'cecilia-sanchez-garcia');
familyData.addRelationship('cecilio-sanchez', 'rosa-sanchez-garcia');
familyData.addRelationship('cecilio-sanchez', 'luis-sanchez-garcia');

// Familia Álvarez Cejudo
familyData.addMember('yolanda-cejudo-uribe', 'Yolanda Cejudo Uribe', false, '/src/views/public/yolandaCejudoUribe.jpg', null, null);
familyData.addSpouseRelationship('ezequiel-alvarez-mejia', 'yolanda-cejudo-uribe');

familyData.addMember('cuauhtemoc-alvarez-cejudo', 'Cuauhtémoc Álvarez Cejudo', false, '/src/views/public/cuauhAlvarezCejudo.jpg', null, null, 1); // 1
familyData.addMember('iztaccihuatl-alvarez-cejudo', 'Iztaccíhuatl Álvarez Cejudo', false, '/src/views/public/iztaAlvarezCejudo.jpg', null, null, 4); // 4
familyData.addMember('netzahualcoyotl-alvarez-cejudo', 'Nezahualcóyotl Álvarez Cejudo', false, '/src/views/public/nezaAlvarezCejudo.jpg', null, null, 3); // 3
familyData.addMember('cuitlahuac-alvarez-cejudo', 'Cuitláhuac Álvarez Cejudo', false, '/src/views/public/cuitlahuacAlvarezCejudo.jpg', null, null, 2); // 2

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
familyData.addMember('alejando-ortega-muñoz', 'Alejando Ortega Muñoz', true, 'https://picsum.photos/150/150?random=1', null, null);
familyData.addSpouseRelationship('luz-maria-alvarez-mejia', 'alejando-ortega-muñoz');

familyData.addMember('ezequiel-ernesto-ortega-alvarez', 'Ezequiel Ernesto Ortega Álvarez', true, 'https://picsum.photos/150/150?random=1', null, null, 1); // 1
familyData.addMember('regina-de-la-luz-ortega-alvarez', 'Regina de la Luz Ortega Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null, 4); // 4
familyData.addMember('alejandro-ortega-alvarez', 'Alejandro Ortega Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null, 3); // 3
familyData.addMember('hector-manuel-ortega-alvarez', 'Héctor Manuel Ortega Álvarez', false, 'https://picsum.photos/150/150?random=1', null, null, 2); // 2

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
