cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-spinnerdialog.SpinnerDialog",
        "file": "plugins/cordova-plugin-spinnerdialog/www/spinner.js",
        "pluginId": "cordova-plugin-spinnerdialog",
        "merges": [
            "window.plugins.spinnerDialog"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-spinnerdialog": "1.3.2",
    "cordova-plugin-whitelist": "1.2.2"
};
// BOTTOM OF METADATA
});