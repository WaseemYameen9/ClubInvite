import React, { forwardRef } from 'react';
import DraggableText from '../Draggable/DraggableText';

const EditingScreen = forwardRef(({ image, texts, selectedFont, moveText, updateText, drop, selectedTextColor, selectedFontSize }, ref) => (
  <div 
    ref={node => { drop(node); ref.current = node; }} 
    style={{ 
      position: 'relative', 
      width: '100%', 
      height: '550px', 
      border: '1px solid #000', 
      backgroundColor: 'whitesmoke', 
      borderRadius: 10, 
      flex: 8 
    }}
  >
    {image && <img src={image} alt="Uploaded" style={{ width: '100%', height: '100%' }} />}
    {texts.map(({ id, text, left, top }) => (
      <DraggableText 
        key={id} 
        id={id} 
        text={text} 
        left={left} 
        top={top} 
        font={selectedFont} 
        moveText={moveText} 
        updateText={updateText} 
        color={selectedTextColor}
        fontSize={selectedFontSize}
      />
    ))}
  </div>
));

export default EditingScreen;
