//no need to import react in nextjs

import  Feed  from "@components/Feed";

const Home = () => {
  return (
    <section className="flex-col w-full flex-center">
      <h1 className="text-center head_text">
        Discover & Share
        <br className="max-md:hidden"></br>
        <span className="text-center orange_gradient">AI-Powered Prompt</span>
      </h1>
      <p className="text-center desc">
        Next Ai Prompt App is a platform for discovering and sharing AI-Powered
        Prompt.
      </p>

      <Feed />
    </section>
  );
};

export default Home;
