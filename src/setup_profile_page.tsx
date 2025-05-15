import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from "react-hook-form";
import FormInput from "./custom_components/form_input";

interface IFormInput {
    date_of_birth: string;
    gender: string;
}
export default function SetUpProfilePage(){
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        // store the data in local storage
        localStorage.setItem("userProfileData", JSON.stringify(data));
        navigate('/setup_profile_page_2');
    }
    return(
        <div className="flex flex-col justify-center items-center font-grotesk h-screen bg-gradient-to-b from-[#F5F5F5] to-[#FFFFFF] gap-2 p-2">
            <h1 className="text-3xl text-purple-600 font-black">Trail marker</h1>
            <h1 className="text-base text-gray-800 font-normal">Set up your profile details</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 mb-4 md:w-auto text-center">
                {/* date of birth field */}
                <label htmlFor="date_of_birth" className="text-sm text-gray-600">Set your date of birth</label>
                <FormInput
                    register={register} 
                    name="date_of_birth" 
                    placeholder="date of birth"
                    type="date" 
                    validators={{ required: {value: true, message: 'Please enter your date of birth'} }}
                />

                {/* gender field */}
                <label htmlFor="gender" className="text-sm text-gray-600">Select your gender</label>
                <select {...register('gender', { required: {value: true, message: 'Please select your gender'} })} 
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-purple-500 placeholder:text-gray-400 placeholder:font-light placeholder:text-sm">
                    <option value="male">male</option>
                    <option value="female">female</option>
                </select>

                <div className="flex flex-row justify-center items-center pt-4">
                    <Button className="w-30 text-lg bg-purple-600" type="submit">submit</Button>
                    <Link to={"/home_page"}>
                        <Button className="w-30 text-lg text-purple-600 border-2 bg-white hover:bg-zinc-700 hover:border-0 hover:text-white ml-4">Skip</Button>
                    </Link>
                </div>
            </form>
        </div>
    );
}