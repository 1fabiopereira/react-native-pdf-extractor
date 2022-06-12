import { NativeModules, Platform } from 'react-native';

const PdfExtractor = Platform.select({
  android: NativeModules.PdfExtractor,
  ios: {},
});

export async function getTextWithPattern(
  pattern: string | Array<string>,
  password?: string
): Promise<Readonly<Array<string>>> {
  const patterns = Array.isArray(pattern) ? pattern : [pattern];
  const data = await PdfExtractor.getTextWithPattern(patterns, password);
  return Object.freeze(data?.split('\n') || []);
}

export async function getText(
  password?: string
): Promise<Readonly<Array<string>>> {
  const data = await PdfExtractor.getText(password);
  return Object.freeze(data?.split('\n') || []);
}

export async function hasPassword(): Promise<string> {
  return await PdfExtractor.hasPassword();
}

export async function getNumberOfPages(password?: string): Promise<number> {
  return await PdfExtractor.getNumberOfPages(password);
}

export const Patterns = {
  common: {},
  Brazil: {
    BankSlip: [
      '([0-9]{5}).([0-9]{5}) ([0-9]{5}).([0-9]{6}) ([0-9]{5}).([0-9]{6}) ([0-9]) ([0-9]{14})', // Bancário - Linha digitável
      '([0-9]{12}) ([0-9]{12}) ([0-9]{12}) ([0-9]{12})', // Arrecadação - Código de barras
      '([0-9]{11})-([0-9]) ([0-9]{11})-([0-9]) ([0-9]{11})-([0-9]) ([0-9]{11})-([0-9])', // Arrecadação - Linha digitável
    ],
  }
};
