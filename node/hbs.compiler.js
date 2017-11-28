const config = require("./hbs.config")

module.exports = function(cb, template, vm) {
    cb( null, config.compile(template)(JSON.parse(vm)) )
}