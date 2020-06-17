import React, { useCallback, useContext } from "react";
import { useDropzone } from 'react-dropzone';
import { Context } from "../../context/context";
import { useTranslation } from "react-i18next";
import { getFileExtension, isArrayEqualByFileName } from "../../utils";
import converter from 'number-to-words';
import { _p } from "../../defines/config";

const musicMetadata = require('music-metadata-browser');

import "./Uploader.scss";

const Uploader = ({ len, cur, isProcessing, ...props }) => {

  const { dispatch, state, config } = useContext(Context);
  let length = 0, current = 0, errors = [{type:"ext", files:[]}, {type:"exc", files:[]}], tempFiles = [], result = {};

  const { t } = useTranslation();

  const onDrop = useCallback(acceptedFiles => {

    length = acceptedFiles.length;
    current = 0;
    tempFiles = [];
    result = {};

    if (length > 0) {

      dispatch({ type: "SET_DATA", data: { isProcessing: true, len: length, cur: current, errors: errors, processingMessage: `Processing ${current} of ${length}` } })

      acceptedFiles.forEach(file => {

        if (file.type === "image/jpeg" || file.type === "image/png") {

          const reader = new FileReader();

          reader.onload = ((entry) => {
            const image = new Image();
            image.src = entry.target.result;
            image.onload = () => {

              tempFiles.push({ file: file.name, data: entry.target.result, size: file.size, path: file.path, type: renameMimeType(file.type, getFileExtension(file.path)), width: image.width, height: image.height });
              setProgress();
            };
          });

          reader.readAsDataURL(file);

        } else {
          musicMetadata.parseBlob(file).then(metadata => {
            tempFiles.push({ ...metadata, file: file.name, size: file.size, path: file.path, type: renameMimeType(file.type, getFileExtension(file.path)) });
            setProgress();
          },
            error => {
              console.log(error)
              errors[0].files.push(file.path);
              setProgress();
            });
        }
      });
    }else{
      dispatch({ type: "SET_NOTIFICATION", data: { isNotification: true, notificationMessage: t("Please choose files"), notificationType: "danger", isProcessing: false, isBussy: false } })
      setTimeout(()=>{
        dispatch({ type: "SET_NOTIFICATION", data: { isNotification: false, }})
      },4000)
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
            file: tempFile.file,
            path: tempFile.path,
            disk: tempFile.common.disk
          })
      }
    });

    sortData();
    trim();

    if (isArrayEqualByFileName(state.origFiles.sort(), tempFiles.sort())) {
      dispatch({ type: "SET_STEP", data: { step: 2, isSkipAssesment: true, isNotification: false, isProcessing: false, isBussy: false } })
    } else {
      dispatch({ type: "SET_DATA", data: { isProcessing: false, isSkipAssesment: false, files: result, origFiles: tempFiles, errors: errors, step: 2 } })
    }

    if(config.onFilesUploaded) config.onFilesUploaded(tempFiles);
  }

  const trim = () => {
    let albumCount = 1;
    let count = 0;
    let output = {};
    let acceptedAlbums = [];
    let excludedFiles = [];

    for(const i in result) {
      if(count < config.limitFiles && (result[i].length < (config.limitFiles - count + 1))) {
        acceptedAlbums.push(i);
        result[i].forEach((track)=>{
          if(!output[i]) output[i] = [];
          output[i].push(track);
          count++;
        })
      }else{

        if(albumCount == 1) {
          output[i] = result[i] 
        }else{
          for(const i in result) {
            if(acceptedAlbums.indexOf(i) == -1) {
              excludedFiles.length > 0 ? excludedFiles = excludedFiles.concat(result[i]) : excludedFiles = result[i];
            }
          }
        }

        excludedFiles.forEach((file)=>{
          errors[1].files.push(file.path);
        })

        dispatch({ type: "SET_NOTIFICATION", data: { isNotification: true, notificationMessage: t(`${length} audio files have been chosen. We limit this demo to the assessment of ${converter.toWords(config.limitFiles)} audio files, so we'll just send up to that number, whole albums only.`), errors: errors, notificationType: "danger" } })
        
        setTimeout(()=>{
          dispatch({ type: "SET_NOTIFICATION", data: { isNotification: false } })
        }, 5000);
        
        break;
      }

      albumCount++;
    }

    result = output;
  }

  const renameMimeType = (type, ext) => {

    switch (type) {

      case "video/ogg":
        return "audio/ogg";

      default:
        return type
    }
  }

  return (
    <div className={`${_p}uploader`}>
      <div className={`${_p}uploader-inner ${isDragActive ? `${_p}active` : ''}`} {...getRootProps()}>
        <input {...getInputProps()} />
        {config.uploaderCtaHtml ?
          <div dangerouslySetInnerHTML={{ __html: t(config.uploaderCtaHtml) }}></div>
          : <div><p className={`${_p}mb-0`}>{t("Drag 'n' drop music files here, or click to select")}</p></div>
        }
      </div>
    </div>
  );
}

export default Uploader;
