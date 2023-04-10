import React from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

const CreatePostWizard = () => {
  const { user } = useUser();

  if (!user) {
    return <div>Not signed in</div>;
  }

  return (
    <div className="flex w-full gap-3">
      <Image
        src={user.profileImageUrl}
        alt={`@${user.username!}'s profile picture`}
        className="h-14 w-14 rounded-full"
        width={56}
        height={56}
      />
      <input
        placeholder="Type something in!"
        className="grow bg-transparent outline-none"
      />
    </div>
  );
};

export default CreatePostWizard;
