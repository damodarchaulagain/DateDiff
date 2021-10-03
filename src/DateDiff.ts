// creating date interface for type
interface IDate {
    day: number,
    month: number,
    year: number
}

// Defining class for calculating difference
export default class DateDiff {
    // definig static function to receive two dates in string formats and parsing to IDate interface
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
        // condition for same year and same month
        if(dateObj1.year==dateObj2.year && dateObj1.month==dateObj2.month){
            return dateObj2.day-dateObj1.day-1;
        }
        // condition for same year
        else if(dateObj1.year==dateObj2.year){
            console.log(this.checkLeapYear(dateObj1.year))
            if (this.checkLeapYear(dateObj1.year) && (dateObj1.month<=2)){
                //including 1 extra day for leap year
                return this.getDaysByMonth(dateObj1.month,dateObj2.month)+dateObj2.day-dateObj1.day;
            }
            //excluding 1 extra day
            return this.getDaysByMonth(dateObj1.month,dateObj2.month)+dateObj2.day-dateObj1.day-1;
        }
        // condition for different day,month and year
        else{
            let totalDays: number; 
            // days from first date from the starting month
            let initialDays=dateObj1.day;
            // days from rest of the month of year 1
            let daysOfYear1: number;

            // checking leap year and if february is included
            if(this.checkLeapYear(dateObj1.year)&& (dateObj1.month<=2)){
                daysOfYear1 =this.getDaysByMonth(dateObj1.month,12)-initialDays+1
            }
            // condition for not including leap day from february
            else{
                daysOfYear1 =this.getDaysByMonth(dateObj1.month,12)-initialDays
            }
            // total days in between two years not including the days from year 2
            let totalDaysofYearsInbetween = this.getDaysByYear(dateObj1.year+1,dateObj2.year)
            // calculating total leap days
            let totalLeapDays= this.getLeapDays(dateObj1.year,dateObj2.year);
            // calculating remaining days from the year 2
            let remainingDays: number;
            if(this.checkLeapYear(dateObj2.year)&& (dateObj2.month>2)){
                remainingDays=this.getDaysByMonth(0,dateObj2.month)+dateObj2.day+1;
            }
            else{
                remainingDays=this.getDaysByMonth(0,dateObj2.month)+dateObj2.day;
            }
            
            // calculating total days
            totalDays=daysOfYear1+totalDaysofYearsInbetween+totalLeapDays+remainingDays-1;
            
            return totalDays;
        }
    }

    // function to calculate noramal days inbetween  month to end of the year
    public static getDaysByMonth(month1: number, month2: number): number
    {
        let days=[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        let onlyRequiredDays = days.slice(month1,month2).reduce((initialValue,sum,index)=>initialValue+sum,0)
        return onlyRequiredDays
    }
    // function to calculate leap year and leap days
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
    // getting days between years 
    public static getDaysByYear(year1:number,year2:number): number {
        let totalYears = year2-year1;
        let totalDaysinYears= totalYears*365;

        return totalDaysinYears;
    }
    // checking if a given year is a leap year 
    public static checkLeapYear(year: number):boolean{
        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)
        
    }

    

    

}

// console.log(DateDiff.diff('01/01/2032', '01/03/2036'));

