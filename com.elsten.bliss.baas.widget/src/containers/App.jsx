import React, {useReducer } from "react";
import ViewsManager from "../views/ViewsManager"
import { Context } from "../context/context";
import reducer from "../context/reducer"

const App = () => {

  const [state, dispatch] = useReducer(reducer, { isProcessing: false, len: 0, cur: 0, files: {}, errors: [], step:1, activeAlbum: '' });

  return (
    <Context.Provider value={{dispatch}}>
      <ViewsManager {...state}/>
    </Context.Provider>
  );
}

export default App;