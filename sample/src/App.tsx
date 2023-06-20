import React, { useState, memo } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

import { Extractor, Patterns } from '../..';
import { Transient } from '../../src/types';

const App: React.FC = (): JSX.Element => {
  const [isEncrypted, setIsEncrypted] = useState<boolean | undefined>(false);
  const [pages, setPages] = useState<number | undefined>(0);
  const [result, setResult] = useState<string[] | undefined>([]);
  const [uri, setUri] = useState<string | undefined>();
  const [time, setTime] = useState<string | undefined>();

  const selectFile = async () => {
    const data = await DocumentPicker.pickSingle({
      presentationStyle: 'fullScreen',
      copyTo: 'cachesDirectory',
      type: 'application/pdf',
    });

    setUri(data.uri);
  };

  const onResult = (data: Transient | null) => {
    setPages(data?.pages);
    setIsEncrypted(data?.isEncrypted);
    setUri(data?.uri);
    setTime(data?.duration);
    setResult(data?.text as string[]);
  };

  return (
    <View style={styles.container}>
      <Button title="Select file" onPress={selectFile} />
      <Text>{`URI: ${uri}`}</Text>
      <Text>{`Number of pages: ${pages}`}</Text>
      <Text>{`Is encrypted: ${isEncrypted}`}</Text>
      <Text>{`Execution time: ${time}`}</Text>
      <Text>Result:</Text>
      <FlatList
        data={result || []}
        keyExtractor={(item) => item}
        renderItem={({ item }: { item: string }) => <Text>{item}</Text>}
      />
      <Extractor
        onResult={onResult}
        patterns={Patterns.Brazil.BankSlip}
        uri={uri}
        fromIntent
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
