"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const handleDropdown = () => {
    setToggleDropdown((prev) => !prev);
  };

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setUpProviders();
  }, []);

  return (
    <nav className="w-full pt-3 mb-16 flex-between">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          className="object-contain"
          src="/assets/images/logo.svg"
          width={30}
          height={30}
          alt="Prompt logo"
        />
        <p className="logo_text">Next-AI-Prompt</p>
      </Link>

      <div className="hidden sm:flex">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile" className="flex gap-2 flex-center">
              <Image
                src= {session?.user?.image || "/assets/images/logo.svg"}
                className="rounded-full"
                width={40}
                height={40}
                alt="profile image"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile navigation */}

      <div className="relative flex sm:hidden">
        {session?.user ? (
          <div className="flex">
            <Image
              src= {session?.user?.image || "/assets/images/logo.svg"}
              className="rounded-full"
              width={40}
              height={40}
              alt="profile image"
              onClick={handleDropdown}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={handleDropdown}
                >
                  My Profile
                </Link>

                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={handleDropdown}
                >
                  Create Post
                </Link>

                <button
                    type="button"
                    onClick={
                    signOut() +
                    handleDropdown
                    }
                    className="w-full mt-5 black_btn"
                    >
                    Sign Out
                </button>
                
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
