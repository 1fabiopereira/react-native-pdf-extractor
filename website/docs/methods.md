# Methods

### canIExtract

This function returns a `Promise<boolean>` that determine if you received an uri from Android `Intent` and perform data extraction.

```ts
async function canIExtract(): Promise<boolean>
```

### setUri

This function receive a `string` that represents a path of PDF file and use it to perform data extraction, and returns a uri generated from received path.

```ts
async function setUri(path: string): Promise<string>
```
### getUri

This function returns a `Promise<string | undefined>` that contains uri received from Android `Intent`.

```ts
async function getUri(): Promise<string | undefined>
```
### isEncrypted

This function returns a `Promise<boolean>` that determine if a pdf file is encrypted and need a password to be read.

```ts
async function isEncrypted(): Promise<boolean>
```

### getNumberOfPages

This function returns a `Promise<number>` that determine the pdf file number of pages.

```ts
async function getNumberOfPages(): Promise<boolean>
```

<table>
    <th>name</th>
    <th>type</th>
    <th>default</th>
    <th>required</th>
    <th>description</th>
    <tbody>
        <tr>
            <td>password</td>
            <td>string | undefined</td>
            <td>undefined</td>
            <td>false</td>
            <td>password of pdf file</td>
        </tr>
    </tbody>
</table>

### getText

This function returns all pdf file text as `Promise<string[]>`, where each array position is one line of the pdf file.

```ts
async function getText(password?: string): Promise<string[]>
```

<table>
    <th>name</th>
    <th>type</th>
    <th>default</th>
    <th>required</th>
    <th>description</th>
    <tbody>
        <tr>
            <td>password</td>
            <td>string | undefined</td>
            <td>undefined</td>
            <td>false</td>
            <td>password of pdf file</td>
        </tr>
    </tbody>
</table>

### getTextWithPattern

This function returns a pdf file text that matches with passed pattern, as `Promise<string[]>`, where each array position is one match of the pdf file text.

```ts
async function getTextWithPattern(
  pattern: string | string[],
  password?: string
): Promise<string[]>
```

<table>
    <th>name</th>
    <th>type</th>
    <th>default</th>
    <th>required</th>
    <th>description</th>
    <tbody>
        <tr>
            <td>pattern</td>
            <td>string | string[]</td>
            <td>none</td>
            <td>true</td>
            <td>pattern to find match with pdf`s text</td>
        </tr>
        <tr>
            <td>password</td>
            <td>string | undefined</td>
            <td>undefined</td>
            <td>false</td>
            <td>password of pdf file</td>
        </tr>
    </tbody>
</table>

__NOTE:__ All patterns passed will be converted in RegExp on runtime, yours patterns need to be in according to Javascript's RegExp specification, but in `string` type, ex: `'([0-9]{12})\\s([0-9]{12})\\s([0-9]{12})\\s([0-9]{12})'`. You can see more infomation [here](https://www.w3schools.com/jsref/jsref_obj_regexp.asp#:~:text=RegExp%20Object,pattern%20with%20Properties%20and%20Methods.).
