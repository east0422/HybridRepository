package com.luminagic.rinnegan.unlockscreen

import android.content.pm.ActivityInfo
import android.view.WindowManager
import org.apache.cordova.CallbackContext
import org.apache.cordova.CordovaPlugin
import org.json.JSONArray

class UnlockScreen : CordovaPlugin() {

    override fun execute(
            action: String?, args: JSONArray?, callbackContext: CallbackContext?): Boolean {
        if (action == "keepScreenOn") {
            cordova.activity.runOnUiThread {
                cordova.activity.window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
            }
            return true
        } else if (action == "clearScreenOn") {
            cordova.activity.runOnUiThread {
                cordova.activity.window.clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
            }
            return true
        } else if (action == "lock") {
            cordova.activity.runOnUiThread {
                cordova.activity.requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_LOCKED
            }
            return true
        } else if (action == "unLock") {
            cordova.activity.runOnUiThread {
                cordova.activity.requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_USER
            }
            return true
        }



        return false
    }
}
