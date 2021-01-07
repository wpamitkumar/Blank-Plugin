const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const OptimizeCssAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const cssnano = require( 'cssnano' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' );
const StyleLintPlugin = require( 'stylelint-webpack-plugin' );

// JS Directory path.

//admin
const ADMIN_JS_DIR = path.resolve( __dirname, 'admin/js' );
const ADMIN_SASS_DIR = path.resolve( __dirname, 'admin/sass' );
const ADMIN_IMG_DIR = path.resolve( __dirname, 'admin/img' );
const ADMIN_FONTS_DIR = path.resolve( __dirname, 'admin/fonts' );

//public
const PUBLIC_JS_DIR = path.resolve( __dirname, 'public/js' );
const PUBLIC_SASS_DIR = path.resolve( __dirname, 'public/sass' );
const PUBLIC_IMG_DIR = path.resolve( __dirname, 'public/img' );
const PUBLIC_FONTS_DIR = path.resolve( __dirname, 'public/fonts' );

const BUILD_DIR = path.resolve( __dirname, 'build' );

var config = {
	devtool: false,

	optimization: {
		minimizer: [
			new OptimizeCssAssetsPlugin( {
				cssProcessor: cssnano
			} ),

			new UglifyJsPlugin( {
				cache: false,
				parallel: true,
				sourceMap: false
			} )
		]
	}
};

// If you have common configuration among them, you could use the extend library or Object.assign in ES6 or {...} spread operator in ES7.
var adminConfig = Object.assign( {}, config, {
	name: "admin",

	entry: {
		main: ADMIN_JS_DIR + '/main.js',
		optionpage: ADMIN_JS_DIR + '/option-page.js'
	},

	output: {
		path: BUILD_DIR,
		filename: 'admin/js/[name].js'
	},

	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: 'eslint-loader'
			},
			{
				test: /\.js$/,
				include: [ ADMIN_JS_DIR ],
				exclude: /node_modules/,
				use: [ {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env' ],
						plugins: [
							'@babel/plugin-transform-async-to-generator',
							'@babel/plugin-proposal-object-rest-spread',
							[
								'@babel/plugin-transform-react-jsx', {
									'pragma': 'wp.element.createElement'
								}
							]
						]
					}
				},
				'eslint-loader' ]
			},
			{
				test: /\.(sass|scss)$/,
				include: [ ADMIN_SASS_DIR ],
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(png|jpg|svg|jpeg|gif|ico)$/,
				exclude: [ ADMIN_FONTS_DIR , /node_modules/ ],
				use: {
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]',
						publicPath: 'production' === process.env.NODE_ENV ? '../' : '../../'
					}
				}
			},
			{
				test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
				exclude: [ ADMIN_IMG_DIR , /node_modules/ ],
				use: {
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]',
						publicPath: 'production' === process.env.NODE_ENV ? '../' : '../../'
					}
				}
			}
		]
	},

	plugins: [
		new CleanWebpackPlugin(),

		new MiniCssExtractPlugin( {
			filename: 'admin/css/[name].css'
		} ),

		new StyleLintPlugin( {
			'extends': 'stylelint-config-wordpress/scss'
		} )
	]
} );

var publicConfig = Object.assign( {}, config, {
	name: "public",

	entry: {
		main: PUBLIC_JS_DIR + '/main.js'
	},

	output: {
		path: BUILD_DIR,
		filename: 'public/js/[name].js'
	},

	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: 'eslint-loader'
			},
			{
				test: /\.js$/,
				include: [ PUBLIC_JS_DIR ],
				exclude: /node_modules/,
				use: [ {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env' ],
						plugins: [
							'@babel/plugin-transform-async-to-generator',
							'@babel/plugin-proposal-object-rest-spread',
							[
								'@babel/plugin-transform-react-jsx', {
									'pragma': 'wp.element.createElement'
								}
							]
						]
					}
				},
				'eslint-loader' ]
			},
			{
				test: /\.(sass|scss)$/,
				include: [ PUBLIC_SASS_DIR ],
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(png|jpg|svg|jpeg|gif|ico)$/,
				exclude: [ PUBLIC_FONTS_DIR , /node_modules/ ],
				use: {
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]',
						publicPath: 'production' === process.env.NODE_ENV ? '../' : '../../'
					}
				}
			},
			{
				test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
				exclude: [ PUBLIC_IMG_DIR , /node_modules/ ],
				use: {
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]',
						publicPath: 'production' === process.env.NODE_ENV ? '../' : '../../'
					}
				}
			}
		]
	},

	plugins: [
		new CleanWebpackPlugin(),

		new MiniCssExtractPlugin( {
			filename: 'public/css/[name].css'
		} ),

		new StyleLintPlugin( {
			'extends': 'stylelint-config-wordpress/scss'
		} )
	]
} );

module.exports = [
	adminConfig, publicConfig
];
