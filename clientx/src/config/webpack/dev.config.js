process.env.SUPPRESS_NO_CONFIG_WARNING = true
var path = require('path')

const config = require('config');
// This files is only to specify project level settings
const envConfig = require('../env')
const wpBaseConfig = require('./base.config')
const cjsConfig = require('./cjs.config.js');


const { getModuleFilePath, createModuleClientConfigFile} = require('./shared')
let configArr = []
for (let module of envConfig.modules||[]) {
    console.log(module)
    // Generate Client Config Files dynamically in build directory
    createModuleClientConfigFile(module)

    // Create Webpack Config for each module
    configArr.push(generateConfig(module, getModuleFilePath(module)))
}

// console.log(JSON.stringify(configArr))
// return false
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

    }

    var newConfig = config.util.extendDeep({}, wpBaseConfig, anotherConfig);
    return newConfig
}
// module.exports = configArr
module.exports = [...configArr, ...cjsConfig]