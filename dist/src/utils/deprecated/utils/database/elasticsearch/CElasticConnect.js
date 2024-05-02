"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CElasticConnect = void 0;
const Elastic = __importStar(require("@elastic/elasticsearch"));
class CElasticConnect {
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
    static create(options) {
        return new Elastic.Client(options);
    }
}
exports.CElasticConnect = CElasticConnect;
//# sourceMappingURL=CElasticConnect.js.map