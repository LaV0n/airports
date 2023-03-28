import React from 'react';
import {useAppSelector} from "../../app/store";

export const Aircraft = () => {

    const flight=useAppSelector(state => state.app.flightData)

    const place=`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_API_KEY_MAP}&q=${flight?.lat},${flight?.lng}`

    return (
        <div>
        <div>
            {flight?.reg_number} - {flight?.lat} -- {flight?.lng}
        </div>
            <iframe
                width="600"
                height="450"
                style={{border:0}}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={place}/>
        </div>
    );
};
