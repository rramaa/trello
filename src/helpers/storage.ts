export function storeData(key: string, data: object) {
  window.localStorage.setItem(key, JSON.stringify(data));
  return true;
}

export function readData<T>(key: string, defaultData: T) {
  try {
    return JSON.parse(key) || defaultData;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`);
    return defaultData;
  }
}
