import preloader from "../../assets/Rolling-0.7s-200px.svg"

interface Props {
    loadingText?: string,
}

const Preloader = ({loadingText}:Props) => {
    return ( 
        <div className="preloader">
            <img src={preloader} alt="" />
        </div>
     );
}
 
export default Preloader;