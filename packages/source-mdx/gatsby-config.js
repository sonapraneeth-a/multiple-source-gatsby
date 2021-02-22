const path = require(`path`);
const admonitions = require(`remark-admonitions`);

const withDefaults = require(`./utils/default-options`);
const debug = require(`./utils/debug`).debugNode;

module.exports = (themeOptions) => {
    // Options created using default and provided options
    const options = withDefaults(themeOptions);
    debug(
        `Options for @sonapraneeth/gatsby-source-mdx: ${JSON.stringify(
            options,
            null,
            2,
        )}`,
    );
    let gatsbyRemarkPlugins = [];
    let remarkPlugins = [];
    if (
        options.gatsbyRemarkPlugins !== undefined &&
        options.gatsbyRemarkPlugins !== null
    ) {
        gatsbyRemarkPlugins = options.gatsbyRemarkPlugins;
    }
    if (options.remarkPlugins !== undefined && options.remarkPlugins !== null) {
        remarkPlugins = options.remarkPlugins;
    }
    return {
        // Default siteMetadata
        siteMetadata: {
            appName: `Gatsby Source MDX Package`,
            title: `Gatsby Source MDX Package`,
            author: `John Doe`,
            siteUrl: `/`,
            baseUrl: `/`,
            description:
                `This site is a demonstration for using theme ` +
                `@sonapraneeth/gatsby-source-mdx`,
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
                resolve: `@sonapraneeth/gatsby-source-core`,
                options: {
                    baseUrl: options.baseUrl,
                    name: options.name,
                    path: path.resolve(options.contentPath),
                },
            },
            {
                resolve: `gatsby-source-filesystem`,
                options: {
                    name: options.contentPath,
                    path: path.resolve(options.contentPath),
                },
            },
            {
                resolve: `gatsby-plugin-mdx`,
                options: {
                    extensions: [`.mdx`, `.md`],
                    gatsbyRemarkPlugins: [
                        {
                            resolve: `gatsby-remark-copy-linked-files`,
                        },
                    ].concat(gatsbyRemarkPlugins),
                    remarkPlugins: [admonitions].concat(remarkPlugins),
                },
            },
        ],
    };
};
