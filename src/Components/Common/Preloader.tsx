import preloader from "../../assets/Rolling-0.7s-200px.svg"

interface Props {
    loadingText?: string,
    displayInitText?: boolean
}

const Preloader = ({loadingText, displayInitText}:Props) => {
    const initPhrases = 
    [
        "Our librarians are dusting off the shelves and scanning the books, one page at a time.",
        "Our books are getting organized, one alphabetical order at a time.",
        "Just a quick read of War and Peace while we load the library...",
        "Our books are being cataloged faster than you can say 'where did I leave my bookmark?'",
        "Our library is being sorted faster than you can say 'Hogwarts School of Witchcraft and Wizardry.'"
    ]
    let initPhraseToDisplay = initPhrases[Math.floor(Math.random()*initPhrases.length)]
    return ( 
        <>
        <div className="preloader">
            <img src={preloader} alt="" />
            <div className="preloader_text">
                {displayInitText && <p>{initPhraseToDisplay}</p>}
                {loadingText && <p>{loadingText}</p>}
            </div>
        </div>
     </>);
}
 
export default Preloader;