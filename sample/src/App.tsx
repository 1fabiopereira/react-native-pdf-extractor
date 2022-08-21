import React, { useEffect, useState, memo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Extractor, { Patterns } from 'react-native-pdf-extractor';

const App: React.FC = (): JSX.Element => {
  const [result, setResult] = useState<string[]>([]);
  const [pages, setPages] = useState<number>(0);
  const [isEncrypted, setIsEncrypted] = useState<boolean>(false);
  const [uri, setUri] = useState<string | undefined>();

  function extract() {
    (async () => {
      const canIExtract = await Extractor.canIExtract();
      const path = await Extractor.getUri();

      if (canIExtract) {
        const encrypted = await Extractor.isEncrypted();
        const password = encrypted ? 'your-password' : undefined;
        const numOfPages = await Extractor.getNumberOfPages(password);
        const response = await Extractor.getTextWithPattern(
          Patterns.Common.Email,
          password
        );

        setUri(path);
        setIsEncrypted(encrypted);
        setResult(response as string[]);
        setPages(numOfPages);
      }
    })();
  }

  useEffect(() => {
    extract();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{`URI: ${uri}`}</Text>
      <Text>{`Number of pages: ${pages}`}</Text>
      <Text>{`Is encrypted: ${isEncrypted}`}</Text>
      <Text>Result:</Text>
      <FlatList
        style={{}}
        data={result || []}
        keyExtractor={(item) => item}
        renderItem={({ item }: { item: string }) => <Text>{item}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default memo(App);
