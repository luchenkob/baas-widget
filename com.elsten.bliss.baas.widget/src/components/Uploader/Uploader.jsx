import React, { useCallback, useContext } from "react";
import { useDropzone } from 'react-dropzone';
import { Context } from "../../context/context";
import { useTranslation } from "react-i18next";

const musicMetadata = require('music-metadata-browser');

import "./Uploader.scss";

const Uploader = ({ len, cur, isProcessing, ...props }) => {

  const { dispatch } = useContext(Context);
  let length = 0, current = 0, errors = [], tempFiles = [], result = {};

  const { t } = useTranslation();

  const onDrop = useCallback(acceptedFiles => {

    length = acceptedFiles.length;
    current = 0;
    tempFiles = [];
    result = {};

    dispatch({ type: "SET_DATA", data: { isProcessing: true, len: length, cur: current, errors: errors, processingMessage: `Processing ${current} of ${length}` } })

    if (acceptedFiles) {
      acceptedFiles.forEach(file => {

        if (file.type === "image/jpeg" || file.type === "image/png") {

          const reader = new FileReader();

          reader.onload = ((entry) => {
            const image = new Image();
            image.src = entry.target.result;
            image.onload = () => {
              tempFiles.push({ file: file.name, size: file.size, path: file.path, type: file.type, width: image.width, height: image.height });
              errors.push(`mime-type:${file.type}`)
              setProgress();
            };
          });

          reader.readAsDataURL(file);

        } else {
          musicMetadata.parseBlob(file).then(metadata => {
            tempFiles.push({ ...metadata, file: file.name, size: file.size, path: file.path, type: file.type });
            setProgress();
          },
            error => {
              console.log(error)
              errors.push(error)
              setProgress();
            });
        }
      });
    }


  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const setProgress = () => {

    current++;
    dispatch({ type: "SET_DATA", data: { isProcessing: true, cur: current, len: length, errors: errors, processingMessage: `${t('Processing')} ${current} ${t('of')} ${length}` } })

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

      if (tempFile.type !== "image/jpeg" && tempFile.type !== "image/png") {

        let key = typeof tempFile.common.album === "undefined" ? t('Unknown') : tempFile.common.album;

        if (!result[key]) result[key] = [];

        result[key].push(
          {
            title: tempFile.common.title,
            artist: tempFile.common.artist,
            no: tempFile.common.track.no,
            file: tempFile.file
          })
      }
    });

    sortData();

    dispatch({ type: "SET_DATA", data: { isProcessing: false, files: result, origFiles: tempFiles, errors: errors, step: 2 } })
  }

  return (
    <div className="uploader">
      <div className={`uploader-inner ${isDragActive ? "active" : ''}`} {...getRootProps()}>
        <input {...getInputProps()} />
        <p className="mb-0">{t('Drag and drop music files here')}</p>
      </div>
    </div>
  );
}

export default Uploader;
