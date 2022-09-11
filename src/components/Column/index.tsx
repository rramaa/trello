import Card, { DataTransferData, EmptyCard, NewCard } from "../Card";
import style from "./index.module.css";
import { useColumn } from "../../hooks/useColumn";
import EditableTitle from "../EditableTitle";
import React, { useState } from "react";
import { generateId } from "../../helpers/entityHelper";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";

interface ColumnProps {
  id: string;
}

interface NewColumnProps {
  onAdd: (id: string, name: string) => void;
}

const dropZoneIdentifier = "----";

export default function Column({ id }: ColumnProps) {
  const {
    column,
    updateColumn,
    addCard,
    rearrangeCards,
    insertCard,
    removeCard,
  } = useColumn(id);
  let [addingCard, onAddingCardUpdate] = useState(false);
  const cards = column.cards;
  const { updateDragData, dragData } = useDragAndDrop();
  const cardWrapper = React.useRef<HTMLDivElement>(null);
  const cardHeight = React.useRef<number>(0);
  const [dropPosition, updateDropPosition] = React.useState<null | number>(
    null
  );
  function onAddCard(id: string, title: string) {
    addCard(id, title);
    let currentHeight = cardWrapper.current?.scrollHeight ?? 0;
    setTimeout(() => {
      cardWrapper.current?.scroll({
        top: currentHeight + cardHeight.current,
      });
    });
  }

  React.useEffect(() => {
    if (dragData?.toColumn === id && dragData?.fromColumn === id) {
      rearrangeCards(dragData.cardId, dragData.position);
      console.log(
        `Rearrange the card in ${column.name} to position ${dragData.position}`
      );
    } else if (dragData?.toColumn === id) {
      insertCard(dragData.cardId, dragData.position);
      console.log(
        `Put the card into column ${column.name} at position ${dragData.position}`
      );
    } else if (dragData?.fromColumn === id) {
      removeCard(dragData.cardId);
      console.log(`Remove the card from column ${column.name}`);
    }
    updateDragData(null);
  }, [
    dragData,
    column,
    id,
    insertCard,
    rearrangeCards,
    removeCard,
    updateDragData,
  ]);

  React.useEffect(() => {
    if (cards.length) {
      cardHeight.current =
        (cardWrapper.current?.scrollHeight ?? 0) / cards.length;
    }
  }, [cards.length]);

  const onDragLeave: React.DragEventHandler<HTMLDivElement> = function () {
    updateDropPosition(null);
  };

  const onDragOver: React.DragEventHandler<HTMLDivElement> = function (event) {
    if (!cardHeight.current) {
      return;
    }
    event.preventDefault();
    let dropLocation = event.clientY;
    let position = parseInt(`${dropLocation / cardHeight.current}`);
    let remainder = dropLocation % cardHeight.current;
    if (remainder > cardHeight.current / 2) {
      position++;
    }
    updateDropPosition(position - 1);
  };
  const onDragDrop: React.DragEventHandler<HTMLDivElement> = function (event) {
    const dragData = JSON.parse(
      event.dataTransfer.getData("text")
    ) as DataTransferData;
    updateDragData({
      fromColumn: dragData.columnId,
      toColumn: id,
      cardId: dragData.cardId,
      position: dropPosition ?? 0,
    });
    updateDropPosition(null);
  };
  let modifiedCardsList = [...cards];
  const shouldRenderEmpty = modifiedCardsList.length === 0 && !addingCard;
  if (dropPosition !== null) {
    modifiedCardsList.splice(dropPosition, 0, dropZoneIdentifier);
  }
  return (
    <div className={style.column}>
      <EditableTitle
        title={column.name}
        onUpdateTitle={(title) => updateColumn("name", title)}
      />
      <div
        onDrop={onDragDrop}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        ref={cardWrapper}
        className={style["card-wrapper"]}
      >
        {shouldRenderEmpty && <EmptyCard />}
        {modifiedCardsList.map((cardId) => {
          if (cardId === dropZoneIdentifier) {
            return <hr key={cardId} />;
          }
          return <Card key={cardId} id={cardId} columnId={id} />;
        })}
      </div>
      <NewCard
        onAdd={onAddCard}
        addingCard={addingCard}
        onAddingCardUpdate={onAddingCardUpdate}
      />
    </div>
  );
}

export function NewColumn({ onAdd }: NewColumnProps) {
  let [adding, onAddingUpdate] = useState(false);
  function onColumnAdd(name: string) {
    onAdd(generateId(), name);
    onAddingUpdate(false);
  }
  function onCancel() {
    onAddingUpdate(false);
  }
  return (
    <div className={style.column}>
      {adding && (
        <EditableTitle
          defaultEditing
          title={""}
          onUpdateTitle={onColumnAdd}
          onCancel={onCancel}
        />
      )}
      {!adding && (
        <button
          onClick={() => onAddingUpdate(true)}
          className={style["add-column-btn"]}
        >
          +Add Column
        </button>
      )}
    </div>
  );
}
