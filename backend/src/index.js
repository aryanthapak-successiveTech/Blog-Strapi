"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const extensionService = strapi.plugin("graphql").service("extension");
    extensionService.use({
      resolvers: {
        Mutation: {
          async createBlog(parent, args, context, info) {
            const { id: userId } = context.state.user || {};
            if (!userId) {
              throw new Error("Unauthorized");
            }
            args.data.postedBy = userId;
            const createdBlog = await strapi.service("api::blog.blog").create({
              data: args.data,
            });

            return createdBlog;
          },

          async createComment(parent, args, context) {
            const { id: userId } = context.state.user || {};
            if (!userId) {
              throw new Error("Unauthorized");
            }

            const { data } = args;

            if (!data.commentText || !data.commentedOn) {
              throw new Error("Comment text and blog ID are required");
            }

            const blog = await strapi.db.query("api::blog.blog").findOne({
              where: { documentId: data.commentedOn },
            });

            if (!blog) {
              throw new Error("Blog does not exist");
            }

            const newComment = await strapi.entityService.create(
              "api::comment.comment",
              {
                data: {
                  commentText: data.commentText,
                  commentedOn: data.commentedOn,
                  commentedBy: userId,
                },
                populate: ["commentedBy", "commentedOn"],
              }
            );
            
            return newComment;
          },

          async deleteBlog(parent, args, context) {
            const { id: userId } = context.state.user || {};
            if (!userId) {
              throw new Error("Unauthorized");
            }

            const { documentId: blogId } = args;
            if (!blogId) {
              throw new Error("Blog Id isn't provided");
            }

            const blog = await strapi
              .service("api::blog.blog")
              .findOne(blogId, {
                populate: ["postedBy"],
              });

            if (!blog) {
              throw new Error("Blog not found");
            }

            if (blog.postedBy.id != userId) {
              throw new Error("You aren't author of this blog");
            }

            await strapi.service("api::blog.blog").delete(blogId);

            return { documentId: blogId };
          },

          async updateBlog(parent, args, context) {
            const { id: userId } = context.state.user || {};
            if (!userId) {
              throw new Error("Unauthorized");
            }

            const { documentId, title, article, blogImage } = args;
            if (!documentId) {
              throw new Error("Blog Id isn't provided");
            }

            const [blog] = await strapi.entityService.findMany(
              "api::blog.blog",
              {
                filters: { documentId },
                populate: ["postedBy"],
              }
            );

            if (!blog) {
              throw new Error("Blog doesn't exist");
            }

            if (blog.postedBy?.id !== userId) {
              throw new Error("You aren't the author of this blog");
            }

            const updatedBlog = await strapi.entityService.update(
              "api::blog.blog",
              blog.id,
              {
                data: args.data, // <-- use args.data directly
              }
            );

            return updatedBlog;
          },
        },
      },
    });
  },
  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
