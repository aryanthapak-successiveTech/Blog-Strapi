"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const extensionService = strapi.plugin("graphql").service("extension");
    extensionService.use({
      typeDefs: `
      type PageInfo {
        nextCursor:String,
        hasNextPage:Boolean!
      }
      
      type BlogConnection{
        data:[Blog!]!,
        pageInfo:PageInfo!
      }

      type Query{
      blogsPaginated(cursor:String,limit:Int):BlogConnection!
      }
      `,
      resolversConfig: {
    "Query.blogsPaginated": {
      auth: false,
    },},
      resolvers: {
        Query: {
          async aboutPage(parent, args, ctx) {
            const data = await strapi
              .service("api::about-page.about-page")
              .findOne({ args });
            return data;
          },
          async blog(parent, args, ctx) {
            const { documentId ,status} = args;

            const data = await strapi
              .service("api::blog.blog")
              .getBlog(documentId,status);

            return data;
          },
          async blogsPaginated(parent, args, ctx) {
          const {cursor,limit}=args;
          const decodedCursor=cursor?JSON.parse(Buffer.from(cursor,"base64").toString("utf8")):null;
          const blogsDataAndPagination=await strapi.service("api::blog.blog").getPaginatedBlogs({cursor:decodedCursor,limit});
          return blogsDataAndPagination;
        },
        async siteSetting(){
          const siteSetting=await strapi.service("api::site-setting.site-setting").getSiteSettings();
          return siteSetting;
        },
        async homepage(parent,args,ctx){
          const homepage=await strapi.service("api::homepage.homepage").getHomePage(args.status);
          return homepage;
        }
        },
      },
    });
  },
  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
