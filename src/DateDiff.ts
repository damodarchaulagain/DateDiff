interface IDate {
    day: number,
    month: number,
    year: number
}

export default class DateDiff {
    public static diff(startDateStr: string, endDateStr: string): number {
        let startDate: IDate = this.parseDateString(startDateStr);
        let endDate: IDate = this.parseDateString(endDateStr);

        return this.convertDateToDays(startDate,endDate);
    }

    public static parseDateString(date: string): IDate
    {
        let dateArr = date.split('/');

        return {
            day: parseInt(dateArr[0]),
            month: parseInt(dateArr[1]),
            year: parseInt(dateArr[2])
        };
    }

    public static convertDateToDays(dateObj1: IDate, dateObj2: IDate) : number 
    {
        if(dateObj1.year==dateObj2.year && dateObj1.month==dateObj2.month){
            return dateObj2.day-dateObj1.day-1;
        }
        else if(dateObj1.year==dateObj2.year){
            console.log(this.checkLeapYear(dateObj1.year))
            if (this.checkLeapYear(dateObj1.year) && (dateObj1.month<=2)){
                //including 1 extra day
                return this.getDaysByMonth(dateObj1.month,dateObj2.month)+dateObj2.day-dateObj1.day;
            }
            //excluding 1 extra day
            return this.getDaysByMonth(dateObj1.month,dateObj2.month)+dateObj2.day-dateObj1.day-1;
        }
        else{
            let totalDays: number; 
            let initialDays=dateObj1.day;
            let daysOfYear1: number;
            if(this.checkLeapYear(dateObj1.year)&& (dateObj1.month<=2)){
                daysOfYear1 =this.getDaysByMonth(dateObj1.month,12)-initialDays+1
            }
            else{
                daysOfYear1 =this.getDaysByMonth(dateObj1.month,12)-initialDays
            }
            
            let totalDaysofYearsInbetween = this.getDaysByYear(dateObj1.year+1,dateObj2.year)
            let totalLeapDays= this.getLeapDays(dateObj1.year,dateObj2.year);

            let remainingDays: number;
            if(this.checkLeapYear(dateObj2.year)&& (dateObj2.month>2)){
                remainingDays=this.getDaysByMonth(0,dateObj2.month)+dateObj2.day+1;
            }
            else{
                remainingDays=this.getDaysByMonth(0,dateObj2.month)+dateObj2.day;
            }
            

            totalDays=daysOfYear1+totalDaysofYearsInbetween+totalLeapDays+remainingDays-1;
            
            return totalDays;
        }
    }

    public static getDaysByMonth(month1: number, month2: number): number
    {
        let days=[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        let onlyRequiredDays = days.slice(month1,month2).reduce((initialValue,sum,index)=>initialValue+sum,0)
        return onlyRequiredDays
    }

    public static getLeapDays(year1:number, year2:number): number {
        
        let leapYearsCount1: number;
        leapYearsCount1 = Math.floor(year1 / 4)
        leapYearsCount1 -= Math.floor(year1 / 100)
        leapYearsCount1 += Math.floor(year1 / 400)

        let leapYearsCount2: number;
        leapYearsCount2 = Math.floor(year2 / 4)
        leapYearsCount2 -= Math.floor(year2 / 100)
        leapYearsCount2 += Math.floor(year2 / 400)

        let leapDays: number =leapYearsCount2-leapYearsCount1;


        return leapDays

    }

    public static getDaysByYear(year1:number,year2:number): number {
        let totalYears = year2-year1;
        let totalDaysinYears= totalYears*365;

        return totalDaysinYears;
    }

    public static checkLeapYear(year: number):boolean{
        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)
        
    }

    

    

}

// console.log(DateDiff.diff('01/01/2032', '01/03/2036'));

