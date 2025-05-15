import { Button } from "./components/ui/button";
import { Link } from "react-router-dom";

export default function FinishSetUpPage(){
    return (
        <div className="flex flex-col font-grotesk justify-center h-screen bg-gradient-to-b from-[#F5F5F5] to-[#FFFFFF] p-4">
            <h1 className="text-2xl text-purple-600 font-black">&#128640; You are all set @{localStorage.getItem('username') || ''}</h1>
            <h1 className="text-2xl text-zinc-700 font-black">Your Trail marker profile <br />is ready for viewing</h1>
            <Link to={"/home_page"}>
                <Button className="w-30 text-lg bg-purple-600 mt-4">Proceed</Button>
            </Link>
        </div>
    );
}