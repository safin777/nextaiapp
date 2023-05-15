import React from "react";
import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="flex-col w-full max-w-full flex-start">
      <h1 className="text-left head_text">
        <span className="blue_gradient"> {type} Post </span>
      </h1>

      <p className="text-left desc nax-w-md">
        {type} and share amazing AI Prompt with the world, and get feedback from
        the community to run wild with any AI powerd platform.
      </p>

      <form
        className="flex flex-col w-full mt-10 gap-7 ma-w-2xl glassmorphism"
        onSubmit={handleSubmit}
      >
        <label>
          <span className="text-base font-semibold text-gray-700 font-satoshi">
            Your AI Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Enter your AI Prompt here"
            className="form_textarea"
          ></textarea>
        </label>

        <label>
          <span className="text-base font-semibold text-gray-700 font-satoshi">
            Tag {' '}
            <span className="font-normal">
               (#Product, #AI, #webdev, #javascript)
            </span>
          </span>

          <input
            type="text"
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            className="form_input"
            required
          ></input>
        </label>

        {/* button  */}

        <div className='gap-4 mx-3 mb-5 flex-end'>
          <Link href='/' className='text-sm text-gray-500'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
        
        
        
      </form>
    </section>
  );
};

export default Form;
