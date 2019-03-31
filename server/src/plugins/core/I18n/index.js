var _ = require('lodash')


class I18n {
    constructor() {
        global.SA_LANG_CODE = 'en'
        this.textDomains = []

        Sapp['Core/Hook'].Filter.add('Www/GlobalMiddleware', async (req, res, next) => {
            // console.log(req.headers)
            if(req.headers && req.headers['sp-locale']) {
                SA_LANG_CODE = req.headers['sp-locale']
            } else {
                SA_LANG_CODE = 'en'
            }
        })
    }

    async init() {
        await Sapp['Core/Hook'].Action.do('I18n/Init')
        global.translate = global._e = (text, domain='default' ) => {
            return this.translate(text, domain)
        }
    }

    translate(text, domain='default') {
        let textDomain = _.find(this.textDomains, ['domain', domain]);
        // console.log(textDomain)
        if(!textDomain) return text
        try {
            let translations = require(textDomain.dir + '/' + SA_LANG_CODE + '.js')
            return translations[text]||text
            
        } catch (error) {
            console.log(error)
        }
    }

    loadTextDomain(domain, dir) {
        this.textDomains.push({
            domain: domain,
            dir: dir
        })

        // console.log(this.textDomains)
    }   
}

module.exports = I18n