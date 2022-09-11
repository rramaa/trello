import React from "react";
import Header from "../Header";
import Board from "../Board";
import style from "./index.module.css";
import DataProvider, { BoardData, defaultData } from "../DataProvider";
import { readData } from "../../helpers/storage";
import { DATA_KEY } from "../../constants";
import DragProvider from "../DragProvider";

function App() {
  return (
    <DataProvider
      data={readData<BoardData>(DATA_KEY, defaultData as unknown as BoardData)}
    >
      <DragProvider>
        <div className={style.wrapper}>
          <Header />
          <Board />
        </div>
      </DragProvider>
    </DataProvider>
  );
}

export default App;
