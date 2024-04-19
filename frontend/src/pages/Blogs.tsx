import { BlogCard } from "../components/BlogCard";
import Appbar from "../components/Appbar";
import { useBlogs } from "../hooks";

export const Blogs = () => {

    const {loading, blogs} = useBlogs();

    if(loading)
    {
        return(
            <div>
                loading...
            </div>
        )
    }

    return (
        <div>
            <Appbar/>
        <div className="mt-8 flex flex-col items-center">
            
            <div className="max-w-3xl mb-4">
                {blogs.map(blog => <BlogCard
                    id = {blog.id}
                    authorName={blog.author.name}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={"2nd Feb 2024"}
                    />
                )}
            </div>
        </div>
        </div>
    );
};
