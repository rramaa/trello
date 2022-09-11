export type Card = {
  id: string;
  title: string;
  description?: string;
  labels?: string[];
  dueDate?: Date;
};

export type CardHelper = ReturnType<typeof createCard>;

export type updatableKeys = keyof Omit<Card, "id">;

export function createCard(
  id: string,
  {
    title,
    description,
    dueDate,
    labels,
  }: { title: string; description?: string; dueDate?: Date; labels?: string[] }
) {
  let card: Card = {
    id,
    title,
    description,
    dueDate,
    labels: labels || [],
  };

  return card;
}
