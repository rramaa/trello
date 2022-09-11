import Card from "../Card"
import style from "./index.module.css"
import {useColumn} from "../../hooks/useColumn";
import EditableTitle from "../EditableTitle";

interface ColumnProps {
    id: string
}

export default function Column({id}: ColumnProps) {
    const {column, updateColumn} = useColumn(id)
    return <div className={style.column}>
        <EditableTitle title={column.name} onUpdateTitle={(title) => updateColumn("name", title)} />
        <div className={style["card-wrapper"]}>
        {
            column.cards.map((id) => <Card key={id} id={id} />)
        }
        </div>
        <button className={style["add-card"]}>+ Card</button>
    </div>
}
