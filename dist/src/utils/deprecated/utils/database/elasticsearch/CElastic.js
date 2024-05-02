"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CElastic = void 0;
class CElastic {
    static create(client, indexname, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return client.indices.create({ index: indexname, body: { settings: payload } });
        });
    }
    static exists(client, indexname) {
        return __awaiter(this, void 0, void 0, function* () {
            return client.indices.exists({ index: indexname });
        });
    }
    static mapping(client, indexname, docType, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client.indices.putMapping({ index: indexname, type: docType, body: { properties: payload } });
        });
    }
    static settings(client, indexname, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client.indices.putSettings({ index: indexname, body: { settings: payload } });
        });
    }
    static insertDocument(client, indexname, docType, payload, _id) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = { index: indexname, type: docType, body: payload };
            if (_id) {
                params.id = _id;
            }
            return yield client.index(params);
        });
    }
    static upsertDocument(client, indexname, docType, payload, _id) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = { index: indexname, type: docType, id: _id, body: payload };
            if (_id) {
                params.id = _id;
            }
            return yield client.updateByQuery(params);
        });
    }
    static updateDocument(client, indexname, docType, _id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = { index: indexname, type: docType, id: _id, body: payload };
            return yield client.update(params);
        });
    }
    static searchDocument(client, indexname, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client.search({ index: indexname, body: payload });
        });
    }
    static deleteDocument(client, indexname, docType, _id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client.delete({ index: indexname, type: docType, id: _id });
        });
    }
    static deleteAll(client) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client.indices.delete({ index: '_all' });
        });
    }
    static analyze(client, indexname, searchText) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client.indices.analyze({
                index: indexname,
                body: {
                    analyzer: 'standard',
                    text: searchText,
                },
            });
        });
    }
}
exports.CElastic = CElastic;
//# sourceMappingURL=CElastic.js.map