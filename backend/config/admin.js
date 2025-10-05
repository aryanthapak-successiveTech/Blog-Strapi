module.exports = ({ env }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET"),
  },
  apiToken: {
    salt: env("API_TOKEN_SALT"),
  },
  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT"),
    },
  },
  secrets: {
    encryptionKey: env("ENCRYPTION_KEY"),
  },
  flags: {
    nps: env.bool("FLAG_NPS", true),
    promoteEE: env.bool("FLAG_PROMOTE_EE", true),
  },
  preview: {
    enabled: true,
    config: {
      allowedOrigins: [env("CLIENT_URL", "http://localhost:3000")],
      async handler(uid, { documentId, locale, status }) {
        const document = await strapi
          .documents(uid)
          .findOne({ documentId, publicationState: "preview" });

        if (!document) {
          throw new Error("Document not found for preview");
        }

        const urlSearchParams = new URLSearchParams({
          secret: env("PREVIEW_SECRET"),
          ...(documentId && { documentId }),
          uid,
          status,
        });

        return `${env("CLIENT_URL", "http://localhost:3000")}/api/preview?${urlSearchParams.toString()}`;
      },
    },
  },
});
