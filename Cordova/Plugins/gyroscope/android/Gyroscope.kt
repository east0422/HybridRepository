package com.luminagic.byakugan.gyroscope

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import org.apache.cordova.*
import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject

class Gyroscope : CordovaPlugin(), SensorEventListener {
    private val mGyroscopeReading = FloatArray(3)
    private var timestamp = 0L
    private var mGyroX: Float? = null
    private var mGyroY: Float? = null
    private var mGyroZ: Float? = null

    private val mSensorManager: SensorManager by lazy {
        cordova.activity.getSystemService(Context.SENSOR_SERVICE) as SensorManager
    }

    private val value: JSONObject
        get() {
            var value: JSONObject = JSONObject()
            value.put("gyro", JSONArray(mGyroscopeReading))
            value.put("timestamp", timestamp)
            return value
        }

    override fun initialize(cordova: CordovaInterface, webView: CordovaWebView) {
        super.initialize(cordova, webView)
    }

    override fun onAccuracyChanged(sensor: Sensor, accuracy: Int) {
        // TODO Auto-generated method stub
    }

    override fun onSensorChanged(event: SensorEvent) {
        if (event.sensor.type == Sensor.TYPE_GYROSCOPE) {
            if (null == mGyroX) {
                mGyroX = event.values[0]
            }
            if (null == mGyroY) {
                mGyroY = event.values[1]
            }
            if (null == mGyroZ) {
                mGyroZ = event.values[2]
            }
            mGyroscopeReading[0] = event.values[0] - mGyroX!!
            mGyroscopeReading[1] = event.values[1] - mGyroY!!
            mGyroscopeReading[2] = event.values[2] - mGyroZ!!
            timestamp = event.timestamp / 1000 / 1000
        }
    }

    @Throws(JSONException::class)
    override fun execute(action: String, args: JSONArray, callbackContext: CallbackContext): Boolean {
        when (action) {
            "start" -> start()
            "stop" -> stop()
            "getAngle" ->  callbackContext.sendPluginResult(PluginResult(PluginResult.Status.OK, value))
            else -> return false
        }
        return true
    }

    private fun start() {
        mSensorManager.registerListener(this, mSensorManager.getDefaultSensor(Sensor.TYPE_GYROSCOPE),
                SensorManager.SENSOR_DELAY_GAME)
    }

    private fun stop() {
        mSensorManager.unregisterListener(this)
    }
}
