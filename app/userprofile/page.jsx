"use client";

import  User  from "@components/User";
import { useState,useEffect } from "react";
import { useSearchParams } from "next/navigation";

const UserProfile = () => {
    const searchParams = useSearchParams("");
    const [user, setUser] = useState({
        name: "",
        email: "",
        image: "",
    });

    const userId = searchParams.get("userId");
    console.log(userId)

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`/api/profile/${userId}`);
            const data = await response.json();
            console.log(data);
            setUser({
                name: data.name,
                email: data.email,
                image: data.image,
            });
        };
        if (userId) {
            fetchUser();
        }
    }, []);

    return (
       
            <User user={user}/>
        
        
    );
};

export default UserProfile;