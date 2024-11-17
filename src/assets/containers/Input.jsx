import "./Input.css"

function Input(props){
    return(
        <input className="inpt" type="text" id={props.id} placeholder={props.placeholder}/>
    );
}

export default Input;
