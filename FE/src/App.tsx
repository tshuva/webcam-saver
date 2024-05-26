import { useRef } from 'react';
import Webcam from "react-webcam";
import WebCam from './wbcam';
import Controls from './Controls';
import { useWebcamCapture, } from './useWebcamCapture';

export const SERVER = `http://localhost:3000`;

export type Format = "bmp" | "png" | "jpeg";

function App() {
  const webcamRef = useRef<Webcam>(null);
  const {
    format,
    setFormat,
    setStreamFolder
  } = useWebcamCapture(webcamRef);

  return (
    <div className="flex h-screen dark:bg-slate-800">
      <WebCam webcamRef={webcamRef} />
      <Controls {...{ setStreamFolder, format, setFormat }} />
    </div>
  );
}

export default App;
