import React, {PropsWithChildren} from "react";
import {Board, createBoard} from "../../data-models/board";
import {Column} from "../../data-models/column";
import {Card} from "../../data-models/card";
import {generateId} from "../../helpers/entityHelper";
import {storeData} from "../../helpers/storage";
import {DATA_KEY, SELECTED_BOARD_ID_KEY} from "../../constants";

export interface BoardData {
    BOARDS: Board[],
    COLUMNS: Column[],
    CARDS: Card[]
}

export const defaultData = {BOARDS: [], COLUMNS: [], CARDS: []}

interface DataProvider extends React.FC<PropsWithChildren<{data: BoardData}>> {}

export const Context = React.createContext<BoardData>(defaultData)

const DataProvider: DataProvider = ({children, data}) => {
    if(data.BOARDS.length === 0) {
        console.log("Initializing Application")
        let board = createBoard(generateId(), {name: "Default Board"})
        data.BOARDS.push(board)
        const selectedBoardId = {
            id: board.id
        }
        storeData(DATA_KEY, data)
        storeData(SELECTED_BOARD_ID_KEY, selectedBoardId)
    }
    return <Context.Provider value={data}>{children}</Context.Provider>
}

export default DataProvider
