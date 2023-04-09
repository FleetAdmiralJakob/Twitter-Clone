import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { User } from "@clerk/nextjs/dist/api";
import { clerkClient } from "@clerk/nextjs/api";
import { TRPCError } from "@trpc/server";

// This is a helper function to filter out the user data we don't want to send to the client
const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profilePictureImageUrl: user.profileImageUrl,
  };
};

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 100,
    });

    const users = (
      await clerkClient.users.getUserList({
        userId: posts.map((post) => post.authorId),
        limit: 100,
      })
    ).map(filterUserForClient);

    return posts.map((post) => {
      const author = users.find((user) => user.id === post.authorId);

      if (!author || !author.username) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Author for post not",
        });
      }

      return {
        post,
        author: {
          ...author,
          username: author.username,
        },
      };
    });
  }),
});
