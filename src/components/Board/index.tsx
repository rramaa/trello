import Column, {NewColumn} from "../Column";
import style from "./index.module.css"
import {readData} from "../../helpers/storage";
import {SELECTED_BOARD_ID_KEY} from "../../constants";
import {useBoard} from "../../hooks/useBoard";

export default function Board() {
    const selectedBoardId = readData<{id: string}>(SELECTED_BOARD_ID_KEY, {id: ""})
    const {board, addColumn} = useBoard(selectedBoardId.id)

    return <div className={style.board}>
        {
            board.columns.map(v => <Column key={v} id={v}/>)
        }
        <NewColumn onAdd={(id, name) => addColumn(id, name)} />
    </div>
}
