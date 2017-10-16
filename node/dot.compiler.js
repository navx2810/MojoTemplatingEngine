const dot = require('dot')

module.exports = function(cb, template, vm) {
    dot.templateSettings.selfcontained = true
    dot.templateSettings.strip = false
    const t = dot.template(template, undefined, undefined)
    cb(null, t(vm))
}