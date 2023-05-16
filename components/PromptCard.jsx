"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleDelete, handleEdit }) => {
  
// All the state change functions are here:

  const [copied, setCopied] = useState("");
  
  const handleCopy = () =>{
    navigator.clipboard.writeText(post.prompt);
    setCopied(post.prompt);
    setTimeout(() => {
      setCopied("");
    }
    , 3000);
  }
 

  
  
  return (
    <div className="prompt_card">
      <div className="flex items-start justify-between gap-5">
        <div className="flex items-center justify-start flex-1 gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user profile image"
            width={40}
            height={40}
            className="object-contain rounded-full"
          />

          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900 font-satoshi">
              {post.creator.name}
            </h3>
            <p className="text-sm text-gray-500 font-inter">
              {post.creator.email}
            </p>
          </div>
        </div>

        {/* Copy btn for prompt */}

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>

        {/* End Copy btn for prompt */}
      </div>

      <p className="my-4 text-sm text-gray-700 font-satoshi">
        {post.prompt}
      </p>
      <p className="text-sm cursor-pointer font-inter blue_gradient" onClick={()=> handleTagClick && handleTagClick(post.tag)}>
        {post.tag}
      </p>
    </div>
  );
};

export default PromptCard;
