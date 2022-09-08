import Column from "../Column";
import style from "./index.module.css"

export default function Board() {
    const columns = [20, 4, 9, 1]
    return <div className={style.board}>
        {
            columns.map(v => <Column num={v} />)
        }
    </div>
}
