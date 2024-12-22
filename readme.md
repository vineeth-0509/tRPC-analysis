learned about the trpc and importance
-> adapters
-> publicProcedure, input and mutation and query and they perform with comparision with the http server and the express server
-> build an simple minimal basic todo kinda application using the trpc
-> implemented the jwt sign in trpc and generating a jwt token
-> passing the headers in every request here i learned about the Context and Middlewares
context: setup request contexts
Assign metadata to procedure
Format and handle errors
Transform data as needed
Customize the runtime configuration
understanding the 1) setup requests context
usually in the express when a backend call was performed from the user, we have the code like:
let app;
app.get("/todo",middleware, (req,res)=>{
    req.userId
})
//assignin userID to the request is not the good and here context refers with the request we have the extra requirements such as database and many more required.
-> 2 types of the context setup
1)defining the type during the intialization 
2) defining / creating the runtime context for each request.