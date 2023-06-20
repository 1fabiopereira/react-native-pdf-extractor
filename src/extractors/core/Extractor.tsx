import React, { memo, useCallback, useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

import { Chain, ChainLink } from '../../chains';
import Styles from './Styles';

import type { Patterns, Transient } from '../../types';
import { CommonExtractor } from './Common';

type ExtractorProps = {
  cancel?: string;
  fromIntent?: boolean;
  onResult: (data: Transient | null) => void;
  submit?: string;
  patterns?: Patterns;
  placeholder?: string;
  title?: string;
  uri?: string;
  max?: number;
};

export const Extractor: React.FC<ExtractorProps> = memo(
  ({
    cancel = 'Cancel',
    fromIntent,
    onResult,
    submit = 'Open',
    patterns,
    placeholder = 'Password',
    title = 'This file is protected',
    uri,
    max = 10,
  }) => {
    const [locker, setLocker] = useState<string | undefined>();
    const [value, setValue] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const [visibility, setVisibility] = useState(false);

    /**
     * Close modal
     */
    const close = () => {
      setVisibility(false);
      onResult(null);
    };

    /**
     * Triggers callbacks when password changes
     */
    const changePassword = useCallback(() => {
      setVisibility(false);

      if (value?.length) {
        setPassword(value);
      } else {
        onResult(null);
      }
    }, [value, onResult]);

    /**
     * Verifies if needs user interaction to provide password
     * and shows component if needed
     */
    const verify = useCallback(async () => {
      const data: Transient = await new Chain([
        new ChainLink(CommonExtractor.file),
        new ChainLink(CommonExtractor.check),
        new ChainLink(CommonExtractor.encrypted),
      ]).exec({ uri, patterns });

      if (data.isEncrypted && !password) {
        setVisibility(true);
      }

      return data;
    }, [uri, patterns, password]);

    /**
     * Perform data extraction
     */

    const extract = useCallback(
      async (data: Transient) => {
        const start = new Date().getTime();

        const result = await new Chain([
          new ChainLink(CommonExtractor.pages),
          new ChainLink(CommonExtractor.matches),
        ]).exec({ ...data, password, max: max });

        const finish = new Date().getTime();

        return { ...result, duration: `${finish - start}ms` };
      },
      [max, password]
    );

    /**
     * Call data extraction functions
     */
    const exec = useCallback(async (): Promise<void> => {
      try {
        const data = await verify();

        if ((data?.isEncrypted && password) || !data?.isEncrypted) {
          const result = await extract(data);
          onResult(result);
        }
      } catch (error) {
        console.warn(error);
        onResult(null);
      }
    }, [extract, onResult, password, verify]);

    /**
     * Verifies if can re-render component or runs data extraction
     */
    useEffect(() => {
      const withoutPatterns = uri ?? fromIntent;
      const withPatterns = (uri && patterns) || (fromIntent && patterns);
      const lock = `${uri}|${patterns}|${fromIntent}|${password}`;

      if (lock !== locker && Boolean(withPatterns || withoutPatterns)) {
        setLocker(lock);
        exec();
      }
    }, [exec, uri, patterns, fromIntent, locker, password]);

    return (
      <Modal
        hideModalContentWhileAnimating={false}
        isVisible={visibility}
        onBackButtonPress={close}
        useNativeDriver
      >
        <View style={Styles.Container}>
          <Text style={Styles.Title}>{title}</Text>
          <TextInput
            onChangeText={setValue}
            placeholder={placeholder}
            secureTextEntry
            underlineColorAndroid="gray"
          />
          <View style={Styles.Row}>
            <TouchableOpacity style={Styles.Button} onPress={close}>
              <Text style={Styles.Text}>{cancel}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.Button} onPress={changePassword}>
              <Text style={Styles.Text}>{submit}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
);
