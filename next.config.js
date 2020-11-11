/* eslint-disable */

module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/timers",
        permanent: false,
      },
    ];
  },
};
