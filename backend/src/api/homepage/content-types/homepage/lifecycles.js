const redis =require("../../../../../config/redis");

module.exports={
    async afterUpdate(event){
        await redis.DEL("homepage");
    },
    async afterDelete(event){
        await redis.DEL("homepage");
    }
};