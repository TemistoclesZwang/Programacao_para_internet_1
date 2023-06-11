const sqlite3 = require('sqlite3').verbose();

// Configurar a conexão com o banco de dados
const db = new sqlite3.Database('data.db');

// Método para criar a tabela
const createTable = () => {
    db.run(`
    CREATE TABLE IF NOT EXISTS posts (
        // id INTEGER PRIMARY KEY AUTOINCREMENT,
        id TEXT PRIMARY KEY, //.para pegar o id universal que já tava implementado
        text TEXT,
        likes INTEGER
    )
    `);
};

// Método para adicionar um usuário
const addPosts = (id, text, likes) => {
    const query = `INSERT INTO posts (id, text, likes) VALUES (?, ?, ?)`;
    db.run(query, [id,text, likes], (err) => {
        if (err) {
            console.error('Erro ao adicionar usuário:', err);
        } else {
            console.log('Usuário adicionado com sucesso!');
        }
    });
};

// Método para obter todos os usuários
const getPosts = (callback) => {
    const query = `SELECT * FROM posts`;
    db.all(query, (err, rows) => {
        if (err) {
            console.error('Erro ao obter usuários:', err);
        } else {
            callback(rows);
        }
    });
};

// Método para obter um usuário por ID
const getPostsById = (id, callback) => {
    const query = `SELECT * FROM posts WHERE id = ?`;
    db.get(query, [id], (err, row) => {
        if (err) {
            console.error('Erro ao obter usuário:', err);
        } else {
            callback(row);
        }
    });
};

// Exemplo de uso
createTable();
addPosts('John Doe', 'john@example.com');
getPosts((posts) => {
    console.log('Usuários:', posts);
});
getPostsById(1, (posts) => {
    console.log('Usuário por ID:', posts);
});
