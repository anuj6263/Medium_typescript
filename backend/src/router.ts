import { Hono } from "hono";
// import { PrismaClient } from "@prisma/client/edge";
// import { withAccelerate } from "@prisma/extension-accelerate";
// import { decode, sign, verify } from "hono/jwt";
import userRouter from "./routes/user";
import blogRouter from "./routes/blog";

export const router = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        jwt_secret : string,
    }
}>()

router.route("/user" , userRouter)
router.route("/blog", blogRouter)