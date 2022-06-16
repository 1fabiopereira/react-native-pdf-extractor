import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import {
  getNumberOfPages,
  getTextWithPattern,
  hasPassword,
  Patterns,
} from 'react-native-pdf-extractor';

const App: React.FC = (): JSX.Element => {
  const [result, setResult] = useState<string[]>([]);
  const [pages, setPages] = useState<number>(0);
  const [needPass, setNeedPass] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const isEncrypted = await hasPassword();
        const pass = '******';
        if (!isEncrypted) {
          const numPages = await getNumberOfPages();
          const response = await getTextWithPattern(Patterns.Brazil.BankSlip);

          setResult(response as unknown as string[]);
          setPages(numPages);
          setNeedPass(false);
        } else {
          const numPages = await getNumberOfPages(pass);
          const response = await getTextWithPattern(
            Patterns.Brazil.BankSlip,
            pass
          );

          setResult(response as unknown as string[]);
          setPages(numPages);
          setNeedPass(true);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{`Number of pages: ${pages}`}</Text>
      <Text>{`Need password: ${needPass}`}</Text>
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
