import Appbar from "./Appbar"
import {Blog} from "../hooks"
import { Avatar } from "./BlogCard"

export const FullBlog = ({blog} : {blog : Blog})=>{

    function getCurrentDate() {
        const now = new Date();
        const day = now.getDate();
        const month = now.toLocaleString('default', { month: 'long' });
        const year = now.getFullYear();
    
        return `${day} ${month} ${year}`;
    }

    return(
        <div>
        <Appbar/>
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-2xl pt-12">
                <div className="col-span-8">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Posted on {getCurrentDate()}
                    </div>
                    <div className="">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
    <div className="flex items-center">
        {/* Avatar */}
        <div className="pr-4">
            <Avatar size={8} name={blog.author.name}/>
        </div>

        <div className="flex flex-col">

            <div className="text-xl font-bold">
                {blog.author.name || "Anonymous"}
            </div>

            <div className="text-slate-500">
                You are about to read this Blog which is amazing!
            </div>
        </div>
    </div>
</div>

                
            </div>
        </div>
        </div>
    )
}