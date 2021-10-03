import DateDiff from '../src/DateDiff';
var moment = require('moment');

describe('test difference between two dates', function() {
    it('diff', function() {
        let testDataSet = [
            {
                startDate: '02/06/1983',
                endDate: '22/06/1983'
            },
            {
                startDate: '04/07/1984',
                endDate: '25/12/1984'
            },
            {
                startDate: '03/01/1989',
                endDate: '03/08/1983'
            }
        ];

        testDataSet.forEach((data, index) => {
            let result = DateDiff.diff(data.startDate, data.endDate);
            console.log(`result is ${result}`);
            const myMomentObject1 = moment(data.startDate, 'DD-MM-YYYY');
            const myMomentObject2 = moment(data.endDate, 'DD-MM-YYYY');
            let momentResult= myMomentObject2.diff(myMomentObject1,'days')
            console.log(`moment result is ${momentResult}`);
            expect(result).toBe(momentResult-1)
        })
  });
});