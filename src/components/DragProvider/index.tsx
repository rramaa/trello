import React, { PropsWithChildren } from "react";

export type DragData = {
  cardId: string;
  position: number;
  fromColumn: string;
  toColumn: string;
} | null;

export const DragContext = React.createContext<{
  dragData: DragData;
  updateDragData: (data: DragData) => void;
}>({
  dragData: null,
  updateDragData: () => {},
});

type IDragProvider = React.FC<PropsWithChildren<{}>>;

const DragProvider: IDragProvider = function ({ children }) {
  let [dragData, updateDragData] = React.useState<DragData>(null);
  function _updateDragData(data: DragData) {
    updateDragData(data);
  }
  return (
    <DragContext.Provider value={{ dragData, updateDragData: _updateDragData }}>
      {children}
    </DragContext.Provider>
  );
};

export default DragProvider;
