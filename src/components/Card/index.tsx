import React, { useState } from "react";
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
}

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

export function NewCard({ onAdd }: AddCardProps) {
  let [adding, onAddingUpdate] = useState(false);
  function onCardAdd(title: string) {
    onAdd(generateId(), title);
    onAddingUpdate(false);
  }
  function onCancel() {
    onAddingUpdate(false);
  }
  if (adding) {
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
    <button onClick={() => onAddingUpdate(true)} className={style["add-card"]}>
      +Add Card
    </button>
  );
}
