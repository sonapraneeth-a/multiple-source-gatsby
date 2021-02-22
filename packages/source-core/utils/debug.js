/* eslint-disable new-cap */
const Debug = require(`debug`);

const DebugTheme = Debug(`@sonapraneeth/gatsby-source-core`);

module.exports = {
    debug: DebugTheme,
    debugNode: DebugTheme.extend(`node`),
};
