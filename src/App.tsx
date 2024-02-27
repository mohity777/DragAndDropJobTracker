import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableStateSnapshot,
  DroppableProvided,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import AddJobModal from "./components/AddJobModal";
import { onDragEnd } from "./constants/constants";
import useJobStore from "./store/jobStore";

function App() {
  const jobs = useJobStore((state) => state.jobs);
  const setJobs = useJobStore((state) => state.setJobs);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Job Board</h1>
        <AddJobModal />
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, jobs, setJobs)}
        >
          {Object.entries(jobs).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                key={columnId}
              >
                <h2>{column.name}</h2>
                <div style={{ margin: 20 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(
                      provided: DroppableProvided,
                      snapshot: DroppableStateSnapshot
                    ) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightgrey"
                              : "lightblue",
                            padding: 4,
                            width: 250,
                            minHeight: 600,
                            borderRadius: 5,
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(
                                  provided: DraggableProvided,
                                  snapshot: DraggableStateSnapshot
                                ) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "grey"
                                          : "white",
                                        ...provided.draggableProps.style,
                                        borderRadius: 10,
                                      }}
                                    >
                                      <div
                                        style={{
                                          fontWeight: "700",
                                          color: "black",
                                        }}
                                      >
                                        {item.jobTitle}
                                      </div>
                                      <div
                                        style={{
                                          fontWeight: "600",
                                          color: "blue",
                                        }}
                                      >
                                        {item.companyName}
                                      </div>
                                      <div
                                        style={{
                                          fontWeight: "500",
                                          color: "blue",
                                        }}
                                      >
                                        {item.description}
                                      </div>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
