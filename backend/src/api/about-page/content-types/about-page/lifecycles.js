const redis=require("../../../../../config/redis");
module.exports={
    async afterUpdate(){
    await redis.del("aboutPage");
    strapi.log.info("Cache invalidated: aboutPage");
    },
    
    async afterDelete(event) {
    await redis.del("aboutPage");
    strapi.log.info("Cache invalidated: aboutPage (deleted)");
  },
}