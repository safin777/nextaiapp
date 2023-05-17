"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession('');
  
  const handleEdit = () => {};
  const handleDelete = async () => {};


  
  const [posts, setPosts] = useState([]); // [{}

  useEffect(() => {
    const fetchPosts = async () => {
      
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (session?.user.id) {

      fetchPosts()
    }
  },[session?.user.id]);
  return (
    <Profile
      name={session?.user.name.slice(0,12) || "User"}
      desc="Welcome to my profile!"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
