import { NativeModules } from 'react-native';
import { Patterns } from '../../patterns';
import { BaseExtractor } from '../core/BaseExtractor';

const Module = NativeModules.PdfExtractor;

describe('BaseExtractor', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('canIExtract', () => {
    it('Should call canIExtract correctly', async () => {
      const canIExtractSpy = jest.spyOn(Module, 'canIExtract');
      const baseExtractor = new BaseExtractor();

      await baseExtractor.canIExtract();

      expect(canIExtractSpy).toBeCalledTimes(1);
    });
  });

  describe('isEncrypted', () => {
    it('Should call isEncrypted correctly', async () => {
      const isEncryptedSpy = jest.spyOn(Module, 'isEncrypted');
      const baseExtractor = new BaseExtractor();

      await baseExtractor.isEncrypted();

      expect(isEncryptedSpy).toBeCalledTimes(1);
    });
  });

  describe('getUri', () => {
    it('Should call getUri correctly', async () => {
      const getUriSpy = jest.spyOn(Module, 'getUri');
      const baseExtractor = new BaseExtractor();

      await baseExtractor.getUri();

      expect(getUriSpy).toBeCalledTimes(1);
    });
  });

  describe('setUri', () => {
    it('Should call setUri correctly', async () => {
      const setUriSpy = jest.spyOn(Module, 'setUri');
      const baseExtractor = new BaseExtractor();

      await baseExtractor.setUri('any-uri');

      expect(setUriSpy).toBeCalledTimes(1);
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
        const baseExtractor = new BaseExtractor();

        await baseExtractor.getNumberOfPages(password);

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
      const baseExtractor = new BaseExtractor();

      await baseExtractor.getText(password);

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
        patterns: string | string[]
      ) => {
        const getTextSpy = jest.spyOn(Module, 'getText');
        const baseExtractor = new BaseExtractor();

        await baseExtractor.getTextWithPattern(patterns, password);

        expect(getTextSpy).toBeCalledTimes(1);
      }
    );
  });
});
