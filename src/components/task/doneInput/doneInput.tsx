import "./doneInput.css"

function DoneInput({ deleteTask }: {deleteTask: () => void}) {
  return (
    <div className="done-input-div">
      <div className="done-input-text">
        Concluido?
      </div>
      <input type="radio" name="" id="" onClick={deleteTask}/>
    </div>
  )
}

export default DoneInput;