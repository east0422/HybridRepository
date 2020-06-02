declare class BaiduTTS {
    static spake(success: (...args: any[]) => void, sentence: string): Promise<void>;

    static stop(success: (...args: any[]) => void): Promise<void>;

    static pause(success: (...args: any[]) => void): Promise<void>;

    static resume(success: (...args: any[]) => void): Promise<void>;
}