// This module contains all the interfaces used
// for all the data used in the home page.

// 1. user account data interface
export interface UserDataInterface{
    username: string
    first_name: string
    last_name: string
    email: string
}

// 2. user profile data interface
export interface UserProfileInterface{
    id: string
    dateOfBirth: string
    gender: string
    userDescription: string
    profilePicture: string
}

// 3. user qualifications data interface
export interface UserQualificationsInterface{
    id: string
    qualification: string
    certificationFile: string
}

// 4. user work experience data interface
export interface UserWorkExperienceInterface{
    id: string
    workExperience: string
}

// 5. user skills data interface
export interface UserSkillsInterface{
    id: string
    skills: string
}