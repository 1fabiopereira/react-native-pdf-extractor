# Installation
## Requirements

- Node >= 8
- React Native >= 0.51

## NPM or Yarn

To install **react-native-pdf-extractor** you can run:

```shell
yarn add react-native-pdf-extractor
```

or 

```shell
npm install react-native-pdf-extractor
```

## Autolinking installation

If you're using RN 0.60 or higher, you can benefit from autolinking for some of installation steps. We are working to make __react-native-pdf-extractor__ compatible, but at the moment you can only use the manual installation.
#### Work in progress

## Manual installation

### settings.gradle

On your `android/settings.gradle` file you need to add the following lines:

```groovy
include ':reactnativepdfextractor'
project(':reactnativepdfextractor').projectDir = new File(rootProject.projectDir, '../../android')

```

### MainApplication.java

On `android/app/src/main/java/<your-project-package>/MainApplication.java` file you need add the following line on method `getPackages`:

```java
packages.add(new PdfExtractorPackage());
```

## Troubleshooting

#### Working in progress
