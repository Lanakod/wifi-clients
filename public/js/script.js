const socket = io();
socket.emit('MSG', 'Hello world!');
socket.on('DATA', (data) => {
    let res = ''
    Object.keys(data).map(k => {
        let clients = ''
        data[k].map(d => clients += `<tr><td>${d}</td></tr>`)
        res += `<table> <thead> <tr> <th>${k}</th> </tr> </thead> <tbody> ${clients} </tbody> </table>`
    })
    document.querySelector('.tables').innerHTML = res
})