---
sidebar_position: 1
---
# Methods

### hasPassword

This function return a `Promise<boolean>` that's determine if a pdf file is encrypted and need a password to be read.

```ts
async function hasPassword(): Promise<boolean>
```

### getNumberOfPages

This function return a `Promise<number>` that's determine the pdf file number of pages.

```ts
async function hasPassword(): Promise<boolean>
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

This function return all pdf file text as `Promise<Readonly<String[]>>`, where each array position is one line of pdf file that it can get.

```ts
async function getText(password?: string): Promise<Readonly<String[]>>
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

This function return pdf file text that matches with passed pattern, as `Promise<Readonly<String[]>>`, where each array position is one match of pdf file text with pattern.

```ts
async function getTextWithPattern(
  pattern: string | String[],
  password?: string
): Promise<Readonly<String[]>>
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

__NOTE:__ All patterns passed will be converted in RegExp on runtime, yours patterns need to be in according to Javascript's RegExp specification, but in `string` type, ex: `'([0-9]{12})\s([0-9]{12})\s([0-9]{12})\s([0-9]{12})'`. You can see more infomation [here](https://www.w3schools.com/jsref/jsref_obj_regexp.asp#:~:text=RegExp%20Object,pattern%20with%20Properties%20and%20Methods.).
