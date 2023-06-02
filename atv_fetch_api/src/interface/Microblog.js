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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = void 0;
// import {sqlite3} from 'sqlite3';
var sqlite3 = require("sqlite3");
var Data = /** @class */ (function () {
    function Data() {
        var _this = this;
        this.db = new sqlite3.Database('data.db', function (err) {
            if (err) {
                console.error('Erro ao abrir o banco de dados:', err);
            }
            else {
                _this.createTable();
            }
        });
    }
    Data.prototype.createTable = function () {
        var query = "\n            CREATE TABLE IF NOT EXISTS posts (\n                id TEXT PRIMARY KEY,\n                txt TEXT,\n                likes INTEGER\n            )\n        ";
        this.db.run(query, function (err) {
            if (err) {
                console.error('Erro ao criar a tabela:', err);
            }
            else {
                console.log('Tabela criada com sucesso!');
            }
        });
    };
    Data.prototype.retrieveAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query_1;
            var _this = this;
            return __generator(this, function (_a) {
                // !qual tipo de retorno deveria ser usado em typescript aqui
                try {
                    query_1 = "SELECT * FROM posts";
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            _this.db.all(query_1, function (err, rows) {
                                if (err) {
                                    console.error('Erro ao obter posts:', err);
                                    reject(err);
                                }
                                else {
                                    resolve(rows);
                                }
                            });
                        })];
                }
                catch (error) {
                    console.error('Erro ao obter posts:', error);
                    throw error;
                }
                return [2 /*return*/];
            });
        });
    };
    Data.prototype.create = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            var query, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        query = "INSERT INTO posts (id, text, likes) VALUES (?, ?, ?)";
                        return [4 /*yield*/, this.db.run(query, [post.id, post.text, post.likes])];
                    case 1:
                        _a.sent();
                        console.log('post inserido com sucesso!');
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Erro ao inserir post:', error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Data.prototype.retrieve = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var query_2;
            var _this = this;
            return __generator(this, function (_a) {
                //. quando o ID não é encontrado retorna unfedined e não da erro
                try {
                    query_2 = "SELECT * FROM posts WHERE id = ?";
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            _this.db.get(query_2, [id], function (err, row) {
                                // ! pode dar algum bug pelo tipo do row
                                if (err) {
                                    console.error('Erro ao obter post:', err);
                                    reject(err);
                                    // return null
                                }
                                else {
                                    resolve(row);
                                }
                            });
                        })];
                }
                catch (error) {
                    console.error('Erro ao obter posts:', error);
                    throw error;
                }
                return [2 /*return*/];
            });
        });
    };
    ;
    Data.prototype.update = function (id, novoText, novoLike) {
        return __awaiter(this, void 0, void 0, function () {
            var updateQuery, paramsUpdate, query_3;
            var _this = this;
            return __generator(this, function (_a) {
                updateQuery = 'UPDATE posts SET';
                paramsUpdate = [];
                if (novoText !== '') {
                    updateQuery += ' text = ?,';
                    paramsUpdate.push(novoText);
                }
                if (novoLike !== undefined) {
                    updateQuery += ' likes = ?,';
                    paramsUpdate.push(novoLike.toString());
                    // .verificar se vai ter algum bug
                }
                updateQuery = updateQuery.slice(0, -1); //pra tirar a vírgula da query
                updateQuery += ' WHERE id = ?';
                paramsUpdate.push(id);
                try {
                    query_3 = "SELECT * FROM posts WHERE id = ?";
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            _this.db.get(query_3, [id], function (err, row) {
                                if (err) {
                                    console.error('Erro ao obter post:', err);
                                    reject(err);
                                    return null;
                                }
                                else {
                                    _this.db.run(updateQuery, paramsUpdate, function (err) {
                                        if (err) {
                                            console.error('Erro ao atualizar post:', err);
                                        }
                                        else {
                                            // só precisa de um print não precisa resolve
                                            return (console.log('post atualizado com sucesso!'));
                                        }
                                    });
                                }
                            });
                        })];
                }
                catch (error) {
                    console.error('Erro ao obter posts:', error);
                    throw error;
                }
                return [2 /*return*/];
            });
        });
    };
    Data.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var query_4;
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    query_4 = "SELECT * FROM posts WHERE id = ?";
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            _this.db.get(query_4, [id], function (err, row) {
                                if (err) {
                                    console.error('Erro ao obter post:', err);
                                    reject(err);
                                    return null;
                                }
                                else {
                                    var queryDelete = "DELETE FROM posts WHERE id = ?";
                                    _this.db.run(queryDelete, [id], function (err) {
                                        if (err) {
                                            console.error('Erro ao atualizar post:', err);
                                        }
                                        else {
                                            // só precisa de um print não precisa resolve
                                            return (console.log('post excluido com sucesso!'));
                                        }
                                    });
                                }
                            });
                        })];
                }
                catch (error) {
                    console.error('Erro ao obter posts:', error);
                    throw error;
                }
                return [2 /*return*/];
            });
        });
    };
    return Data;
}());
exports.Data = Data;
