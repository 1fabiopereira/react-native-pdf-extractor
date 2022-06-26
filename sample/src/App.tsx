import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Extractor from 'react-native-pdf-extractor';

const App: React.FC = (): JSX.Element => {
  const [result, setResult] = useState<string[]>([]);
  const [pages, setPages] = useState<number>(0);
  const [isEncrypted, setIsEncrypted] = useState<boolean>(false);
  const [uri, setUri] = useState<string | undefined>();

  async function extract() {
    const canIExtract = await Extractor.canIExtract();
    const uri = await Extractor.getUri();

    if (canIExtract) {
      const encrypted = await Extractor.isEncrypted();
      const password = encrypted ? 'your-password' : undefined
      const numOfPages = await Extractor.getNumberOfPages(password);
      const response = await Extractor.getText(password);

      setUri(uri);
      setIsEncrypted(encrypted)
      setResult(response)
      setPages(numOfPages)
    }
  }

  useEffect(() => {
    (async () => await extract())()
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

export default React.memo(App);
