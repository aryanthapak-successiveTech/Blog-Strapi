const redis = require("../../../../../config/redis");
module.exports = {

  async afterUpdate(event) {
    const { result } = event;
    const documentId = result?.documentId;
    const cacheKey = `blog:${documentId}`;
    await redis.DEL(cacheKey);
    const paginationKeys = await redis.keys("blogs:cursor:*");
    if (paginationKeys.length) {
      await redis.DEL(paginationKeys);
    }
  },
  async afterDelete(event) {
    const { result } = event;
    const documentId = result?.documentId;
    const cacheKey = `blog:${documentId}`;
    await redis.DEL(cacheKey);
    const paginationKeys = await redis.keys("blogs:cursor:*");
    if (paginationKeys.length) {
      await redis.DEL(paginationKeys);
    }
  },
};
