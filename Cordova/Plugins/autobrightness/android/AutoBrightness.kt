package com.luminagic.byakugan.autobrightness

import org.apache.cordova.CallbackContext
import org.apache.cordova.CordovaPlugin
import org.json.JSONArray

class AutoBrightness : CordovaPlugin() {
    private var origBrightness: Float? = null

    override fun execute(
            action: String?, args: JSONArray?, callbackContext: CallbackContext?): Boolean {
        if (action == "setBrightness") {
            origBrightness = cordova.activity.window.attributes.screenBrightness
            setBrightness(args!!.getDouble(0).toFloat())
            return true
        } else if (action == "clear") {
            if (origBrightness == null) {
                return false
            }
            setBrightness(origBrightness!!)
            origBrightness = null
            return true
        }
        return false
    }

    private fun setBrightness(brightness: Float) {
        val attr = cordova.activity.window.attributes
        attr.screenBrightness = brightness
        cordova.activity.runOnUiThread {
            cordova.activity.window.attributes = attr
        }
    }
}
