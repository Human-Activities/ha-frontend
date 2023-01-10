export class DateUtils {
    public static clearTime(date: Date) {
        if (date == null) return null;
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        return date;
    }
}