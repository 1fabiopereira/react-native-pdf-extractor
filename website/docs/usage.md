# Usage

To use **react-native-pdf-extractor** you just need:

- Import the wanted methods, like this way:

    ```ts
    import Extractor, { Patterns } from 'react-native-pdf-extractor';
    ```

- Next, call them as you need:

    ```ts
    // Some codes was be hidden for readability
    ...
    async function extract() {
        const canIExtract = await Extractor.canIExtract();
        const uri = await Extractor.getUri();

        if (canIExtract) {
            const encrypted = await Extractor.isEncrypted();
            const password = encrypted ? 'your-password' : undefined
            const numOfPages = await Extractor.getNumberOfPages(password);
            const response = await Extractor.getTextWithPattern(Patterns.Common.Email, password);
        }
    }

    useEffect(() => {
        (async () => await extract())()
    }, []);
    ...
    ```

    __NOTE:__ More information about **react-native-pdf-extractor's** API, you can check [here](/docs/methods).

