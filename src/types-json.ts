// only in TypeScript 3.7+
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#more-recursive-type-aliases
// export type JsonArray = JsonValue[];
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface JsonArray extends Array<JsonValue> {}

export type JsonObject = {
  [key: string]: JsonValue;
};

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonArray
  | JsonObject;
