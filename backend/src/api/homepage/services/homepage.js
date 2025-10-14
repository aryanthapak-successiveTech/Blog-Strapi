"use strict";

/**
 * homepage service
 */

const { createCoreService } = require("@strapi/strapi").factories;
const redis = require("../../../../config/redis");

module.exports = createCoreService("api::homepage.homepage", ({ strapi }) => ({
  async getHomePage(status) {
    const cacheKey = `homepage`;
    console.log(status);
    const cachedData = await redis.GET(cacheKey);
    if (status === "published" && cachedData) {
      return JSON.parse(String(cachedData));
    }

    const homepage = await strapi.db.query("api::homepage.homepage").findMany({
      where: { publishedAt: { $notNull: status === "published" }},
      populate: ["footer", "hero"],
    });

    const requestedHomepage = homepage[0];
    if (status === "published") {
      await redis.SET(cacheKey, JSON.stringify(requestedHomepage), {
        EX: 3600,
      });
    }

    return requestedHomepage;
  },
}));
