import React, { useContext } from "react";
import { BoardData, Context } from "../components/DataProvider";
import { Card, createCard, updatableKeys } from "../data-models/card";
import { storeData } from "../helpers/storage";
import { DATA_KEY } from "../constants";

function _findCard(data: BoardData, id: string) {
  let card = data.CARDS.find((v) => v.id === id);
  if (!card) {
    throw new Error(`Card not found with id ${id}`);
  }
  return card;
}

export function useCard(id: string) {
  const data = useContext(Context);
  let { current: _card } = React.useRef<Card>(_findCard(data, id));
  let [card, updateCardState] = React.useState(createCard(_card.id, _card));
  return {
    card,
    updateCard<T extends updatableKeys>(key: T, value: Card[T]) {
      _card[key] = value;
      storeData(DATA_KEY, data);
      updateCardState({
        ...card,
        [key]: value,
      });
    },
  };
}
