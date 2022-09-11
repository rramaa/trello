import React, { useContext } from "react";
import { BoardData, Context } from "../components/DataProvider";
import { Column, createColumn, updatableKeys } from "../data-models/column";
import { createCard } from "../data-models/card";
import { storeData } from "../helpers/storage";
import { DATA_KEY } from "../constants";

function _findColumn(data: BoardData, id: string) {
  let column = data.COLUMNS.find((v) => v.id === id);
  if (!column) {
    throw new Error(`Column not found with id ${id}`);
  }
  return column;
}

export function useColumn(id: string) {
  const data = useContext(Context);
  let { current: _column } = React.useRef<Column>(_findColumn(data, id));
  let [column, updateColumnState] = React.useState(
    createColumn(_column.id, _column)
  );
  function updateColumn<T extends updatableKeys>(key: T, value: Column[T]) {
    _column[key] = value;
    storeData(DATA_KEY, data);
    updateColumnState({
      ...column,
      [key]: value,
    });
  }
  return {
    column,
    updateColumn,
    addCard(id: string, title: string) {
      let card = createCard(id, { title });
      data.CARDS.push(card);
      updateColumn("cards", [..._column.cards, card.id]);
    },
  };
}
