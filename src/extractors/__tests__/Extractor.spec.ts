import { NativeModules } from 'react-native';
import { Extractor, BaseExtractor } from '../';
import { Patterns } from '../../patterns';
import type { TransientObject } from '../../types';

const Module = NativeModules.PdfExtractor as BaseExtractor;

const asyncMock = <T>(value: T) => jest.fn().mockResolvedValue(value);

describe('Extractor', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('extract', () => {
    it('Should call getUri from native module', async () => {
      const line = 'My e-mail account is name.lastname@provider.com.';

      Module.getUri = asyncMock('content://uri');
      Module.canIExtract = asyncMock(true);
      Module.getNumberOfPages = asyncMock(10);
      Module.isEncrypted = asyncMock(false);
      Module.getText = asyncMock(line);

      const getUriSpy = jest.spyOn(Module, 'getUri');

      const data = await Extractor.extract();

      expect(getUriSpy).toBeCalledTimes(1);
      expect(data).toHaveProperty('uri');
      expect(data.uri).toBe('content://uri');
    });

    it('Should throw error when cannot extract data', async () => {
      Module.getUri = asyncMock('content://uri');
      Module.canIExtract = asyncMock(false);

      try {
        await Extractor.extract();
      } catch (error: any) {
        expect(error).toHaveProperty('message');
        expect(error.message).toBe('You cannot continue with extraction.');
      }
    });

    it('Should throw error when password was not provider and it is required', async () => {
      Module.getUri = asyncMock('content://uri');
      Module.canIExtract = asyncMock(true);
      Module.getNumberOfPages = asyncMock(10);
      Module.isEncrypted = asyncMock(true);

      try {
        await Extractor.extract();
      } catch (error: any) {
        expect(error).toHaveProperty('message');
        expect(error.message).toBe(
          'You need provide password to continue with extraction.'
        );
      }
    });

    it.each([
      ['uri', 'content://uri'],
      ['pages', 10],
      ['text', ['name.lastname@provider.com']],
      ['patterns', Patterns.Common.Email],
      ['isEncrypted', false],
    ])(
      'Should returns data with property %s correctly',
      async (key: string, value: any) => {
        const uri = 'content://uri';
        const line = 'My e-mail account is name.lastname@provider.com.';

        Module.setUri = asyncMock(uri);
        Module.canIExtract = asyncMock(true);
        Module.getNumberOfPages = asyncMock(10);
        Module.isEncrypted = asyncMock(false);
        Module.getText = asyncMock(line);

        const data = await Extractor.extract(uri, Patterns.Common.Email);

        expect(data).toHaveProperty('duration');
        expect(data.duration).toMatch(/[0-9]{1,5}ms/);

        expect(data).toHaveProperty(key);
        expect(data[key as keyof TransientObject]).toStrictEqual(value);
      }
    );
  });

  describe('extractFromIntent', () => {
    it('Should call extract method', async () => {
      const uri = 'content://uri';
      const line = 'My e-mail account is name.lastname@provider.com.';

      const spy = jest.spyOn(Extractor, 'extract');

      Module.setUri = asyncMock(uri);
      Module.canIExtract = asyncMock(true);
      Module.getNumberOfPages = asyncMock(10);
      Module.isEncrypted = asyncMock(false);
      Module.getText = asyncMock(line);

      await Extractor.extractFromIntent(Patterns.Common.Email);

      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(undefined, Patterns.Common.Email);
    });

    it('Should stop extraction if not find intent data', async () => {
      const spy = jest.spyOn(Extractor, 'extract');

      Module.canIExtract = asyncMock(false);

      const data = await Extractor.extractFromIntent(Patterns.Common.Email);

      expect(spy).toBeCalledTimes(0);
      expect(data).toHaveProperty('duration');
      expect(data.duration).toMatch(/[0-9]{1,5}ms/);
    });
  });
});
