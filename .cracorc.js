const {
	addBeforeLoaders,
	removeLoaders,
	getLoaders,
	loaderByName,
	getPlugin,
	pluginByName,
} = require('@craco/craco')
const git = require('git-rev-sync')

const newWebpackLoader = {
	loader: require.resolve("isomorphic-style-loader")
}

module.exports = {
	webpack: {
		configure: (webpackConfig, { env, paths }) => {
			removeLoaders(webpackConfig, loaderByName("style-loader"));
			removeLoaders(webpackConfig, loaderByName("mini-css-extract-plugin"));
			addBeforeLoaders(webpackConfig, loaderByName("css-loader"), newWebpackLoader);
			const { hasFoundAny, matches } = getLoaders(
				webpackConfig,
				loaderByName('css-loader')
			);
			if (hasFoundAny) {
				matches.forEach(each => {
					each.loader.options.esModule = false
				})
			} else {
				console.log('loader not found.')
			}

			const { isFound, match } = getPlugin(webpackConfig, pluginByName("HtmlWebpackPlugin"))
			if (isFound) {
				match.options.gitInfo = {
					tag: git.tag(),
					commitDate: git.date(),
					buildDate: new Date(),
				}
			}
			return webpackConfig;
		}
	}
}
