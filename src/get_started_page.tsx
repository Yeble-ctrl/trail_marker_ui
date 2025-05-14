import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";
import FormInput from "./custom_components/form_input";

interface IFormInput {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
}

export default function GetStartedPage() {
    const [usernames, setUsernames] = useState<String[]>(['']);

    // fetch the usernames from the API endpoint
    // and set them to the state variable usernames
    // this will be used to check if the username already exists
    useEffect(() => {
        const userData = fetch("http://localhost:8000/trail-marker-accounts/users/", {method: "GET"});
        userData.then((res) => {
            if (res.ok) {
                res.json().then((data) => {
                    let usernames: string[] = [];
                    data.map((user: IFormInput) => usernames.push(user.username));
                    setUsernames(usernames);
                });
            }
            else throw new Error(res.statusText);
        })
        .catch((error) => {
            console.error("Error fetching usernames:", error);
        })
    }, [])

    const navigate = useNavigate();
    const { register, handleSubmit, formState: {errors} } = useForm<IFormInput>();

    // onSubmit function to handle the form submission
    // it will navigate to the next page and store the data in session storage
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        navigate("/get_started_page_2");
        sessionStorage.setItem("user_data", JSON.stringify(data));
    }
    return (
        <div className="flex flex-col justify-center items-center font-grotesk h-screen bg-gradient-to-b from-[#F5F5F5] to-[#FFFFFF] gap-2 p-2">
            <h1 className="text-3xl text-purple-600 font-black">Get started</h1>
            <h1 className="text-gray-700 text-sm">Please enter your details</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 mb-4 md:w-auto items-center text-center">
                {/* first name field */}
                <FormInput
                    register={register} 
                    name="first_name" 
                    placeholder="first name" 
                    type="text" 
                    validators={{ required: {value: true, message:'Please provide your first name'} }}
                />
                {/* error message for first name field */}
                {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name.message}</p>}

                {/* last name field */}
                <FormInput
                    register={register} 
                    name="last_name" 
                    placeholder="last name" 
                    type="text" 
                    validators={{ required: {value: true, message:'Please provide your last name'} }}
                />
                {/* error message for last name field */}
                {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name.message}</p>}

                {/* username field */}
                <FormInput
                    register={register} 
                    name="username" 
                    placeholder="username" 
                    type="text" 
                    validators={{ required: {value: true, message:'Please provide your username'}, 
                        validate: (value) => {
                            if (usernames.includes(value)) {
                                return "Username already exists";
                            } else {
                                return true;
                            }
                        }
                    }}
                />
                {/* error message for username field */}
                {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                
                {/* email field */}
                <FormInput
                    register={register} 
                    name="email" 
                    placeholder="email" 
                    type="email" 
                    validators={{ required: {value: true, message:'Please provide your email'} }}
                />
                {/* error message for email field */}
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                <Button className="w-30 text-base bg-purple-600" type="submit">Proceed</Button>
            </form>
        </div>
    );
}