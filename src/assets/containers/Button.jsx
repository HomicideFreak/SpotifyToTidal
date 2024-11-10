import "./Button.css"

function Button(props){
    return(
        <button className="bttn" onClick={props.func}>{props.name}</button>
    );
}
export default Button;