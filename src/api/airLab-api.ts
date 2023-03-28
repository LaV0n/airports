import axios from "axios";

const instance=axios.create({
    baseURL:'https://airlabs.co/api/v9/schedules?dep_iata=MIA&api_key=0090aa34-7879-4d84-b094-02b18b4230f6',

})

export const airLabAPI={
    getSchedule(){
        return instance.get('')
    },
}