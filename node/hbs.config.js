// Import the engine library
const hbs = require("handlebars")
const filters = require("./filters")
const fs = require('fs')
const path = require('path')

/**
    Initialize the engine library with any helper, mixins. . ., any features you can use in the template.

    for the most part, the purpose of a helper is to translate what was placed inside the template and hand it off
    to the business logic in filters.

    the reason is that if most functions are abstracted into filters, it'll be simple to move to use a different template engine
*/

/**
    Helpers: take the variables and data used in the template, transform them into JS variables and pass them through to the function.
*/

// Developers note: console.error() will show up in the terminal output in VSCode.
hbs.registerHelper("date", function(input, format) {
    format = hbs.escapeExpression(format) || null
    input = hbs.escapeExpression(input)
    return filters.date(input, format)
})
hbs.registerHelper("uppercase", function(input) { return filters.uppercase( hbs.escapeExpression(input) ) })
hbs.registerHelper("lowercase", function(input) { return filters.lowercase( hbs.escapeExpression(input) ) })
hbs.registerHelper("capitalize", function(input) { return filters.capitalize( hbs.escapeExpression(input) ) })
hbs.registerHelper("currency", function(input) { return filters.currency( hbs.escapeExpression(input) ) })
hbs.registerHelper("json", function(input, pretty) { return new hbs.SafeString(filters.json(input, pretty)) })
hbs.registerHelper("require", function(route, vm) {
    route = path.join('.', route.replace(/^ |~/, ''))
    let template = fs.readFileSync(route,  'utf-8')
    vm = vm || this
    return new hbs.SafeString(hbs.compile(template)(this))
})
hbs.registerHelper("assign", function(name, val){
    this[name] = val
})
hbs.registerHelper("registerResource", function(res) {
    return new hbs.SafeString("{% registerResource '" + res + "' %}")
})

hbs.registerHelper

// Return the configured module
module.exports = hbs