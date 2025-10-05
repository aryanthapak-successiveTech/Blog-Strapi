'use strict';

/**
 * homepage service
 */

const { createCoreService } = require('@strapi/strapi').factories;
const redis =require("../../../../config/redis");

module.exports = createCoreService('api::homepage.homepage',({strapi})=>({
    async getHomePage(){
        const cacheKey=`homepage`;
        const cachedData=await redis.GET(cacheKey);
        if(cachedData){
            return JSON.parse(String(cachedData));
        }

        const homepage=await strapi.entityService.findMany("api::homepage.homepage",{
            populate:["footer","hero"]
        });

        await redis.SET(cacheKey,JSON.stringify(homepage),{EX:3600});
        
        return homepage;
    }
}));
