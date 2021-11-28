import namor from "namor";

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newUser = () => {
  return {
    firstName: namor.generate({ words: 1, numbers: 0 }),
    lastName: namor.generate({ words: 1, numbers: 0 }),
    userName: namor.generate({ words: 1, numbers: 0 }),
    email: namor.generate({ words: 1, numbers: 0 }),
    phone: namor.generate({ words: 1, numbers: 0 }),
    role: namor.generate({ words: 1, numbers: 0 }),
    id: namor.generate({ words: 1, numbers: 0 }),
  };
};

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...newUser(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
