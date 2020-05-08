import React, {useContext} from "react";
import { useTranslation } from "react-i18next";
import { Context } from "../../context/context";

const InitialIntro = () => {

  const { t } = useTranslation();
  const { config } = useContext(Context);

  return (
    <div className="p-2">
      <h2 className="text-center text-primary">{t(config.title)}</h2>
      <p className="mw-800 mx-auto text-center" dangerouslySetInnerHTML={{ __html: t(config.introHtml) }}></p>
    </div>
  );
}

export default InitialIntro;