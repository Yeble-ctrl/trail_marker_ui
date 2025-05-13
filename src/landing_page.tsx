import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom'

export default function Landing_page(){
    return (
        <div className="flex flex-col font-grotesk justify-center h-screen items-center text-center bg-gradient-to-b from-[#F5F5F5] to-[#FFFFFF]">
            <h1 className="text-3xl text-purple-600 font-black">Trail Marker</h1>
            <h1 className="text-3xl text-black font-black">Your journey, Your story, <br/>Your portfolio.</h1>
            <p className="text-lg text-black font-light pt-2">Build Your portfolio and have it live on the internet.</p>
            <div className="flex flex-row justify-center items-center pt-4">
                <Link to={"/get_started_page"}>
                    <Button className="w-30 text-lg bg-purple-600">Get started</Button>
                </Link>
                <Link to={"/login_page"}>
                    <Button className="w-30 text-lg bg-purple-600 ml-4">Login</Button>
                </Link>
            </div>
        </div>
    );
}