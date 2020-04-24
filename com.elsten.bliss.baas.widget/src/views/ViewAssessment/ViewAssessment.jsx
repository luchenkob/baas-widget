import React, { useContext, useEffect, useState } from "react";
import Assessment from "../../components/Assessment/Assessment";
import { Button } from "react-bootstrap";
import LayoutContent from "../../layouts/LayoutContent/LayoutContent";
import { Context } from "../../context/context";
import { ApiService } from "../../services/ApiService";

const ViewAssessment = (state) => {

  const { dispatch, config } = useContext(Context);
  const [isMounted, setIsMounted] = useState(false);
  let interval = null;
  const id = localStorage.getItem('assessment');

  useEffect(() => {

    checkJob(() => {
      ApiService.get(`assessment/${id}`, config).then(result => {
        setIsMounted(true);
        dispatch({ type: "SET_ASSESSMENTS", data: { assessments: result.data, isNotification: false, isBussy: false } })
      }, error => {
        dispatch({ type: "SET_NOTIFICATION", data: { isNotification: true, notificationMessage: `${error}`, notificationType: "danger", isBussy: false } })
      })
    });

  }, [])

  const checkJob = (callback) => {
    ApiService.get(`job/${id}`, config).then(result => {
      if (result.data.status === "Completed") {
        clearInterval(interval);
        callback();
      } else {
        if(!interval){
          interval = setInterval(() => {
            checkJob();
          }, config.queryDelay);
        }
      }
    }, error => {
      dispatch({ type: "SET_NOTIFICATION", data: { isNotification: true, notificationMessage: `${error}`, notificationType: "danger", isBussy: false } })
    })
  }

  const handleBack = () => {
    dispatch({ type: "SET_STEP", data: { step: 2, isNotification: false } })
  }

  const handleAssess = () => {
    dispatch({ type: "SET_STEP", data: { step: 3 } })
  }

  return (
    <LayoutContent slots={[
      isMounted ? <Assessment {...state} /> : null,
      <Button variant="secondary" onClick={handleBack}>Back to list</Button>,
      <Button variant="light" className="ml-4" onClick={handleAssess}>Complete</Button>
    ]} />
  );
}

export default ViewAssessment;