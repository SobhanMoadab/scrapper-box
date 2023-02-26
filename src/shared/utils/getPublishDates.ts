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
  const randomDay = () => {
    return moment(
      start.valueOf() + Math.random() * (end.valueOf() - start.valueOf()),
    ).set('hour', randomHour());
  };

  const daysBetween2Dates = () => {
    const dateArray = [];
    while (start <= end) {
      dateArray.push(moment(start).format('YYYY-MM-DD'));
      start = moment(start).add(1, 'days');
    }
    return dateArray;
  };

  const count = 0;
  const set: Set<string> = new Set(daysBetween2Dates());
  // for (let i = 0; i < numberOfComments; i++) {
  //   const random = randomDay();
  //   set.add(random.format('YYYY/MM/DD - HH'));
  //   // if (count >= commentlimit) {
  //   //   let random: Moment;
  //   //   do {
  //   //     random = randomDay();
  //   //   } while (dates.includes(moment) === random.day());
  //   //   dates.push(random);
  //   //   count = 1
  //   // } else {
  //   //   count++;
  //   //   dates.push(firstRandom);
  //   // }
  // }
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
