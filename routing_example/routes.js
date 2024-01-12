// routes.js

module.exports = [
    {
        method: 'get',
        path: '/',
        handler: (req, res) => {
            res.send('Strona główna');
        }
    },
    {
        method: 'get',
        path: '/about',
        handler: (req, res) => {
            res.send('O nas');
        }
    },
    {
        method: 'get',
        path: '/users/:userId',
        handler: (req, res) => {
            res.send(`Profil użytkownika o ID: ${req.params.userId}`);
        }
    },
    {
        method: 'post',
        path: '/users',
        handler: (req, res) => {
            res.send('Utworzono nowego użytkownika');
        }
    },
    // Możesz dodać więcej tras tutaj
];
