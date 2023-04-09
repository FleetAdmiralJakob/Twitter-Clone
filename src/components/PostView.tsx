import React from "react";
import type { RouterOutputs } from "~/utils/api";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";

dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];
const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <div key={post.id} className="flex items-center p-4 border-b border-black dark:border-slate-400 gap-3">
      <Image
        src={author.profilePictureImageUrl}
        alt={"Profile Picture of " + author.username}
        className="h-14 w-14 rounded-full"
        width={56}
        height={56}
      />
      <div className="flex flex-col">
        <div className="flex text-black dark:text-slate-300 gap-1">
          <span>{`@${author.username!}`}</span>
          <span className="font-thin">{`· ${dayjs(post.createdAt).fromNow()}`}</span>
        </div>
        <span className="text-2xl">{post.content}</span>
      </div>
    </div>
  );
};

export default PostView;
