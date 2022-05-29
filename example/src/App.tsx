import React, {useEffect, useState} from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { getStringThatMatch, Patterns } from 'react-native-pdf-extractor';

export default function App() {
  const [result, setResult] = useState<string>("");
  const data = result?.split('\n') || []

  useEffect(() => {
    getStringThatMatch(Patterns.Ticket).then(setResult);
  }, []);

  return (
    <FlatList
      style={styles.container}
      data={data || []}
      renderItem={({ item }: { item: string }) => (<Text>{item}</Text>)}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
