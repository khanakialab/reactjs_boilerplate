process.env.SUPPRESS_NO_CONFIG_WARNING = true
var path = require('path')
var webpack = require('webpack')
const env = process.env.NODE_ENV
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const config = require('config');
const baseConfig = require('./base.config')

const cjsConfig = require('./cjs.config.js');

const {modulesList} = require('./shared')
let configArr = []
for (let module of modulesList()||[]) {
    configArr.push(generateConfig(module.name, module.filePath))
}

function generateConfig(modName, entryFile) {
    let anotherConfig = {
        entry: {
            main: entryFile
        },
        output: {
            path: path.resolve(__dirname, `../../../public/dist/${modName}`),
            publicPath: `/dist/${modName}/`,
            filename: '[name].js'
        },

        resolve: {
            alias: {
              config: path.resolve(__dirname, `../build/${modName}.json`)
            }
        },

        optimization: {
            runtimeChunk: true,
            minimize: true,
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: path.resolve(__dirname, "../../../node_modules/"),
                        chunks: "all",
                        name: "vendor",
                        priority: -10,
                        enforce: true,
                        reuseExistingChunk: true,
                    }
                }
            }
        },
    }

    var newConfig = config.util.extendDeep({}, baseConfig, anotherConfig);
    return newConfig
}

module.exports = [...configArr, ...cjsConfig]