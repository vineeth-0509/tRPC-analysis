"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const trpc_1 = require("./trpc");
const standalone_1 = require("@trpc/server/adapters/standalone");
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const todoInputType = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
});
const appRouter = (0, trpc_1.router)({
    //   createTodo: publicProcedure.input(todoInputType).mutation(async (opts) => {
    //     console.log("hi there");
    //     const title = opts.input.title;
    //     const description = opts.input.description;
    //     return {
    //       id: "1",
    //     };
    //   }),
    signUp: trpc_1.publicProcedure
        .input(zod_1.z.object({
        email: zod_1.z.string(),
        password: zod_1.z.string(),
    }))
        .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const username = opts.ctx.username;
        const email = opts.input.email;
        const password = opts.input.password;
        const JWT_SECRET = "vineeththungani";
        const token = jsonwebtoken_1.default.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
        console.log(`User signed up: ${email}`);
        return {
            message: "Signup successfull",
            token
        };
    })),
    createTodo: trpc_1.publicProcedure
        .input(zod_1.z.object({
        title: zod_1.z.string(),
    }))
        .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(opts.ctx.username);
        return {
            id: "1"
        };
    }))
});
const PORT = 3000;
// Export type router type signature,n
// NOT the router itself.
const server = (0, standalone_1.createHTTPServer)({
    router: appRouter,
    createContext(opts) {
        let authHeader = opts.req.headers["authprization"];
        console.log(authHeader);
        //jwt.verify()
        return {
            username: "123"
        };
    }
});
server.listen(PORT, () => {
    console.log(`tRPC is running on http://localhost:${PORT}`);
});
