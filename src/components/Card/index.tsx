import React from "react";
import style from "./index.module.css";
import { useCard } from "../../hooks/useCard";
import EditableTitle from "../EditableTitle";
import { generateId } from "../../helpers/entityHelper";

interface CardProps {
  id: string;
  columnId: string;
}

interface AddCardProps {
  onAdd: (id: string, title: string) => void;
  addingCard: boolean;
  onAddingCardUpdate: (adding: boolean) => void;
}

export type DataTransferData = {
  cardId: string;
  columnId: string;
};

export default function Card({ id, columnId }: CardProps) {
  const { card, updateCard } = useCard(id);
  const onDragStart: React.DragEventHandler<HTMLDivElement> = function (event) {
    event.dataTransfer.setData(
      "text",
      JSON.stringify({ cardId: id, columnId })
    );
  };
  return (
    <div draggable onDragStart={onDragStart} className={style.card}>
      <EditableTitle
        title={card.title}
        onUpdateTitle={(title) => updateCard("title", title)}
      />
      <div className={style["card-footer"]}>
        {/*<div className={style["label-wrapper"]}><Label /></div>*/}
        {/*<div className={style["due-date"]}><DueDate /></div>*/}
      </div>
    </div>
  );
}

export function NewCard({
  onAdd,
  addingCard,
  onAddingCardUpdate,
}: AddCardProps) {
  function onCardAdd(title: string) {
    onAdd(generateId(), title);
    onAddingCardUpdate(false);
  }
  function onCancel() {
    onAddingCardUpdate(false);
  }
  if (addingCard) {
    return (
      <div className={style.card}>
        <EditableTitle
          defaultEditing
          title={""}
          onUpdateTitle={onCardAdd}
          onCancel={onCancel}
        />
      </div>
    );
  }
  return (
    <button
      onClick={() => onAddingCardUpdate(true)}
      className={style["add-card"]}
    >
      +Add Card
    </button>
  );
}

export function EmptyCard() {
  return <div className={style["empty-card"]} />;
}
