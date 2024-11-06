#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTBridgeModule.h>  // Import para expor o método para JavaScript
#import <AppTrackingTransparency/AppTrackingTransparency.h>  // Import para AppTrackingTransparency

@interface AppDelegate () <RCTBridgeModule> // Declaração da interface para expor o método
@end

@implementation AppDelegate

RCT_EXPORT_MODULE(); // Exporta o módulo para uso no JavaScript

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"aconittusMobileApp";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

RCT_EXPORT_METHOD(requestTrackingPermission:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
  if (@available(iOS 14, *)) {
    [ATTrackingManager requestTrackingAuthorizationWithCompletionHandler:^(ATTrackingManagerAuthorizationStatus status) {
      if (status == ATTrackingManagerAuthorizationStatusAuthorized) {
        resolve(@"authorized");
      } else {
        resolve(@"denied");
      }
    }];
  } else {
    resolve(@"not_supported");
  }
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self getBundleURL];
}

- (NSURL *)getBundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
