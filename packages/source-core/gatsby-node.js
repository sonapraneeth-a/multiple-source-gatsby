// const withDefaults = require(`./utils/default-options`);
// const debug = require("./utils/debug").debugNode;

exports.createSchemaCustomization = ({ actions, schema }) => {
    actions.createTypes(`
    interface ICollectionItem @nodeInterface {
      id: ID!
      title: String!
      name: String!
      slug: String!
      body: String!
      excerpt: String!
      tableOfContents: JSON
      isDraft: Boolean!
      showTOC: Boolean!
      tags: [String!]!
      categories: [String!]!
      publishedTime: Date! @dateformat
      lastModifiedTime: Date! @dateformat
    }
    type CollectionItem implements ICollectionItem & Node @dontInfer {
      id: ID!
      title: String!
      name: String!
      slug: String!
      body: String!
      excerpt: String!
      tableOfContents: JSON
      isDraft: Boolean!
      showTOC: Boolean!
      tags: [String!]!
      categories: [String!]!
      timeToRead: Int
      publishedTime: Date! @dateformat
      lastModifiedTime: Date! @dateformat
    }
  `);
};
