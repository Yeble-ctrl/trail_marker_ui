import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom'

interface IFormInput {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
}

export interface FormValues {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
}

export default function GetStartedPage() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        navigate("/get_started_page_2");
        console.log(data);
        localStorage.setItem("user_data", JSON.stringify(data));
        /*console.log(data);
        // Send a POST request to the API endpoint with the form data
        const response = fetch("http://localhost:8000/trail-marker-accounts/users/",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)}
        )
        response.then((res) => {
            alert(`${res.status}: ${res.statusText}}`)
        })
        .catch((error) => {
            alert("Error creating user: " + error.message)
        })*/
    }
    return (
        <div className="flex flex-col justify-center items-center font-grotesk h-screen bg-gradient-to-b from-[#F5F5F5] to-[#FFFFFF] gap-4 p-2">
            <h1 className="text-3xl text-purple-600 font-black">Get started</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 mb-4 w-1/2 md:w-auto items-center text-center">
                <input
                    {...register("first_name", { required: true })}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-purple-500
                    placeholder:text-gray-400 placeholder:font-light placeholder:text-sm"
                    placeholder="first name"
                    type="text"
                />
                <input
                    {...register("last_name", { required: true })}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-purple-500
                    placeholder:text-gray-400 placeholder:font-light placeholder:text-sm"
                    placeholder="last name"
                    type="text"
                />
                <input
                    {...register("username", { required: true, minLength: 4 })}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-purple-500
                    placeholder:text-gray-400 placeholder:font-light placeholder:text-sm"
                    placeholder="username"
                    type="text"
                />
                <input
                    {...register("email", { required: true })}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-purple-500
                    placeholder:text-gray-400 placeholder:font-light placeholder:text-sm"
                    placeholder="email address"
                    type="email"
                />
                <Button className="w-30 text-base bg-purple-600" type="submit">Proceed</Button>
            </form>
        </div>
    );
}