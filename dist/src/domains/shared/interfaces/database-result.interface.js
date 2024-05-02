"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exceptionSQL = exports.evaluateOK = exports.getAssessAffectCount = exports.isDeleteResult = exports.isUpdateResult = exports.isInsertResult = exports.Query = exports.Execute = exports.adtResultSQL = exports.resultSQL = exports.ResultSQL = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
class DatabaseResponse {
    constructor(data = null, success, message) {
        this.data = data;
        this.success = success;
        this.message = message;
        if (this.data)
            this.assessQueryBuilder(data);
    }
    assessQueryBuilder(data) {
        this.success = evaluateOK(data);
        this.message = this.success ? exports.Query.OK : exports.Query.Fail;
    }
    get hasError() {
        return this.success !== true;
    }
}
exports.ResultSQL = DatabaseResponse;
const resultSQL = (data) => new exports.ResultSQL(data);
exports.resultSQL = resultSQL;
const adtResultSQL = (result) => {
    const dbResponse = new DatabaseResponse();
    dbResponse.data = result;
    dbResponse.success = !!result;
    dbResponse.message = dbResponse.success ? exports.Query.OK : exports.Query.Fail;
    return dbResponse;
};
exports.adtResultSQL = adtResultSQL;
exports.Execute = { OK: true, Fail: false, Error: false };
exports.Query = { OK: 'success', Fail: 'fail', Error: 'exception' };
// B:TypeGuard
function isInsertResult(result) {
    // return result && typeof result.affected === 'number';
    return result instanceof typeorm_1.InsertResult && typeof result.generatedMaps !== 'undefined';
}
exports.isInsertResult = isInsertResult;
function isUpdateResult(result) {
    return result instanceof typeorm_1.UpdateResult && typeof result.affected === 'number';
}
exports.isUpdateResult = isUpdateResult;
function isDeleteResult(result) {
    return result instanceof typeorm_1.DeleteResult && typeof result.affected === 'number';
}
exports.isDeleteResult = isDeleteResult;
// E:TypeGuard
function getAssessAffectCount(result) {
    if (isInsertResult(result)) {
        // from QueryResult.affected <- identifiers: ObjectLiteral[] : because return length
        return result.generatedMaps.length;
    }
    else if (isUpdateResult(result)) {
        return result.affected;
    }
    else if (isDeleteResult(result)) {
        return result.affected;
    }
    else {
        // throw new Error('Invalid result type');
        return 0;
    }
}
exports.getAssessAffectCount = getAssessAffectCount;
function evaluateOK(resultSet) {
    return getAssessAffectCount(resultSet) > 0;
}
exports.evaluateOK = evaluateOK;
function exceptionSQL(text = '', error) {
    common_1.Logger.error(error);
    // throw new HttpException(text, HttpStatus.BAD_REQUEST, ERROR_CODE.INVALID_PASSWORD_ERROR);
    return new exports.ResultSQL(text);
}
exports.exceptionSQL = exceptionSQL;
//# sourceMappingURL=database-result.interface.js.map