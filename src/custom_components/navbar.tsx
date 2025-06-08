import { Link } from "react-router-dom";

export default function Navbar(){
    return(
        <div className="p-2 w-full h-14 bg-purple-600 flex flex-row items-center">
            <Link to={'/'}>
                <h1 className="text-white text-3xl font-black">Trail Marker</h1>
            </Link>
        </div>
    );
}