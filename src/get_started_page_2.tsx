import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";

interface IFormInput {
    password: string;
    confirm_password: string;
}

export default function GetStartedPage2() {
    const { register, handleSubmit, watch, formState: {errors} } = useForm<IFormInput>();
    const watchField = watch(["password", "confirm_password"], { password: " ", confirm_password: " " });

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
            if (res.ok) { alert("User created successfully") }
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
        <div className="flex flex-col justify-center items-center font-grotesk h-screen bg-gradient-to-b from-[#F5F5F5] to-[#FFFFFF] gap-4 p-2">
            <h1 className="text-3xl text-purple-600 font-black">Get started</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 mb-4 w-1/2 md:w-auto items-center text-center">
                <p className="text-gray-500 text-sm">Password must be at least 8 characters</p>
                {/* password field */}
                <input
                    {...register("password", { required: true, minLength: {value: 8, message: "Password must be at least 8 characters" } })}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-purple-500
                    placeholder:text-gray-400 placeholder:font-light placeholder:text-sm"
                    placeholder="password"
                    type = "password"
                />
                {/* error message for password field */}
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                {/* confirm password field */}
                <input
                    {...register("confirm_password", { required: true,
                        validate: (value) => value === watchField[0] || "Passwords do not match" })}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-purple-500   
                    placeholder:text-gray-400 placeholder:font-light placeholder:text-sm"
                    placeholder="confirm password"
                    type = "password"
                />
                {/* error message for confirm password field */}
                {errors.confirm_password && <p className="text-red-500 text-sm">{errors.confirm_password.message}</p>}
                
                <Button className="w-30 text-base bg-purple-600" type="submit">Proceed</Button>
            </form>
        </div>
    );
}