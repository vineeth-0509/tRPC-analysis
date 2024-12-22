import { publicProcedure, router } from "./trpc";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";
import jwt from "jsonwebtoken";
const todoInputType = z.object({
  title: z.string(),
  description: z.string(),
});

const appRouter = router({
//   createTodo: publicProcedure.input(todoInputType).mutation(async (opts) => {
//     console.log("hi there");
//     const title = opts.input.title;
//     const description = opts.input.description;

//     return {
//       id: "1",
//     };
//   }),

  signUp: publicProcedure
  .input(z.object({
    email:z.string(),
    password: z.string(),
  }))
  .mutation(async (opts) =>{
    const username = opts.ctx.username;
    const email = opts.input.email;
    const password = opts.input.password;
    const JWT_SECRET = "vineeththungani"
    const token = jwt.sign(
        {email}, JWT_SECRET,{ expiresIn: '1h'}
    );

    console.log(`User signed up: ${email}`);
    return {
        message:"Signup successfull",
        token
    };
  }),
  createTodo:publicProcedure
  .input(z.object({
    title: z.string(),
  }))
  .mutation(async (opts) =>{
    console.log(opts.ctx.username)
    return {
        id:"1"
    }
  })
});
const PORT = 3000;

// Export type router type signature,n
// NOT the router itself.
const server = createHTTPServer({
  router: appRouter,
  createContext(opts){
    let authHeader = opts.req.headers["authprization"];
    console.log(authHeader)
    //jwt.verify()
    return {
        username:"123"
    }
  }
});
server.listen(PORT, () => {
  console.log(`tRPC is running on http://localhost:${PORT}`);
});

export type AppRouter = typeof appRouter;
