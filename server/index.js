const path = require('path');
const MongoClient = require('mongodb').MongoClient;

// CONFIG LOADER
process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';
const config = require('config');
const ourConfigDir = path.join(__dirname, 'src/config')
const baseConfig = config.util.loadFileConfigs(ourConfigDir)


async function main() {
	global.Sapp = {}
	global.Hook = require('@knesk/hook')()
	global.APP_SECRET = '81F44FB42275569BF50A194634343'
	global.DbConn = await MongoClient.connect(baseConfig.db.mongoUri, { useNewUrlParser: true })
	global.Db = DbConn.db(baseConfig.db.dbName)

	for (let plugin of baseConfig.plugins||[]) {
		console.log(plugin)
		try {	
			let moduleRequire = require(plugin.path);
			let moduleNew = moduleRequire(plugin.config)
			Sapp[plugin.name] = moduleNew
		} catch (error) {
			console.log(error)
		}
	}
	
	for (let plugin of baseConfig.plugins||[]) {
		try {	
			// console.log(plugin)
			await Sapp[plugin.name].init()
		} catch (error) {
			console.log(error)
		}
	}
}

main();
