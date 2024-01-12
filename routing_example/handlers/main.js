const fortune = require('../lib/fortune');

exports.home = (req, res) => {
    res.send('home from handlers/main.js');
};

exports.about = (req, res) => {
    const fortuneMessage = fortune.getFortune();
    res.send(fortuneMessage);
};