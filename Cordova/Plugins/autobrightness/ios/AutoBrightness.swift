import Foundation
import UIKit
import CoreGraphics

@objc(AutoBrightness) class AutoBrightness : CDVPlugin {
    var origBrightness: CGFloat = 0.0
    var appBrightness: CGFloat = 0.0

    override func pluginInitialize() {
        origBrightness = -1.0
        let listener = NotificationCenter.default

        listener.addObserver(self, selector: #selector(onPause),
            name: NSNotification.Name.UIApplicationWillResignActive, object: nil)
        listener.addObserver(self, selector: #selector(onResume),
            name: NSNotification.Name.UIApplicationDidBecomeActive, object: nil)
        listener.addObserver(self, selector: #selector(onTerminate),
            name: NSNotification.Name.UIApplicationWillTerminate, object: nil)
    }

    func onPause(notification: NSNotification) {
        if origBrightness >= 0.0 {
            UIScreen.main.brightness = origBrightness
        }
    }

    func onResume(notification: NSNotification) {
        if origBrightness >= 0.0 {
            // if ever stored brightness, update it
            origBrightness = UIScreen.main.brightness
            UIScreen.main.brightness = appBrightness
        }
    }

    func onTerminate(notification: NSNotification) {
        let listener = NotificationCenter.default

        listener.removeObserver(self,
            name: NSNotification.Name.UIApplicationWillResignActive, object: nil)
        listener.removeObserver(self,
            name: NSNotification.Name.UIApplicationDidBecomeActive, object: nil)
        listener.removeObserver(self,
            name: NSNotification.Name.UIApplicationWillTerminate, object: nil)

        // restore brightness at exit
        if origBrightness >= 0.0 {
          UIScreen.main.brightness = origBrightness
        }
    }

    @objc(setBrightness:)
    func setBrightness(command: CDVInvokedUrlCommand) {
        let result = CDVPluginResult(status: _setBrightness(command: command))

        commandDelegate.send(result, callbackId: command.callbackId)
    }

    func _setBrightness(command: CDVInvokedUrlCommand) -> CDVCommandStatus {
        guard let value = command.arguments[0] as? NSNumber else {
            return CDVCommandStatus_ERROR
        }

        let newBrightness = CGFloat(value.floatValue)
        if origBrightness < 0.0 { // haven't record brightness?
            origBrightness = UIScreen.main.brightness
        }

        appBrightness = newBrightness
        UIScreen.main.brightness = appBrightness

        return CDVCommandStatus_OK
    }

    @objc(clear:)
    func clear(command: CDVInvokedUrlCommand) {
        let result = CDVPluginResult(status: _clear(command: command))

        commandDelegate.send(result, callbackId: command.callbackId)
    }

    func _clear(command: CDVInvokedUrlCommand) -> CDVCommandStatus {
        if origBrightness >= 0.0 {
            UIScreen.main.brightness = origBrightness
            origBrightness = -1.0
            return CDVCommandStatus_OK
        }

        return CDVCommandStatus_ERROR
    }
}
