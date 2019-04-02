# NineZeroETao

Cordova based cross-platform app working with subjective-measure device.

## Install XCode

From AppStore.

## Install Cordova

See [official instruction](https://cordova.apache.org/#getstarted).

## Install Android SDK

From [Android.com](https://developer.android.com/studio/index.html#downloads)

## Get Started
### Checkout code
### Install npm packages

```
npm install
```
### /src to /www

```
npm run build {env}
```

env could be dev or prod, the default value is `prod`

### /www to /platforms and /plugins

```
cordova add browser # if needed
cordova build browser # or ios, android
```

### Execute

```
cordova run browser # or ios, android
```

### build android release apk
```
cordova build android --release --buildConfig ../config/cordova.json
```

### build ios release ipa 
```
select device -> Generic iOS Device
change .plist -> Localization native development region -> (English -> China)
change version and build version
change Build Settings sign -> iOS Developer
```

## Notes
### Local plugins
Cordova won't rebuild local plugin even the source code of plugin is changed.
Need to force it building from the very beginning.

```
rm -rf platforms plugins
cordova prepare
```
