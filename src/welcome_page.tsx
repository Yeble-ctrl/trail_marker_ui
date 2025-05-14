import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom'

export default function WelcomePage() {
    return(
        <div className="flex flex-col font-grotesk justify-center h-screen items-center bg-gradient-to-b from-[#F5F5F5] to-[#FFFFFF]">
            <h1 className="text-2xl text-purple-600 font-black">Welcome @{localStorage.getItem('username') || ''} to Trail marker</h1>
            <p className="text-base text-black font-light pt-2">lets set up your trail marker profile</p>
            <div className="flex flex-row justify-center items-center pt-4">
                <Link to={"/setup_profile_page"}>
                    <Button className="w-30 text-lg bg-purple-600">Proceed</Button>
                </Link>
                <Link to={"/home_page"}>
                    <Button className="w-30 text-lg text-purple-600 border-2 bg-white hover:bg-zinc-700 hover:border-0 hover:text-white ml-4">Skip</Button>
                </Link>
            </div>
        </div>
    );
}