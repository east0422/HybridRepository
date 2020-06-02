declare class BluetoothPair {

    static isConnected(success: (...args: any[]) => void, failure: (...args: any[]) => void): void;

    static pair(macAddress: string, pin: string, success: (...args: any[]) => void, failure: (...args: any[]) => void): void;

    static unpair(macAddress: string, success: (...args: any[]) => void, failure: (...args: any[]) => void): void;
}
