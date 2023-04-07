import React from "react";
import { SignOutButton, useUser } from "@clerk/nextjs";

const CreatePostWizard = () => {
    const { user } = useUser();

    console.log(user)

    if (!user) {
        return <div>Not signed in</div>;
    }

  return (
    <div className="flex w-full gap-3">
      <img src={user.profileImageUrl}  alt="Profile image" className="h-14 w-14 rounded-full"/>
      <input placeholder="Type something in!" className="grow bg-transparent outline-none"/>
    </div>
  );
};

export default CreatePostWizard;
