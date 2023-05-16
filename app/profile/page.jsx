"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const handleEdit = () => {};
  const handleDelete = async () => {};
  const [posts, setMyPosts] = useState([]); // [{}

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts}`);
      console.log(response);
      const data = await response.json();
      setMyPosts(data);
    };
    if (session?.user.id) {
      fetchPosts();
    }
  }, []);

  return (
    <Profile
      name="My"
      desc="Welcome to my profile!"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
