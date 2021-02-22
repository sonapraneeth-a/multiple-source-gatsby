module.exports = {
    siteMetadata: {
        appName: `GatsbyJS All Demo`,
        title: `GatsbyJS All Demo`,
        author: `John Doe`,
        siteUrl: `https://demo-sonapraneeth-themes-blog.netlify.app/`,
        baseUrl: `/`,
        description:
            `This site is a demonstration for using theme ` +
            `@sonapraneeth/gatsby-theme-blog`,
    },
    plugins: [
        {
            resolve: `@sonapraneeth/gatsby-theme-blog`,
            options: {
                baseUrl: `/`,
                name: `my-blog`,
                contentPath: `content/blogs`,
            },
        },
        {
            resolve: `@sonapraneeth/gatsby-theme-project`,
            options: {
                baseUrl: `/`,
                name: `my-project`,
                contentPath: `content/projects`,
            },
        },
    ],
};
