import { Dispatch, SetStateAction } from "react";
import { Format, SERVER, } from "./App";
type ControlsProps = {
  setStreamFolder: Dispatch<SetStateAction<string>>;
  format: Format;
  setFormat: Dispatch<SetStateAction<Format>>;
};

const Controls = ({ setStreamFolder, format, setFormat }: ControlsProps) =>
(
  <div className="flex flex-col ml-4 space-y-4">
    <span className="text-gray-300">Mr. Host! When you press 'Q', it will pause or start saving files.</span>
    <input
      type="text"
      className="border border-gray-600 bg-gray-800 text-gray-200 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
      placeholder="Enter a full path (starts with ~) or path that starts with public/"
      onBlur={(e) =>
        fetch(`${SERVER}/path`, { body: e.target.value, method: "PATCH" }).then(res => res.ok && setStreamFolder(e.target.value))
      }
    />
    <div className="flex items-center">
      <select
        value={format}
        onChange={(e) => setFormat(e.target.value as Format)}
        className="border border-gray-600 bg-gray-800 text-gray-200 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
      >
        <option value="png">PNG</option>
        <option value="jpeg">JPG</option>
        <option value="bmp">BMP</option>
      </select>
    </div>
  </div>
);


export default Controls;