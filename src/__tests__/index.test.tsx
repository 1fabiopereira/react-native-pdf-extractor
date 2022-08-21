import { NativeModules } from 'react-native';
import Extractor, { Patterns } from '..';

const Module = NativeModules.PdfExtractor;

jest.mock('react-native', () => ({
  Platform: {
    select: jest.fn(({ android }) => android),
  },
  NativeModules: {
    PdfExtractor: {
      canIExtract: jest.fn(),
      getNumberOfPages: jest.fn(),
      getText: jest.fn(),
      getUri: jest.fn(),
      isEncrypted: jest.fn(),
    },
  },
}));

describe('React Native Pdf Extractor', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('canIExtract', () => {
    it('Should call canIExtract correctly', async () => {
      const canIExtractSpy = jest.spyOn(Module, 'canIExtract');

      await Extractor.canIExtract();

      expect(canIExtractSpy).toBeCalledTimes(1);
    });
  });

  describe('isEncrypted', () => {
    it('Should call isEncrypted correctly', async () => {
      const isEncryptedSpy = jest.spyOn(Module, 'isEncrypted');

      await Extractor.isEncrypted();

      expect(isEncryptedSpy).toBeCalledTimes(1);
    });
  });

  describe('getUri', () => {
    it('Should call getUri correctly', async () => {
      const getUriSpy = jest.spyOn(Module, 'getUri');

      await Extractor.getUri();

      expect(getUriSpy).toBeCalledTimes(1);
    });
  });

  describe('getNumberOfPages', () => {
    it.each([
      ['with password', 'pass'],
      ['without password', undefined],
    ])(
      'Should call getNumberOfPages correctly %s',
      async (_: string, password) => {
        const getNumberOfPagesSpy = jest.spyOn(Module, 'getNumberOfPages');

        await Extractor.getNumberOfPages(password);

        expect(getNumberOfPagesSpy).toBeCalledTimes(1);
      }
    );
  });

  describe('getText', () => {
    it.each([
      ['with password', 'pass'],
      ['without password', undefined],
    ])('Should call getText correctly %s', async (_: string, password) => {
      const getTextSpy = jest.spyOn(Module, 'getText');

      await Extractor.getText(password);

      expect(getTextSpy).toBeCalledTimes(1);
    });
  });

  describe('getTextWithPattern', () => {
    it.each([
      ['with pattern and password', 'pass', Patterns.Common.Email[0]],
      ['with patterns and without password', undefined, Patterns.Common.Email],
    ])(
      'Should call getTextWithPattern correctly %s',
      async (
        _: string,
        password: string | undefined,
        patterns: RegExp | RegExp[]
      ) => {
        const getTextSpy = jest.spyOn(Module, 'getText');

        await Extractor.getTextWithPattern(patterns, password);

        expect(getTextSpy).toBeCalledTimes(1);
      }
    );
  });
});
