//Makes 2 columns
export const makeColumns = (content) =>{
    if (!content){
        return (
            <div className="d-flex flex-row justify-content-around">
                <p ></p>
            </div>
        )
    }
    let contentArray = content.split(" ")
    let arrayLength = contentArray.length;
    let column1 = contentArray.slice(0, arrayLength/2).join(" ")
    let column2 = contentArray.slice(arrayLength/2).join(" ")


    return (
        <div className="d-flex flex-row justify-content-around">
            <p className="m-1">{column1}</p>
            <p className="m-1">{column2}</p>
        </div>
    )
}

