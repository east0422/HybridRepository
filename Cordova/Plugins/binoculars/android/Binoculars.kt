package com.luminagic.rinnegan.binoculars

import android.graphics.Rect
import android.util.DisplayMetrics
import android.util.Log
import android.view.View
import android.view.ViewGroup
import android.webkit.ValueCallback
import android.widget.FrameLayout
import org.apache.cordova.CallbackContext
import org.apache.cordova.CordovaPlugin
import org.apache.cordova.PluginResult
import org.jetbrains.anko.windowManager
import org.json.JSONArray


class Binoculars: CordovaPlugin() {
    private var binocularsView: BinocularsView? = null
    private var mCallbackContext: CallbackContext? = null

    private var density: Float = 1.0f
    private var screenW: Int = 0
    private var screenH: Int = 0
    private var visibleDisplayRect: Rect = Rect()
    private var dm: DisplayMetrics = DisplayMetrics()

    override fun pluginInitialize() {
        super.pluginInitialize()

        var decorView = this.cordova.activity.window.decorView
        decorView.getWindowVisibleDisplayFrame(visibleDisplayRect)

        val defaultDisplay = this.cordova.context.windowManager.defaultDisplay
        defaultDisplay.getRealMetrics(dm)
        density = dm.density
        screenW = dm.widthPixels
        screenH = dm.heightPixels
    }

    override fun execute(
            action: String?, args: JSONArray?, callbackContext: CallbackContext?): Boolean {
        mCallbackContext = callbackContext
        when(action) {
            "show" -> {
                show(args!!.getDouble(0) * density, args.getDouble(1) * density, args.getDouble(2) * density, args.getDouble(3) * density, args.getString(4))
                return true
            }
            "loadUrl" -> { // 未指定显示取悦，默认全屏显示
                show(0.0, 0.0, screenW.toDouble(), screenH.toDouble(), args!!.getString(0))
                return true
            }
            "close" -> {
                close()
                return true
            }
            "eval" -> {
                eval(args!!.getString(0), args!!.getString(1))
                return true
            }
        }

        return false
    }

    fun show(x: Double, y: Double, width: Double, height: Double, url: String) {
        cordova.activity.runOnUiThread {
            var layout = FrameLayout.LayoutParams(width.toInt(), height.toInt()).apply {
                leftMargin = (x + visibleDisplayRect.left).toInt()
                topMargin = (y + visibleDisplayRect.top).toInt()
            }
            if (binocularsView == null) {
                val parent = webView.view.parent as ViewGroup
                binocularsView = parent.binocularsView() {
                    layoutParams = layout
                }

                binocularsView!!.webView.loadUrl(url)
            } else {
                binocularsView!!.layoutParams = layout
                binocularsView!!.webView.loadUrl(url)
            }

            mCallbackContext!!.sendPluginResult(PluginResult(PluginResult.Status.OK, true))
        }
    }

    fun close() {
        if (binocularsView == null) {
            return
        }
        cordova.activity.runOnUiThread {
            binocularsView!!.close()
            binocularsView = null
            val parent = webView.view.parent as ViewGroup
            parent.removeViewAt( 1) // 0 is SystemWebView

            mCallbackContext!!.sendPluginResult(PluginResult(PluginResult.Status.OK, true))
        }
    }

    fun eval(jsmethname: String, jsonparams: String) {
        cordova.activity.runOnUiThread {
            if (binocularsView != null ) {
                val js = "javascript:" + jsmethname + "(\'" + jsonparams + "\')"
                binocularsView!!.webView.evaluateJavascript(js, object : ValueCallback<String> {
                    override fun onReceiveValue(value: String?) {
                        // 返回结果
                    }
                })
            }
        }
    }
}
