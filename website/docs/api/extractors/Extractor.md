---
sidebar_position: 1
---

# Extractor

This extractor is built on top of [BaseExtractor](/docs/api/extractors/BaseExtractor), and exposes as react component with the following props:

<table>
    <th>Property</th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
    <th>Description</th>
    <tbody>
        <tr>
            <td>onResult</td>
            <td>(data: TransientObject) => void</td>
            <td>true</td>
            <td></td>
            <td>Callback function called when data extraction ends.</td>
        </tr>
        <tr>
            <td>uri</td>
            <td>string | undefined</td>
            <td>false</td>
            <td>undefined</td>
            <td>File path</td>
        </tr>
        <tr>
            <td>patterns</td>
            <td>RegExp | RegExp[]</td>
            <td>false</td>
            <td>undefined</td>
            <td>Regular expressions used to find matches</td>
        </tr>
        <tr>
            <td>fromIntent</td>
            <td>boolean</td>
            <td>false</td>
            <td>false</td>
            <td>Determine if application should try get uri from intent provider (Android only)</td>
        </tr>
        <tr>
            <td>title</td>
            <td>string | undefined</td>
            <td>false</td>
            <td>This file is protected</td>
            <td>Title displayed on password modal when file is encrypted</td>
        </tr>
        <tr>
            <td>placeholder</td>
            <td>string | undefined</td>
            <td>false</td>
            <td>Password</td>
            <td>Input text placeholder displayed on password modal when file is encrypted</td>
        </tr>
        <tr>
            <td>submit</td>
            <td>string | undefined</td>
            <td>false</td>
            <td>Open</td>
            <td>Text of submit button displayed on password modal when file is encrypted</td>
        </tr>
        <tr>
            <td>cancel</td>
            <td>string | undefined</td>
            <td>false</td>
            <td>Cancel</td>
            <td>Text of cancel button displayed on password modal when file is encrypted</td>
        </tr>
    </tbody>
</table>

> :bulb: You can see a full implementation at [Playground](../../getting-started/playground.md).  