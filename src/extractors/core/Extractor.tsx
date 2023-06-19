import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';

import { BaseExtractor } from './Base';
import { Chain, ChainLink } from '../../chains';
import Styles from './Styles';

import type {
  Action,
  Patterns,
  TransientObject,
  WithPassword,
} from '../../types';

type ExtractorProps = {
  cancel?: string;
  fromIntent?: boolean;
  onResult: (data: TransientObject) => void;
  submit?: string;
  password?: string;
  patterns?: Patterns;
  placeholder?: string;
  title?: string;
  uri?: string;
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
    };

    /**
     * Triggers callbacks when password changes
     */
    const changePassword = useCallback(() => {
      close();
      setPassword(value);
    }, [value]);

    /**
     * Verifies if file exists based on URI gave
     * or got from intent provider (Android only)
     */
    const file = useCallback(
      async (data: TransientObject): Promise<TransientObject> => {
        if (data.uri) {
          const path = await BaseExtractor.setUri(data.uri);

          if (path) {
            return { ...data, uri: path };
          }

          throw new Error(
            `Invalid uri: '${data.uri}'. We cannot find the file.`
          );
        }

        // From Intent (android only)
        if (Platform.OS === 'android' && fromIntent) {
          const path = await BaseExtractor.getUri();

          if (path) {
            return { ...data, uri: path };
          }

          // eslint-disable-next-line prettier/prettier
          throw new Error('Cannot get URI from Intent. Check your app Intent provider config.');
        }

        throw new Error('Could not perfom extraction without URI.');
      },
      [fromIntent]
    );

    /**
     * Checks if params satisfies full specification
     * to proceed with data extraction
     */
    const check = async (data: TransientObject): Promise<TransientObject> => {
      const canIExtract = await BaseExtractor.canIExtract();

      if (canIExtract) {
        return data;
      }

      throw new Error('You cannot continue with extraction.');
    };

    /**
     * Checks if file is encrypted
     */
    const encrypted = async (
      data: TransientObject
    ): Promise<TransientObject> => {
      const isEncrypted = await BaseExtractor.isEncrypted();
      return { ...data, isEncrypted };
    };

    /**
     * Counts the number of pages
     */
    const pages = useCallback(
      async (data: WithPassword<TransientObject>): Promise<TransientObject> => {
        const total = await BaseExtractor.getNumberOfPages(data.password);
        return { ...data, pages: total };
      },
      []
    );

    /**
     * Applies matches
     */
    const matches = useCallback(
      async (data: WithPassword<TransientObject>): Promise<TransientObject> => {
        const text = !data.patterns
          ? await BaseExtractor.getText(data.password)
          : await BaseExtractor.getTextWithPattern(
              data.patterns,
              data.password
            );

        return { ...data, text };
      },
      []
    );

    /**
     * Verifies if needs user interaction to provide password
     * and shows component if needed
     */
    const verify = useCallback(async () => {
      try {
        const data: TransientObject = await new Chain([
          new ChainLink(file as Action),
          new ChainLink(check as Action),
          new ChainLink(encrypted as Action),
        ]).exec({ uri, patterns });

        if (data.isEncrypted && !password) {
          setVisibility(true);
        }

        return data;
      } catch (error) {
        console.warn(error);
        return null;
      }
    }, [file, uri, patterns, password]);

    /**
     * Execute data extraction
     */
    const exec = useCallback(async (): Promise<void> => {
      const start = new Date().getTime();
      const data = await verify();

      if (
        (data?.isEncrypted && password && !visibility) ||
        (!data?.isEncrypted && !visibility)
      ) {
        const result = await new Chain([
          new ChainLink(pages as Action),
          new ChainLink(matches as Action),
        ]).exec({ ...data, password });

        const finish = new Date().getTime();

        onResult({ ...result, duration: `${finish - start}ms` });
      }
    }, [matches, onResult, pages, password, verify, visibility]);

    /**
     * Verifies if can re-render component or runs data extraction
     */
    useEffect(() => {
      const lock = `${uri}|${patterns}|${fromIntent}|${password}`;
      const withPatterns = (uri && patterns) || (fromIntent && patterns);
      const withoutPatterns = uri || fromIntent;

      if (lock !== locker && (withPatterns || withoutPatterns)) {
        setLocker(lock);
        exec();
      }
    }, [exec, uri, patterns, fromIntent, locker, password]);

    return (
      <Modal
        hideModalContentWhileAnimating={false}
        isVisible={visibility}
        onBackButtonPress={close}
        onBackdropPress={close}
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
