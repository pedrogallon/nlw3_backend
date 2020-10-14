import express from 'express';

const app =  express();

app.get("/", (req,res)=>{
    console.log("hw")
})

app.listen(3333);