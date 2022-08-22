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

If you're using RN 0.60 or higher, you can benefit from autolinking. You can proceed to the [configuration](https://1fabiopereira.github.io/react-native-pdf-extractor/docs/configuration) step.

## Manual installation

### settings.gradle

On your `android/settings.gradle` file you need to add the following lines:

```groovy
include ':react-native-pdf-extractor'
project(':react-native-pdf-extractor').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-pdf-extrctor/android')

```

### MainApplication.java

On `android/app/src/main/java/<your-project-package>/MainApplication.java` file you need add the following line on method `getPackages`:

```java
packages.add(new PdfExtractorPackage());
```

## Troubleshooting

#### Working in progress
