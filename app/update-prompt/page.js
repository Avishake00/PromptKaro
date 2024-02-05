'use client';
import Form from '@components/Form';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';


const EditPrompt = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [Post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  const searchParams=useSearchParams();
  const promptId=searchParams.get('id');

  useEffect(() => {
    const getPromptDetails=async()=>{
        const response=await axios.get(`/api/Prompt/${promptId}`);
        const data=response.data;
        
        setPost({
            prompt:data.prompt,
            tag:data.tag,
        })
    }

    if(promptId)getPromptDetails();

  }, [promptId])
  

  const edit_prompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) return alert("Missing PromptId!");

    try {
        const response = await axios.patch(`/api/Prompt/${promptId}`, {
            prompt: Post.prompt,
            tag: Post.tag,
          });

      
        router.push("/");
      
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (

    <Suspense>
      <Form
        type="Edit"
        Post={Post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={edit_prompt}
      />
    </Suspense>
  );
};

export default EditPrompt;
