const fs = require('fs').promises;

const path = require('path');

const pathTalker = path.resolve(__dirname, '../talker.json');

async function readTalkers() {
    try {
    const data = await fs.readFile(pathTalker, 'utf-8');
    const teste = JSON.parse(data);
    if (!teste) {
        return [];
    }
    return teste;
    } catch (error) {
    console.error(`Erro na leitura do arquivo: ${error}`);
    } 
}

async function writeNewTalkers(newTalker) {
    try {
        const existingTalkers = await readTalkers();
        const newTalkerWithId = { id: existingTalkers.length + 1, ...newTalker };
        const writeTalker = JSON.stringify([...existingTalkers, newTalkerWithId]);

        await fs.writeFile(pathTalker, writeTalker);
        return newTalkerWithId;
    } catch (error) {
    console.error(`Erro na escrita do arquivo: ${error}`);
    } 
}

async function upDateTalker(edit, id) {
    try {
        const existingTalkers = await readTalkers();
        const newTableTalkers = existingTalkers.filter((i) => i.id !== id);

        const editTalkerWithId = { id, ...edit };
        const teste = JSON.stringify([...newTableTalkers, editTalkerWithId]);
        await fs.writeFile((pathTalker), teste);
        console.log('olá');
        return editTalkerWithId;
    } catch (error) {
        console.error(`Erro na escrita do arquivo: ${error}`);
    }
}
async function deleteTalker(id) {
    try {
        const existingTalkers = await readTalkers();
        const newTableTalkers = existingTalkers.filter((i) => i.id !== id);
        await fs.writeFile(pathTalker, JSON.stringify(newTableTalkers));
    } catch (error) {
        console.error(`Erro na escrita do arquivo: ${error}`);
    }
}

module.exports = {
    readTalkers,
    writeNewTalkers,
    upDateTalker,
    deleteTalker,
};