import { NativeModules, Platform } from 'react-native';

const PdfExtractor = Platform.select({
  android: NativeModules.PdfExtractor,
  ios: {},
});

export async function getTextWithPattern(
  pattern: string | String[],
  password?: string
): Promise<Readonly<String[]>> {
  const patterns = Array.isArray(pattern) ? pattern : [pattern];
  const data = await PdfExtractor.getTextWithPattern(patterns, password);
  return Object.freeze(data?.split('\n') || []);
}

export async function getText(
  password?: string
): Promise<Readonly<String[]>> {
  const data = await PdfExtractor.getText(password);
  return Object.freeze(data?.split('\n') || []);
}

export async function hasPassword(): Promise<boolean> {
  return await PdfExtractor.hasPassword();
}

export async function getNumberOfPages(password?: string): Promise<number> {
  return await PdfExtractor.getNumberOfPages(password);
}

export const Patterns = {
  Common: {},
  Brazil: {
    Phone: [],
    CPF: [],
    CNPJ: [],
    CEP: [],
    BankSlip: [
      '([0-9]{5}).([0-9]{5})\\s([0-9]{5}).([0-9]{6})\\s([0-9]{5}).([0-9]{6})\\s([0-9])\\s([0-9]{14})', // Bancário - Linha digitável
      '([0-9]{12})\\s([0-9]{12})\\s([0-9]{12})\\s([0-9]{12})', // Arrecadação - Código de barras
      '([0-9]{11})-([0-9])\\s([0-9]{11})-([0-9])\\s([0-9]{11})-([0-9])\\s([0-9]{11})-([0-9])', // Arrecadação - Linha digitável
    ],
  }
};
