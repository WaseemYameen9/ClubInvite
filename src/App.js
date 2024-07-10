import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import html2canvas from 'html2canvas';
import Buttons from './component/Buttons/Buttons';
import EditingScreen from './component/EditingScreen/EditingScreen';

const App = () => {
  const [image, setImage] = useState(null);
  const [texts, setTexts] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [selectedFont, setSelectedFont] = useState('Arial');
  const canvasRef = useRef(null);

  const [, drop] = useDrop({
    accept: 'TEXT',
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      moveText(item.id, left, top);
    },
  });

  const moveText = (id, left, top) => {
    setTexts(texts =>
      texts.map(text =>
        text.id === id ? { ...text, left, top } : text
      )
    );
  };

  const updateText = (id, newText) => {
    setTexts(texts =>
      texts.map(text =>
        text.id === id ? { ...text, text: newText } : text
      )
    );
  };

  const addText = () => {
    setTexts([...texts, { id: nextId, text: 'New Text', left: 50, top: 50 }]);
    setNextId(nextId + 1);
  };

  const saveImage = () => {
    html2canvas(canvasRef.current).then(canvas => {
      const link = document.createElement('a');
      link.download = 'image.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div style={{ backgroundColor: 'cornsilk', display: 'flex', flexDirection: 'row', flex: 1 }}>
      <div style={{ flex: 2 }}>
        <div>
          <input 
            type="file" 
            accept="image/*" 
            onChange={e => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = e => setImage(e.target.result);
                reader.readAsDataURL(file);
              }
            }} 
          />
        </div>
        
        
        
        <div style={{ marginTop: 190, marginBottom: 10 }}>
          <Buttons onClick={addText} title="Add Text" />
        </div>
        
        
        
        <div>
          <select 
            value={selectedFont} 
            onChange={(e) => setSelectedFont(e.target.value)} 
            style={{
              padding: '8px 12px',
              marginLeft: '10px',
              fontSize: '14px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: '#fff',
              cursor: 'pointer'
            }}
          >
            <option value="Arial">Arial</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Verdana">Verdana</option>
          </select>
        </div>
        
        
        <div style={{ marginTop: 200 }}>
          <Buttons onClick={saveImage} title="Save Image" />
        
        </div>
      </div>
      
      
      <EditingScreen 
        ref={canvasRef} 
        image={image} 
        texts={texts} 
        selectedFont={selectedFont} 
        moveText={moveText} 
        updateText={updateText} 
        drop={drop} 
      />
    
    
    </div>
  );
};

export default App;
