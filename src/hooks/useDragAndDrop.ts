import React from "react";
import { DragContext, DragData } from "../components/DragProvider";

export function useDragAndDrop() {
  const { dragData, updateDragData } = React.useContext(DragContext);

  function _updateDragData(data: DragData) {
    updateDragData(data);
  }

  return {
    updateDragData: _updateDragData,
    dragData,
  };
}
