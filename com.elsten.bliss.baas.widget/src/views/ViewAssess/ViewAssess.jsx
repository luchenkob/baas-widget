import React, {useContext} from "react";
import Assess from "../../components/Assess/Assess";
import { Button } from "react-bootstrap";
import LayoutContent from "../../layouts/LayoutContent/LayoutContent";
import { Context } from "../../context/context";

const ViewAssess = (state) => {

  const { dispatch } = useContext(Context);

  const handleBack = () => {
    dispatch({ type: "SET_STEP", data: { step: 2 } })
  }

  const handleAssess = () => {
    dispatch({ type: "SET_STEP", data: { step: 3 } })
  }

  return (
    <LayoutContent slots={[
      <Assess {...state} />,
      <Button variant="secondary" onClick={handleBack}>Back to result</Button>,
      <Button variant="light" className="ml-4" onClick={handleAssess}>Complete</Button>
    ]} />
  );
}

export default ViewAssess;