import React from "react";
import LeftMenuPanel from "./components/LeftMenuPanel/LeftMenuPanel";
import HeaderContent from "./components/HeaderContent/HeaderContent";
import MainContent from "./components/MainContent/MainContent";

const App = () => {
  return (
    <div className="page">
      <LeftMenuPanel />
      <div className="page__content">
        <HeaderContent />
        <MainContent />
      </div>
    </div>
  );
}

export default App;
