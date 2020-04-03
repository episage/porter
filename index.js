const readline = require('readline');
const fs = require('fs');
const path = require('path');

const allocatedPortsDir = path.join(__dirname, `allocated`);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log(`Allocate a new, unused before port for localhost dev`)
console.log(`====================================================`)
rl.question('What is the purpose of a new port? ', (answer) => {
    const lastFileName = getAllFiles().filter(f => typeof f === 'string').map(f => parseInt(f)).filter(Boolean).sort((a, b) => b - a)[0] || 20000;
    const lastPort = parseInt(lastFileName);
    const newPort = lastPort + 1;

    const allocation = {
        port: newPort,
        purpose: answer,
        dateTime: new Date().toISOString(),
    }
    fs.writeFileSync(path.join(allocatedPortsDir, `${newPort}.json`), JSON.stringify(allocation, null, 2))

    console.log(`Thank you.`);
    console.log(`Port number ${newPort} has been allocated for you.`);
    rl.close();
});

function getAllFiles() {
    return fs.readdirSync(allocatedPortsDir);
}