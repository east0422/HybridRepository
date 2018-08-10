package com.luminagic.byakugan.sleepcontrol

import android.content.Context
import android.os.PowerManager
import android.os.PowerManager.WakeLock
import android.util.Log
import android.view.WindowManager
import org.apache.cordova.CallbackContext
import org.apache.cordova.CordovaPlugin
import org.json.JSONArray

class SleepControl : CordovaPlugin() {

    private var mWakeLock: WakeLock? = null

    override fun execute(
            action: String?, args: JSONArray?, callbackContext: CallbackContext?): Boolean {
        if (action == "setEnabled") {
            Log.i("aaa", args.toString())
            val flag = args!![0] as Boolean
            this.setEnabled(!flag)
            return true
        }
        return false
    }

    private fun setEnabled(flag: Boolean) {
        cordova.activity.runOnUiThread {
            if (flag) {
                Log.i("aaa", "true")
                cordova.activity.window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
//                this.acquireWakeLock()
            } else {
                Log.i("aaa", "false")
                cordova.activity.window.addFlags(WindowManager.LayoutParams.FLAG_ALLOW_LOCK_WHILE_SCREEN_ON)
//                this.releaseWakeLock()
            }
        }
    }

    private fun acquireWakeLock() {
        Log.i("aaa", "acquireWakeLock")
        if (mWakeLock == null) {
            Log.i("aaa", "acquireWakeLock acuqire")
            val pm = cordova.activity.getSystemService(Context.POWER_SERVICE) as PowerManager
            mWakeLock = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK or PowerManager.ACQUIRE_CAUSES_WAKEUP, cordova.activity.localClassName)
            mWakeLock!!.acquire()
        }

    }

    private fun releaseWakeLock() {
        Log.i("aaa", "releaseWakeLock")
        if (mWakeLock != null) {
            Log.i("aaa", "releaseWakeLock release")
            mWakeLock!!.release()
            mWakeLock = null
        }
    }

}
