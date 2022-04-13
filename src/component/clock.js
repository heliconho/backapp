import  React, { useState , useEffect } from 'react'

const Clock = () => {

    var [date,setDate] = useState(new Date());
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });

    return(
        <div>
            <p>{date.toLocaleDateString()} {date.toLocaleTimeString()}</p>
        </div>
    )
}

export default Clock;