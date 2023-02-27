// import * as moment from 'moment';
import * as moment from 'moment-timezone';

export function getPublishDates(
  numberOfComments: number,
  publishTime: string,
  commentlimit: number,
  start = moment.tz('Asia/Tehran').set('hour', 4),
  // end: Date,
): Array<string> {
  const startHour = 15;
  const endHour = 21;
  const endDayNumber = Math.round(numberOfComments / commentlimit);
  const end = moment(start).tz('Asia/Tehran').add(endDayNumber, 'days');
  const randomHour = () => {
    return (startHour + Math.random() * (endHour - startHour)) | 0;
  };
  const randomMinutes = () => {
    return Math.floor(Math.random() * 100 + 1);
  };
  const daysBetween2Dates = () => {
    const dateArray = [];
    while (start <= end) {
      dateArray.push(moment(start).format('YYYY-MM-DD'));
      start = moment(start).add(1, 'days');
    }
    return dateArray;
  };

  const set: Set<string> = new Set(daysBetween2Dates());
  const dates = [...set]
    .flatMap((i) => [i, i, i])
    .map((d) => {
      return moment(d)
        .set('hour', randomHour())
        .set('minute', randomMinutes())
        .toISOString();
    });
  return dates;
}
