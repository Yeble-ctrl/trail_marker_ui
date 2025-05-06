import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";

interface IFormInput {
    password: string;
    confirm_password: string;
}

export default function GetStartedPage2() {
    const { register, handleSubmit, watch } = useForm<IFormInput>();
    const watchField = watch(["password", "confirm_password"]);
    const doPasswordsMatch = (): Boolean => {
        if (watchField[0] !== watchField[1]) {
            return false;
        }
        return true;
    }
    return (
        <div className="flex flex-col justify-center items-center font-grotesk h-screen bg-gradient-to-b from-[#F5F5F5] to-[#FFFFFF] gap-4 p-2">
            <h1 className="text-3xl text-purple-600 font-black">Get started</h1>

            <form onSubmit={handleSubmit(doPasswordsMatch)} className="flex flex-col gap-2 mb-4 w-1/2 md:w-auto items-center text-center">
                <input
                {...register("password", { required: true, minLength: 8 })}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-purple-500
                placeholder:text-gray-400 placeholder:font-light placeholder:text-sm"
                placeholder="password"
                type = "password"
                />
                <input
                {...register("confirm_password", { required: true, minLength: 8 })}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-purple-500   
                placeholder:text-gray-400 placeholder:font-light placeholder:text-sm"
                placeholder="confirm password"
                type = "password"
                />
                {watchField[0] !== watchField[1] && <p className="text-red-500 text-sm">Passwords do not match</p>}
                <Button className="w-30 text-base bg-purple-600" type="submit">Proceed</Button>
            </form>
        </div>
    );
}