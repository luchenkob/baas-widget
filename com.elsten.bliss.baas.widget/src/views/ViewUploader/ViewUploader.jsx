import React, {useContext} from "react";
import Uploader from "../../components/Uploader/Uploader";
import InitialIntro from "../../components/InitialIntro/InitialIntro";
import LayoutIntro from "../../layouts/LayoutIntro/LayoutIntro"
import { Context } from "../../context/context";

const ViewUploader = (state) => {

  const { config } = useContext(Context);

  return (
      <LayoutIntro isDisabledIntro={!config.title && !config.introHtml ? true : false} slots={[
        !config.title && !config.introHtml ? <></>: <InitialIntro />,
        <Uploader {...state} />
      ]} />
  );
}

export default ViewUploader;