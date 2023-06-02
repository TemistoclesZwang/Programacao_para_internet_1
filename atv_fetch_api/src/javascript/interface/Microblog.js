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
exports.Data = void 0;
// import {sqlite3} from 'sqlite3';
const sqlite3 = __importStar(require("sqlite3"));
class Data {
    constructor() {
        this.db = new sqlite3.Database('data.db', (err) => {
            if (err) {
                console.error('Erro ao abrir o banco de dados:', err);
            }
            else {
                this.createTable();
            }
        });
    }
    createTable() {
        // . a tabela não pode se  chamar text se não gera bug com o tipo text
        const query = `
            CREATE TABLE IF NOT EXISTS posts (
                id TEXT PRIMARY KEY,
                txt TEXT,
                likes INTEGER
            )
        `;
        this.db.run(query, (err) => {
            if (err) {
                console.error('Erro ao criar a tabela:', err);
            }
            else {
                console.log('Tabela criada com sucesso!');
            }
        });
    }
    retrieveAll() {
        return __awaiter(this, void 0, void 0, function* () {
            // !qual tipo de retorno deveria ser usado em typescript aqui
            try {
                const query = `SELECT * FROM posts`;
                return new Promise((resolve, reject) => {
                    this.db.all(query, (err, rows) => {
                        if (err) {
                            console.error('Erro ao obter posts:', err);
                            reject(err);
                        }
                        else {
                            resolve(rows);
                        }
                    });
                });
            }
            catch (error) {
                console.error('Erro ao obter posts:', error);
                throw error;
            }
        });
    }
    create(post) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `INSERT INTO posts (id, txt, likes) VALUES (?, ?, ?)`;
                return new Promise((resolve, reject) => {
                    this.db.run(query, [post.id, post.text, post.likes], function (err) {
                        if (err) {
                            console.error('Erro ao inserir dados:', err);
                            reject(err);
                        }
                        else {
                            console.log('Dados inseridos com sucesso!');
                            // resolve();
                        }
                    });
                });
            }
            catch (error) {
                console.error('Erro ao inserir dados:', error);
                throw error;
            }
        });
    }
    retrieve(id) {
        return __awaiter(this, void 0, void 0, function* () {
            //. quando o ID não é encontrado retorna unfedined e não da erro
            try {
                const query = `SELECT * FROM posts WHERE id = ?`;
                return new Promise((resolve, reject) => {
                    this.db.get(query, [id], (err, row) => {
                        // ! pode dar algum bug pelo tipo do row
                        if (err) {
                            console.error('Erro ao obter post:', err);
                            reject(err);
                            // return null
                        }
                        else {
                            resolve(row);
                            // return row;
                        }
                    });
                });
            }
            catch (error) {
                console.error('Erro ao obter posts:', error);
                throw error;
            }
        });
    }
    ;
    update(id, novoText, novoLike) {
        return __awaiter(this, void 0, void 0, function* () {
            //para verificar se o usuário quer modificar text, likes ou os dois
            let updateQuery = 'UPDATE posts SET';
            const paramsUpdate = [];
            if (novoText !== '') {
                updateQuery += ' txt = ?,';
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
                const query = `SELECT * FROM posts WHERE id = ?`;
                return new Promise((resolve, reject) => {
                    this.db.get(query, [id], (err, row) => {
                        if (err) {
                            console.error('Erro ao obter post:', err);
                            reject(err);
                            return null;
                        }
                        else {
                            this.db.run(updateQuery, paramsUpdate, (err) => {
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
                });
            }
            catch (error) {
                console.error('Erro ao obter posts:', error);
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT * FROM posts WHERE id = ?`;
                return new Promise((resolve, reject) => {
                    this.db.get(query, [id], (err, row) => {
                        if (err) {
                            console.error('Erro ao obter post:', err);
                            reject(err);
                            return null;
                        }
                        else {
                            const queryDelete = `DELETE FROM posts WHERE id = ?`;
                            this.db.run(queryDelete, [id], (err) => {
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
                });
            }
            catch (error) {
                console.error('Erro ao obter posts:', error);
                throw error;
            }
        });
    }
}
exports.Data = Data;
//# sourceMappingURL=Microblog.js.map