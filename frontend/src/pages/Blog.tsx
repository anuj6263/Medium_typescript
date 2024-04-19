import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";
import { BlogSkeleton } from "../components/BlogSkeleton";

function Blog() {

  const {id} = useParams();
  
  const {loading, blog} = useBlog({
    id : id || ""
  });

  if(loading || !blog)
  {
    return(
      <div>
        <BlogSkeleton/>
        <BlogSkeleton/>
        <BlogSkeleton/>
      </div>
    )
  }

  return (
    <div>
      
      <FullBlog blog={blog}/>
    </div>
  )
}

export default Blog