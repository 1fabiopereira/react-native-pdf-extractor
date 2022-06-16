---
sidebar_position: 5
---
# Usage

To use **react-native-pdf-extractor** you just need:

- Import the wanted methods, like this way:

    ```ts
    import { getNumberOfPages, getTextWithPattern, hasPassword, Patterns } from 'react-native-pdf-extractor'
    ```

- Next, call them as you need:

    ```ts
    // Some codes was be hidden for readability
    ...
    const pass = isEncrypted ? 'password' : undefined;
    const isEncrypted = await hasPassword();
    const numPages = await getNumberOfPages(pass);
    const response = await getTextWithPattern(Patterns.Brazil.BankSlip, pass);
    ...
    ```

    __NOTE:__ More information about **react-native-pdf-extractor's** API, you can check [here](/docs/methods).

