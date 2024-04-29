export type RecordObject = Record<KeyType, ValueType>;

type KeyType = string | number | symbol;
type ValueType = string | number | object | boolean | bigint | DynamicInterface | undefined | null;

export interface DynamicInterface {
  [key: KeyType]: any;
}

export interface SessionInterface {
  [key: string]: any;
}

export function toPairObject<K extends string, V>(key: K, value: V): Record<K, V> {
  const result: Record<K, V> = {} as Record<K, V>;
  result[key] = value;
  return result;
}

export class Dict<DictValueType = ValueType> implements DynamicInterface {
  private dict: Record<KeyType, DictValueType> = {};

  set(key: KeyType, value: DictValueType): this {
    this.dict[key] = value;
    return this;
  }

  has(key: KeyType): boolean {
    return key in this.dict;
  }

  toJson(): string {
    try {
      return JSON.stringify(this.dict);
    } catch (error: any) {
      console.error(error);
      return '{}';
    }
  }

  get result() {
    return this.dict;
  }
}
