
export type Column = {
  id: string,
  name: string,
  cards: string[]
}

export type updatableKeys = keyof Omit<Column, "id">;

export function createColumn(id: string, {name, cards}: {name: string, cards: string[]}) {
  return {
    id,
    name,
    cards: cards || [],
  }
}
