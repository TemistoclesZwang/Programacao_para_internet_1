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
exports.ComentariosDb = void 0;
var sqlite3 = require("sqlite3");
var ComentariosDb = /** @class */ (function () {
    function ComentariosDb() {
        this.db = new sqlite3.Database('data.db');
        this.db.run("\n        CREATE TABLE IF NOT EXISTS Comentarios (\n            id INTEGER PRIMARY KEY AUTOINCREMENT,\n            comentario TEXT,\n            id_post TEXT,\n            data_time TEXT DEFAULT (datetime('now')),\n            FOREIGN KEY (id_post) REFERENCES Posts(id)\n        )\n        ");
    }
    ComentariosDb.prototype.joinPosts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query_1;
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    query_1 = "\n            SELECT Posts.title AS title_post, Comentarios.comentario AS comentario\n            FROM Posts\n            JOIN Comentarios ON Posts.id = Comentarios.id_post\n            ";
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            _this.db.all(query_1, [], function (err, rows) {
                                if (err) {
                                    console.error('Erro ao fazer join:', err);
                                    reject(err);
                                }
                                else {
                                    console.log('JOIN realizado com sucesso');
                                    console.log(rows);
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
    ComentariosDb.prototype.comen = function (idPost) {
        return __awaiter(this, void 0, void 0, function () {
            var query_2;
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    query_2 = "SELECT comentario,data_time FROM Comentarios WHERE id_post = ? ORDER BY data_time DESC";
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            _this.db.all(query_2, [idPost], function (err, rows) {
                                if (err) {
                                    console.error('Erro ao obter comentarios:', err);
                                    reject(err);
                                }
                                else {
                                    // const comentarios = rows.map((row:any) => row.comentario);
                                    // console.log(comentarios);
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
    ComentariosDb.prototype.create = function (comentario) {
        return __awaiter(this, void 0, void 0, function () {
            var query_3;
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    query_3 = "INSERT INTO Comentarios (comentario, id_post) VALUES (?, ?)";
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            _this.db.run(query_3, [comentario.text, comentario.id_post], function (err) {
                                if (err) {
                                    console.error('Erro ao inserir dados:', err);
                                    reject(err);
                                }
                                else {
                                    console.log('Dados inseridos com sucesso!');
                                    // resolve();
                                }
                            });
                        })];
                }
                catch (error) {
                    console.error('Erro ao inserir dados:', error);
                    throw error;
                }
                return [2 /*return*/];
            });
        });
    };
    ComentariosDb.prototype.retrieveAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query_4;
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    query_4 = "SELECT * FROM Comentarios";
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            _this.db.all(query_4, function (err, rows) {
                                if (err) {
                                    console.error('Erro ao obter comentarios:', err);
                                    reject(err);
                                }
                                else {
                                    console.log(rows);
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
    ComentariosDb.prototype.retrieve = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var query_5;
            var _this = this;
            return __generator(this, function (_a) {
                //. quando o ID não é encontrado retorna unfedined e não da erro
                try {
                    query_5 = "SELECT * FROM Comentarios WHERE id = ?";
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            _this.db.get(query_5, [id], function (err, row) {
                                if (err) {
                                    console.error('Erro ao obter Comentario:', err);
                                    reject(err);
                                    // return null
                                }
                                else {
                                    // console.log(row);
                                    // resolve(row);
                                    return row;
                                }
                            });
                        })];
                }
                catch (error) {
                    console.error('Erro ao obter Comentarios:', error);
                    throw error;
                }
                return [2 /*return*/];
            });
        });
    };
    ;
    ComentariosDb.prototype.update = function (comentarioId, novoComentario) {
        return __awaiter(this, void 0, void 0, function () {
            var updateQuery, paramsUpdate, query_6;
            var _this = this;
            return __generator(this, function (_a) {
                updateQuery = 'UPDATE Comentarios SET';
                paramsUpdate = [];
                if (novoComentario !== '') {
                    updateQuery += ' comentario = ?,';
                    paramsUpdate.push(novoComentario);
                }
                updateQuery = updateQuery.slice(0, -1); //pra tirar a vírgula da query
                updateQuery += ' WHERE id = ?';
                paramsUpdate.push(comentarioId);
                try {
                    query_6 = "SELECT * FROM Comentarios WHERE id = ?";
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            _this.db.get(query_6, [comentarioId], function (err, row) {
                                if (err) {
                                    console.error('Erro ao obter comentario:', err);
                                    reject(err);
                                    return null;
                                }
                                else {
                                    _this.db.run(updateQuery, paramsUpdate, function (err) {
                                        if (err) {
                                            console.error('Erro ao atualizar comentario:', err);
                                        }
                                        else {
                                            // só precisa de um print não precisa resolve
                                            return (console.log('comentario atualizado com sucesso!'));
                                        }
                                    });
                                }
                            });
                        })];
                }
                catch (error) {
                    console.error('Erro ao obter comentarios:', error);
                    throw error;
                }
                return [2 /*return*/];
            });
        });
    };
    ComentariosDb.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var query_7;
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    query_7 = "SELECT * FROM Comentarios WHERE id = ?";
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            _this.db.get(query_7, [id], function (err, row) {
                                if (err) {
                                    console.error('Erro ao obter comentario:', err);
                                    reject(err);
                                    return null;
                                }
                                else {
                                    var queryDelete = "DELETE FROM Comentarios WHERE id = ?";
                                    _this.db.run(queryDelete, [id], function (err) {
                                        if (err) {
                                            console.error('Erro ao atualizar comentario:', err);
                                        }
                                        else {
                                            // só precisa de um print não precisa resolve
                                            return (console.log('comentario excluido com sucesso!'));
                                        }
                                    });
                                }
                            });
                        })];
                }
                catch (error) {
                    console.error('Erro ao obter comentarios:', error);
                    throw error;
                }
                return [2 /*return*/];
            });
        });
    };
    return ComentariosDb;
}());
exports.ComentariosDb = ComentariosDb;
