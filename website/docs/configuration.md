# Configuration

### AndroidManifest.xml

You need to add the following config on your `android/app/main/AndroidManifest.xml`:

```xml
  <uses-permission android:name="android.permission.QUERY_ALL_PACKAGES"  />
  <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

```xml
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:mimeType="application/pdf" />
</intent-filter>
```

### build.gradle

On your `android/app/build.gradle` file you need add the following dependency:

```groovy
implementation project(':reactnativepdfextractor')
```

### provider_paths.xml

You need create this file on path `android/app/src/main/res/xml/provider_paths.xml` and paste the following content:

```xml
<?xml version="1.0" encoding="utf-8"?>
<paths xmlns:android="http://schemas.android.com/apk/res/android">
  <external-path
    name="external_files"
    path="." />
</paths>
```

### Clear cache

To avoid cache problems we suggest to clean android build cache, execute the command bellow for it:

```sh
(cd android/ && ./gradlew clean)
```
