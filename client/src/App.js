import "./App.css"; 
import { Routes, Route } from "react-router-dom"; 
import Homepage from "./pages/Homepage.page"; 

function App() {
  return (
    <Routes>
      <Route index element={<Homepage />} /> {/* Route for the index page, rendering the Homepage component */}
    </Routes>
  );
}

export default App; 
