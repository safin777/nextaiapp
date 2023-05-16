"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import PromptCard from "./PromptCard";
//import Prompt from "@models/prompt";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts,setPosts] = useState([]); // [{}
  const handleSearchChange = (e) => {};

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      console.log(data)
      setPosts(data);
    };
    fetchPost();
  }, []);

  return (
    <section className="feed">
      <from className="relative w-full flex-center">
        <input
          type="text"
          className="search_input peer"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </from>

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
