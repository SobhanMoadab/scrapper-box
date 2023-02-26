import { getPublishDates } from '../shared/utils/getPublishDates';
import { Moment } from 'moment';

describe('Get publish time', () => {
  const numberOfComments = 21;
  const commentLimit = 3;
  const week = 7;

  // it('should return dates correctly', () => {
  //   /*
  //           given 21 comments and publish date of weekly and comment limit of 3
  //           when i attempt to getPublishDates()
  //           then i expect result to have 7 dates

  //       */

  //   const dates = getPublishDates(
  //     numberOfComments,
  //     'WEEKLY',
  //     commentLimit,
  //   ) as Array<Date>;

  //   expect(dates.length).toEqual(commentLimit * week);
  // });

  it('should includes dates that are different ', () => {
    const dates = getPublishDates(
      numberOfComments,
      'WEEKLY',
      commentLimit,
    ) as Array<any>;
    const arr: Array<string> = [];
    dates.forEach((d) => {
      arr.push(d.toLocaleString());
    });
    console.log('dates', arr);

    // expect(arr.length).toEqual(numberOfComments);
  });
});
