import Card from "../Card"
import style from "./index.module.css"

interface ColumnProps {
    num: number
}

export default function Column({num}: ColumnProps) {
    let cards = Array(num).fill(null)
    return <div className={style.column}>
        <div className={style["column-name"]}>Column Name</div>
        <div className={style["card-wrapper"]}>
        {
            cards.map((_, k) => <Card />)
        }
        </div>
        <button className={style["add-card"]}>+ Card</button>
    </div>
}
