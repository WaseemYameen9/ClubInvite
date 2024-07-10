import React, { useState, useRef, useEffect } from 'react';
import { useDrag } from 'react-dnd';

const DraggableText = ({ id, text, left, top, font, moveText, updateText }) => {
  const [isEditing, setIsEditing] = useState(false);
  const textRef = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'TEXT',
    item: { id, left, top },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleDoubleClick = () => {
    setIsEditing(true);
    setTimeout(() => textRef.current.focus(), 0);
  };

  const handleBlur = () => {
    setIsEditing(false);
    updateText(id, textRef.current.innerText);
  };

  useEffect(() => {
    if (textRef.current && !isEditing) {
      textRef.current.innerText = text;
    }
  }, [text, isEditing]);

  const style = {
    position: 'absolute',
    left,
    top,
    cursor: 'move',
    opacity: isDragging ? 0.5 : 1,
    border: isEditing ? '1px solid blue' : 'none',
    padding: '5px',
    fontFamily: font,
  };

  return (
    <div ref={drag} style={style} onDoubleClick={handleDoubleClick}>
      <div
        ref={textRef}
        contentEditable={isEditing}
        suppressContentEditableWarning={true}
        onBlur={handleBlur}
        style={{ outline: 'none' }}
      >
        {text}
      </div>
    </div>
  );
};

export default DraggableText;
