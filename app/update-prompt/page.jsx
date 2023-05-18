"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditPrompt = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const searchParams = useSearchParams('id');
  const promptId = searchParams.get('id');

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      console.log(response);
      const data = await response.json();
      console.log(data);

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (promptId) {
      getPromptDetails();
    }
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault(); //dsiables the default behaviour of the form
    setSubmitting(true);

    if (!promptId) {
      return alert("Prompt ID is missing");
    } else {
      try {
        const response = await fetch(`/api/prompt/${promptId}`,{
          method: "PATCH",
          body: JSON.stringify({
            prompt: post.prompt,
            tag: post.tag,
          }),
        });

        console.log(response)

        if (response.ok) {
          router.push("/");
        } else {
          alert("Could not update the prompt");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
