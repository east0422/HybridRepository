declare class Binoculars {
    static show(x: number, y: number, width: number, height: number, url: string): Promise<void>;
    static loadUrl(url: string): Promise<void>;
    static close(): Promise<void>;
    static eval(jsmethodname: string, jsonparams: string): Promise<void>;
}
