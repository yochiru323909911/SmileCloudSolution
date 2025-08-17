import React, { useState } from "react";

export default function InputForm({ onSubmit }) {
  const [points, setPoints] = useState({
    x1: "", y1: "",
    x2: "", y2: "",
    x3: "", y3: ""
  });

  const handleChange = (e) => {
    setPoints({ ...points, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const p1 = { x: +points.x1, y: +points.y1 };
    const p2 = { x: +points.x2, y: +points.y2 };
    const p3 = { x: +points.x3, y: +points.y3 };
    onSubmit([p1, p2, p3]);
  };

  const inputPairs = [
    { x: "x1", y: "y1", label: "נקודה A" },
    { x: "x2", y: "y2", label: "נקודה B" },
    { x: "x3", y: "y3", label: "נקודה C" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
          מחשבון משולש
        </h1>
        <p className="text-gray-600 text-center mb-6">
          הזן קואורדינטות שלוש נקודות ליצירת המשולש
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {inputPairs.map(({ x, y, label }, index) => (
            <div key={index} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <input
                    name={y}
                    type="number"
                    placeholder="Y"
                    value={points[y]}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="flex-1">
                  <input
                    name={x}
                    type="number"
                    placeholder="X"
                    value={points[x]}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
          
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-200 shadow-md hover:shadow-lg"
          >
            הצג משולש
          </button>
        </form>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-medium text-gray-700 mb-2">הוראות:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• הזן ערכי X ו-Y עבור כל נקודה</li>
            <li>• הערכים צריכים להיות בטווח 0-800</li>
            <li>• אין בדיקה של תקינות הקלט, לכן השתדל לדייק</li>
          </ul>
        </div>
        <h4 className="font-medium text-gray-700 mb-2">נוצר על-ידי יוכי לרנר בתאריך 17/08/2025</h4>
      </div>
    </div>
  );
}