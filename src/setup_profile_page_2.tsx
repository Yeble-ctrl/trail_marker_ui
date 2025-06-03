import { Button } from "./components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

interface IFormInput {
    user_description: string;
    profile_picture: FileList;
}

export default function SetUpProfilePage2() {
    // State variables for tracking image changes 
    const[imageUrl, setImageUrl] = useState('');
    const[image, setImage] = useState<File | null>()
    
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm<IFormInput>();
    const onsubmit: SubmitHandler<IFormInput> = (data) => {
        let userProfileData = JSON.parse(localStorage.getItem('userProfileData') || '{}');
        let formData = new FormData();
        console.log(image?.type);
        formData.append('user', localStorage.getItem('username') || '');
        formData.append('dateOfBirth', userProfileData.date_of_birth);
        formData.append('gender', userProfileData.gender);
        formData.append('userDescription', data.user_description);
        formData.append('profilePicture', image || '');

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
                <label htmlFor="user_description">
                    <textarea
                        {...register('user_description', {required: false})}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-purple-500 placeholder:text-gray-600 placeholder:font-medium placeholder:text-base"
                        aria-rowspan={2}
                        placeholder="Add a short description of yourself..."
                        id="user_description"
                    />
                </label>
                <label
                    className="flex flex-col items-center justify-center text-center h-28 cursor-pointer font-medium text-gray-600 border-2 border-gray-300 border-dashed rounded-md p-2"
                >
                    <input
                        {...register('profile_picture', {required: false})}
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(property) => {
                            if(property.target.files !== null){
                                setImage(property.target.files[0])
                                let imageUrl = URL.createObjectURL(property.target.files[0]);
                                setImageUrl(imageUrl)
                            }
                        }}
                    />                    
                    {imageUrl.length? <img src={imageUrl} alt="upload" className="h-28"/> : <img src="/upload_icon.svg" alt="upload" className="w-20 h-20"/> }
                    {imageUrl.length? '' : <p className="font-medium text-base">Upload profile photo</p>}
                </label>
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