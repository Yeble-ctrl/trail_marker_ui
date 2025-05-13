import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FormInput from "./custom_components/form_input";

interface FormInput {
    username: string
    password: string
}

export default function LoginPage(){
    const { register, handleSubmit, formState: {errors} } = useForm<FormInput>();
    const [loginInput, setLoginInput] = useState<FormInput>({username: '', password: ''});
    const [loginErr, setLoginErr] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (loginInput.username && loginInput.password) {
            /* make an API call to login the user with the given credentials */
            const validateLogin = fetch('http://localhost:8000/api/token/', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginInput),
            });

            validateLogin
                .then((res) => {
                    // if the response is okay, get the access and refresh tokens and store them.
                    if (res.ok) {
                        res.json().then((resObj) => {
                            localStorage.setItem('access_token', resObj.access);
                            localStorage.setItem('refresh_token', resObj.refresh);
                            localStorage.setItem('username', loginInput.username);
                            navigate('/home_page'); // navigate the user to the home page
                        });
                    } else {
                        setLoginErr('Invalid username or password');
                    }
                })
                .catch((error) => {
                    alert("Error logging in: " + error.message);
                });
        }
    }, [loginInput]);

    const onSubmit: SubmitHandler<FormInput> = (data) => {
        setLoginInput(data);
    }
    return(
        <div className="flex flex-col justify-center items-center font-grotesk h-screen bg-gradient-to-b from-[#F5F5F5] to-[#FFFFFF] gap-2 p-2">
            <h1 className="text-3xl text-purple-600 font-black">Trail marker</h1>
            <h1 className="text-sm text-gray-700 font-normal">Enter your login details</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 mb-4 md:w-auto items-center text-center">
                {/* error message for login field */}
                <p className="text-red-500 text-sm">{loginErr}</p>

                {/* username field */}
                <FormInput 
                    register={register} 
                    name={'username'} 
                    type={'string'} 
                    validators={{required: {value: true, message:'Please provide your username'}}}
                    placeholder={'Username'}
                />
                {/* error message for username field */}
                {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}

                {/* password field */}
                <FormInput 
                    register={register} 
                    name={'password'} 
                    type={'password'} 
                    validators={{required: {value: true, message:'Please provide your password'}}}
                    placeholder={'Password'}
                />
                {/* error message for password field */}
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                <Button className="w-30 text-base bg-purple-600" type="submit">Login</Button>
            </form>
        </div>
    );
}