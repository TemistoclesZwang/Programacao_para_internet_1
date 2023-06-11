import * as sqlite3 from 'sqlite3';
import { Comentario } from './Comentario';

export class ComentariosDb {
    private db = new sqlite3.Database('data.db');
    constructor() {
        this.db.run(`
        CREATE TABLE IF NOT EXISTS Comentarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            comentario TEXT,
            id_post TEXT,
            data_time TEXT DEFAULT (datetime('now')),
            FOREIGN KEY (id_post) REFERENCES Posts(id)
        )
        `);
    }


    async joinPosts() {
        try {
            const query = `
            SELECT Posts.title AS title_post, Comentarios.comentario AS comentario
            FROM Posts
            JOIN Comentarios ON Posts.id = Comentarios.id_post
            `;
            return new Promise((resolve, reject) => {
                this.db.all(query, [], (err, rows) => {
                    if (err) {
                        console.error('Erro ao fazer join:', err);
                        reject(err);
                    } else {
                        console.log('JOIN realizado com sucesso');
                        console.log(rows);
                        resolve(rows);
                    }
                });
            });
        } catch (error) {
            console.error('Erro ao obter posts:', error);
            throw error;
        }
    }

    async comen(idPost: string) {
        try {
            const query: string = `SELECT comentario,data_time FROM Comentarios WHERE id_post = ? ORDER BY data_time DESC`;
            return new Promise((resolve, reject) => {
                this.db.all(query, [idPost], (err, rows) => {
                    if (err) {
                        console.error('Erro ao obter comentarios:', err);
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            });
        } catch (error) {
            console.error('Erro ao obter posts:', error);
            throw error;
        }
    }

    async create(comentario: Comentario) {
        try {
            const query: string = `INSERT INTO Comentarios (comentario, id_post) VALUES (?, ?)`;
            return new Promise((resolve, reject) => {
                this.db.run(query, [comentario.text, comentario.id_post], function (err) {
                    if (err) {
                        console.error('Erro ao inserir dados:', err);
                        reject(err);
                    } else {
                        console.log('Dados inseridos com sucesso!');
                        // resolve();
                    }
                });
            });
        } catch (error) {
            console.error('Erro ao inserir dados:', error);
            throw error;
        }
    }


    async retrieveAll() {
        try {
            const query: string = `SELECT * FROM Comentarios`;
            return new Promise((resolve, reject) => {
                this.db.all(query, (err, rows) => {
                    if (err) {
                        console.error('Erro ao obter comentarios:', err);
                        reject(err);
                    } else {
                        console.log(rows);
                        resolve(rows);
                    }
                });
            });
        } catch (error) {
            console.error('Erro ao obter posts:', error);
            throw error;
        }
    }

    async retrieve(id: string): Promise<any> { //! testar

        //. quando o ID não é encontrado retorna unfedined e não da erro
        try {
            const query: string = `SELECT * FROM Comentarios WHERE id = ?`;
            return new Promise((resolve, reject) => {
                this.db.get(query, [id], (err, row: any) => {
                    if (err) {
                        console.error('Erro ao obter Comentario:', err);
                        reject(err)
                    } else {
                        return row;
                    }
                });
            });
        } catch (error) {
            console.error('Erro ao obter Comentarios:', error);
            throw error;
        }
    };


    async update(comentarioId: string, novoComentario: string) { //!testar
        let updateQuery = 'UPDATE Comentarios SET';
        const paramsUpdate: string[] = [];

        if (novoComentario !== '') {
            updateQuery += ' comentario = ?,';
            paramsUpdate.push(novoComentario);
        }

        updateQuery = updateQuery.slice(0, -1); //pra tirar a vírgula da query

        updateQuery += ' WHERE id = ?';
        paramsUpdate.push(comentarioId);

        try {
            const query: string = `SELECT * FROM Comentarios WHERE id = ?`;
            return new Promise((resolve, reject) => {
                this.db.get(query, [comentarioId], (err, row) => {
                    if (err) {
                        console.error('Erro ao obter comentario:', err);
                        reject(err)
                        return null
                    } else {
                        this.db.run(updateQuery, paramsUpdate, (err) => {
                            if (err) {
                                console.error('Erro ao atualizar comentario:', err);
                            } else {
                                // só precisa de um print não precisa resolve
                                return (console.log('comentario atualizado com sucesso!'));
                            }
                        });
                    }
                });
            });
        } catch (error) {
            console.error('Erro ao obter comentarios:', error);
            throw error;
        }

    }


    async delete(id: string) { //! testar
        try {
            const query: string = `SELECT * FROM Comentarios WHERE id = ?`;
            return new Promise((resolve, reject) => {
                this.db.get(query, [id], (err, row) => {
                    if (err) {
                        console.error('Erro ao obter comentario:', err);
                        reject(err)
                        return null
                    } else {
                        const queryDelete = `DELETE FROM Comentarios WHERE id = ?`;
                        this.db.run(queryDelete, [id], (err) => {
                            if (err) {
                                console.error('Erro ao atualizar comentario:', err);
                            } else {
                                return (console.log('comentario excluido com sucesso!'));
                            }
                        });
                    }
                });
            });
        } catch (error) {
            console.error('Erro ao obter comentarios:', error);
            throw error;
        }

    }
}

