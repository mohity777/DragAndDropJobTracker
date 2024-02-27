import { DropResult } from "react-beautiful-dnd";
import { Jobs } from "./types";
import useJobStore from "../store/jobStore";

export const defaultJobs = {
  saved: {
    name: "Saved",
    items: [],
  },
  applied: {
    name: "Applied",
    items: [],
  },
  interviewing: {
    name: "Interviewing",
    items: [],
  },
  offer: {
    name: "Offer",
    items: [],
  },
  rejected: {
    name: "Rejected",
    items: [],
  },
};

export const onDragEnd = (
  result: DropResult,
  columns: Jobs,
  setColumns: (data: Jobs) => void
) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};
