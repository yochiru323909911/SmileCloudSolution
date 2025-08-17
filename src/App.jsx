import React, { useState } from "react";
import InputForm from "./components/InputForm";
import TriangleCanvas from "./components/TriangleCanvas";

export default function App() {
  const [currentView, setCurrentView] = useState("input");
  const [trianglePoints, setTrianglePoints] = useState(null);

  const handlePointsSubmit = (points) => {
    setTrianglePoints(points);
    setCurrentView("triangle");
  };

  const handleBackToInput = () => {
    setCurrentView("input");
    setTrianglePoints(null);
  };

  if (currentView === "input") {
    return <InputForm onSubmit={handlePointsSubmit} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              תצוגת המשולש
            </h1>
            <button 
              onClick={handleBackToInput}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition duration-200"
            >
              חזור לקלט
            </button>
          </div>
          
          {trianglePoints && (
            <div className="space-y-6" dir="rtl">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">הנקודות שהוזנו:</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <span className="font-medium">נקודה A:</span>
                    <br />({trianglePoints[0].x}, {trianglePoints[0].y})
                  </div>
                  <div className="text-center">
                    <span className="font-medium">נקודה B:</span>
                    <br />({trianglePoints[1].x}, {trianglePoints[1].y})
                  </div>
                  <div className="text-center">
                    <span className="font-medium">נקודה C:</span>
                    <br />({trianglePoints[2].x}, {trianglePoints[2].y})
                  </div>
                </div>
              </div>
              
              {/* הקנבס */}
              <div className="flex justify-center">
                <TriangleCanvas points={trianglePoints} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}