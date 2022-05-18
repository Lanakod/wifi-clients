const hbs = require('hbs')
module.exports = {
    name: "parseData",
    callback: (data) => {
        let res = ''
        Object.keys(data).map(k => {
            console.log(data[k])
            let clients = ''
            data[k].map(d => clients += `<tr><td>${d}</td></tr>`)
            res += `<table> <thead> <tr> <th>${k}</th> </tr> </thead> <tbody> ${clients} </tbody> </table>`
        })
        return new hbs.SafeString(res)
    }
}