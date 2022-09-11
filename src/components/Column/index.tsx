import Card, {NewCard} from "../Card"
import style from "./index.module.css"
import {useColumn} from "../../hooks/useColumn";
import EditableTitle from "../EditableTitle";
import React, {useState} from "react";
import {generateId} from "../../helpers/entityHelper";

interface ColumnProps {
    id: string
}

interface NewColumnProps {
    onAdd: (id: string, name: string) => void
}

const CARD_HEIGHT = 800

export default function Column({id}: ColumnProps) {
    const {column, updateColumn, addCard} = useColumn(id)
    const cardWrapper = React.useRef<HTMLDivElement>(null)
    function onAddCard(id:string, title: string) {
        addCard(id, title)
        let currentHeight = column.cards.length * CARD_HEIGHT
        setTimeout(() => {
            cardWrapper.current?.scroll({
                top: currentHeight + CARD_HEIGHT,
            })
        })
    }
    return <div className={style.column}>
        <EditableTitle title={column.name} onUpdateTitle={(title) => updateColumn("name", title)} />
        <div ref={cardWrapper} className={style["card-wrapper"]}>
        {
            column.cards.map((id) => <Card key={id} id={id} />)
        }
        </div>
        <NewCard onAdd={onAddCard} />
    </div>
}

export function NewColumn({onAdd}: NewColumnProps) {
    let [adding, onAddingUpdate] = useState(false)
    function onColumnAdd(name: string) {
        onAdd(generateId(), name)
        onAddingUpdate(false)
    }
    function onCancel() {
        onAddingUpdate(false)
    }
    return (
        <div className={style.column}>
            {adding && <EditableTitle defaultEditing title={""} onUpdateTitle={onColumnAdd} onCancel={onCancel} />}
            {!adding && <button onClick={() => onAddingUpdate(true)} className={style["add-column-btn"]}>+Add Column</button>}
        </div>
    )
}
