module.exports = {
    pair: function (macAddress, pin, success, failure) {
        cordova.exec(success, failure, "BluetoothPair", "pair", [macAddress, pin]);
    },

    unpair: function (macAddress, success, failure) {
        cordova.exec(success, failure, "BluetoothPair", "unpair", [macAddress]);
    },

    isConnected: function (success, failure) {
        cordova.exec(success, failure, "BluetoothPair", "isConnected", []);
    }
}
