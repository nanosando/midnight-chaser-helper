import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import img1 from './resource/1.png';
import img2 from './resource/2.png';
import img3 from './resource/3.png';
import img4 from './resource/4.png';
import img5 from './resource/5.png';
import img6 from './resource/6.png';
import img7 from './resource/7.png';
import img8 from './resource/8.png';
import img9 from './resource/9.png';

import './App.css';

const grid = 9;

const defaultItems = [
  {id: '1', content: img1},
  {id: '2', content: img2},
  {id: '3', content: img3},
  {id: '4', content: img4},
  {id: '5', content: img5},
  {id: '6', content: img6},
  {id: '7', content: img7},
  {id: '8', content: img8},
  {id: '9', content: img9},
];

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",

  // change background colour if dragging
  background: isDragging ? "lightgreen" : null,

  margin: "auto",
  objectFit: "contain",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = (isDraggingOver, isPieceGroup) => ({
  background: isDraggingOver && !isPieceGroup ? 'lightblue' : null,
  padding: grid,
  display: "flex",
  flexDirection: "row",
  width: "100px",
  height:"100px"
});

function App() {
  const [itemList, setItemList] = useState(defaultItems);
  const [board, setBoard] = useState([[], [], [], [], [], [], [], [], []]);

  const onClickReset = () => {
    setItemList(defaultItems);
    setBoard([[], [], [], [], [], [], [], [], []]);
  }

  const onDragEnd = (result) => {
    const {source, destination} = result;

    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    console.log(sInd, dInd);

    // piece-group => piece-group
    if(String(sInd) === String(dInd) && String(dInd) === '10'){
      const items = reorder(itemList[sInd], source.index, destination.index);
      const newItemList = [...itemList];
      newItemList[sInd] = items;
      setItemList(newItemList);
      return;
    }

    // no change
    if (String(sInd) === String(dInd)) {
      return;
    } else {
      // piece-group => board
      if(String(sInd) === '10'){
        const result = move(itemList, board[dInd], source, destination);
        const newBoard = [...board];
        newBoard[dInd] = result[dInd];
  
        setItemList(result[sInd]);
        setBoard(newBoard);
      }
      else{ 
        // board => piece-group
        if(String(dInd) === '10'){
          const result = move(board[sInd], itemList, source, destination);
          const newBoard = [...board];
          newBoard[sInd] = result[sInd];
    
          setItemList(result[dInd]);
          setBoard(newBoard);
        }
        else { // board => board
          const result = move(board[sInd], board[dInd], source, destination);
          const newBoard = [...board];
          newBoard[sInd] = result[sInd];
          newBoard[dInd] = result[dInd];
    
          setBoard(newBoard);
        }
      }
    }
  }

  useEffect(() => {
    console.log(itemList);
  })

  return (
    <div className="App">
      <div className="App-title">
        메이플 미드나잇 체이서 헬퍼
      </div>
      <div className="App-contents">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="board">
            <div className="board-row">
              {[0, 1, 2].map((el, ind) => (
                <div className="board-element">
                  <Droppable key={el} droppableId={`${el}`}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver, false)}
                      {...provided.droppableProps}
                    >
                    {
                      board[el].map((item, index) => (
                        <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}>
                        {(provided, snapshot) => (
                            <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <img src={item.content} className='item-img'></img>
                          </div>
                        )}
                        </Draggable>
                      ))}
                    { provided.placeholder }
                    </div>
                  )}
                  </Droppable>
                </div>
              ))}
            </div>
            <div className="board-row">
            {[3, 4, 5].map((el, ind) => (
                <div className="board-element">
                  <Droppable key={el} droppableId={`${el}`}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver, false)}
                      {...provided.droppableProps}
                    >
                    {
                      board[el].map((item, index) => (
                        <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}>
                        {(provided, snapshot) => (
                            <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <img src={item.content} className='item-img'></img>
                          </div>
                        )}
                        </Draggable>
                      ))}
                    { provided.placeholder }
                    </div>
                  )}
                  </Droppable>
                </div>
              ))}
            </div>
            <div className="board-row">
            {[6, 7, 8].map((el, ind) => (
                <div className="board-element">
                  <Droppable key={el} droppableId={`${el}`}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver, false)}
                      {...provided.droppableProps}
                    >
                    {
                      board[el].map((item, index) => (
                        <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}>
                        {(provided, snapshot) => (
                            <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <img src={item.content} className='item-img'></img>
                          </div>
                        )}
                        </Draggable>
                      ))}
                    { provided.placeholder }
                    </div>
                  )}
                  </Droppable>
                </div>
              ))}
            </div>
          </div>
          <div className="piece-group">
            <Droppable key={10} droppableId='10' direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver, true)}
                {...provided.droppableProps}
              >
              {
                itemList.map((item, index) => (
                  <Draggable
                  key={item.id}
                  draggableId={item.id}
                  index={index}>
                  {(provided, snapshot) => (
                      <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <img src={item.content} width="40px"></img>
                    </div>
                  )}
                  </Draggable>
                ))}
              { provided.placeholder }
              </div>
            )}
            </Droppable>
          </div>
        </DragDropContext>
        <div className="buttons">
          <div className="button" onClick={() => onClickReset()}>
            초기화
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
