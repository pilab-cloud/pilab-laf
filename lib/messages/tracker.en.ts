export const trackerEn = {
  labelPicker: {
    label: "Labels",
    placeholder: "Filter labels…",
    newColour: "New label colour",
    colour: (n: number) => `Colour ${n}`,
    create: (q: string) => `Create label “${q}”`,
  },
  reaction: {
    add: "Add reaction",
    reactedBy: (emoji: string, users: string[]) => `${emoji} ${users.join(", ")}`,
    toggle: (emoji: string, n: number) => `${emoji} ${n}`,
  },
  timeline: {
    edited: "edited",
    actions: "Comment actions",
    more: (n: number) => `${n} more updates`,
    fewer: "Show fewer updates",
    timeline: "Activity",
  },
  optionPicker: { search: "Search…", empty: "No results", none: "None" },
  issue: { select: (key: string) => `Select ${key}`, overdue: "Overdue", comments: (n: number) => `${n} comments`, due: "Due" },
  progress: { todo: "To do", doing: "In progress", done: "Done", summary: (pct: number) => `${pct}% complete` },
};
