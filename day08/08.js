// import base
const fs = require('fs');

const testing = process.argv[2] == 'test';
const file = testing ? 'test-input.txt' : 'input.txt';

const grid = fs.readFileSync(file, 'utf8');

// problema
// TODO: di fatto cicli tipo 1000 volte, metti in bella per fare bella figura
let forest = grid.split('\n').map(i => i.split(''));

let first_output = forest[0].length * 2 + forest.length * 2 - 4;
let second_output = 0;

function vert(x, y, up) {
    const slice = up ? [0, y] : [y + 1];
    if (up) {
        return forest.slice(...slice).map(i => i[x]).reverse()
    }
    return forest.slice(...slice).map(i => i[x])
}
function hor(x, y, right) {
    const slice = right ? [x + 1] : [0, x];
    if (!right) {
        return forest[y].slice(...slice).reverse();
    }
    return forest[y].slice(...slice);
}

function getVisibleTrees(tree, trees) {
    let blocking_tree = trees.findIndex(k => k >= tree);
    return (blocking_tree == -1) ? trees.length : blocking_tree + 1;
}

for (let i = y = 1; y < forest.length - 1; y++) {
    for (let x = 1; x < forest[i].length - 1; x++) {
        const c_tree = forest[y][x];
        const surrounding_trees = [
            hor(x, y, 0), // sinistra
            hor(x, y, 1), // destra
            vert(x, y, 1), // sopra
            vert(x, y, 0), // sotto
        ];
        const has_sight = surrounding_trees.reduce((acc, trees)=>{
            return c_tree > Math.max(...trees) || acc;
        },false);

        const scenic_score = surrounding_trees.reduce((score, trees)=>{
            return score * getVisibleTrees(c_tree, trees);
        },1);

        first_output+=has_sight;

        if (scenic_score > second_output) {
            second_output = scenic_score;
        }
    }
}
if (testing) {
   console.assert(first_output == 21, `come primo output mi aspetterei 21, e invece ${first_output} (non so come mai)`);
   console.assert(second_output == 8, `come primo output mi aspetterei 8, e invece ${second_output}`);
}

console.log('output primo problema',first_output);
console.log('output secondo problema', second_output);