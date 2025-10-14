"use strict";

/**
 * about-page service
 */

const { createCoreService } = require("@strapi/strapi").factories;
const redis = require("../../../../config/redis");

module.exports = createCoreService("api::about-page.about-page", ({ strapi }) => ({
  async findOne(params) {
    const cacheKey = "aboutPage";

    const cached = await redis.GET(cacheKey);
    
    if(cached){
        const aboutPage=JSON.parse(String(cached));
        return aboutPage
    }

    const aboutSection = await strapi.entityService.findMany("api::about-page.about-page", {
      populate: ["heroImage"],
    });

    const result = aboutSection;

    await redis.SET(cacheKey, JSON.stringify(result), {EX:3600});

    return result;
  }
}));
