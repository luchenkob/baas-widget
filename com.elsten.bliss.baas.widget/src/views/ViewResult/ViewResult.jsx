import React, {useContext} from "react";
import Result from "../../components/Result/Result";
import { Button } from "react-bootstrap";
import LayoutContent from "../../layouts/LayoutContent/LayoutContent";
import { Context } from "../../context/context";

const ViewResult = (state) => {

  const { dispatch } = useContext(Context);

  const handleUploadAgain = () => {
    dispatch({ type: "SET_STEP", data: { step: 1 } })
  }

  const handleAssess = () => {
    dispatch({ type: "SET_STEP", data: { step: 3 } })
  }

  return (
    <LayoutContent slots={[
      <Result {...state} />,
      <Button variant="secondary" onClick={handleUploadAgain}>Upload again</Button>,
      <Button variant="light" className="ml-4" onClick={handleAssess}>Assess</Button>
    ]} />
  );
}

export default ViewResult;