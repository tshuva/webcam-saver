
import { useState, useRef, useEffect, RefObject } from 'react';
import Webcam from "react-webcam";
import { Format, SERVER } from './App';

const handleError = async <T>(promise: Promise<T>): Promise<T | null> => {
  try {
    const result = await promise;
    return result;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const useWebcamCapture = (webcamRef: RefObject<Webcam>, initialFormat: Format = "png") => {
  const [format, setFormat] = useState<Format>(initialFormat);
  const [savingFrame, setSavingFrame] = useState(false);
  const requestRef = useRef<number>();
  const [streamFolder, setStreamFolder] = useState("");

  useEffect(() => {
    const captureFrame = async (webcam: Webcam) => {
      if (streamFolder) {
        await handleError(
          fetch(`${SERVER}/frame/${Number(savingFrame)}/${format}`, {
            method: 'POST',
            body: webcam.getCanvas()?.toDataURL(`image/${format}`),
          }).then(res => (res.ok ? res : Promise.reject(res)))
        );
      }
      requestRef.current = requestAnimationFrame(() => captureFrame(webcam));
    };

    if (!webcamRef.current || !streamFolder) {
      cancelAnimationFrame(requestRef.current || 0);
      requestRef.current = undefined;
    } else {
      captureFrame(webcamRef.current);
    }

    return () => {
      cancelAnimationFrame(requestRef.current || 0);
      requestRef.current = undefined;
    };
  }, [webcamRef.current, streamFolder, savingFrame, format]);

  const toggleSavingFrame = (e: KeyboardEvent) => {
    if (e.key === 'Q') {
      setSavingFrame(prev => !prev);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', toggleSavingFrame);
    return () => {
      window.removeEventListener('keydown', toggleSavingFrame);
    };
  }, []);

  return {
    format,
    setFormat,

    setStreamFolder
  };
};
