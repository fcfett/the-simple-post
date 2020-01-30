import ls from 'local-storage';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const getMonth = (month) => months[month - 1];

const rgxISODate = /(\d{4}).(\d{2}).(\d{2})T(\d{2}).(\d{2}).*/;

export const getDate = (date) => {
  const isoDate = new Date(date).toISOString();
  const [, year, month, day] = isoDate.match(rgxISODate);
  return `${getMonth(+month)} ${day}, ${year}`;
};

const compare = (a, b) => {
  return a > b ? 1 : a < b ? -1 : 0;
};

export const getNestedValue = (obj, path) => path.reduce((obj, key) => (obj && obj[key] ? obj[key] : undefined), obj);

export const sortObjectsArrayByKey = (array, keyPath, orderDesc = false) => {
  const sortedArray = array.sort((a, b) => compare(getNestedValue(a, [...keyPath]), getNestedValue(b, [...keyPath])));
  return orderDesc ? sortedArray.reverse() : sortedArray;
};

export const deepCopy = (object) => JSON.parse(JSON.stringify(object));

export const areEqualObjects = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);

export const getStorageObject = (lsId) => {
  const lsItem = ls.get(lsId);
  return lsItem ? lsItem : null;
};

export const setStorageObject = (lsId, obj = {}) => {
  const lsObject = getStorageObject(lsId);
  const newObj = lsObject ? lsObject : {};

  for (const [key, value] of Object.entries(obj)) {
    newObj[key] = value;
  }

  ls.set(lsId, newObj);

  return newObj;
};

export default {
  getMonth,
  getDate,
  deepCopy,
  getNestedValue,
  sortObjectsArrayByKey,
  areEqualObjects,
  getStorageObject,
  setStorageObject,
};
