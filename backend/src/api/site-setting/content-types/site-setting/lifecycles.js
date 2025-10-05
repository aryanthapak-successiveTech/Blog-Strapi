const redis =require("../../../../../config/redis");

module.exports={
    async afterUpdate(event){
        await redis.DEL("site-settings");
    },
    async afterDelete(event){
        await redis.DEL("site-settings");
    }
};