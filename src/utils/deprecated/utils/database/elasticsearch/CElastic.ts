import Elastic from '@elastic/elasticsearch';

export class CElastic {
  public static async create(client: Elastic.Client, indexname: string, payload?: any) {
    return client.indices.create({ index: indexname, body: { settings: payload } });
  }

  public static async exists(client: Elastic.Client, indexname: string) {
    return client.indices.exists({ index: indexname });
  }

  public static async mapping(client: Elastic.Client, indexname: string, docType: string, payload: any) {
    return await client.indices.putMapping({ index: indexname, type: docType, body: { properties: payload } });
  }

  public static async settings(client: Elastic.Client, indexname: string, payload: any) {
    return await client.indices.putSettings({ index: indexname, body: { settings: payload } });
  }

  public static async insertDocument(
    client: Elastic.Client,
    indexname: string,
    docType: string,
    payload: any,
    _id?: string,
  ) {
    const params: any = { index: indexname, type: docType, body: payload };
    if (_id) {
      params.id = _id;
    }
    return await client.index(params);
  }

  public static async upsertDocument(
    client: Elastic.Client,
    indexname: string,
    docType: string,
    payload: any,
    _id?: string,
  ) {
    const params: any = { index: indexname, type: docType, id: _id, body: payload };
    if (_id) {
      params.id = _id;
    }
    return await client.updateByQuery(params);
  }

  public static async updateDocument(
    client: Elastic.Client,
    indexname: string,
    docType: string,
    _id: string,
    payload: any,
  ) {
    const params: any = { index: indexname, type: docType, id: _id, body: payload };
    return await client.update(params);
  }

  public static async searchDocument(client: Elastic.Client, indexname: string, payload: any) {
    return await client.search({ index: indexname, body: payload });
  }

  public static async deleteDocument(client: Elastic.Client, indexname: string, docType: string, _id: string) {
    return await client.delete({ index: indexname, type: docType, id: _id });
  }

  public static async deleteAll(client: Elastic.Client) {
    return await client.indices.delete({ index: '_all' });
  }

  public static async analyze(client: Elastic.Client, indexname: string, searchText: string) {
    return await client.indices.analyze({
      index: indexname,
      body: {
        analyzer: 'standard',
        text: searchText,
      },
    });
  }
}
