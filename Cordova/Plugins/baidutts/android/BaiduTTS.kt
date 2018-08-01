package com.luminagic.byakugan.baidutts

import com.baidu.tts.client.SpeechError
import com.baidu.tts.client.SpeechSynthesizer
import com.baidu.tts.client.SpeechSynthesizerListener
import com.baidu.tts.client.TtsMode
import org.apache.cordova.*
import org.json.JSONArray
import org.json.JSONException

public class BaiduTTS : CordovaPlugin(), SpeechSynthesizerListener {

    private val mSpeechSynthesizer: SpeechSynthesizer by lazy {
        SpeechSynthesizer.getInstance()
    }

    private var mCallbackContext: CallbackContext? = null

    override fun initialize(cordova: CordovaInterface, webView: CordovaWebView) {
        super.initialize(cordova, webView)
        initSpeechSynthesizer()
    }

    @Throws(JSONException::class)
    override fun execute(action: String , args: JSONArray, callbackContext: CallbackContext): Boolean {
        mCallbackContext = callbackContext
        when (action) {
            "spake" -> spake(args[0].toString())
            "stop" -> stop()
            "pause" -> pause()
            "resume" -> resume()
            else -> return false
        }
        return true
    }

    override fun onDestroy() {
        mSpeechSynthesizer.release()
        super.onDestroy()
    }
    
    private fun initSpeechSynthesizer() {
        var APP_ID = preferences.getString("bdttsappid", "")
        var APP_KEY = preferences.getString("bdttsapikey", "")
        var APP_SECRET_KEY = preferences.getString("bdttssecretkey", "")
        mSpeechSynthesizer.run {
            setContext(cordova.context)
            setSpeechSynthesizerListener(this@BaiduTTS)
            setAppId(APP_ID)
            setApiKey(APP_KEY, APP_SECRET_KEY)
            // 发音人（在线引擎 0--普通女声，1--普通男声，2--特别男声，3--情感男声）
            setParam(SpeechSynthesizer.PARAM_SPEAKER, "0")
            // 设置Mix模式的合成策略
            setParam(SpeechSynthesizer.PARAM_MIX_MODE, SpeechSynthesizer.MIX_MODE_DEFAULT)
        }

        // 初始化tts
        mSpeechSynthesizer.initTts(TtsMode.MIX)
    }

    private fun spake(msg: String) {
        mSpeechSynthesizer.speak(msg)
    }

    private fun stop() {
        mSpeechSynthesizer.stop()
        mCallbackContext!!.sendPluginResult(PluginResult(PluginResult.Status.OK, false))
    }

    private fun pause() {
        mSpeechSynthesizer.pause()
        mCallbackContext!!.sendPluginResult(PluginResult(PluginResult.Status.OK, false))
    }

    private fun resume() {
        mSpeechSynthesizer.resume()
        mCallbackContext!!.sendPluginResult(PluginResult(PluginResult.Status.OK, true))
    }

    override fun onSpeechStart(p0: String?) {
        val result = PluginResult(PluginResult.Status.OK, true)
        result.keepCallback = true
        mCallbackContext!!.sendPluginResult(result)
    }

    override fun onSpeechFinish(p0: String?) {
        mCallbackContext!!.sendPluginResult(PluginResult(PluginResult.Status.OK, false))
    }

    override fun onSynthesizeStart(p0: String?) {
    }

    override fun onSpeechProgressChanged(p0: String?, p1: Int) {
    }

    override fun onSynthesizeFinish(p0: String?) {
    }

    override fun onSynthesizeDataArrived(p0: String?, p1: ByteArray?, p2: Int) {
    }

    override fun onError(p0: String?, p1: SpeechError?) {
    }
}
