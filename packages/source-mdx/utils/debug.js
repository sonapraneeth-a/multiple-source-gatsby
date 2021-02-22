/* eslint-disable new-cap */
const Debug = require(`debug`);

const DebugTheme = Debug(`@sonapraneeth/gatsby-source-mdx`);

module.exports = {
    debug: DebugTheme,
    debugNode: DebugTheme.extend(`node`),
    layout: DebugTheme.extend(`layout`),
    component: DebugTheme.extend(`component`),
    widget: DebugTheme.extend(`widget`),
    hooks: DebugTheme.extend(`hooks`),
    menu: DebugTheme.extend(`menu`),
};
