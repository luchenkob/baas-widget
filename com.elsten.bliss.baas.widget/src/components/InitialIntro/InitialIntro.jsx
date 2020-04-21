import React from "react";
import { useTranslation } from "react-i18next";

const InitialIntro = () => {

  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-center text-primary">{t('BaaS Widget')}</h2>
      <p className="mw-800 mx-auto text-center">{t('Description of the widget')}</p>
    </div>
  );
}

export default InitialIntro;