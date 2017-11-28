// Import the engine library
const hbs = require("handlebars")
const filters = require("./filters")
const fs = require('fs')
const path = require('path')
const qs = require('querystring')

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
hbs.registerHelper({

    date: function (input, format) {
        format = hbs.escapeExpression(format) || null
        input = hbs.escapeExpression(input)
        return filters.date(input, format)
    },

    uppercase: function (input) { return filters.uppercase(hbs.escapeExpression(input)) },

    lowercase: function (input) { return filters.lowercase(hbs.escapeExpression(input)) },

    capitalize: function (input) { return filters.capitalize(hbs.escapeExpression(input)) },

    currency: function (input) { return filters.currency(hbs.escapeExpression(input)) },

    json: function (input, pretty) { return new hbs.SafeString(filters.json(input, pretty)) },

    concat: function (a, b) { return new hbs.SafeString(a + b) },

    require: function (route, vm) {
        route = path.join('.', route.replace(/^ |~/, ''))
        let template = fs.readFileSync(route, 'utf-8')
        vm = vm || this
        return new hbs.SafeString(hbs.compile(template)(this))
    },
    assign: function (name, val) {
        this[name] = val
    },

    registerResource: function (res) {
        return new hbs.SafeString("{% registerResource '" + res + "' %}")
    },

    cycle: function (index, ...list) {
        let i = index % (list.length-1)
        return new hbs.SafeString(list[i])
    },

    x: function (expression, options) {
        let result;
        let context = this;
        with(context) {
            result = (function () {
                try {
                    return eval(expression);
                } catch (e) {
                    console.warn('Expression: {{x \'' + expression + '\'}}\n•JS-Error: ', e, '\n•Context: ', context);
                }
            }).call(context); // to make eval's lexical this=context
        }
        return result;
    },

    xif: function (expression, options) {
        return hbs.helpers["x"].apply(this, [expression, options]) ? options.fn(this) : options.inverse(this);
    },

    comment: function() {
        return ""
    },

    limit: function(count, arr) {
        return arr.slice(0, count)
    },

    skip: function(count, arr) {
        return arr.splice(count)
    },

    ForceMaxWidth: function(size, url) {
        const [uri, queryString] = url.split('?')
        let query = qs.parse(queryString)
        query['w'] = size
        url = uri + "?" + qs.unescape(qs.stringify(query))
        return new hbs.SafeString(url)
    }

})


// Return the configured module
module.exports = hbs