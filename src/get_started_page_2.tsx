import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import FormInput from "./custom_components/form_input";

interface IFormInput {
    password: string;
    confirm_password: string;
}

export default function GetStartedPage2() {
    const { register, handleSubmit, watch, formState: {errors} } = useForm<IFormInput>();
    const watchField = watch(["password", "confirm_password"], { password: " ", confirm_password: " " });
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        // get the user data from session storage
        // and add the password to it
        let user_data = JSON.parse(sessionStorage.getItem("user_data") || "{}");
        user_data.password = data.password

        // make a POST request to the API endpoint with the form data
        const response = fetch("http://localhost:8000/trail-marker-accounts/users/",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user_data)}
        )
        response.then((res) => {
            // if the response is okay, log the user in
            // then navigate to the profile setup page
            if (res.ok) {
                fetch('http://localhost:8000/api/token/', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({username: user_data.username, password: data.password}),
                })
                .then((res) => {
                    if (res.ok) {
                        // if the response is okay, get the access and refresh tokens and store them.
                        res.json().then((resObj) => {
                            localStorage.setItem('access_token', resObj.access);
                            localStorage.setItem('refresh_token', resObj.refresh);
                            localStorage.setItem('username', user_data.username);
                            sessionStorage.removeItem("user_data");
                            navigate('/home_page'); // navigate the user to the profile setup page
                        });
                    } else {
                        alert("Error logging in: " + res.statusText); // TODO: handle error response
                    }
                })
                .catch((error) => {
                    alert("Error logging in: " + error.message) // TODO: handle error response
                })
            }
            else {
                res.text().then((text) => {
                    console.log(text) // TODO: handle error response
                })
            }
        })
        .catch((error) => {
            alert("Error creating user: " + error.message) // TODO: handle error response
        })
    }

    return (
        <div className="flex flex-col justify-center items-center font-grotesk h-screen bg-gradient-to-b from-[#F5F5F5] to-[#FFFFFF] gap-2 p-2">
            <h1 className="text-3xl text-purple-600 font-black">Get started</h1>
            <h1 className="text-gray-700 text-sm">Enter your password with atleast 8 characters</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 mb-4 md:w-auto items-center text-center">
                {/* password field */}
                <FormInput
                    register={register} 
                    name="password" 
                    placeholder="password" 
                    type="password" 
                    validators={{ required: {value: true, message:'Please provide your password'}, minLength: {value: 8, message: 'Password must be at least 8 characters'} }}
                />
                {/* error message for password field */}
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                {/* confirm password field */}
                <FormInput
                    register={register} 
                    name="confirm_password" 
                    placeholder="confirm password" 
                    type="password" 
                    validators={{ required: {value: true, message:'Please confirm your password'}, validate: (value) => value === watchField[0] || "Passwords do not match" }}
                />
                {/* error message for confirm password field */}
                {errors.confirm_password && <p className="text-red-500 text-sm">{errors.confirm_password.message}</p>}
                
                <Button className="w-30 text-base bg-purple-600" type="submit">Proceed</Button>
            </form>
        </div>
    );
}