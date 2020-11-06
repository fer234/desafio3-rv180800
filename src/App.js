import React from "react";

import Application from "./Components/Application";
import UserProvider from "./providers/UserProvider";

function App() {
  return (
    <UserProvider>
      <Application />
      <div className="footer">
        <p>Tercer desafio © Fernando Reyes</p>
      </div>
    </UserProvider>

  );
}

export default App;
