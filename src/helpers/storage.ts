export function storeData(key: string, data: object) {
  window.localStorage.setItem(key, JSON.stringify(data));
  return true;
}

export function readData<T>(key: string, defaultData: T): T {
  try {
    return (
      JSON.parse(window.localStorage.getItem(key) || "null") || defaultData
    );
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`);
    console.error(e);
    return defaultData;
  }
}
