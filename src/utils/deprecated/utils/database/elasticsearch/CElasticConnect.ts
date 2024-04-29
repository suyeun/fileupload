import * as Elastic from '@elastic/elasticsearch';

export class CElasticConnect {
  protected static m_connect: Elastic.Client;

  /**
   *
   * node: string | string[];                             the Elasticsearch endpoint to use
   * nodes: string | string[];                            alias of above
   * Connection: typeof Connection;                       custom connection class
   * ConnectionPool: typeof ConnectionPool;               custom connection pool class
   * Transport: typeof Transport;                         custom transport class
   * Serializer: typeof Serializer;                       custom serializer class
   * maxRetries: number;                                  max number of retries for each request
   * requestTimeout: number;                              max request timeout for each request
   * pingTimeout: number;                                 max ping timeout for each request
   * sniffInterval: number;                               perform a sniff operation every `n` milliseconds
   * sniffOnStart: boolean;                               perform a sniff once the client is started
   * sniffEndpoint: string;                               custom sniff endpoint, defaults `_nodes/_all/http`
   * sniffOnConnectionFault: boolean;                     perform a sniff on connection fault
   * resurrectStrategy: 'ping' | 'optimistic' | 'none';   configurethe node resurrection strategy, default `ping`
   * suggestCompression: boolean;                         adds `accept-encoding` header to every request
   * compression: 'gzip';                                 enable gzip request body compression
   * ssl: http.SecureContextOptions;                      ssl configuraton
   * agent: http.AgentOptions;                            http agent options
   * nodeFilter: nodeFilterFn;                            filters which node not to use for a request
   * nodeSelector: nodeSelectorFn | string;               custom selection strategy, defaults `round-robin`
   */
  public static create(options: Elastic.ClientOptions): Elastic.Client {
    return new Elastic.Client(options);
  }
}
