// Default options to be used in theme
module.exports = (themeOptions) => {
    // Base Url
    // Default: "/"
    const baseUrl = themeOptions.baseUrl || `/`;
    // Name identifier
    // Default: ""
    const name = themeOptions.name || ``;
    // Content directory
    // Default: "content"
    const contentPath = themeOptions.contentPath || `content`;
    // Gatsby remark plugins
    // Default: "[]"
    const gatsbyRemarkPlugins = themeOptions.gatsbyRemarkPlugins || [];
    // Remark plugins
    // Default: "[]"
    const remarkPlugins = themeOptions.remarkPlugins || [];

    return {
        baseUrl,
        name,
        contentPath,
        gatsbyRemarkPlugins,
        remarkPlugins,
    };
};
