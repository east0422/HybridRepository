# sleepcontrol
Set keep screen on or not.

## note
```
需要为android添加WAKE_LOCK权限，添加到config.xml的android平台下
<config-file parent="/manifest"
	target="AndroidManifest.xml"
	xmlns:android="http://schemas.android.com/apk/res/android">
	<uses-permission android:name="android.permission.WAKE_LOCK" />
</config-file>
```

