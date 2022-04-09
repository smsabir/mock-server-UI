import cors from 'cors';
import express from 'express';
import * as fs from 'fs';
const router = express.Router();
const app = express();
app.use(cors());
app.use(express.json());

const result = JSON.parse(fs.readFileSync('./oneday_result_pirita.json'));
const three_day = JSON.parse(fs.readFileSync('./3day_result_pirita.json'));
const five_days = JSON.parse(fs.readFileSync("./5days_pirita.json"));
const oneDay = result.slice(0, 145);

// functionality for 10 min interval data
let i = 0;

setInterval(
    function updateCurrent(){
        console.log(i)
    oneDay.pop();
    oneDay.unshift(result[i]);
    if(i === 143){
        i = 0;
    }
    else{
        i++
    }
}, 600000);


router.get('/data/oneday', (req, res) => {
    
    res.send(oneDay);
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
            const {t, v, p, d} = oneDay[indexCount];
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

router.get('/', (req, res) => {
    res.status(200).send({
        status: "OK",
        message: `🚀 Server is Running!`,
    });
});

export default router;
