import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';

import { CollectionItem } from '@sonapraneeth/gatsby-source-core';

const components = {};

/**
 *
 * @param {*} collectionItem
 * @return {JSX}
 */
const MdxTemplate: React.FunctionComponent<MdxTemplateProps> = ({
    collectionItem,
    location,
}): JSX.Element => (
    <div
        style={{
            width: `100%`,
        }}
    >
        <div
            style={{
                width: `100%`,
                height: `4rem`,
                position: `fixed`,
            }}
        >
            Collection Core Theme
        </div>
        <div
            style={{
                marginLeft: `15rem`,
                marginRight: `1rem`,
            }}
        >
            <p>{collectionItem.id}</p>
            <p>{collectionItem.title}</p>
            <p>{collectionItem.slug}</p>
            <div>
                <MDXProvider components={components}>
                    <MDXRenderer>{collectionItem.body}</MDXRenderer>
                </MDXProvider>
            </div>
        </div>
    </div>
);

type MdxTemplateProps = {
    collectionItem: CollectionItem;
    location: Location;
};

MdxTemplate.defaultProps = {};

export default MdxTemplate;
