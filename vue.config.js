const figmaPlugin = require('./manifest.json')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	css: {
		extract: false
	},
	filenameHashing: false,
	// Disable sourcemaps for Figma
	productionSourceMap: false,
	chainWebpack: (config) => {
		// Disable default index.html generation
		// https://cli.vuejs.org/guide/html-and-static-assets.html#disable-index-generation
		config.plugins.delete('html')
		config.plugins.delete('preload')
		config.plugins.delete('prefetch')
		config.optimization.delete('splitChunks')
		config.entryPoints.delete('app')

		// Encode images to base64 because Figma doesn't support external assets
		// https://www.figma.com/plugin-docs/resource-links/
		config.module.rule('svg').uses.clear()
		config.module
			.rule('images')
			.test(/\.(png|jpg|gif|webp|svg)$/)
			.use('url-loader')
			.loader('url-loader')
	},
	configureWebpack: {
		plugins: [
			new HtmlWebpackPlugin({
				title: figmaPlugin.name,
				template:
					// Use different html template for dev mode to emulate
					// Figma plugin window in browser
					process.env.NODE_ENV === 'development'
						? './public/dev.html'
						: './public/index.html',
				// template: './public/index.html',
				filename: 'index.html',
				inlineSource: '.(js)$',
				chunks: ['ui']
			}),
			new HtmlWebpackInlineSourcePlugin()
		],
		entry: {
			ui: ['./src/ui/main.ts'],
			code: ['./src/code/index.ts']
		},
		output: {
			filename: '[name].js',
			chunkFilename: '[name].js'
		}
	}
	// serve devServer to ./public/ui.html instead of ./public/index.html
	// devServer: {
	// 	index: 'ui.html'
	// }
}
