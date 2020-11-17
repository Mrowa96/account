const config = {
  app: {
    url: process.env.APP_URL as string,
    api: {
      url: process.env.APP_API_URL as string,
      port: parseInt(process.env.APP_API_PORT as string, 10),
    },
  },
};

export default config;
