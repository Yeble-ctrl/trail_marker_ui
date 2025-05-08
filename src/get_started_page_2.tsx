import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";

interface IFormInput {
    password: string;
    confirm_password: string;
}

export default function GetStartedPage2() {
    console.log(localStorage.getItem("user_data"));
    const { register, handleSubmit, watch, formState: {isValid} } = useForm<IFormInput>();
    const watchField = watch(["password", "confirm_password"]);
    console.log(isValid);
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        let user_data = JSON.parse(localStorage.getItem("user_data") || "{}");
        user_data.password = data.password
        console.log(user_data);
    }
    return (
        <div className="flex flex-col justify-center items-center font-grotesk h-screen bg-gradient-to-b from-[#F5F5F5] to-[#FFFFFF] gap-4 p-2">
            <h1 className="text-3xl text-purple-600 font-black">Get started</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 mb-4 w-1/2 md:w-auto items-center text-center">
                <input
                    {...register("password", { required: {value: true, message: "Password is required"},
                        minLength: {value: 8, message:"Passoword must be atleast 8 characters"} })}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-purple-500
                    placeholder:text-gray-400 placeholder:font-light placeholder:text-sm"
                    placeholder="password"
                    type = "password"
                />
                {(watchField[0].length < 7) ? 
                <p className="text-red-500 text-sm"> &#10060; Password must have atleast 8 characters</p> : <p className="text-green-500 text-sm"> &#10004; Password is valid</p>}
                <input
                    {...register("confirm_password", { required: true, minLength: 8, validate: (value) => value === watchField[0] || "Passwords do not match" })}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-purple-500   
                    placeholder:text-gray-400 placeholder:font-light placeholder:text-sm"
                    placeholder="confirm password"
                    type = "password"
                />
                {(watchField[0] !== watchField[1]) ? 
                <p className="text-red-500 text-sm"> &#10060; Passwords do not match</p> : <p className="text-green-500 text-sm"> &#10004; Passwords match</p>}
                <Button className="w-30 text-base bg-purple-600" type="submit" disabled={isValid}>Proceed</Button>
            </form>
        </div>
    );
}