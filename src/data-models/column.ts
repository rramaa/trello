export function createColumn(id: string, name: string, cards: string[]) {
  let column = {
    id,
    name,
    cards: cards || [],
  };

  return {
    getColumn() {
      return column;
    },
    updateName(name: string) {
      column = { ...column, name };
    },
    addCards(cards: string[]) {
      column.cards = [...column.cards, ...cards];
    },
    removeCard(cardId: string) {
      column.cards = column.cards.filter((v) => v !== cardId);
    },
  };
}
