process.env.SUPPRESS_NO_CONFIG_WARNING = true
var path = require('path')
var webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const env = process.env.NODE_ENV

const config = require('config');
const baseConfig = require('./base.config')


const {getModuleFilePath} = require('./shared')
const envConfig = require('../env')
let configArr = []
for (let module of envConfig.modules||[]) {
    configArr.push(generateConfig(module, getModuleFilePath(module)))
    // configArr.push(generateConfig(module.name, module.filePath))
}

function generateConfig(modName, entryFile) {
    let _baseConfig = Object.assign({}, baseConfig)
    delete _baseConfig['optimization']

    let anotherConfig = {
        target: 'node',
        entry: {
            main: entryFile
        },
        output: {
            path: path.resolve(__dirname, `../../../public/dist/${modName}`),
            publicPath: `/dist/${modName}/`,
            filename: '[name].cjs.js',
            libraryTarget: "commonjs2",
        },

        resolve: {
            alias: {
              config: path.resolve(__dirname, `../build/${modName}.json`)
            }
        },

        externals: {
            'react':'react',
            'react-dom':'react-dom',
            "react-dom/server" : "react-dom/server",
            'react-router-dom' : 'react-router-dom',
            'mobx-react' : 'mobx-react',
            'react-loadable' : 'react-loadable',
            'antd' : 'antd',
            'react-helmet':'react-helmet',
            'react-owl-carousel' : 'react-owl-carousel',
            'uuid' : 'uuid',
            'uuid4' : 'uuid4',
            'moment' : 'moment',
            'axios' : 'axios',
            'classnames' : 'classnames',
            'core-js' : 'core-js',
            'babel-polyfill' : 'babel-polyfill',
            'js-cookie' : 'js-cookie',
            '@babel/runtime' : '@babel/runtime'
        },
    
        plugins: [
            new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    
            new MiniCssExtractPlugin({
                filename: "_[name].css",
                chunkFilename: "_[name].css"
            }),
    
            new webpack.DefinePlugin({
                __isBrowser__: "false"
            }),
        ]
    }

    var newConfig = config.util.extendDeep({}, _baseConfig, anotherConfig);
    return newConfig
}

module.exports = configArr