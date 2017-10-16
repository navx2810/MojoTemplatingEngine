/**
    This is where the business logic for templates, regardless of engines, take place.
 */

const moment = require('moment')

function date(date, format) {
    return moment(date).format(format || "LLLL")
}

function uppercase(str) { return str.toUpperCase() }

function lowercase(str) { return str.toLowerCase() }
function capitalize(str) {
    let arr = str.split('') || ['']
    arr[0] = arr[0].toUpperCase()
    return arr.join('')
}

function currency(num) { 
    num = typeof(num) === 'number' ? num : parseFloat(num)
    num = (Math.round(num*100)/100).toFixed(2)
    return num
}

function json(str, pretty) {
    if(pretty) { return JSON.stringify(str, null, '\t') }
    else { return JSON.stringify(str) }
}

module.exports = {
    date,
    uppercase,
    lowercase,
    currency,
    json,
    capitalize
}