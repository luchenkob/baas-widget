import React, {useContext} from "react";
import { useTranslation } from "react-i18next";
import { Context } from "../../context/context";
import { _p } from "../../defines/config";

const InitialIntro = () => {

  const { t } = useTranslation();
  const { config } = useContext(Context);

  return (
    <div className={`${_p}p-2`}>
      <h2 className={`${_p}text-center ${_p}text-primary`}>{t(config.title)}</h2>
      <p className={`${_p}mw-800 ${_p}mx-auto ${_p}text-center`} dangerouslySetInnerHTML={{ __html: t(config.introHtml) }}></p>
    </div>
  );
}

export default InitialIntro;