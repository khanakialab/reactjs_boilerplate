var path = require('path')
var webpack = require('webpack')
const env = process.env.NODE_ENV
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: env || 'development',
    entry: {
        main: 'index.js'
    },
    output: {
        path: path.resolve(__dirname, `../../../public/dist`),
        publicPath: `/dist/`,
        filename: '[name].js'
    },

    optimization: {
        runtimeChunk: true,
        minimize: false,
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: path.resolve(__dirname, "../../../node_modules/"),
                    chunks: "all",
                    name: "vendor",
                    priority: -10,
                    enforce: true,
                    reuseExistingChunk: true,
                },

                // If enabled then it will merge all the async chungs into one all.js and include all.js file before main.js script tag in server_static.js
                // default: {
                //     chunks: "async",
                //     name: "all",
                //     priority: -12,
                //     enforce: true,
                //     reuseExistingChunk: true,
                // },
            }
        }
    },

    module: {
        rules: [{
            test: /\.(js)$/,
            exclude: /node_modules/, // add this line

            use: [{
                loader: 'babel-loader',
                options: {
                // babelrcRoots: ['.', './src'],
                  presets: [
                    ["@babel/preset-env", {
                        modules: 'umd'
                    }],
                    "@babel/preset-react",
                    // "@babel/preset-stage-0",
                  ],
                  plugins: [
                    // Stage 0
                    require('babel-plugin-add-module-exports'),
                    "@babel/plugin-transform-runtime",
                    "@babel/plugin-proposal-function-bind",
                    ["@babel/plugin-proposal-decorators", { "legacy": true }],
                    ["@babel/plugin-proposal-class-properties", { "loose": true }],
                    "@babel/plugin-syntax-dynamic-import",
                    // "@babel/plugin-transform-classes",
                    // require('babel-plugin-transform-object-rest-spread'),
                    require('babel-plugin-transform-do-expressions'),

                    // DISABLE CODE SPLITTING https://gist.github.com/jcenturion/892c718abce234243a156255f8f52468
                    // 'dynamic-import-webpack',
                    // 'remove-webpack'
                  ]
                }
            }]
        }, 


        {
            test: /\.(jpg|jpeg|png|gif|ico)$/,
            use: "url-loader?limit=1000",
        },

        {
            test: /\.(woff|woff2|eot|otf|ttf|svg)$/,
            use: "file-loader",
        },

        {
            test: /\.(scss|css)$/,
            use: [
                MiniCssExtractPlugin.loader,
                // 'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        //  minimize: false || {
                        //     discardComments: {
                        //         removeAll: true,
                        //     },
                        // }
                    }
                },
                // 'css-loader',
                "sass-loader",
                // "postcss-loader"
                // { loader: "resolve-url-loader", options: { sourceMap: true } },
                {
                    loader: "postcss-loader",
                    options: {
                        config: {
                            path: path.resolve(__dirname, 'postcss.config.js'),
                        },
                        sourceMap: true,
                        // plugins: [
                        //   require('cssnano')(),
                        // ]
                    }
                },
            ]
        }
        ]
    },

    resolve: {
        alias: {
        //   "@jeoga": path.resolve(__dirname, '../../../../@jeoga'),
        //   "plugins": path.resolve(__dirname, '../../../../plugins'),
        }
    },

    plugins: [
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),

        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[name].css"
        }),

        new webpack.DefinePlugin({
            __isBrowser__: "true"
        }),
    ]
}