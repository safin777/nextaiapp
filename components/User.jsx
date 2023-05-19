"use client";
import Image from "next/image";
const User = ({ user }) => {
  const { name, email, image } = user;

  return (
    <section className="grid max-w-sm overflow-hidden rounded-lg place-items-center bg-gradient-to-r from-orange-200 to-indigo-300 ">
      <Image
        className="object-center border-2 border-gray-300 rounded-full"
        src={image}
        alt="Profile"
        width={150}
        height={150}
      />
      <div className="p-4">
        <h2 className="mb-2 text-xl font-bold orange_gradient">{name.toUpperCase()}</h2>
        <p className="text-gray-700">Email : {email}</p>
        <p className="mt-4 text-gray-600">
          Thanks for visiting my profile.
        </p>
      </div>
    </section>
  );
};

export default User;
