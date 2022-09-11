import React, { useContext } from "react";
import { BoardData, Context } from "../components/DataProvider";
import { Board, createBoard, updatableKeys } from "../data-models/board";
import { DATA_KEY } from "../constants";
import {storeData} from "../helpers/storage";

function _findBoard(data: BoardData, id: string) {
    let board = data.BOARDS.find((v) => v.id === id);
    if (!board) {
        throw new Error(`Board not found with id ${id}`);
    }
    return board;
}

export function useBoard(id: string) {
    const data = useContext(Context);
    let { current: _board } = React.useRef<Board>(_findBoard(data, id));
    let [board, updateBoardState] = React.useState(createBoard(_board.id, _board));
    return {
        board,
        updateBoard<T extends updatableKeys>(key: T, value: Board[T]) {
            _board[key] = value;
            storeData(DATA_KEY, data);
            updateBoardState({
                ...board,
                [key]: value,
            });
        },
    };
}
