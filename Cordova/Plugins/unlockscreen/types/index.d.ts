declare class UnlockScreen {
    static keepScreenOn(): Promise<void>;
    static clearScreenOn(): Promise<void>;
    static lock(): Promise<void>;
    static unLock(): Promise<void>;
}
