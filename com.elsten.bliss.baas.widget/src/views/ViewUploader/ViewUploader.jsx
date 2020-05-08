import React, {useContext} from "react";
import Uploader from "../../components/Uploader/Uploader";
import InitialIntro from "../../components/InitialIntro/InitialIntro";
import LayoutIntro from "../../layouts/LayoutIntro/LayoutIntro"
import { Context } from "../../context/context";

const ViewUploader = (state) => {

  const { config } = useContext(Context);

  return (
    !config.title && !config.introHtml ?
      <LayoutIntro slots={[<></>,
        <Uploader {...state} />
      ]} /> :
      <LayoutIntro slots={[
        <InitialIntro />,
        <Uploader {...state} />
      ]} />
  );
}

export default ViewUploader;