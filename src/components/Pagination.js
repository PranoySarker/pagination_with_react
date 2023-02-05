import { useEffect, useState } from "react";

const Pagination = ({ pages, setCurrentPage }) => {
    //set the number of pages
    // console.log(howManyPages)
    // const pages = 10;
    const numberOfPages = [];
    for (let i = 1; i <= pages; i++) {
        numberOfPages.push(i);
    }
    console.log(numberOfPages);

    // set state for current button which is active
    const [currentButton, setCurrentButton] = useState(1);

    // set state for current buttons.this array will represent what will see on the page
    const [arrOfCurrentButton, setArrOfCurrentButton] = useState([])
    // we need useEffect for this
    useEffect(() => {
        let dotsInitial = '...';
        let dotsLeft = '... ';
        let dotsRight = ' ...';
        // let tempNubmerOfPages = [...numberOfPages];
        let tempNumberOfPages = [...arrOfCurrentButton];
        if (currentButton >= 1 && currentButton <= 3) {
            tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length]
        }

        else if (currentButton === 4) {
            const sliced = numberOfPages.slice(0, 5)
            tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length]
        }

        else if (currentButton > 4 && currentButton < numberOfPages.length - 2) {               // from 5 to 8 -> (10 - 2)
            const sliced1 = numberOfPages.slice(currentButton - 2, currentButton)                 // sliced1 (5-2, 5) -> [4,5] 
            const sliced2 = numberOfPages.slice(currentButton, currentButton + 1)                 // sliced1 (5, 5+1) -> [6]
            tempNumberOfPages = ([1, 2, dotsLeft, ...sliced1, ...sliced2, dotsRight, numberOfPages.length - 1, numberOfPages.length]) // [1, '...', 4, 5, 6, '...', 10]
        }

        else if (currentButton > numberOfPages.length - 3) {                 // > 7
            const sliced = numberOfPages.slice(numberOfPages.length - 4)       // slice(10-4) 
            tempNumberOfPages = ([1, dotsLeft, ...sliced])
        }


        else if (currentButton === dotsInitial) {
            // [1, 2, 3, 4, "...", 10].length = 6 - 3  = 3 
            // arrOfCurrentButton[3] = 4 + 1 = 5
            // or 
            // [1, 2, 3, 4, 5, "...", 10].length = 7 - 3 = 4
            // [1, 2, 3, 4, 5, "...", 10][4] = 5 + 1 = 6
            setCurrentButton(arrOfCurrentButton[arrOfCurrentButton.length - 3] + 1)
        }
        else if (currentButton === dotsRight) {
            setCurrentButton(arrOfCurrentButton[3] + 2)
        }

        else if (currentButton === dotsLeft) {
            setCurrentButton(arrOfCurrentButton[3] - 2)
        }

        setArrOfCurrentButton(tempNumberOfPages);
        setCurrentPage(currentButton);
    }, [currentButton])

    return (
        <div>
            <div className="pagination-container">
                {/* set the previous button */}
                <a href="!#"
                    onClick={() => setCurrentButton((prev) => prev === 1 ? prev : prev - 1)}
                    className={`${currentButton === 1 ? 'disabled' : ''}`}
                >
                    Prev
                </a>
                {/* mapping pages */}
                {
                    arrOfCurrentButton.map(page => (
                        <a href="!#" className={currentButton === page && 'active'} onClick={() => setCurrentButton(page)}>{page}</a>
                    ))
                }
                <a href="!#"
                    onClick={() => setCurrentButton((prev) => prev === numberOfPages.length ? prev : prev + 1)}
                    className={`${currentButton === numberOfPages.length ? 'disabled' : ''}`}
                >Next</a>
                {/* set the next button */}
            </div>
        </div>
    );
};

export default Pagination;
