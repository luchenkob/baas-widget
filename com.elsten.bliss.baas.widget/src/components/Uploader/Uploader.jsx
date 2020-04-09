import React, { useCallback, useContext } from "react";
import { useDropzone } from 'react-dropzone';
import { Context } from "../../context/context";
const musicMetadata = require('music-metadata-browser');

import "./Uploader.scss";

const Uploader = ({ len, cur, isProcessing, ...props }) => {

  const { dispatch } = useContext(Context);
  let length = 0, current = 0, errors = [], tempFiles = [], result = {};

  const onDrop = useCallback(acceptedFiles => {

    length = acceptedFiles.length;
    current = 0;
    tempFiles = [];
    result = {};

    dispatch({ type: "SET_DATA", data: { isProcessing: true, len: length, cur: current, errors: errors,  processingMessage: `Processing ${current} of ${length}`}})

    if (acceptedFiles) {
      acceptedFiles.forEach(file => {
        musicMetadata.parseBlob(file).then(metadata => {
          tempFiles.push({ ...metadata, file: file.name, size: file.size, path: file.path });
          setProgress();
        },
          error => {
            console.log(error)
            errors.push(error)
            setProgress();
          });
      });
    }


  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const setProgress = () => {

    current++;
    dispatch({ type: "SET_DATA", data: { isProcessing: true, cur: current, len: length, errors: errors, processingMessage: `Processing ${current} of ${length}` } })

    if (current == length) {
      filterData();
    }
  }

  const sortData = () => {
    Object.keys(result).forEach((file) => {
      result[file].sort((a, b) => (a.no > b.no) ? 1 : -1)
    })
  }

  const filterData = () => {

    result = {};

    tempFiles.forEach((tempFile) => {

      let key = typeof tempFile.common.album === "undefined" ? "Unknown" : tempFile.common.album;

      if (!result[key]) result[key] = [];

      result[key].push(
        {
          title: tempFile.common.title,
          artist: tempFile.common.artist,
          no: tempFile.common.track.no,
          file: tempFile.file
        })
    });

    sortData();

    dispatch({ type: "SET_DATA", data: { isProcessing: false, files: result, origFiles: tempFiles, errors: errors, step: 2 } })
  }

  return (
    <div className="uploader">
      <div className={`uploader-inner ${isDragActive ? "active" : ''}`} {...getRootProps()}>
        <input {...getInputProps()} />
        <p className="mb-0">Drag 'n' drop music files here, or click to select</p>
      </div>
    </div>
  );
}

export default Uploader;
