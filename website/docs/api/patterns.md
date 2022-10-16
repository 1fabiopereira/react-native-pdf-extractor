# Patterns

**react-native-pdf-extractor** already has some common patterns that can be easily used to data extract, however if there is a need you can easily create a new pattern to extract specific data according to your needs.

The only requirement is that the new patterns conform to [Javascript's RegExp specification](https://www.w3schools.com/jsref/jsref_obj_regexp.asp#:~:text=RegExp%20Object,pattern%20with%20Properties%20and%20Methods.) and to be passed as `string`, because it will be converted to RegExp in runtime.

You can get library patterns importing and defining the pattern like the following example:

```ts
import { Patterns } from 'react-native-pdf-extractor'
const patterns = Patterns.Common.Email

console.log(patterns) // This will print something like: ['(\\S+@\\w+\\.\\w+)']
```

### Common
    - Email
### Brazil
    - Bank slip

