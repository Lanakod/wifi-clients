const fs = require("fs"),
    path = require("path");

class DataService {
    static set = async (io, deviceName, ssid) => {
        const data = require('../../data.json')
        const arr = (data[ssid] || [])
        if(!arr.find(v => v === deviceName)) {
            Object.keys(data).map(key => {
                const array = data[key]
                const index = array.indexOf(deviceName)
                if (index >= 0) {
                    array.splice( index, 1 );
                }
                if(array.length === 0) {
                    delete data[key]
                }
            })

            data[ssid] = [...arr, deviceName]
            await fs.writeFileSync(path.resolve('data.json'), JSON.stringify(data))

            io.sockets.emit('DATA', data)

            return {
                message: `Устройство "${deviceName}" подключилось к сети "${ssid}"`
            }
        }

        return {
            message: `Устройство "${deviceName}" уже подключено к сети "${ssid}"`
        }
    }
}

module.exports = DataService