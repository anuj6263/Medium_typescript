import { ChangeEvent, useState } from "react"
import { Link } from "react-router-dom"
// import { signupInput } from "@anujshrivatri/medium"
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"
import axios from "axios"

export const Auth = ({type}: {type: "signup" | "signin"}) => {

    const navigate = useNavigate()

    const [postInputs, setPostInputs] = useState({
        name : "",
        username : "",
        password : "",
    })

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type ==="signup" ? "signup" : "signin"}`, postInputs)

            console.log(response.data.jwt);

            const jwt = await response.data.jwt

            localStorage.setItem("token", jwt)
            navigate("/blogs")

        } catch (error) 
        {
            alert(`Error while signing ${type==="signin" ? "in" : "up"}`)

            console.log("error");
        } 
    }

    return(
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div> 
                <div className="px-10"> 
                <div className="text-3xl font-extrabold mt-4">
                Create an Account
                </div>
                <div className="text-slate-400">
                {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>{type === "signin" ? "Sign Up" : "Sign In"}</Link>
                </div>
                </div>
                <div className="pt-4">
                    {type === "signup" ?<LabelledInput label="Name" placeholder="John Doe.." onChange={(e)=>{
                            setPostInputs({
                                ...postInputs,
                                name : e.target.value,
                            })
                        }} 
                    /> : null}
                    <LabelledInput label="Username" placeholder="JohnDoe@gmail.com" onChange={(e)=>{
                            setPostInputs({
                                ...postInputs,
                                username : e.target.value,
                            })
                        }}
                    />
                    <LabelledInput label="Password" type={"password"} placeholder="kjws1p2@2142.." onChange={(e)=>{
                            setPostInputs({
                                ...postInputs,
                                password : e.target.value,
                            })
                        }}
                    />
                <button onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium mt-5 rounded-lg text-sm px-20 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type=== "signup" ? "Sign up" : "Sign in"}</button>

                </div>
                </div>
            </div>
        </div>
    )
} 

interface LabelledInputTypes {
    label : string,
    placeholder : string,
    onChange : (e : ChangeEvent<HTMLInputElement>) => void;
    type? : string
}

function LabelledInput({label, placeholder, onChange, type} : LabelledInputTypes){ 
    return(
        <div>
            <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
    )
}