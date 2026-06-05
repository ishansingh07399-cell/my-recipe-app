import React from'react'
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import RecipeDetails from "./RecipeDetails";

function App() {
  return (
    // 3. The Routes wrapper holds all the individual Route paths
    <Routes>
      
      {/* 4. Notice the syntax: element={<ComponentName />} */}
      <Route path="/" element={<Home />} />
      <Route path="/recipe/:id" element={<RecipeDetails />} />
     
      
    </Routes>
  );
}

export default App;