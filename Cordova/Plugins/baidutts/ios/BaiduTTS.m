#import <Cordova/CDV.h>
#import "BDSSpeechSynthesizer.h"

@interface BaiduTTS : CDVPlugin <BDSSpeechSynthesizerDelegate> {
    NSString *API_KEY;
    NSString *SECRET_KEY;
    NSString *spakeCallbackId;
}

@property (strong, nonatomic) BDSSpeechSynthesizer *speechSynthesizer;

- (void)spake:(CDVInvokedUrlCommand *)command;
- (void)stop:(CDVInvokedUrlCommand *)command;

@end

@implementation BaiduTTS

- (void)pluginInitialize {
    [self.commandDelegate runInBackground:^{
        API_KEY =  [[self.commandDelegate settings] objectForKey:@"bdttsapikey"];
        SECRET_KEY = [[self.commandDelegate settings] objectForKey:@"bdttssecretkey"];
        [self initSpeechSynthesizer];
    }];
}

- (void)initSpeechSynthesizer {
    self.speechSynthesizer = [BDSSpeechSynthesizer sharedInstance];
    [self.speechSynthesizer setSynthesizerDelegate:self];
    [self.speechSynthesizer setApiKey:API_KEY withSecretKey:SECRET_KEY];

    // 合成参数设置
    //女声
    [self.speechSynthesizer setSynthParam:[NSNumber numberWithInt:BDS_SYNTHESIZER_SPEAKER_FEMALE] forKey:BDS_SYNTHESIZER_PARAM_SPEAKER];
    // 音量 0 ~9
    [self.speechSynthesizer setSynthParam:[NSNumber numberWithInt:9] forKey:BDS_SYNTHESIZER_PARAM_VOLUME];
    // 语速 0 ~9
    [self.speechSynthesizer setSynthParam:[NSNumber numberWithInt:6] forKey:BDS_SYNTHESIZER_PARAM_SPEED];
    //语调 0 ~9
    [self.speechSynthesizer setSynthParam:[NSNumber numberWithInt:5] forKey:BDS_SYNTHESIZER_PARAM_PITCH];
    // mp3音质  压缩的16K
    [self.speechSynthesizer setSynthParam:[NSNumber numberWithInt: BDS_SYNTHESIZER_AUDIO_ENCODE_MP3_16K] forKey:BDS_SYNTHESIZER_PARAM_AUDIO_ENCODING];
    
    [self.speechSynthesizer setSynthParam:[NSNumber numberWithFloat:10.0] forKey:BDS_SYNTHESIZER_PARAM_ONLINE_REQUEST_TIMEOUT];
}

- (void)spake:(CDVInvokedUrlCommand *)command {
    [self.commandDelegate runInBackground:^{
        spakeCallbackId = command.callbackId;
        [self.speechSynthesizer speakSentence: command.arguments[0] withError:nil];
    }];
}

- (void)stop:(CDVInvokedUrlCommand *)command {
    [self.commandDelegate runInBackground:^{
        [self.speechSynthesizer cancel];
        
        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:false];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];    
}

- (void)pause:(CDVInvokedUrlCommand *)command {
    [self.commandDelegate runInBackground:^{
        [self.speechSynthesizer pause];

        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:false];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void)resume:(CDVInvokedUrlCommand *)command {
    [self.commandDelegate runInBackground:^{
        [self.speechSynthesizer resume];

        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:true];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void)synthesizerSpeechStartSentence:(NSInteger)SpeakSentence;
{
    CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:true];
    [result setKeepCallbackAsBool:YES];
    [self.commandDelegate sendPluginResult:result callbackId:spakeCallbackId];
}

- (void)synthesizerSpeechEndSentence:(NSInteger)SpeakSentence
{
    CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:false];
    [self.commandDelegate sendPluginResult:result callbackId:spakeCallbackId];
}

@end
