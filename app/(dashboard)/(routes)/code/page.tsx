"use client";

import axios from "axios"
import { Heading } from "@/components/heading";
import { Code} from "lucide-react";
import * as z from "zod";
import ReactMarkdown from "react-markdown"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ChatCompletionRequestMessage from "openai"
import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/ui/empty";
import { BotAvatar } from "@/components/bot-avatar";
import { UserAvatar } from "@/components/user-avatar";


const CodePage = () => {

  const router=useRouter()
  const [messages, setMessages]=useState<ChatCompletionRequestMessage[]>([])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try{
      const userMessage:ChatCompletionRequestMessage={
        role: "user",
        content: values.prompt,

      }
      const newMessages=[...messages, userMessage]
      const response= await axios.post("/api/code",{
        messages: newMessages,

      })
      setMessages((current)=>[...current, userMessage, response.data])
      form.reset()
    }catch(error:any){
      console.log(error)
    }
      finally{
        router.refresh();
      }
  };

  return (
    <div>
      <Heading
        title="Code Generation"
        description="Our most advanced conversation
model."
        icon={Code}
        iconColor="text-green-700"
        bgColor="bg-green-500/10"
      />
      <div className="px-4 lg:px-8"> 
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg  border  w-full  p-4  px-3  md:px-6  focus-within: shadow-sm
 grid  grid-cols-12  gap-2"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem
                  className="col-span-12
    lg:col-span-10"
                >
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none
    focus-visible: ring-0
    focus-visible: ring-transparent"
                      disabled={isLoading}
                      placeholder="Fetch API in reactjs"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="col-span-12 lg:col-span-2" disabled={isLoading}>
              Generate
            </Button>
          </form>
        </Form>
      </div>
      <div className="space-y-4 mt-4">
      {isLoading && (
<div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
<Loader />
</div>
)}
{messages.length=== 0 && !isLoading &&
(
<Empty label="No conversation started." />
)}
        <div className="flex flex-col-reverse gap-y-2">
          {messages.map((message)=>(
            <div key={message.content}
            className={cn("p-8  flex items-start gap-x-8 rounded-lg ml-4 mr-4", 
            message.role==="user"?"bg-gray-500/10 border border-black/10":"bg-gradient-to-br from-blue-400 via-purple-300 to-green-200")}>
              {message.role==="user"?<UserAvatar/>:<BotAvatar/>  }
         <p>
         <ReactMarkdown components={{
                  pre: ({ node, ...props }) => (
                    <div className="overflow-auto w-full my-2 bg-gray-800 text-white p-2 rounded-lg">
                      <pre {...props} />
                    </div>
                  ),
                  code: ({ node, ...props }) => (
                    <code className="bg-black/10 rounded-lg p-1" {...props} />
                  )
                }} className="text-sm overflow-hidden leading-7">
                  {message.content || ""}
                </ReactMarkdown>

         </p>
              
            </div>
          ))}
        </div>
        </div>
        </div>
    
    );
  };

export default CodePage;
