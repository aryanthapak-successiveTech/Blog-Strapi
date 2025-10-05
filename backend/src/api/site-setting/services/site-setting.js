'use strict';

/**
 * site-setting service
 */

const { createCoreService } = require('@strapi/strapi').factories;
const redis =require("../../../../config/redis");

module.exports = createCoreService('api::site-setting.site-setting',({strapi})=>({
    async getSiteSettings(){
   
        const cacheKey=`site-settings`;
        const cachedData=await redis.GET(cacheKey);
        if(cachedData){
            return JSON.parse(String(cachedData));
        }

        const siteSettings=await strapi.entityService.findMany("api::site-setting.site-setting",{
            populate:["authNavigation","navigation"]
        });

        await redis.SET(cacheKey,JSON.stringify(siteSettings),{EX:3600});

        return siteSettings;
    }
}));
