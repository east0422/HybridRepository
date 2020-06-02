package com.luminagic.rinnegan.bluetoothpair

import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothDevice
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.util.Log
import android.view.InputDevice
import org.apache.cordova.CallbackContext
import org.apache.cordova.CordovaArgs
import org.apache.cordova.CordovaPlugin
import org.json.JSONException
import java.util.*

/**
 * PhoneGap Plugin for Serial Communication over Bluetooth
 */
class BluetoothPair : CordovaPlugin() {

    private val bluetoothAdapter: BluetoothAdapter by lazy {
        BluetoothAdapter.getDefaultAdapter()
    }

    private var PIN: String? = null  // If needed for pairing

    protected val pin: ByteArray
        get() = PIN!!.toByteArray()

    @Throws(JSONException::class)
    override fun execute(action: String, args: CordovaArgs, callbackContext: CallbackContext): Boolean {

        when(action) {
            PAIR ->  {
                pairRequest(args, callbackContext)
                return true
            }
            UNPAIR -> {
                unpairRequest(args, callbackContext)
                return  true
            }
            IS_CONNECTED -> {
                isConnected(callbackContext)
                return true
            }
            else -> {
                return false
            }
        }
    }

    @Throws(JSONException::class)
    private fun pairRequest(args: CordovaArgs, callbackContext: CallbackContext) {
        val macAddress = args.getString(0)
        val device = bluetoothAdapter.getRemoteDevice(macAddress)
        try {
            PIN = args.getString(1)
        } catch (e: JSONException) {
            PIN = ""
        }

        if (bluetoothAdapter.isDiscovering) {
            bluetoothAdapter.cancelDiscovery()
        }
        val pairingReceiver = object : BroadcastReceiver() {
            override fun onReceive(context: Context, intent: Intent) {
                val action = intent.action
                val bondState = intent.getIntExtra(BluetoothDevice.EXTRA_BOND_STATE, 0)
                if (BluetoothDevice.ACTION_PAIRING_REQUEST == action) {
                    try {
                        Log.d(TAG, "Setting PIN")
                        val device = intent.getParcelableExtra<BluetoothDevice>(BluetoothDevice.EXTRA_DEVICE)
                        val pinBytes = pin
                        device.setPin(pinBytes)
                        device.setPairingConfirmation(true)
                    } catch (e: Exception) {
                        Log.e(TAG, "error occurs when auto pair:", e)
                    }

                }
                if (bondState == BluetoothDevice.BOND_BONDED)
                    callbackContext.success("PAIRED correctly")
                else if (bondState == BluetoothDevice.BOND_NONE)
                    callbackContext.error("PAIR failed because of state:" + bondState)
                if (bondState == BluetoothDevice.BOND_BONDED || bondState == BluetoothDevice.BOND_NONE)
                    cordova.activity.unregisterReceiver(this)
            }
        }
        val activity = cordova.activity
        activity.registerReceiver(pairingReceiver, IntentFilter(BluetoothDevice.ACTION_BOND_STATE_CHANGED))
        activity.registerReceiver(pairingReceiver, IntentFilter(BluetoothDevice.ACTION_PAIRING_REQUEST))
        activity.registerReceiver(pairingReceiver, IntentFilter(BluetoothAdapter.ACTION_STATE_CHANGED))

        if (!device.createBond()) {
            Log.d(TAG, "Must already be bonded/paired!")
            callbackContext.success("PAIRED already")
        }
    }

    @Throws(JSONException::class)
    private fun unpairRequest(args: CordovaArgs, callbackContext: CallbackContext) {
        val macAddress = args.getString(0)
        val device = bluetoothAdapter.getRemoteDevice(macAddress)
        try {
            val removeBond = BluetoothDevice::class.java.getMethod("removeBond")
            if (!(removeBond.invoke(device) as Boolean)) {
                Log.d(TAG, "Must already be unpaired!")
            }
            callbackContext.success("Unpaired")
        } catch (e: Exception) {
            Log.e("unpairRequest", "Exception", e)
            callbackContext.error("Unpair exception:" + e)
        }

    }

    @Throws(JSONException::class)
    private fun isConnected(callbackContext: CallbackContext) {
        val gameControllerDeviceIds = ArrayList<Int>()
        val deviceIds = InputDevice.getDeviceIds()
        for (deviceId in deviceIds) {
            val dev = InputDevice.getDevice(deviceId)
            val sources = dev.sources

            // Verify that the device has gamepad buttons, control sticks, or both.
            if ((sources and InputDevice.SOURCE_GAMEPAD) == InputDevice.SOURCE_GAMEPAD ||
                    (sources and InputDevice.SOURCE_JOYSTICK) == InputDevice.SOURCE_JOYSTICK) {
                // This device is a game controller. Store its device ID.
                if (!gameControllerDeviceIds.contains(deviceId)) {
                    gameControllerDeviceIds.add(deviceId)
                }
            }
        }

        if (gameControllerDeviceIds.size > 0) {
            callbackContext.success()
        } else {
            callbackContext.error("Not connected.")
        }
    }

    companion object {

        // actions
        private val PAIR = "pair"
        private val UNPAIR = "unpair"
        private val IS_CONNECTED = "isConnected"

        // Debugging
        private val TAG = "BluetoothPair"
    }
}
