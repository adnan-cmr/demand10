module.exports = {
  apps: [
    {
      name: "rankb2b-frontend",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 8000,
      },
    },
  ],
};