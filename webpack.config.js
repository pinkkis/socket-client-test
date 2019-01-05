const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== 'production';

// Phaser webpack config
// const phaserModule = path.join(__dirname, '/node_modules/phaser/');
// const phaser = path.join(phaserModule, 'dist/phaser.min.js');

module.exports = {
	output: {
		globalObject: 'this'
	},
	entry: {
		socket: ['webpack-dev-server/client?http://localhost:3000'],
		app: ['./src/app.ts']
	},
	module: {
		rules: [{
				test: /\.tsx?$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.map.js$/,
				use: ["source-map-loader"],
				enforce: "pre"
			},
			{
				test: [/\.vert$/, /\.frag$/],
				use: 'raw-loader'
			},
			{
				test: /\.html$/,
				use: [{
					loader: 'html-loader',
					options: {
						minimize: true
					}
				}]
			},
			// {
			// 	test: /phaser\.min\.js$/,
			// 	use: [{
			// 		loader: 'expose-loader',
			// 		options: 'Phaser'
			// 	}]
			// },
			// {
			// 	test: /\.(eot|svg|ttf|woff|woff2)$/,
			// 	loader: 'file-loader?name=assets/fonts/[name].[ext]'
			// }
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'CANVAS_RENDERER': JSON.stringify(true),
			'WEBGL_RENDERER': JSON.stringify(true)
		}),
		new HtmlWebPackPlugin({
			template: './src/index.html',
			filename: './index.html',
			chunks: ['app', 'vendor']
		}),
		// new CopyWebpackPlugin([
		// 	{
		// 		from: './assets/atlas/',
		// 		to: './assets/atlas/'
		// 	},
		// 	{
		// 		from: './assets/tilemaps/',
		// 		to: './assets/tilemaps/'
		// 	},
		// 	{
		// 		from: './assets/tilesets/',
		// 		to: './assets/tilesets/'
		// 	},
		// 	{
		// 		from: './assets/json/',
		// 		to: './assets/json/'
		// 	}
		// ], {}),
	],
	resolve: {
		extensions: ['.ts', '.js'],
	},
	devServer: {
		proxy: {
			'/api': {
				target: '//localhost:3000',
				secure: false
			}
		}
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'initial'
				}
			}
		}
	},
	watchOptions: {
		ignored: [
			'node_modules',
			'assets/**/*'
		]
	}
};
