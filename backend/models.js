const TodoModel = {
  id: "Number",
  title: "String",
  description: "String",
  isChecked: "Boolean",
  createdOn: "String", // The Created On Date
  dueDateTime: "String", // The Due Date
  history: "Array", // The History Array of HistoryModel
  subTodos: "Array", // The Array of Sub-Todos
};

const HistoryModel = {
  actionOn: "String", // The Edit Date
  actionedOn: "String", // The Edit Field / Prop
  oldValue: "String", //  The Old Value
  newValue: "String", // The New Value
};
