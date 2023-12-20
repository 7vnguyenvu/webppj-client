export function timePassed(previous: string | Date | undefined) {
    const previousDate = previous ? new Date(previous) : new Date();
    const elapsed = new Date().getTime() - previousDate.getTime();

    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerWeek = msPerDay * 7;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const date = `${previousDate.getDate()}/${previousDate.getMonth() + 1}/${previousDate.getFullYear()}`;

    if (elapsed === 0) {
        return "Bây giờ";
    }
    if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + " giây trước";
    } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + " phút trước";
    } else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + " giờ trước";
    } else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerDay) + " ngày trước | " + date;
    } else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerWeek) + " tuần trước | " + date;
    } else if (elapsed < msPerYear) {
        return Math.round(elapsed / msPerMonth) + " tháng trước | " + date;
    } else {
        return Math.round(elapsed / msPerYear) + " năm trước | " + date;
    }
}
