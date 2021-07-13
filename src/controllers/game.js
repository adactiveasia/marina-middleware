// const fs = require('fs');
// const path = require('path');
// // const roundround = require('roundround');
// // const { Selector } = require('@alirezazeynali/round-robin')

// const { validationResult } = require('express-validator');

// const rule1 = Array(25).fill('1,1,1')
// const rule2 = Array(10).fill('2,2,2')
// const rule3 = Array(30).fill('3,3,3')
// const rule4 = Array(35).fill('4,4,4')
// let rules = [...rule1, ...rule2, ...rule3, ...rule4];
// let index;

// const getRoundRobinIndex = () => {
//     index = rules.map((x, i) => (i + 1))
//     let random = Math.floor(Math.random() * index.length -1);
//     if (index.length === 1) {
//         rules = [...rule1, ...rule2, ...rule3, ...rule4];
//     } else {
//         rules.splice(random, 1);
//     }
//     if (random < 0){
//         random = 0;
//     }
//     return random;
// }

// exports.getResult = async (req, res, next) => {
//     const gameIndex = getRoundRobinIndex();
    
//     const gameResult = rules[gameIndex]
//     try {
//         return res.status(200).json({
//             message: 'game result',
//             index: gameIndex,
//             indexLength: index.length,
//             result: gameResult,
            

//         })
//     } catch (err) {
//         if (!err.statusCode) {
//             err.statusCode = 500;
//         }
//         next(err);
//     };
// };
