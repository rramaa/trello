import React, {PropsWithChildren} from "react";
import {Board} from "../../data-models/board";
import {Column} from "../../data-models/column";
import {Card} from "../../data-models/card";

export interface BoardData {
    BOARDS: Board[],
    COLUMNS: Column[],
    CARDS: Card[]
}

export const defaultData = {BOARDS: [], COLUMNS: [], CARDS: []}

interface DataProvider extends React.FC<PropsWithChildren<{data: BoardData}>> {}

export const Context = React.createContext<BoardData>(defaultData)

const DataProvider: DataProvider = ({children, data}) => {
    return <Context.Provider value={data}>{children}</Context.Provider>
}

export default DataProvider
