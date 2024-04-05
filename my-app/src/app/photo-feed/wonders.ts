import { StaticImageData } from "next/image";
import photo1 from "./photos/champagne.jpg";
import photo2 from "./photos/headPhone.jpg";
import photo3 from "./photos/loginPic.png";
import photo4 from "./photos/frag.jpg";
import photo5 from "./photos/instacartLogo.png";
import photo6 from "./photos/airlogo.jpg";
import photo7 from "./photos/wine.png";
export type WonderImage={
    id: string;
    name:string;
    src: StaticImageData;
    photographer:string;
    location:string;
}
const wonderImages: WonderImage[]=[
    {
        id:"1",
        name:"John",
        src:photo1,
        photographer:"john",
        location:"china"
    },
    {
        id:"1",
        name:"John",
        src:photo2,
        photographer:"john",
        location:"china"
    },
    {
        id:"1",
        name:"John",
        src:photo3,
        photographer:"john",
        location:"china"
    },
    {
        id:"1",
        name:"John",
        src:photo4,
        photographer:"john",
        location:"china"
    },
    {
        id:"1",
        name:"John",
        src:photo5,
        photographer:"john",
        location:"china"
    },
    {
        id:"1",
        name:"John",
        src:photo6,
        photographer:"john",
        location:"china"
    },
    {
        id:"1",
        name:"John",
        src:photo7,
        photographer:"john",
        location:"china"
    },
    {
        id:"1",
        name:"John",
        src:photo1,
        photographer:"john",
        location:"china"
    },
]
export default wonderImages
