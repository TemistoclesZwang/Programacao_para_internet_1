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
                this.db.all(query, [],(err, rows) => {
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
}

