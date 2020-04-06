import React from "react";
import ViewUploader from "./ViewUploader/ViewUploader";
import ViewResult from "./ViewResult/ViewResult";
import ViewAssess from "./ViewAssess/ViewAssess";

const ViewsManager = (state) => {

  const getViews = () => {
    const { step } = state;

    switch (step) {
      case 1: {
        return <ViewUploader {...state} />;
      }
      case 2: {
        return <ViewResult {...state} />;
      }
      case 3: {
        return <ViewAssess {...state} />;
      }
      default:{
        return <ViewUploader {...state} />
      }
    }
  }

  return (
    <>
      {getViews()}
    </>
  );
}

export default ViewsManager;