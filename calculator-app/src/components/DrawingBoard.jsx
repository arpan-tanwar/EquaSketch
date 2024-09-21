// client/src/components/DrawingBoard.js
import { useRef, useEffect, useState } from "react";

function DrawingBoard() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000"); // Default color is black

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = (window.innerWidth * 2) / 1.5;
    canvas.height = (window.innerHeight * 2) / 1.5;
    canvas.style.width = `${window.innerWidth / 1.5}px`;
    canvas.style.height = `${window.innerHeight / 1.5}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = color;
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = color;
    }
  }, [color]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const resetCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const colorOptions = [
    "#000000",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex space-x-2">
        {colorOptions.map((colorOption) => (
          <button
            key={colorOption}
            onClick={() => setColor(colorOption)}
            className={`w-8 h-8 rounded-full ${
              color === colorOption ? "ring-2 ring-offset-2 ring-gray-400" : ""
            }`}
            style={{ backgroundColor: colorOption }}
          />
        ))}
        <input
          type="color"
          value={color}
          onChange={handleColorChange}
          className="w-8 h-8"
        />
      </div>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
        className="border border-gray-300 mb-4"
      />
      <button
        onClick={resetCanvas}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Reset Board
      </button>
    </div>
  );
}

export default DrawingBoard;
