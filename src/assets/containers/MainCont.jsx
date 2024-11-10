import "./MainCont.css"
import Button from "./Button";

function MainCont(){

    const handleClick = (e) => {
        console.log(e.target.textContent)
    }

    return(
        <div className="main-container">
            <h1 className="title-text">Spotify To Tidal</h1>
            <Button name="Transfer" func={handleClick}/>
        </div>
    );
}
export default MainCont;