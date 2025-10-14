const redis = require("../../../../../config/redis");
module.exports = {
  async afterUpdate(event) {
    const { result } = event;
    const documentId = result?.documentId;
    const blogKeys = await redis.keys(`blog:${documentId}:status:*`);
    if (blogKeys.length) {
      await redis.DEL(blogKeys);
      strapi.log.info(`Deleted ${blogKeys.length} blog cache keys for ${documentId}`);
    }

    const paginationKeys = await redis.keys("blogs:cursor:*");
    if (paginationKeys.length) {
      await redis.DEL(paginationKeys);
    }
  },
  async afterDelete(event) {
    const { result } = event;
    const documentId = result?.documentId;
    const blogKeys = await redis.keys(`blog:${documentId}:status:*`);
    if (blogKeys.length) {
      await redis.DEL(blogKeys);
      strapi.log.info(`Deleted ${blogKeys.length} blog cache keys for ${documentId}`);
    }

    const paginationKeys = await redis.keys("blogs:cursor:*");
    if (paginationKeys.length) {
      await redis.DEL(paginationKeys);
    }
  },
};
