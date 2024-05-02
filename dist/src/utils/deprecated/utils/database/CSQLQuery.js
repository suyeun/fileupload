"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSQLQuery = void 0;
class CSQLQuery {
    constructor(query = '', params = []) {
        this.m_query = '';
        this.m_param = [];
        this.m_query = query;
        this.m_param = params;
    }
    get query() {
        return this.m_query;
    }
    get params() {
        return this.m_param;
    }
    add(query) {
        if (!query) {
            return undefined;
        }
        this.m_query += query.query;
        const count = query.params.length;
        for (let idx = 0; idx < count; ++idx) {
            const element = query.params[idx];
            this.m_param.push(element);
        }
    }
    addList(queries) {
        for (const query of queries) {
            this.add(query);
        }
    }
    static merge($queries, queryArr) {
        for (const query of queryArr) {
            $queries.push(query);
        }
    }
}
exports.CSQLQuery = CSQLQuery;
//# sourceMappingURL=CSQLQuery.js.map