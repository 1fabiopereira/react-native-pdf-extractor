export interface Handler {
  setNext(handler: Handler): Handler;
  handle<T, U>(data: T, ctx: U): Promise<T>;
}

export type Patterns = string | string[];

export type TextResult = (string | null | undefined)[];

export type Action = <T, U>(data: T, ctx: U) => Promise<T>;

export type TransientObject = {
  duration?: string;
  isEncrypted?: boolean;
  pages?: number;
  patterns?: Patterns;
  text?: TextResult;
  uri?: string;
};
