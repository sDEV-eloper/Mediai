import { NextResponse } from "next/server";
import Configuration from "openai";
import OpenAIApi from "openai";
import {auth} from "@clerk/nextjs"
import OpenAI from "openai";
import ChatCompletionRequestMessage from "openai";

const openaiChat = new OpenAI();


const configuration=new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

// const openai=new OpenAIApi(configuration);

const instructionMessage:ChatCompletionRequestMessage={
    role:"system",
    content:"You are code generator. You must answer only in code snippets. Use code comments for explanation"
}
export async function POST(req:Request)  {
    try{
        const {userId}=auth();
        const body=await req.json();
        const {messages}=body;

        if(!userId){
            return new NextResponse("Unauthorized", {status:401});
        }
        if (!configuration.apiKey) {
            return new NextResponse ("OpenAI API Key not configured", { status:
            500 });
            }

        if(!messages){
            return new NextResponse("Messages are required", {status:400})
        }
        const response=await openaiChat.chat.completions.create({
            model:"gpt-3.5-turbo",
            messages:[instructionMessage, ...messages]
        })

        return NextResponse.json(response.choices[0].message)
    }
    catch (error) {
        console.log(" [CODE_ERROR]", error);

return new NextResponse ("Internal error", { status: 500 });
    }
}

