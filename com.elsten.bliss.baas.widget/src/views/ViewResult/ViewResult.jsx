import React, { useContext } from "react";
import Result from "../../components/Result/Result";
import { Button } from "react-bootstrap";
import LayoutContent from "../../layouts/LayoutContent/LayoutContent";
import { Context } from "../../context/context";
import { ApiService } from "../../services/ApiService";
import { getFilteredCodec } from "../../utils"

const sizeOf = require('image-size');

const ViewResult = (state) => {

  const { isBussy } = state;
  const { dispatch, config } = useContext(Context);

  const handleUploadAgain = () => {
    dispatch({ type: "SET_STEP", data: { step: 1, isNotification: false}})
  }

  const handleAssess = () => {

    const { origFiles } = state;
    let data = { "storageNodes": [] }

    dispatch({ 
      type: "SET_NOTIFICATION", data: {
      isProcessing: true,
      processingMessage: "Data is being processed",
      isBussy: true} 
    })

    origFiles.forEach((file) => {

      if(file.type != "image/jpeg" && file.type != "image/png") {
        data["storageNodes"].push(
          {
            "lib": "/",
            "path": file.path,
            "mimeType": file.type,
            "duration": file.format.duration ? file.format.duration : null,
            "fields": {
              "ALBUM_NAME": file.common.album ? file.common.album : null,
              "ARTIST": file.common.artist ? file.common.artist : null,
              "YEAR": file.common.year ? file.common.year : null,
              "GENRE": file.common.genre ? file.common.genre : null,
              "TRACK_NAME": file.common.title ? file.common.title : null,
              "ALBUM_ARTIST": file.common.albumartist ? file.common.albumartist : null,
              "COVER_ART": file.common.picture ? {
                "width": sizeOf(file.common.picture[0].data).width,
                "height": sizeOf(file.common.picture[0].data).height,
                "sizeBytes": file.common.picture[0].data.byteLength,
                "codec": getFilteredCodec(file.common.picture[0].format),
              } : {},
              "COMPILATION": true,
              "TRACK_NUMBER": file.common.track.no ? file.common.track.no : null,
              "DISC_NUMBER": file.common.disk.no ? file.common.disk.no : null,
            }
          }
        );
      }else {
        data["storageNodes"].push(
          {
            "lib": "/",
            "path": file.path,
            "mimeType": file.type,
            "width": file.width,
            "height": file.height,
            "sizeBytes": file.size
          }
        );
      }
    });

    if(config.rules) data.rules = config.rules

    ApiService.post("assessment", data, config).then(result => {
      if(result.headers.location) {
        localStorage.setItem('assessment', result.headers.location);
        dispatch({ type: "SET_STEP", data: { step: 3 } })
      }
    }, error => {
      dispatch({ type: "SET_NOTIFICATION", data: {isNotification: true, notificationMessage: `${error}`, notificationType: "danger", isBussy: false} })
    })
  }

  return (
    <LayoutContent slots={[
      <Result {...state} />,
      <Button variant="secondary" disabled={isBussy ? true : false} onClick={handleUploadAgain}>Upload again</Button>,
      <Button variant="light" disabled={isBussy ? true : false} className="ml-4" onClick={handleAssess}>Assess</Button>
    ]} />
  );
}

export default ViewResult;