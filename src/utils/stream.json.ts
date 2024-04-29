import { Readable } from 'stream';

export const toJsonPrint = (jsonData: any, pretty: boolean = true) => {
  const readableStream = new Readable();
  if (pretty) readableStream.push(JSON.stringify(jsonData, null, 2));
  else readableStream.push(JSON.stringify(jsonData));
  readableStream.push(null);
  readableStream.pipe(process.stdout);
  readableStream.push('');
};

export function objectToJson(jsonObject: any) {
  return JSON.stringify(jsonObject);
}

export const stringToJson = (jsonString: string) => {
  return JSON.parse(jsonString);
};
