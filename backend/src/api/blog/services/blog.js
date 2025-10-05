"use strict";

/**
 * blog service
 */

const { createCoreService } = require("@strapi/strapi").factories;

const redis = require("../../../../config/redis");

module.exports = createCoreService("api::blog.blog", ({ strapi }) => ({
  async getBlog(blogId) {
    const blogKey = `blog:${blogId}`;
    const cachedData = await redis.GET(blogKey);
    if (cachedData) {
      return JSON.parse(String(cachedData));
    }

    const blog = await strapi.db.query("api::blog.blog").findOne({
      where: { documentId: blogId },
      populate: ["postedBy", "blogImage"],
    });
    if (!blog) {
      return new Error("Blog not found");
    }

    await redis.SET(blogKey, JSON.stringify(blog), { EX: 3600 });

    return blog;
  },

  async getPaginatedBlogs(paginationAndFilters) {
    const { cursor, limit = 4 } = paginationAndFilters;
    const cursorKey = cursor
      ? Buffer.from(JSON.stringify(cursor)).toString("base64")
      : "start";
      
    const cacheKey = `blogs:cursor:${cursorKey}:limit:${limit}`;
    const cachedData = await redis.GET(cacheKey);
    if (cachedData) {
      return JSON.parse(String(cachedData));
    }
    const where = cursor
      ? {
          $or: [
            { createdAt: { $lt: cursor.createdAt } },
            {
              createdAt: { $eq: cursor.createdAt },
              documentId: { $lt: cursor.documentId },
            },
          ],
        }
      : {};

    const blogsData = await strapi.entityService.findMany("api::blog.blog", {
      where,
      orderBy: { createdAt: "DESC", documentId: "DESC" },
      limit: limit + 1,
    });

    const hasNextPage = blogsData.length > limit;
    const items = blogsData.slice(0, limit);

    const endCursor = hasNextPage
      ? {
          createdAt: items[items.length - 1].createdAt,
          documentid: items[items.length - 1].documentId,
        }
      : null;

    const encodedCursor = endCursor
      ? Buffer.from(JSON.stringify(endCursor)).toString("base64")
      : "";

    const response = {
      data: items,
      pageInfo: {
        nextCursor: encodedCursor,
        hasNextPage,
      },
    };

    await redis.SET(cacheKey, JSON.stringify(response),{EX:3600});

    return response;
  },
}));
