"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";


const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter('');

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    console.log("delete");
  };

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const userId = session?.user.id;
    const fetchPosts = async () => {
      
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (userId) {

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
