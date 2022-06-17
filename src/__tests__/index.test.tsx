import Extractor from '..';

jest.mock('react-native', () => ({
  Platform: {
    select: jest.fn(({ android }) => android),
  },
  NativeModules: {
    PdfExtractor: {
      canIExtract: jest.fn(),
      getNumberOfPages: jest.fn(),
      getText: jest.fn(),
      getTextWithPattern: jest.fn(),
      getUri: jest.fn(),
      isEncrypted: jest.fn(),
    },
  },
}));

const functions = new Map<string, any>([
  ['canIExtract', Extractor.canIExtract],
  ['getNumberOfPages', Extractor.getNumberOfPages],
  ['getText', Extractor.getText],
  ['getTextWithPattern', Extractor.getTextWithPattern],
  ['getUri', Extractor.getUri],
  ['isEncrypted', Extractor.isEncrypted],
]);

describe('React Native Pdf Extractor', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('Methods', () => {
    it.each([
      ['getNumberOfPages', 3, ['password']],
      ['getText', 7, [undefined]],
      ['getTextWithPattern', 1, [['[0-9]{2,4}', '[0-9]{2,4}'], 'password']],
      ['getTextWithPattern', 6, ['[0-9]{2,4}', 'password']],
      ['isEncrypted', 10, [undefined]],
      ['getUri', 2, [undefined]],
      ['canIExtract', 6, [undefined]],
    ])(
      'Should call PdfExtractor %s function %s times with right params',
      async (fn, times, params) => {
        const executors = new Array(times)
          .fill(fn)
          .map((f) => functions.get(f));

        Promise.all(executors.map(async (exec) => await exec(...params))).then(
          () => {
            expect(fn).toHaveBeenCalledTimes(times);
            expect(fn).toHaveBeenLastCalledWith(...params);
          }
        );
      }
    );
  });
});
