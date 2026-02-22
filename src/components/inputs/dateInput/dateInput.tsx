import type { Dispatch } from "react";
import "./dateInput.css"
import type React from "react";

function DateInput({isTextAbove, setDataValue, dataValue} : {isTextAbove: boolean, setDataValue: Dispatch<React.SetStateAction<string>>, dataValue: string}) {
  return (
    <div className="date-div">
      {isTextAbove && (
        <div className="date-text">
          Finalizar até: 
        </div>
      )}
      <input type="datetime-local" className="data-time-input"
      value={dataValue} 
      onChange={(e) => setDataValue(e.target.value)}/>      
    </div>
  )
}

export default DateInput;