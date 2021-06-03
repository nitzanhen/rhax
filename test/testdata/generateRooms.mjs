import fs from 'fs';

//@ts-check
/** 
 * @typedef {Object} Room
 * @property {string} id
 * @property {'occupied' | 'vacant' | 'faulty' | 'in_cleaning' | 'reserved'} status
 * @property {number} floor
 * @property {string} number
 * @property {number} numResidents
 * @property {number} numBeds
 */

const generateId = () => Math.round(Math.random() * (10 ** 18)).toString(36);

/** 
 * Generates a random integer between a and b, inclusive. 
 * @param {number} a lower bound
 * @param {number} b upper bound 
 */
const randomInt = (a, b) => Math.floor(Math.random() * (b - a) + a);

/** 
 * Returns one of the given options, choosing randomly. 
 * @template T
 * @param {T[]} options
 */
const randomOf = (...options) => {
  const randomIndex = randomInt(0, options.length - 1);
  return options[randomIndex];
};

const floors = [];
const numFloors = randomInt(8, 10);
for (let floorIndex = 0; floorIndex < numFloors; floorIndex++) {
  const numRooms = randomInt(15, 30);

  const rooms = [...Array(numRooms).keys()].map(
    /** @returns {Room} */
    i => {
      const numResidents = randomOf(0, 0, 1, 1, 2, 3, 4, 5);
      const status = numResidents > 0 ? 'occupied' : randomOf('vacant', 'vacant', 'vacant', 'faulty', 'in_cleaning', 'reserved');
      const numBeds = randomInt(2, 4);
      const floor = floorIndex + 1;
      const number = i + 1;
      return {
        id: generateId(),
        status: status,
        floor,
        number: `${floor}${number < 10 ? '0' : ''}${number}`,
        numResidents,
        numBeds,
      };
    });

  floors.push(rooms);
}

// Flatten array "to make it interesting" (or imitate real data coming, for exmaple, from a server).
const rooms = floors.flat(1);

fs.writeFileSync('./rooms.json', JSON.stringify(rooms, null, 2));
console.log('success!');