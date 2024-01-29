'use client';
import Form from '@components/Form';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const CreatePrompt = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [Post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  const create_Prompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/Prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: Post.prompt,
          userId: session?.user.id,
          tag: Post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Form
        type="Create"
        Post={Post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={create_Prompt}
      />
    </div>
  );
};

export default CreatePrompt;
