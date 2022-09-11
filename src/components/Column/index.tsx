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

const dropZoneIdentifier = "----"

export default function Column({id}: ColumnProps) {
    const {column, updateColumn, addCard} = useColumn(id)
    const cards = column.cards
    const cardWrapper = React.useRef<HTMLDivElement>(null)
    const cardHeight = React.useRef<number>(0)
    const [dropPosition, updateDropPosition] = React.useState<null | number>(null)
    function onAddCard(id:string, title: string) {
        addCard(id, title)
        let currentHeight = cardWrapper.current?.scrollHeight ?? 0
        setTimeout(() => {
            cardWrapper.current?.scroll({
                top: currentHeight + cardHeight.current,
            })
        })
    }

    React.useEffect(() => {
        if(cards.length) {
            cardHeight.current = (cardWrapper.current?.scrollHeight ?? 0) / cards.length
        }
    }, [cards.length])

    const onDragLeave: React.DragEventHandler<HTMLDivElement> = function () {
        updateDropPosition(null)
    }

    const onDragOver: React.DragEventHandler<HTMLDivElement> = function (event) {
        if(!cardHeight.current) {
            return;
        }
        event.preventDefault()
        let dropLocation = event.clientY
        let position = parseInt(`${dropLocation / cardHeight.current}`)
        let remainder = dropLocation % cardHeight.current
        if(remainder > cardHeight.current / 2) {
            position++
        }
        updateDropPosition(position - 1)
    }
    const onDragDrop: React.DragEventHandler<HTMLDivElement> = function (event) {
        const dragData = JSON.parse(event.dataTransfer.getData("text"))
        console.log(dragData, dropPosition)
    }
    let modifiedCardsList = [...cards]
    if(dropPosition !== null) {
        modifiedCardsList.splice(dropPosition, 0, dropZoneIdentifier)
    }
    return <div className={style.column}>
        <EditableTitle title={column.name} onUpdateTitle={(title) => updateColumn("name", title)} />
        <div onDrop={onDragDrop} onDragLeave={onDragLeave} onDragOver={onDragOver} ref={cardWrapper} className={style["card-wrapper"]}>
        {
            modifiedCardsList.map((cardId) => {
                if(cardId === dropZoneIdentifier) {
                    return <hr />
                }
                return <Card key={cardId} id={cardId} columnId={id}/>
            })
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
