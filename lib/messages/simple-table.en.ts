export const simpleTableEn = {
  table: {
    sortBy: (column: string) => `Sort by ${column}`,
    selectAll: "Select all rows",
    selectRow: (label?: string) => (label ? `Select ${label}` : "Select row"),
    actions: "Actions",
    empty: "No rows to show",
    loading: "Loading rows",
  },
};
