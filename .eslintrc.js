// https://eslint.org/docs/user-guide/configuring

module.exports = {
	root: true,
	parserOptions: {
		parser: 'babel-eslint'
	},
	env: {
		browser: true,
	},
	extends: [
		// https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
		// consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
		'plugin:vue/essential',
		// https://github.com/standard/standard/blob/master/docs/RULES-en.md
		'standard'
	],
	// required to lint *.vue files
	plugins: [
		'vue'
	],
	// add your custom rules here
	rules: {
		"no-console": "off",
		'no-debugger': 'off',
		'no-eval': 'off',
		"no-extra-semi": "off",
		'semi': "off",
		"comma-dangle": [2, "never"],
		"eqeqeq": [2, "allow-null"],
		"eol-last": "off",
		"indent": "off",
		"no-tabs": "off",
		"spaced-comment": "off",
		"quotes": "off",
		"linebreak-style": "off",
		"no-param-reassign": "off",
		"object-curly-newline": "off",
		"no-trailing-spaces": "off",
		"no-mixed-operators": "off",
		"prefer-template": "off",
		"max-len": "off",
		"no-underscore-dangle": "off",
		"arrow-parens": "off",
		"keyword-spacing": "off",
		'generator-star-spacing': 'off',
		"no-tabs": "off",
		"indent": "off",
		"space-before-function-paren": "off",
		"no-undef": "off",
		"no-unused-vars": "off",
		"no-multiple-empty-lines": "off",
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
	}
}