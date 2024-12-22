import { createTRPCClient, httpBatchLink} from '@trpc/client';
import type { AppRouter } from "../server";

const trpc = createTRPCClient<AppRouter>({
    links:[
        httpBatchLink({
            url:'http://localhost:3000',
            async headers(){
                return {
                    //Authorization: "Bearer"+ localStorage.getItem("token")
                    Authorization:"Bearer 123"
                }
            }
        }),
    ],
});

// async function main(){
//    let response = await trpc.createTodo.mutate({
//         title:"go to gym",
//         description: "Hit the gym",
//     })
//     console.log(response)
// }


async function main(){
   // let response = await trpc.signUp.mutate({
   let response = await trpc.createTodo.mutate({
        title:"vineeththungani@gmail.com"
    })
    //console.log(response.token)
    console.log(response)
}
main();


