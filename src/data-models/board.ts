export type Board = {
  id: string;
  name: string;
  columns: string[];
};

export type updatableKeys = keyof Omit<Board, "id">;

export function createBoard(
  id: string,
  { name, columns }: { name: string; columns?: string[] }
) {
  let board: Board = {
    id,
    name,
    columns: columns || [],
  };

  return board;
}
