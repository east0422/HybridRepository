import Foundation

@objc(SleepControl) class SleepControl : CDVPlugin {
    @objc(setEnabled:)
    func setEnabled(command: CDVInvokedUrlCommand) {
        commandDelegate.run {
            guard let flag = command.arguments[0] as? Bool else {
                
                self.commandDelegate.send(CDVPluginResult(status: CDVCommandStatus_ERROR), callbackId: command.callbackId)
                return
            }
            
            DispatchQueue.global().async {
                DispatchQueue.main.sync {
                    UIApplication.shared.isIdleTimerDisabled = !flag
                }
            }
            self.commandDelegate.send(CDVPluginResult(status: CDVCommandStatus_OK), callbackId: command.callbackId)
        }
    }
}
