export class CSQLQuery {
  protected m_query: string = '';
  protected m_param: any[] = [];

  public constructor(query: string = '', params: any[] = []) {
    this.m_query = query;
    this.m_param = params;
  }

  public get query(): string {
    return this.m_query;
  }

  public get params(): any[] {
    return this.m_param;
  }

  public add(query: CSQLQuery): void {
    if (!query) {
      return undefined;
    }

    this.m_query += query.query;

    const count: number = query.params.length;
    for (let idx = 0; idx < count; ++idx) {
      const element = query.params[idx];
      this.m_param.push(element);
    }
  }

  public addList(queries: CSQLQuery[]): void {
    for (const query of queries) {
      this.add(query);
    }
  }

  public static merge($queries: CSQLQuery[], queryArr: CSQLQuery[]): void {
    for (const query of queryArr) {
      $queries.push(query);
    }
  }
}
