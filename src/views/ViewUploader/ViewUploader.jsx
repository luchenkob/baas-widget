import React from "react";
import Uploader from "../../components/Uploader/Uploader";
import InitialIntro from "../../components/InitialIntro/InitialIntro";
import LayoutIntro from "../../layouts/LayoutIntro/LayoutIntro"

const ViewUploader = (state) => {

  return (
    <LayoutIntro slots={[
      <InitialIntro />,
      <Uploader {...state} />
    ]}/>
  );
}

export default ViewUploader;