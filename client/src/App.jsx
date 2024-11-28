import React from "react";

import { Route, Routes } from "react-router-dom";
import NotFound from "./Components/NotFound";
import Home from "./Pages/Home";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Home />} />
        <Route path="*" element={<NotFound />} /> {/* 404 page */}
      </Routes>
    </>
  );
};

export default App;
