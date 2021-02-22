/* eslint-disable new-cap */
const Debug = require(`debug`);

const DebugTheme = Debug(`@sonapraneeth/gatsby-theme-blog`);

module.exports = {
    debug: DebugTheme,
    debugNode: DebugTheme.extend(`node`),
    layout: DebugTheme.extend(`layout`),
    component: DebugTheme.extend(`component`),
};
