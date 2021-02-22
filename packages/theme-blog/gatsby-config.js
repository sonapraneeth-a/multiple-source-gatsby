const withDefaults = require(`./utils/default-options`);
const debug = require(`./utils/debug`).debugNode;

module.exports = (themeOptions) => {
    // Options created using default and provided options
    const options = withDefaults(themeOptions);
    debug(
        `Options for @sonapraneeth/gatsby-theme-blog: ${JSON.stringify(
            options,
            null,
            2,
        )}`,
    );
    return {
        // Default siteMetadata
        siteMetadata: {
            appName: `Gatsby Theme Blog Package`,
            title: `Gatsby Theme Blog Package`,
            author: `John Doe`,
            siteUrl: `/`,
            baseUrl: `/`,
            description:
                `This site is a demonstration for using theme ` +
                `@sonapraneeth/gatsby-theme-blog`,
            social: {
                facebook: ``,
                twitter: ``,
                email: ``,
                linkedin: ``,
                github: ``,
            },
        },
        plugins: [
            {
                resolve: `@sonapraneeth/gatsby-source-mdx`,
                options: {
                    baseUrl: options.baseUrl,
                    name: options.name,
                    contentPath: options.contentPath,
                    gatsbyRemarkPlugins: options.gatsbyRemarkPlugins,
                    remarkPlugins: options.remarkPlugins,
                },
            },
        ],
    };
};
