module.exports = {
    siteMetadata: {
        appName: `GatsbyJS Project Demo`,
        title: `GatsbyJS Project Demo`,
        author: `John Doe`,
        siteUrl: `https://demo-sonapraneeth-themes-project.netlify.app/`,
        baseUrl: `/`,
        description:
            `This site is a demonstration for using theme ` +
            `@sonapraneeth/gatsby-theme-project`,
    },
    plugins: [
        {
            resolve: `@sonapraneeth/gatsby-theme-project`,
            options: {
                baseUrl: `/`,
                name: `my-project`,
                contentPath: `content`,
            },
        },
    ],
};
