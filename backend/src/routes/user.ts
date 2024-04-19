import { Hono } from "hono"
import { withAccelerate } from "@prisma/extension-accelerate"
import { PrismaClient } from "@prisma/client/edge"
import { sign } from "hono/jwt"
import { signinInput, signupInput } from "@anujshrivatri/medium"

const userRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string
        jwt_secret : string
    }
}>()

userRouter.post('/signup' ,async(c)=>{

    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json()

    // const {success} = signupInput.safeParse(body)

    // if(!success)
    // {
    //     return c.text("Please provide correct types for signup")
    // }

    const User = await prisma.user.create({
        data : {
            username : body.username,
            name : body.name,
            password : body.password
        }
    })

    const payload = {
        id : User.id,
    }

    const secret_key = c.env.jwt_secret

    if(!secret_key)
    {
        return c.json({"msg" : "Error in validating secret"})
    }

    const token = await sign(payload, secret_key)

    return c.json({jwt : token})
  })

userRouter.post("/signin" ,async(c)=>{

    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json()

    // const {success} = signinInput.safeParse(body)

    // if(!success)
    // {
    //     return c.text("Please provide correct types")
    // }

    const User = await prisma.user.findFirst({
        where : {
            username : body.username,
            password : body.password
        }
    })

    if(!User)
    {
        c.status(403)
        return c.json("Error")
    }

    const payload = {
        id : User.id,
    }

    const secret_key = c.env.jwt_secret

    if(!secret_key)
    {
        return c.json({"msg" : "Error in validating secret"})
    }

    const token = await sign(payload, secret_key)

    return c.json({jwt : token})
  })

export default userRouter