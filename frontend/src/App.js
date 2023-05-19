import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Browse from "./components/browse/browse";
import Homepage from "./components/homepage/homepage";
import Layout from "./components/layout/layout";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="movies" element={<Browse type={"movies"} />} />
          <Route path="shows" element={<Browse type={"shows"} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
