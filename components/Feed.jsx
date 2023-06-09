"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
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
  const [posts, setPosts] = useState([]); // [{}
  const [searchTimeOut, setSearchTimeOut] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    //console.log(e.target.value)
    clearTimeout(searchTimeOut);
    setSearchText(e.target.value);
    let text = e.target.value;

    setSearchTimeOut(
      setTimeout(() => {
        const searchResult = filterPrompts(text);
        setSearchedResults(searchResult);
      }, 1000)
    );
  };

  // filter with regex

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return posts.filter(
      (post) =>
        post.prompt.match(regex) ||
        post.creator.name.match(regex) ||
        post.tag.match(regex)
    );
  };

  //handle tag click

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

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

      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
