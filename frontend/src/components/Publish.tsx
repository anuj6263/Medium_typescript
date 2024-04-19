import { useState } from "react";
import { BACKEND_URL } from "../config";
import Appbar from "./Appbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Publish = () => {

    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    return (
        <div>
            <Appbar />
            <div className="flex justify-center w-full">
                <div className="max-w-screen-lg flex flex-col items-center">
                    {/* Title */}
                    <input onChange={(e)=>{
                        setTitle(e.target.value)
                    }}
                        type="text"
                        className="mt-4 mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-xl font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Title"
                        required
                    />
                    {/* Text Editor */}
                    <TextEditor onChange={(e)=>setDescription(e.target.value)}/>

                    <button onClick={async()=>{
                const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                    title,
                    content : description
                }, {
                    headers : {
                        Authorization : localStorage.getItem("token")
                    }
                })

                navigate(`/blog/${response.data.id}`)
            }
            
        }
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
                Publish
            </button>
                </div>
            </div>
        </div>
    );
};

function TextEditor({ onChange }: { onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }) {
    return (
        <div className="flex flex-col items-center w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
            <textarea
                id="message"
                className="block p-2.5 w-full md:w-96 h-64 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your thoughts here..."
                onChange={onChange}
            ></textarea>
        </div>
    );
}
