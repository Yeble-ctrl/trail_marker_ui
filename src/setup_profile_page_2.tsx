import { Button } from "./components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form";
import FormInput from "./custom_components/form_input";

interface IFormInput {
    user_description: string;
    profile_picture: FileList;
}

export default function SetUpProfilePage2() {
    const navigate = useNavigate();
    const style = "border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-purple-500 placeholder:text-gray-600 placeholder:font-medium placeholder:text-sm";
    const {register, handleSubmit} = useForm<IFormInput>();
    const onsubmit: SubmitHandler<IFormInput> = (data) => {
        let userProfileData = JSON.parse(localStorage.getItem('userProfileData') || '{}');
        let formData = new FormData();
        formData.append('user', localStorage.getItem('username') || '');
        formData.append('dateOfBirth', userProfileData.date_of_birth);
        formData.append('gender', userProfileData.gender);
        formData.append('userDescription', data.user_description);
        formData.append('profilePicture', data.profile_picture[0])

        const fetchOptions = {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
            },
            body: formData
        }

        fetch("http://localhost:8000/profiles/profiles/", fetchOptions)
            .then((res) => {
                if(res.ok){ 
                    localStorage.removeItem('userProfileData')
                    navigate('/finish_profile_setup_page')
                }
                else{ 
                    res.json().then((data) => console.log(data))
                    throw new Error(`${res.status}`)
                }
            })
            .catch((error) => {console.log(error.message)})
    }
    return (
        <div className="flex flex-col font-grotesk justify-center h-screen items-center bg-gradient-to-b from-[#F5F5F5] to-[#FFFFFF] gap-2">
            <h1 className="text-3xl text-purple-600 font-black">Trail marker</h1>
            <h1 className="text-lg text-gray-800 font-medium">Set up your profile details</h1>
            <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-2 mb-4 md:w-auto text-center"> 
                <textarea
                    {...register('user_description', {required: false})}
                    className={style}
                    aria-rowspan={2}
                    placeholder="Add a short description of yourself..."
                />
                <label className="text-center font-medium text-gray-600">Upload profile picture</label>
                <input
                    {...register('profile_picture', {required: false})}
                    type="file"
                    accept="image/png, image/jpeg"
                    className="border border-gray-300 rounded-md p-2 w-auto cursor-pointer"
                    multiple = {false}
                />
                <div className="flex flex-row justify-center items-center pt-4">
                    <Button className="w-30 text-lg bg-purple-600" type="submit">Proceed</Button>
                    <Link to={"/home_page"}>
                        <Button className="w-30 text-lg text-purple-600 border-2 bg-white hover:bg-zinc-700 hover:border-0 hover:text-white ml-4">Skip</Button>
                    </Link>
                </div>
            </form>
        </div>
    );
}