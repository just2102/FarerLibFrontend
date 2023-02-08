import preloader from "../../assets/Rolling-0.7s-200px.svg"

interface Props {
    loadingText?: string,
}

const Preloader = ({loadingText}:Props) => {
    return ( 
        <div className="preloader">
            <img src={preloader} alt="" />
            {loadingText && <p>{loadingText}</p>}
        </div>
     );
}
 
export default Preloader;