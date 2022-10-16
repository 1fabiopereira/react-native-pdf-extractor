---
sidebar_position: 3
---

# Usage

We have two use cases for this library that has different approaches to each other. First case is used when you are running app and get file path that you want to extract data, using another libary, like [react-native-document-picker](https://github.com/rnmods/react-native-document-picker) and sends the received path to __Extractor.extract__ method.

```ts
import { Extractor, Patterns } from 'react-native-pdf-extractor';

// Some codes was be hidden for readability

async function extract(path: string) {
    const response = await Extractor.extract(path, Patterns.Common.Email);
    console.log(response); // It's will print somthing like this:
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
```


The second case is applicable when the app receives an __Android Intent Action__ with the file path, in this case the library extracts the path behind the scene and than trigger data extraction. You can see more about it on [Intent | Android developers](https://developer.android.com/reference/android/content/Intent).

```ts
import { Extractor, Patterns } from 'react-native-pdf-extractor';

// Some codes was be hidden for readability

async function extract() { // <-----------------------------: No params needed
    const response = await Extractor.extractFromIntent(Patterns.Common.Email);
    console.log(response); // It's will print somthing like this:
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

useEffect(() => {
    (async () => {
        await extract() // <--------------------------------: Runs after view is rendered
    })() 
}, [])
```
