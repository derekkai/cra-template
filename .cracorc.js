const {
	addBeforeLoaders, removeLoaders, getLoaders, loaderByName
} = require('@craco/craco')

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

			return webpackConfig;
		}
	}
}
