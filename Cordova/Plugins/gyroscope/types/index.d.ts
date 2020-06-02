declare class Gyroscope {

    static getAngle(success: (...args: any[]) => void): void;

    static start(): void;

    static stop(): void;
}
