export enum LABEL_COLORS {
  "red",
  "green",
  "yellow",
  "blue",
}

export function createLabel(id: string, name: string, color: LABEL_COLORS) {
  let label = {
    id,
    name,
    color,
  };

  return {
    getLabel() {
      return label;
    },
    updateName(name: string) {
      label = { ...label, name };
    },
    updateColor(color: LABEL_COLORS) {
      label = { ...label, color };
    },
  };
}
