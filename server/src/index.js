// var path = require('path');
// const MongoClient = require('mongodb').MongoClient;

// global.Sapp = {}
// global.USERID = null
// global.USER = null

// const config = require('./config')
// const Config = new config()

// Sapp.config = Config._config()
// Sapp.dirRoot = path.join(__dirname, './')
// Sapp.dirPlugin = path.join(__dirname, './plugins')


// // const _CorePlugin = require('./plugins/core')

// // const graphql  = require('./graphql')

// const JoiExtend = require('./includes/JoiExtend')

// class Bootstrap {
//     async init() {
//         Sapp.dbConn = await MongoClient.connect(Sapp.config.mongo_db_uri, { useNewUrlParser: true })
//         Sapp.db = Sapp.dbConn.db(Sapp.config.dbname)

//         Sapp.Joi = JoiExtend

//         // const CorePlugin = new _CorePlugin()
//         // await CorePlugin.init()
//         await Config.init()

//         // graphql.init()

//         // ## LOAD ALL THE PLUGINS FIRST
//         for (let plugin of Sapp.config.plugins||[]) {
//             // console.log(plugin)
//             try {	
//                 let moduleRequire = require('./plugins/'+plugin);
//                 let moduleNew = new moduleRequire()
//                 Sapp[plugin] = moduleNew
//             } catch (error) {
//                 console.log(error)
//             }
//         }
//         // ## AFTER LODING ALL THE PLUGINS INIT THEM
//         for (let plugin of Sapp.config.plugins||[]) {
//             try {	
//                 console.log(plugin)
//                 await Sapp[plugin].init()
//             } catch (error) {
//                 console.log(error)
//             }
//         }

//         /* Include fallback.js after all plugin init so we can check 
//            what functions does not exits and create fallback for them only
//         */
//         require('./includes/Fallback')

//     }
// }

// module.exports = Bootstrap