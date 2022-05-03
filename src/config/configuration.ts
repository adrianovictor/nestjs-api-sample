export default () => ({
    port: parseInt(process.env.PORT) || 3000,
    external_api: {
        githubUsers: process.env.GITHUB_USER_API,
    },
});
