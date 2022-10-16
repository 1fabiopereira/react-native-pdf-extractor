---
sidebar_position: 1
---

# Extractor

This extractor is built on top of [BaseExtractor](/docs/api/extractors/BaseExtractor), and exposes two methods for extracting data.

## extract

This function receive a path and patterns to find matches (optional) and returns `Promise<TransientObject>` that is data extraction result. In case that no patterns was passed it's returns a list with all file text separated by lines.

```ts
async function extract(uri: string, patterns?: string | string[]): Promise<TransientObject>
```

<table>
    <th>name</th>
    <th>type</th>
    <th>default</th>
    <th>required</th>
    <th>description</th>
    <tbody>
        <tr>
            <td>uri</td>
            <td>string</td>
            <td>undefined</td>
            <td>true</td>
            <td>file path</td>
        </tr>
        <tr>
            <td>patterns</td>
            <td>string | string[]</td>
            <td>undefined</td>
            <td>false</td>
            <td>patterns to find</td>
        </tr>
    </tbody>
</table>

__TransientObject__ looks like:
```ts
/*
    {
        duration: '40ms', <-----------------------------: Time spent to match
        isEncrypted: true, <----------------------------: Was file encrypted?
        pages: 2, <-------------------------------------: File number of pages
        patterns: ['(/\S+@\w+\.\w+)/g'], <--------------: List of used patterns
        text: ['name@mail.com'], <----------------------: List of found matches on file
        uri: 'content://some-file-path.pdf' <-----------: File path
    }
*/  
```

## extractFromIntent

This function receive patterns to find matches (optional) and returns `Promise<TransientObject>` that is data extraction result. In case that no patterns was passed it's returns a list with all file text separated by lines. This function was designed thinking on handle [Intent Actions](https://developer.android.com/reference/android/content/Intent) that delegate to app a open file operation.

<table>
    <th>name</th>
    <th>type</th>
    <th>default</th>
    <th>required</th>
    <th>description</th>
    <tbody>
        <tr>
            <td>patterns</td>
            <td>string | string[]</td>
            <td>undefined</td>
            <td>false</td>
            <td>patterns to find</td>
        </tr>
    </tbody>
</table>