import { RefObject } from 'react';

import Webcam, { } from "react-webcam";


const WebCam = ({ webcamRef, }: {
  webcamRef: RefObject<Webcam>
}) => {


  return (
    <div className="w-full h-auto max-w-3/4 overflow-hidden border  border-gray-300">
      <Webcam
        className=" w-full aspect-w-16 aspect-h-9 border border-gray-300  p-4"
        audio={false}
        ref={webcamRef}
      >
      </Webcam>
    </div>

  );
}

export default WebCam;
