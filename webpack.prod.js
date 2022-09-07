const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'production',
	module: {
		rules: [
			{
				test: /.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset',
			},
		],
	},
	optimization: {
		minimizer: [
			'...',
			new CssMinimizerPlugin(),
		],
	},
	plugins: [new MiniCssExtractPlugin()],
});
