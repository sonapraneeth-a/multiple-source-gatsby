const path = require(`path`);
const fs = require(`fs`);
const { createFilePath } = require(`gatsby-source-filesystem`);

const withDefaults = require(`./utils/default-options`);
// const debug = require("./utils/debug").debugNode;

const mdxTemplate = `./src/templates/mdx-page/index.tsx`;

// 0. Validate plugin options
exports.pluginOptionsSchema = ({ Joi }) =>
    Joi.object({
        name: Joi.string(),
        baseUrl: Joi.string()
            .default(`/`)
            .description(`Base url of the website`),
        contentPath: Joi.string()
            .default(`content`)
            .description(`Path for folder containing mdx files`),
        remarkPlugins: Joi.array(),
        gatsbyRemarkPlugins: Joi.array(),
    });

// 1. Make sure the necessary directories exist
exports.onPreBootstrap = ({ store, reporter }, themeOptions) => {
    const { program } = store.getState();
    // Options created using default and provided options
    const options = withDefaults(themeOptions);
    // debug(`Options: ${JSON.stringify(options, null, 2)}`);
    const directories = [path.join(program.directory, options.contentPath)];
    directories.forEach((directoryPath) => {
        reporter.info(`Looking for ${directoryPath} directory`);
        if (!fs.existsSync(directoryPath)) {
            reporter.info(`Creating the ${directoryPath} directory`);
            // Reference:
            // https://stackoverflow.com/questions/31645738/how-to-create-full-path-with-nodes-fs-mkdirsync
            fs.mkdirSync(directoryPath, { recursive: true });
        }
    });
};

const mdxResolverPassthrough = (fieldName) => async (
    source,
    args,
    context,
    info,
) => {
    const type = info.schema.getType(`Mdx`);
    const mdxNode = context.nodeModel.getNodeById({
        id: source.parent,
    });
    const resolver = type.getFields()[fieldName].resolve;
    const result = await resolver(mdxNode, args, context, {
        fieldName,
    });
    return result;
};

exports.createSchemaCustomization = ({ actions, schema }) => {
    actions.createTypes(
        schema.buildObjectType({
            name: `CollectionItem`,
            fields: {
                body: {
                    type: `String!`,
                    resolve: mdxResolverPassthrough(`body`),
                },
                excerpt: {
                    type: `String!`,
                    args: {
                        pruneLength: {
                            type: `Int`,
                            defaultValue: 140,
                        },
                    },
                    resolve: mdxResolverPassthrough(`excerpt`),
                },
                tableOfContents: {
                    type: `JSON`,
                    args: {
                        maxDepth: {
                            type: `Int`,
                            defaultValue: 6,
                        },
                    },
                    resolve: mdxResolverPassthrough(`tableOfContents`),
                },
                timeToRead: {
                    type: `Int`,
                    resolve: mdxResolverPassthrough(`timeToRead`),
                },
            },
        }),
    );
};

// Create fields for post slugs and source
// This will change with schema customization with work
exports.onCreateNode = (
    { node, actions, getNode, createNodeId, createContentDigest },
    themeOptions,
) => {
    // Options created using default and provided options
    const options = withDefaults(themeOptions);
    const { createNode, createParentChildLink } = actions;

    if (node.internal.type !== `Mdx`) {
        return;
    }

    // Create source field (according to contentPath)
    const fileNode = getNode(node.parent);
    const source = fileNode.sourceInstanceName;
    if (node.internal.type === `Mdx` && source === options.contentPath) {
        let { baseUrl } = options;
        if (options.baseUrl.slice(-1) === `/`) {
            // remove the last `/`
            baseUrl = options.baseUrl.slice(0, -1);
        }
        const slug = `${baseUrl}${createFilePath({
            node: fileNode,
            getNode,
            basePath: options.contentPath,
        })}`;
        const { frontmatter } = node;
        const collectionItemData = {
            title: frontmatter.title || ``,
            name: options.name || ``,
            slug,
            body: node.body,
            timeToRead: node.timeToRead,
            isDraft: frontmatter.isDraft || false,
            showTOC:
                frontmatter.showTOC !== undefined &&
                frontmatter.showTOC !== null
                    ? frontmatter.showTOC
                    : true,
            tags: `tags` in frontmatter ? frontmatter.tags : [],
            categories:
                `categories` in frontmatter ? frontmatter.categories : [],
            publishedTime:
                `publishedTime` in frontmatter
                    ? frontmatter.publishedTime
                    : fileNode.birthTime,
            lastModifiedTime: fileNode.modifiedTime,
        };
        const mdxItem = {
            ...collectionItemData,
            // Required fields.
            id: createNodeId(`${node.id} >>> CollectionItem`),
            parent: node.id,
            children: [],
            internal: {
                type: `CollectionItem`,
                contentDigest: createContentDigest(
                    JSON.stringify(collectionItemData),
                ),
                content: JSON.stringify(collectionItemData),
                description: `Collection Items`,
            },
        };
        createNode(mdxItem);
        createParentChildLink({ parent: fileNode, child: node });
    }
};

exports.createPages = async ({ actions, graphql, reporter }, themeOptions) => {
    // Options created using default and provided options
    const options = withDefaults(themeOptions);
    // debug(`Options: ${JSON.stringify(options, null, 2)}`);
    // MDX file templating
    const fields = `
    id
    slug
  `;
    const queryProd = `
  query AllCollectionItemsQuery {
    allCollectionItem(
        filter: {name: {eq: ${options.name}}, isDraft: {eq: false}}
    ) {
      edges {
        node {
          ${fields}
        }
      }
    }
  }`;
    const queryDev = `
  query AllCollectionItemsQuery {
    allCollectionItem(
        filter: {name: {eq: ${options.name}}}
    ) {
      edges {
        node {
          ${fields}
        }
      }
    }
  }`;
    let result = null;
    if (process.env.NODE_ENV !== `production`) {
        result = await graphql(queryDev);
    } else {
        result = await graphql(queryProd);
    }
    const collectionItems = result.data.allCollectionItem.edges;
    console.log(`Number of collectionItems: ${collectionItems.length}`);
    if (collectionItems.length === 0) {
        reporter.panic(`
      There does not seem to be any file present in
      '${options.contentPath}' directory. Hence collectionItem
      pages would not be created. Please add some
      files in '${options.contentPath}' directory`);
    }
    // debug(`CollectionItems in ${process.env.NODE_ENV} env`);
    // debug(JSON.stringify(collectionItems, null, 2));
    if (collectionItems.length > 0) {
        collectionItems.forEach((collectionItem) => {
            // debug(`Creating collectionItem page for
            // '${collectionItem.node.title}'`);
            actions.createPage({
                path: collectionItem.node.slug,
                component: require.resolve(mdxTemplate),
                context: {
                    id: collectionItem.node.id,
                },
            });
        });
    }
};
