import React from "react";
import { api } from "~/utils/api";
import PostView from "~/components/PostView";
import { LoadingPage } from "~/components/LoadingSpinner";

const Feed = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

  if (postsLoading) {
    return <LoadingPage />;
  }

  if (!data) {
    return <div className="absolute top-0 right-0 w-screen h-screen
                flex justify-center items-center">Something went wrong...</div>;
  }

  return (
    <div className="flex flex-col justify-center">
      {[...data]?.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

export default Feed;
