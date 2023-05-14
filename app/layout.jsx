//no need to import react in nextjs
//this folder will available in all pages of the app
//this is the place to put the header and footer
//this is the place to put the css that will be available in all pages

export const metadata = {
  title: "PromptAI",
  description: "Discover the best AI Prompt solutions for your business",
};

import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <body>
        <div className="">
          <div className="gradient"></div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
