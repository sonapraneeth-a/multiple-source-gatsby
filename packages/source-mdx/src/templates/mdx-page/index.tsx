import React from 'react';
import { graphql, PageProps } from 'gatsby';

import { CollectionItem } from '@sonapraneeth/gatsby-source-core';
import MdxTemplate from '../../components/mdx-page';

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
// Reference: https://github.com/gatsbyjs/gatsby/blob/master/examples/using-typescript/src/pages/index.tsx
interface MdxPageTemplateProps extends PageProps {
    data: {
        collectionItem: CollectionItem;
    };
}

/**
 *
 * @param {*} collectionItem
 * @return {JSX}
 */
function MdxPageTemplate({
    data,
    location,
}: MdxPageTemplateProps): JSX.Element {
    return (
        <MdxTemplate collectionItem={data.collectionItem} location={location} />
    );
}

MdxPageTemplate.defaultProps = {};

export default MdxPageTemplate;

export const query = graphql`
    query MdxQuery($id: String!) {
        collectionItem(id: { eq: $id }) {
            id
            slug
            title
            body
            excerpt
            tableOfContents
            showTOC
            tags
            categories
            timeToRead
            publishedTime
            lastModifiedTime
        }
    }
`;
