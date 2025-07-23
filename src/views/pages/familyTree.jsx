import BoxBasic from "../components/box";
import Gallery from "../components/masonry";
import PrimaryHeader from "../components/primaryHeader";
import RotatingText from "../components/rotatingText";
import FamilyTreeComponent from "../components/familyTreeComponent";
import familyData from "../../data/family";

// Datos de prueba para el componente Gallery
const items = [
    {
        id: 1,
        img: "https://picsum.photos/800/600?random=1",
        height: 400,
        url: "#"
    },
    {
        id: 2,
        img: "https://picsum.photos/800/600?random=2",
        height: 400,
        url: "#"
    },
    {
        id: 3,
        img: "https://picsum.photos/800/600?random=3",
        height: 400,
        url: "#"
    },
    {
        id: 4,
        img: "https://picsum.photos/800/600?random=4",
        height: 400,
        url: "#"
    },
    {
        id: 5,
        img: "https://picsum.photos/800/600?random=5",
        height: 400,
        url: "#"
    },
    {
        id: 6,
        img: "https://picsum.photos/800/600?random=6",
        height: 400,
        url: "#"
    },
    {
        id: 7,
        img: "https://picsum.photos/800/600?random=7",
        height: 400,
        url: "#"
    },
    {
        id: 8,
        img: "https://picsum.photos/800/600?random=8",
        height: 400,
        url: "#"
    },
    {
        id: 9,
        img: "https://picsum.photos/800/600?random=9",
        height: 400,
        url: "#"
    },
    {
        id: 10,
        img: "https://picsum.photos/800/600?random=10",
        height: 400,
        url: "#"
    },
    {
        id: 11,
        img: "https://picsum.photos/800/600?random=11",
        height: 400,
        url: "#"
    },
    {
        id: 12,
        img: "https://picsum.photos/800/600?random=12",
        height: 400,
        url: "#"
    },
    {
        id: 'rotating-text',
        isRotatingText: true,
        height: 400,
        url: "#"
    }
];


function FamilyTree() {

    return (
        <BoxBasic 
            sx={{
                background: '#fefefe',
                minHeight: '100vh'
            }}
        >
            {/* Gallery Section - Full Width */}
            <BoxBasic 
                sx={{
                    padding: '0px',
                    minHeight: 'auto',
                    width: '100%'
                }}
            >
                <Gallery
                    items={items}
                    autoPlayInterval={3000}
                    ease="power2.out"
                    duration={0.6}
                    showThumbnails={true}
                    enableAutoplay={true}
                    rotatingTextComponent={
                        <PrimaryHeader text='' className="gallery-rotating-header">
                            <RotatingText
                            texts={['Álvarez Mejía', 
                                'Contreras Álvarez',
                                'Ortega Álvarez',
                                'Álvarez Cejudo',
                                'Álvarez Ramos',
                                'Castañeda Álvarez',
                                'García Álvarez',
                                'Blanco Álvarez',]}
                            mainClassName="gallery-rotating-text overflow-hidden justify-center"
                            staggerFrom={"last"}
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-100%" }}
                            staggerDuration={0.025}
                            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            rotationInterval={3000}
                        />
                        </PrimaryHeader>
                    }
                />
            </BoxBasic>

            {/* Family Tree Section */}
            <BoxBasic 
                sx={{
                    padding: '0px',
                    minHeight: 'auto'
                }}
            >
                <FamilyTreeComponent
                    familyData={familyData}
                    parentIds={['salvador-alvarez-pulido', 'regina-mejia-mendoza']}
                    title="Familia Álvarez Mejía"
                    showDeceasedStatus={true}
                    onPersonClick={(person) => {
                        console.log('Persona seleccionada:', person);
                    }}
                />
            </BoxBasic>
        </BoxBasic>
    );
}

export default FamilyTree;