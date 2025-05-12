import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface FormInput{
    username: String
    password: String
}

export default function LoginPage(){
    const { register, handleSubmit, formState: {errors} } = useForm<FormInput>();
    const [loginInput, setLoginInput] = useState<FormInput>({username: '', password: ''});
    const [loginErr, setLoginErr] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        /* make an API call to login the user with the given credentials */
        const validateLogin = fetch( 'http://localhost:8000/api/token/', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(loginInput)
        });
        validateLogin.then((res) => {
            // if the response is okay, get the access and refresh tokens and store them.
            if(res.ok){ 
                res.json().then((resStr) => {
                    localStorage.setItem('access_token', resStr.access);
                    localStorage.setItem('refresh_token', resStr.refresh);
                    navigate('/home'); // navigate the user to the home page
                })
            }
            // if the response is not okay, 
            else{
                setLoginErr('Invalid username or password');
            }
        }).catch((error) => {
            alert("Error logging in: " + error.message)
        })
    },[loginInput]);
    const onSubmit: SubmitHandler<FormInput> = (data) => {
        setLoginInput(data);
    }
    return(
        <div className="flex flex-col justify-center items-center font-grotesk h-screen bg-gradient-to-b from-[#F5F5F5] to-[#FFFFFF] gap-4 p-2">
            <h1 className="text-3xl text-purple-600 font-black">Get started</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 mb-4 w-1/2 md:w-auto items-center text-center">

                {/* first name field */}
                <p className="text-red-500 text-sm">{loginErr}</p>
                <input
                    {...register("username", { required: {value: true, message:'Please enter your username'}})}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-purple-500
                    placeholder:text-gray-400 placeholder:font-light placeholder:text-sm"
                    placeholder="Username"
                    type="text"
                />

                {/* last name field */}
                <input
                    {...register("password", { required: {value: true, message:'Please fill in your password'}})}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-purple-500
                    placeholder:text-gray-400 placeholder:font-light placeholder:text-sm"
                    placeholder="Password"
                    type="text"
                />
                <Button className="w-30 text-base bg-purple-600" type="submit">Login</Button>
            </form>
        </div>
    );
}