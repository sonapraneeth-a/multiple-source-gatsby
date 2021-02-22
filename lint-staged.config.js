module.exports = {
    '*.{js,jsx,ts,tsx}': [
        `eslint --ignore-path .gitignore --ignore-path .prettierignore --fix`,
    ],
    '*.{md,mdx,json,yml,yaml}': [`prettier "**/*.{md,mdx,json,yaml}" --write`],
};
