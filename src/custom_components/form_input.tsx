import { FieldValues, UseFormRegister, Path, RegisterOptions } from "react-hook-form";

/* Custom form input component
Takes the following arguments: 
register, name, type, validateFunction */

// Custom interface for the form props
interface FormInputProps<T extends FieldValues> {
    register: UseFormRegister<T>;
    name: Path<T>;
    type: string;
    validators: RegisterOptions<T>;
    placeholder: string;
}

export default function FormInput<T extends FieldValues>({ register, name, type, validators, placeholder }: FormInputProps<T>){
    return (
        <input 
            {...register(name, {...validators})}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-purple-500
            placeholder:text-gray-400 placeholder:font-light placeholder:text-sm"
            type={type}
            placeholder={placeholder}
        />
    );
}