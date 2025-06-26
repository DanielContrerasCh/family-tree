import BoxBasic from "../components/box";
import Masonry from "../components/masonry";
import PrimaryHeader from "../components/primaryHeader";
import RotatingText from "../components/rotatingText";

// Datos de prueba para el componente Masonry
const items = [
    {
        id: 1,
        img: "https://picsum.photos/300/400?random=1",
        height: 400,
        url: "#"
    },
    {
        id: 2,
        img: "https://picsum.photos/300/300?random=2",
        height: 300,
        url: "#"
    },
    {
        id: 3,
        img: "https://picsum.photos/300/500?random=3",
        height: 500,
        url: "#"
    },
    {
        id: 4,
        img: "https://picsum.photos/300/350?random=4",
        height: 350,
        url: "#"
    },
    {
        id: 5,
        img: "https://picsum.photos/300/450?random=5",
        height: 450,
        url: "#"
    },
    {
        id: 6,
        img: "https://picsum.photos/300/280?random=6",
        height: 280,
        url: "#"
    },
    {
        id: 7,
        img: "https://picsum.photos/300/520?random=7",
        height: 520,
        url: "#"
    },
    {
        id: 8,
        img: "https://picsum.photos/300/380?random=8",
        height: 380,
        url: "#"
    },
    {
        id: 9,
        img: "https://picsum.photos/300/320?random=9",
        height: 320,
        url: "#"
    },
    {
        id: 10,
        img: "https://picsum.photos/300/480?random=10",
        height: 480,
        url: "#"
    },
    {
        id: 11,
        img: "https://picsum.photos/300/360?random=11",
        height: 360,
        url: "#"
    },
    {
        id: 12,
        img: "https://picsum.photos/300/420?random=12",
        height: 420,
        url: "#"
    }
];


function FamilyTree() {

    return (
        <BoxBasic>
            {/* Header Section */}
            <BoxBasic 
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    padding: '20px',
                    minHeight: 'auto'
                }}
            >
                <PrimaryHeader text=''>
                    <RotatingText
                    texts={['Álvarez Mejía', 
                        'Contreras Álvarez',
                        'Ortega Álvarez',
                        'Álvarez Cejudo',
                        'Álvarez Ramos',
                        'Castañeda Álvarez',
                        'García Álvarez',
                        'Blanco Álvarez',]}
                    mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                    staggerFrom={"last"}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={2000}
                />
                </PrimaryHeader>
            </BoxBasic>
            
            {/* Masonry Section */}
            <Masonry
                items={items}
                ease="power3.out"
                duration={0.6}
                stagger={0.05}
                animateFrom="bottom"
                scaleOnHover={true}
                hoverScale={0.95}
                blurToFocus={true}
                colorShiftOnHover={false}
            />
        </BoxBasic>
    );
}

export default FamilyTree;