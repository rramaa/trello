export function createCard(
  id: string,
  title: string,
  {
    description,
    dueDate,
    labels,
  }: { description: string | null; dueDate: Date | null; labels: string[] }
) {
  let card = {
    id,
    title,
    description,
    dueDate,
    labels: labels || [],
  };

  return {
    getCard() {
      return {
        id,
        title,
        description,
        dueDate,
        labels: labels || [],
      };
    },
    // setter functions
    updateTitle(title: string) {
      card = { ...card, title };
    },
    updateDescription(description: string | null) {
      card = { ...card, description };
    },
    updateDueDate(dueDate: Date | null) {
      card = { ...card, dueDate };
    },
    updateLabels(labels: string[]) {
      card = { ...card, labels };
    },
  };
}
