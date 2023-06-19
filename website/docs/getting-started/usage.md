---
sidebar_position: 3
---

# Usage

> :bulb: To see more details about available component properties go to [Extractor](../api/extractors/Extractor.md) or you can see a full implementation at [Playground](../getting-started/playground.md).

<br />

We have two use cases for this library that has different approaches to each other. First case is used when you are running app and get file path that you want to extract data, using another libary, like [react-native-document-picker](https://github.com/rnmods/react-native-document-picker) and sends the received path to component.

```ts
import { Extractor, Patterns } from 'react-native-pdf-extractor';

// Some code snippets was be hidden for readability

const callback = (data: TransientObject) => {
    // Your implementation here 
    console.log(data);
    /*
        {
            duration: '40ms', <-----------------------------: Time spent to match
            isEncrypted: false, <---------------------------: Was file encrypted?
            pages: 2, <-------------------------------------: File number of pages
            patterns: ['(/\S+@\w+\.\w+)/g'], <--------------: List of used patterns
            text: ['name@mail.com'], <----------------------: List of found matches on file
            uri: 'content://some-file-path.pdf' <-----------: File path
        }
    */  
};

return (
    <Extractor
        onResult={callback}
        patterns={Patterns.Common.Email}
        uri={uri}
    />
)
```

The second case is applicable when the app receives an __Android Intent Action__ with the file path, in this case the library extracts the path behind the scene and than trigger data extraction. You can see more about it on [Intent | Android developers](https://developer.android.com/reference/android/content/Intent).

```ts
import { Extractor, Patterns } from 'react-native-pdf-extractor';

// Some code snippets was be hidden for readability

const callback = (data: TransientObject) => {
    // Your implementation here 
    console.log(data);
    /*
        {
            duration: '40ms', <-----------------------------: Time spent to match
            isEncrypted: false, <---------------------------: Was file encrypted?
            pages: 2, <-------------------------------------: File number of pages
            patterns: ['(/\S+@\w+\.\w+)/g'], <--------------: List of used patterns
            text: ['name@mail.com'], <----------------------: List of found matches on file
            uri: 'content://some-file-path.pdf' <-----------: File path
        }
    */  
};

return (
    <Extractor
        onResult={callback}
        patterns={Patterns.Common.Email}
        fromIntent // <-------------------------------------: Try get uri from intent provider (android only)
    />
)
```

## Dependency

To show a modal with password input when file is encrypted we use [react-native-modal](https://www.npmjs.com/package/react-native-modal), to install that, run:

```
yarn add react-native-modal
```
