module.exports = {
  apps: [
    {
      name: "demand10-frontend",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 8000
      }
    }
  ]
};
