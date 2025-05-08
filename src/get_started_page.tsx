import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";

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
    const [usernames, setUsernames] = useState<String[]>(['']);
    useEffect(() => {
        const fetchUsers = fetch("http://localhost:8000/trail-marker-accounts/users/", {method: "GET"})
        fetchUsers.then((res) => {
            if (res.ok) {
                res.json().then((data) => {
                    let usernames: string[] = [];
                    data.map((user: IFormInput) => usernames.push(user.username));
                    setUsernames(usernames);
                })
            } else {
                res.text().then((text) => {console.log(text)})
            }
        })
        .catch((error) => {
            alert("Error fetching users: " + error.message)
        })
    }, [])
    const navigate = useNavigate();
    const { register, handleSubmit, formState: {errors} } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        navigate("/get_started_page_2");
        sessionStorage.setItem("user_data", JSON.stringify(data));
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
                    {...register("username", { required: true, minLength: {value:4, message:'Username cannot be less than 4 characters'},
                        validate: (value) => {
                            if (usernames.includes(value)) {
                                return "Username already exists";
                            } else {
                                return true;
                            }
                        }})}
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
                {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                <Button className="w-30 text-base bg-purple-600" type="submit">Proceed</Button>
            </form>
        </div>
    );
}