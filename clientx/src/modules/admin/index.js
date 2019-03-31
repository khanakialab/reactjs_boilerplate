import React from 'react'
import { renderToString } from "react-dom/server"
import { hydrate, render } from 'react-dom'
import { StaticRouter, BrowserRouter, HashRouter } from 'react-router-dom'
import { Provider } from 'mobx-react';
const Loadable = require('react-loadable');

const Browser = require('../../www/browser')
Sapp['Hook'] = require('@knesk/hook')()
Sapp['Util'] = require('@knesk/util')()

import config from 'config'

import Store from './store'
Sapp.Store = Store

const route = require('../../plugins/core/route')
import routes from './routes'
// const menu = require('../../plugins/menu')

import Loading from './components/Loading'
const App = Loadable({
    loader: () => import('./App'),
    loading: Loading,
});

import Css from './assets'

class _AppModule {
	async init() {
        await Sapp.Hook.Action.do('beforeModuleInit')
        
        Sapp.Route = new route()

        Sapp.Route.addMultiple(routes)

		// Sapp.Menu = menu

        if(__isBrowser__) {
            const RouterType = config.ssr ? BrowserRouter: HashRouter;
            // const RouterType = HashRouter
            hydrate(
                <Provider {...Sapp.Store}>
                    <RouterType ref={router=> { global.router = router; }}>
                        <App />
                    </RouterType>
                </Provider>,
                document.getElementById('app')
            );
        
        }
    }

    async serverMarkup(url, context) {
		await Loadable.preloadAll();
		return (
			renderToString (
				<Provider {...Sapp.Store}>
		            <StaticRouter location={url} context={context}>
						<App />
		            </StaticRouter>
	            </Provider>
			)
		)
	}
}

if(__isBrowser__) { 
	let AppModule = new _AppModule()
	AppModule.init()
}


export default _AppModule