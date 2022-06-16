---
sidebar_position: 4
---
# Configuration

### AndroidManifest.xml

You need to add the followings config on your `android/app/main/AndroidManifest.xml`:

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

### Clear cache

To avoid cache problems we suggest clean android build cache, for do that, execute:

```sh
(cd android/ && ./gradlew clean)
```