import Add from "./nodes/Add";
import TextureSample from "./nodes/TextureSample";
import Material from "./nodes/Material";
import TextureCoords from "./nodes/TextureCoords";
import Float from "./nodes/Float";
import ElapsedTime from "./nodes/ElapsedTime";
import Multiply from "./nodes/Multiply";
import Sin from "./nodes/Sin";
import Divide from "./nodes/Divide";
import Max from "./nodes/Max";
import Min from "./nodes/Min";
import RGB from "./nodes/RGB";
import VertexCoords from "./nodes/VertexCoords";
import CameraCoords from "./nodes/CameraCoords";
import NormalVector from "./nodes/NormalVector";
import ToTangentSpace from "./nodes/ToTangentSpace";
import ViewDirection from "./nodes/ViewDirection";
import ParallaxOcclusionMapping from "./nodes/ParallaxOcclusionMapping";
import PerlinNoise from "./nodes/PerlinNoise";

export const allNodes = [
    {
        label: 'PerlinNoise',
        dataTransfer: 'PerlinNoise',
        tooltip: 'Perlin Noise.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new PerlinNoise()
    },
    {
        label: 'TextureCoords',
        dataTransfer: 'TextureCoords',
        tooltip: 'Fragment texture coordinates.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new TextureCoords()
    },
    {
        label: 'CameraCoords',
        dataTransfer: 'CameraCoords',
        tooltip: 'Camera coordinates.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new CameraCoords()
    },
    {
        label: 'VertexCoords',
        dataTransfer: 'VertexCoords',
        tooltip: 'Vertex coordinates.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new VertexCoords()
    },
    {
        label: 'NormalVector',
        dataTransfer: 'NormalVector',
        tooltip: 'Surface normal.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new NormalVector()
    },
    {
        label: 'ToTangentSpace',
        dataTransfer: 'ToTangentSpace',
        tooltip: 'To tangent space matrix.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new ToTangentSpace()
    },
    {
        label: 'ViewDirection',
        dataTransfer: 'ViewDirection',
        tooltip: 'View direction vector.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new ViewDirection()
    },
    {
        label: 'ParallaxOcclusionMapping',
        dataTransfer: 'ParallaxOcclusionMapping',
        tooltip: 'Parallax occlusion mapping.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new ParallaxOcclusionMapping()
    },


    {
        label: 'Add',
        dataTransfer: 'Add',
        tooltip: 'Adds two values (float, int, vec2, vec3, vec4)',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new Add()
    },
    {
        label: 'TextureSample',
        dataTransfer: 'TextureSample',
        tooltip: 'Gets texture value (sampler 2d)',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new TextureSample()
    },
    {
        label: 'Material',
        unique:true,
        dataTransfer: 'Material',
        tooltip: 'Mesh Material',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new Material()
    },
    {
        label: 'Float',
        dataTransfer: 'Float',
        tooltip: 'Float uniform.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new Float()
    },  {
        label: 'Elapsed',
        dataTransfer: 'ElapsedTime',
        tooltip: 'Elapsed time.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new ElapsedTime()
    }, {
        label: 'Multiply',
        dataTransfer: 'Multiply',
        tooltip: 'Multiplies two values.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new Multiply()
    },
    {
        label: 'Sine',
        dataTransfer: 'Sine',
        tooltip: 'Sine of a value.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new Sin()
    },    {
        label: 'Divide',
        dataTransfer: 'Divide',
        tooltip: 'Divides two values.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new Divide()
    },{
        label: 'Min',
        dataTransfer: 'Min',
        tooltip: 'Min between two values.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new Min()
    },{
        label: 'Max',
        dataTransfer: 'Max',
        tooltip: 'Max between two values.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new Max()
    },{
        label: 'RGB',
        dataTransfer: 'RGB',
        tooltip: 'RGB color.',
        icon: <span className={'material-icons-round'}>plus</span>,
        getNewInstance: () => new RGB()
    },
]