module.exports = ({ env }) => ({
  graphql: {
    enabled: true,
    config: {
      shadowCRUD: true,
      playgroundAlways: true,
      endpoint: "/graphql",
    },
  },
});
