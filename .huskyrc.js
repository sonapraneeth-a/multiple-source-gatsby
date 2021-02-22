module.exports = {
	hooks: {
		"pre-commit": ["pretty-quick --staged --verbose && lint-staged"],
		"pre-push": ["yarn type-check"],
	},
};
