import React, { useContext, useEffect, useState } from "react";
import Assessment from "../../components/Assessment/Assessment";
import { Button } from "react-bootstrap";
import LayoutContent from "../../layouts/LayoutContent/LayoutContent";
import { Context } from "../../context/context";
import { ApiService } from "../../services/ApiService";
import { useTranslation } from "react-i18next";
import { _p } from "../../defines/config";
import Modal from "../../components/Modals/Modal";

const ViewAssessment = (state) => {

  const { dispatch, config, container } = useContext(Context);
  const [isMounted, setIsMounted] = useState(false);
  const [failed, setFailed] = useState("");
  const { isBussy } = state;
  let interval = null;
  let endTimeout = null;
  const localAssesment = localStorage.getItem('assessment');
  const id = localAssesment ? localAssesment.split("/")[2] : null;
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const handleCloseCompleteModal = () => setShow(false);
  const handleShowCompleteModal = () => setShow(true);

  useEffect(() => {
    state.isSkipAssesment ? setIsMounted(true) : checkJob(getData);

    endTimeout = setTimeout(() => {
      clearInterval(interval);
      clearTimeout(endTimeout);
      dispatch({ type: "SET_NOTIFICATION", data: { isNotification: true, notificationMessage: t('notification_assessment_failed_get'), notificationType: "danger", isProcessing: false, isBussy: false } })
    }, config.endTimeout);
  }, [])

  const getData = (status, msg) => {

    switch (status) {

      case "Completed":
        ApiService.get(`assessment/${config.testID ? config.testID : id}`, config).then(result => {
          setIsMounted(true);
          dispatch({ type: "SET_ASSESSMENTS", data: { isProcessing: false, assessments: result.data, isNotification: false, isBussy: false } })
        }, error => {
          dispatch({ type: "SET_NOTIFICATION", data: { isNotification: true, notificationMessage: `${error}`, notificationType: "danger", isProcessing: false, isBussy: false } })
        })
        break;

      case "Failed":
        setIsMounted(true);
        setFailed(msg);
        dispatch({ type: "SET_ASSESSMENTS", data: { isProcessing: false, isNotification: false, isBussy: false } });
        break;

      default:

        break;
    }
  }

  const checkJob = (callback) => {
    ApiService.get(`job/${id}`, config).then(result => {

      dispatch({ type: "SET_STEP", data: { processingMessage: t('assessment_processing_retrieving'), } })

      switch (result.data.status) {

        case "Completed":
          clearInterval(interval);
          clearTimeout(endTimeout);
          callback(result.data.status);
          break;

        case "Failed":
          clearInterval(interval);
          clearTimeout(endTimeout);
          callback(result.data.status, result.data.failureMsg ? t(result.data.failureMsg) : t('notification_assessment_failed_start'));
          break;

        default:
          if (!interval) {
            interval = setInterval(() => {
              checkJob(getData);
            }, config.queryDelay);
          }
          break;
      }

      if(config.onAssessment) config.onAssessment(result.data);

    }, error => {
      dispatch({ type: "SET_NOTIFICATION", data: { isNotification: true, notificationMessage: `${error}`, notificationType: "danger", isProcessing: false, isBussy: false } })
    })
  }

  const handleBack = () => {
    dispatch({ type: "SET_STEP", data: { step: 1, isNotification: false, isProcessing: false, isBussy: false } })
  }

  const handleAssess = () => {
    handleShowCompleteModal(true);
    if(config.onFinish) config.onFinish();
  }

  const handleLinktoBliss = () => {
    handleCloseCompleteModal(false);
    window.location = config.completeLink;
  }

  return (
    <>
      <LayoutContent slots={[
        isMounted ? failed ? <div className={`${_p}msg-box ${_p}failed`}>{failed}</div> : <Assessment {...state} /> : null,
        <Button variant="light" disabled={isBussy ? true : false} onClick={handleBack}>{t("result_nav_cancel")}</Button>,
        <Button variant="secondary" disabled={isBussy ? true : false} className={`${_p}ml-4 ${_p}btn-lg`} onClick={handleAssess}>{t("result_nav_next")}</Button>
      ]} />

      <Modal container={container.current} show={show} className={`${_p}small`} onClose={() => setShow(false)}>
        <h3 className={`${_p}text-center ${_p}w-100`}>{t("Fix missing artwork")}</h3>
        <div className={`${_p}text-center ${_p}text-regular ${_p}mb-4`} dangerouslySetInnerHTML={{ __html: t(config.completeHtml) }}></div>
        <div className={`${_p}text-center`}><Button variant="primary" onClick={handleLinktoBliss} dangerouslySetInnerHTML={{ __html: t(config.completeLabel) }}></Button></div>
      </Modal>
    </>
  );
}

export default ViewAssessment;