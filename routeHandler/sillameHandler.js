import cors from 'cors';
import express from 'express';
const router = express.Router();
import * as fs from 'fs';
const app = express();
app.use(cors());
app.use(express.json());

const result = JSON.parse(fs.readFileSync('./oneday_result_sillamae.json'));
const three_day = JSON.parse(fs.readFileSync('./3days_reult_sillamae.json'));
const five_days = JSON.parse(fs.readFileSync("./5days_sillamae.json"));
const oneDay2 = result.slice(0, 145);

// functionality for 10 min interval data
let j = 0;

setInterval(
    function updateCurrent(){
        // console.log(JSON)
    oneDay2.pop();
    oneDay2.unshift(result[j]);
    if(j === 143){
        j = 0;
    }
    else{
        j++
    }
}, 600000);


router.get('/data/oneDay', (req, res) => {
    
    res.send(oneDay2);
});


// One dat stats
router.get('/stats/24hrs', (req, res) => {
    
    let arr = [];

    let indexCount = 0;
    for(let i = 0; i < 24;){
        let singleAgg = {};

        let countV = 0;
        let countP = 0;
        let countD = 0;
        let countT = 0;
        for(let j = 0; j < 6; j++){
            const {t, v, p, d} = oneDay2[indexCount];
            countV = countV + v;
            countP = countP + p;
            countD = countD + d;
            countT = t;
        }
        singleAgg = {t:countT, v:countV/6, p:countP/6, d:countD/6}
        i++;
        if(indexCount > 144){
            indexCount = 0;
        }
        indexCount+=6;
        // console.log(indexCount)

        arr.push(singleAgg);
    }
    res.send(arr);
});

// 3days

router.get('/stats/3days', (req, res) => {
    res.send(three_day);
});


router.get('/stats/5days', (req, res) => {
    res.send(five_days);
});

router.get('/data/all', (req, res) => {
    
    res.send(result);
});

export default router;
