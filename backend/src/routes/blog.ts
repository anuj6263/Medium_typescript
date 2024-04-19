import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import { Hono } from "hono"
import { verify } from "hono/jwt"
import {createBlogInput, updateBlogInput} from "@anujshrivatri/medium"

const blogRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string
        jwt_secret : string
    },
    Variables : {
        userId : string,
    }
}>()

blogRouter.use("/*",async(c, next)=>{
    
    const header : string | undefined = c.req.header("authorization")

    if(!header)
    {
        return c.json({"msg" : "Error is inside jwt token"})
    }

    const response = await verify(header, c.env.jwt_secret)

    if(!response.id)
    {
        return c.json({"msg" : "Invalid jwt"})
    }

    console.log("Authentication succesfull");

    c.set("userId", response.id)
    
    await next()
})

blogRouter.post("/",async(c)=>{

    const body = await c.req.json()
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const authorId = c.get("userId")

    // const {success} = createBlogInput.safeParse(body)

    // if(!success)
    // {
    //     return c.text("Please provide correct types")
    // }

    const blog = await prisma.post.create({
        data : {
            title : body.title,
            content : body.content,
            authorId : Number(authorId),
        }
    })

    return c.json({
        id : blog.id
    })

    // return c.text("Added the blog")
})


blogRouter.put("/",async(c)=>{

    const body = await c.req.json()
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    //@ts-ignore
    const blog = await prisma.post.update({
        where : {
            id : body.id,
        },

        data : {
            title : body.title,
            content : body.content
        }
    })

    return c.json({
        id : blog.id
    })
})

blogRouter.get("/bulk",async(c)=>{

    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const blogs = await prisma.post.findMany({
        select : {
            title : true,
            content : true,
            id : true,
            author : {
                select : {
                    name : true
                }
            }
        }
    })

    return c.json({
        blogs
    })    

})

blogRouter.get("/:id",async(c)=>{

    const id = c.req.param("id")
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())
    
    try {
        const blog = await prisma.post.findUnique({
            where : {
                id : Number(id)
            },
            select : {
                id : true,
                title : true,
                content : true,
                author : {
                    select : {
                        name : true,
                    }
                }
            }
        })

        console.log(blog);
    
        return c.json({
            blog : blog
        })
    } 
    catch (error) {
    
        return c.text("Error in getting blogs")
    }
})
  
export default blogRouter