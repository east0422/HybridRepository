import Foundation
import CoreMotion

@objc(Gyroscope) class Gyroscope : CDVPlugin {
    
    var mGyroX: Double?
    var mGyroY: Double?
    var mGyroZ: Double?
    
    lazy var motionManager: CMMotionManager = CMMotionManager.init()
    var mGyroscopeReading: [String:Any] = [:]
    
    override func pluginInitialize() {
        mGyroX = nil
        mGyroY = nil
        mGyroZ = nil
        mGyroscopeReading = ["gyro": [0, 0, 0], "timestamp": 0]
    }
    
    @objc(start:)
    func start(command: CDVInvokedUrlCommand) {
        commandDelegate.run {
            if (self.motionManager.isGyroAvailable) {
                self.motionManager.gyroUpdateInterval = 20 / 1000
                self.motionManager.startGyroUpdates(to: OperationQueue.main, withHandler: { (data, error) in
                    if (nil == self.mGyroX) {
                        self.mGyroX = data!.rotationRate.x
                    }
                    if (nil == self.mGyroY) {
                        self.mGyroY = data!.rotationRate.y
                    }
                    if (nil == self.mGyroZ) {
                        self.mGyroZ = data!.rotationRate.z
                    }
                    
                    self.mGyroscopeReading = ["gyro": [(data!.rotationRate.x - self.mGyroX!),
                                                       (data!.rotationRate.y - self.mGyroY!),
                                                       (data!.rotationRate.z - self.mGyroZ!)],
                                              "timestamp": data!.timestamp * 1000]
                })
            }
        }
    }
    
    @objc(getAngle:)
    func getAngle(command: CDVInvokedUrlCommand) {
        commandDelegate.run {
            if (!self.motionManager.isGyroAvailable) {
                let result = CDVPluginResult.init(status: CDVCommandStatus_ERROR, messageAs: "Error. Gyroscope Not Available.")
                self.commandDelegate.send(result, callbackId: command.callbackId)
            } else {
                let result = CDVPluginResult.init(status: CDVCommandStatus_OK, messageAs: self.mGyroscopeReading)
                self.commandDelegate.send(result, callbackId: command.callbackId)
            }
        }
    }
    
    @objc(stop:)
    func stop(command: CDVInvokedUrlCommand) {
        commandDelegate.run {
            if (self.motionManager.isGyroActive) {
                self.motionManager.stopGyroUpdates()
            }
        }
    }
}
