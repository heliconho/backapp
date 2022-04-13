import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

function Loading() {
    const [counter, setCounter] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(counter + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [counter]);
    return (
        <div className="loading-container">
            {counter > 15 ? <div> </div> : <Spinner animation="border" variant="primary" />}
        </div>
    )
}

export default Loading