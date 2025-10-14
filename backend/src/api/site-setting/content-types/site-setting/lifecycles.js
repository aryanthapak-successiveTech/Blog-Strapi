const redis =require("../../../../../config/redis");

module.exports={
    async afterUpdate(){
        await redis.DEL("site-settings");
    },
    async afterDelete(){
        await redis.DEL("site-settings");
    }
};