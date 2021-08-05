import { take } from 'Rhax';
import { rooms } from 'test-data';

//This test suite tests composed transformations, as opposed to a single function or method.

describe('composition', () => {
  test('Rooms by status (percentages)', () => {
    const roomByStatusPercentage = take(rooms)
      .groupBy(room => room.status)
      .map(status => (status.length / rooms.length) * 100)
      .map(p => `${p.toFixed(1)}%`)
      ();

    expect(roomByStatusPercentage).toEqual({
      occupied: '66.2%',
      in_cleaning: '11.3%',
      faulty: '12.3%',
      vacant: '10.3%'
    });
  });

  test('Room count by floor', () => {
    const roomCountByFloor = take(rooms)
      .groupBy(room => room.floor)
      .map(levels => levels.length)
      ();

    expect(roomCountByFloor).toEqual({
      '1': 23,
      '2': 25,
      '3': 23,
      '4': 20,
      '5': 19,
      '6': 22,
      '7': 23,
      '8': 24,
      '9': 16
    });
  });

  test.skip('Calculating profit', () => {
    /** @todo map */
    // const profit =
    //   take(rooms as Room[])
    //     .groupBy(room => room.status)
    //     .pick(['occupied', 'vacant'])
    //     .map((v) => ({
    //       ...groupBy(({ numBeds, numResidents }) => numResidents >= numBeds ? 'full' : 'semiFull', occupied),
    //       vacant
    //     }))
    //     .map(({ full, semiFull, vacant }) => ({
    //       full,
    //       potential: [...semiFull, ...vacant],
    //     }))
    //     .map(({ full, potential }) => ({
    //       fullRoomResidents: full.length,
    //       /** @todo replace reduce with sum */
    //       semiFullRoomsResidents: reduce(
    //         (sum, { numResidents }) => sum + numResidents,
    //         0,
    //         potential),
    //       freeBeds: reduce(
    //         (sum, { numResidents, numBeds }) => sum + (numBeds - numResidents),
    //         0,
    //         potential
    //       ),
    //     }))
    //     .map(({ fullRoomResidents, semiFullRoomsResidents, freeBeds }) => ({ totalResidents: fullRoomResidents + semiFullRoomsResidents, freeBeds }))
    //     ();

    // // const PRICE_PER_RESIDENT = 10;
    // // console.log(`Tonight, the hostel is making $${profit.totalResidents * PRICE_PER_RESIDENT}!\n` +
    // //   `${profit.freeBeds} beds are still empty, their potential revenue is $${profit.freeBeds * PRICE_PER_RESIDENT}.`);

    // expect(profit).toEqual({
    //   totalResidents: 139,
    //   freeBeds: 148
    // });
  });
});