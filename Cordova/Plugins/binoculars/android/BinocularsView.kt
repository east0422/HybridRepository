package com.luminagic.rinnegan.binoculars

import android.content.Context
import android.graphics.Canvas
import android.view.View
import android.view.ViewGroup.LayoutParams.MATCH_PARENT
import android.view.ViewManager
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.FrameLayout
import android.widget.LinearLayout
import org.jetbrains.anko.custom.ankoView
import org.jetbrains.anko.gLSurfaceView
import org.jetbrains.anko.linearLayout

class BinocularsView(context: Context) : FrameLayout(context) {
    private lateinit var _webView: WebView
    val webView: WebView get() = _webView

    init {
        val renderer = BinocularsRenderer(context)
        gLSurfaceView {
            setEGLContextClientVersion(2)
            setRenderer(renderer)
        }
        linearLayout {
            orientation = LinearLayout.HORIZONTAL
            _webView = glSurfaceWebView(renderer) {
                settings.javaScriptEnabled = true

                settings.domStorageEnabled = true
                settings.allowFileAccess = true
                settings.useWideViewPort = true
                settings.loadWithOverviewMode = true

                webViewClient = WebViewClient()
            }.lparams {
                width = 0
                height = MATCH_PARENT
                weight = 1.0f
            }
            _webView.setLayerType(View.LAYER_TYPE_SOFTWARE, null)
            linearLayout().lparams(0, 0, 1.0f).apply {}
        }
    }

    fun close() {
        _webView.loadDataWithBaseURL(null, "", "text/html", "utf-8", null)
        _webView.clearHistory()
        _webView.destroy()
    }
}

class GlSurfaceWebView(context: Context, val renderer: BinocularsRenderer) : WebView(context) {

    override fun draw(canvas: Canvas) {
        renderer.render { glCanvas ->
            val ratio = glCanvas.width / canvas.width.toFloat()
            glCanvas.scale(ratio, ratio)
            glCanvas.translate(- scrollX.toFloat(), - scrollY.toFloat());
            super.draw(glCanvas)
        }
    }
}

inline fun ViewManager.binocularsView(init: BinocularsView.() -> Unit): BinocularsView {
    return ankoView({ BinocularsView(it) }, theme = 0, init = init)
}

inline fun ViewManager.glSurfaceWebView(
        renderer: BinocularsRenderer, init: GlSurfaceWebView.() -> Unit): GlSurfaceWebView {
    return ankoView({ GlSurfaceWebView(it, renderer) }, theme = 0, init = init)
}
