import React from "react"
import style from "./index.module.css"
import {useCard} from "../../hooks/useCard";
import EditableTitle from "../EditableTitle";

interface CardProps {
    id: string
}

export default function Card({id}: CardProps) {
    const {card, updateCard} = useCard(id)
    return <div className={style.card}>
        <EditableTitle title={card.title} onUpdateTitle={(title) => updateCard("title", title)} />
        <div className={style["card-footer"]}>
            {/*<div className={style["label-wrapper"]}><Label /></div>*/}
            {/*<div className={style["due-date"]}><DueDate /></div>*/}
        </div>
    </div>
}
