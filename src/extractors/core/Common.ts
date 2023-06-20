import { Platform } from 'react-native';
import { BaseExtractor } from './Base';
import type { ExtraTransient, Transient } from '../../types';

export class CommonExtractor {
  /**
   * Verifies if file exists based on URI gave
   * or got from intent provider (Android only)
   */
  static async file(data: Transient): Promise<Transient> {
    if (data.uri) {
      const path = await BaseExtractor.setUri(data.uri);

      if (path) return { ...data, uri: path };

      throw new Error(`Invalid uri: '${data.uri}'. Cannot find the file.`);
    }

    // From Intent (android only)
    if (Platform.OS === 'android') {
      const path = await BaseExtractor.getUri();
      if (path) return { ...data, uri: path };
    }

    throw new Error('Could not perfom extraction without URI.');
  }

  /**
   * Checks if params satisfies full specification
   * to proceed with data extraction
   */
  static async check(data: Transient): Promise<Transient> {
    const canIExtract = await BaseExtractor.canIExtract();

    if (canIExtract) return data;

    throw new Error('You cannot continue with extraction.');
  }

  /**
   * Checks if file is encrypted
   */
  static async encrypted(data: Transient): Promise<Transient> {
    const isEncrypted = await BaseExtractor.isEncrypted();
    return { ...data, isEncrypted };
  }

  /**
   * Counts the number of pages
   */
  static async pages(data: ExtraTransient): Promise<Transient> {
    const total = await BaseExtractor.getNumberOfPages(data.password);

    if (total > data.max) {
      throw new Error(`This file exceeds maximum size of ${data.max} pages.`);
    }

    return { ...data, pages: total };
  }

  /**
   * Applies matches
   */
  static async matches(data: ExtraTransient): Promise<Transient> {
    const text = !data.patterns
      ? await BaseExtractor.getText(data.password)
      : await BaseExtractor.getTextWithPattern(data.patterns, data.password);

    return { ...data, text };
  }
}
