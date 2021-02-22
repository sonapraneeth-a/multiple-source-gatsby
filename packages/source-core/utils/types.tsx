export type CollectionItem = {
    id: string;
    slug: string;
    title: string;
    name: string;
    excerpt: string;
    body: string;
    tableOfContents: JSON;
    showTOC: boolean;
    tags: Array<string>;
    categories: string[];
    timeToRead: number;
    publishedTime: Date;
    lastModifiedTime: Date;
};
