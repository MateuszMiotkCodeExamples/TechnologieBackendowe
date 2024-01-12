const fortunes = [
    "Przysłowie 1",
    "Przysłowie 2",
    "Przysłowie 3",
    "Przysłowie 4",
    "Przysłowie 5"
];

exports.getFortune = () => {
    const idx = Math.floor(Math.random() * fortunes.length);
    return fortunes[idx];
};
