var path = require('path')
const glob = require('glob');
const config = require('config');
const fs = require('fs')

module.exports = {
    modulesList : function() {
        const modulesDir = path.resolve(__dirname, '../../modules')
        const entryArray = glob.sync(modulesDir + '/**/index.js');
        // const entryObject = entryArray.reduce((acc, item) => {
        //     const name = item.replace('/index.js', '').replace(modulesDir+'/', '');
        //     acc[name] = item;
        //     return acc;
        // }, {});
        let arr = []
        for (let filePath of entryArray||[]) {
            // console.log(plugin)
            try {	
                const name = filePath.replace('/index.js', '').replace(modulesDir+'/', '');

                arr.push({
                    name: name,
                    filePath : filePath
                })
               
            } catch (error) {
                console.log(error)
            }
        }

        return arr
    },
    
    getModuleFilePath: function(modName) {
        return path.join(__dirname, '../../modules/'+ modName + '/index.js')
    },

    createModuleClientConfigFile: function(modName) {
        const configDir = path.join(__dirname, '../modules/'+ modName)
        const modBaseConfig = config.util.loadFileConfigs(configDir)
        // This will take the config based on the current NODE_ENV and save it to 'build/client.json'
        // Note: If '/build' does not exist, this command will error; alternatively, write to '/config'.
        // The webpack alias below will then build that file into the client build.
        // console.log(modBaseConfig)
        const modConfigNew = {...modBaseConfig.client, ...modBaseConfig.shared}
        fs.writeFileSync(path.resolve(__dirname, `../build/${modName}.json`), JSON.stringify(modConfigNew))
    }

}