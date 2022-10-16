/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, memo } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

import { Extractor, Patterns } from '../..';

const App: React.FC = (): JSX.Element => {
  const [isEncrypted, setIsEncrypted] = useState<boolean | undefined>(false);
  const [pages, setPages] = useState<number | undefined>(0);
  const [result, setResult] = useState<string[] | undefined>([]);
  const [uri, setUri] = useState<string | undefined>();
  const [time, setTime] = useState<string | undefined>();

  function selectFile() {
    (async () => {
      const response = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
        type: 'application/pdf',
      });

      extract(response.uri);
    })();
  }

  function apply(response: any) {
    setPages(response.pages);
    setIsEncrypted(response.isEncrypted);
    setUri(response.uri);
    setTime(response.duration);
    setResult(response.text as string[]);
  }

  function extractFromIntent() {
    (async () => {
      const response = await Extractor.extractFromIntent(
        Patterns.Brazil.BankSlip
      );
      apply(response);
    })();
  }

  function extract(path: string) {
    (async () => {
      const response = await Extractor.extract(path, Patterns.Brazil.BankSlip);
      apply(response);
    })();
  }

  useEffect(() => {
    extractFromIntent();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Select file" onPress={selectFile} />
      <Text>{`URI: ${uri}`}</Text>
      <Text>{`Number of pages: ${pages}`}</Text>
      <Text>{`Is encrypted: ${isEncrypted}`}</Text>
      <Text>{`Execution time: ${time}`}</Text>
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
