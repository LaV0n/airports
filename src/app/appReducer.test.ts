import {appReducer, getAirport, getSchedule, setErrorMessage} from "./appReducer";
import MockAdapter from "axios-mock-adapter";
import {setupStore} from "../utils/test-utils";
import {instance} from "../api/airLab-api";

const responseData={
    request:{},
    response:[
        {   aircraft_icao:null,
            airline_iata:"LX",
            airline_icao:"SWR",
arr_baggage    :    "26",
arr_delayed    :    29,
arr_estimated    :    "2023-04-21 12:04",
arr_estimated_ts    :    1682071440,
arr_estimated_utc    :    "2023-04-21 10:04",
arr_gate    :    null,
arr_iata    :    "ZRH",
arr_icao    :    "LSZH",
arr_terminal    :    "2",
arr_time    :    "2023-04-21 11:35",
arr_time_ts    :    1682069700,
arr_time_utc    :    "2023-04-21 09:35",
cs_airline_iata    :    "BT",
cs_flight_iata    :    "BT1343",
cs_flight_number    :    "1343",
delayed    :    29,
dep_actual    :    "2023-04-21 09:54",
dep_actual_ts    :    1682063640,
dep_actual_utc    :    "2023-04-21 07:54",
dep_delayed    :    19,
dep_estimated    :    "2023-04-21 09:54",
dep_estimated_ts    :    1682063640,
dep_estimated_utc    :    "2023-04-21 07:54",
dep_gate    :    "43",
dep_iata    :    "WAW",
            dep_icao    :    "EPWA",
dep_terminal    :    "A",
dep_time    :    "2023-04-21 09:35",
dep_time_ts    :    1682062500,
dep_time_utc    :    "2023-04-21 07:35",
duration    :    120,
flight_iata    :    "LX1343",
flight_icao    :    "SWR1343",
flight_number    :    "1343",
status    :    "active"}
    ],
    term:''
}
const testState={
    scheduleData:[],
    flightData:null,
    errorMessage:'',
    airport:null,
}
const responseAirportData ={
    request: {},
    response: [
        {country_code:"PL",
        iata_code:"WAW",
        icao_code:"EPWA",
        lat:52.167452,
        lng:20.96917,
        name:"Warsaw Chopin Airport"}
    ],
    term: ''
}
const mock = new MockAdapter(instance,{delayResponse:100})

const mockNetworkRequests = () => {
    mock.onGet('schedules?dep_iata=WAW&api_key=e6d3bb25-9609-4727-afbb-5b57fb8d832f')
        .reply(200, responseData)
    mock.onGet('airports?iata_code=WAW&api_key=e6d3bb25-9609-4727-afbb-5b57fb8d832f')
        .reply(200, responseAirportData)
}
const unMockNetworkRequests = () => {
    mock.resetHistory()
}

const mockStore = setupStore({})
test('set error message',()=>{
    const action= setErrorMessage('wow')
    const newState = appReducer(testState,action)
    expect(newState.errorMessage).toBe('wow')
})
describe('slice test',()=>{
    beforeEach(()=>{
        mockNetworkRequests()
    })
    afterEach(()=>{
        unMockNetworkRequests()
    })
    test('test axios request',async ()=>{
        const {data} = await instance.get('schedules?dep_iata=WAW&api_key=e6d3bb25-9609-4727-afbb-5b57fb8d832f')
        expect(data).toEqual(responseData)
    })
    test('get airport',async ()=>{
        const action = getAirport.fulfilled({name:'wawa',iata_code:'WAW'},'','WAW')
        const newState = appReducer(testState,action)
        expect(newState.airport?.iata_code).toBe('WAW')
    })
    test('get airport api',async ()=>{
          await mockStore.dispatch(getAirport('WAW'))
          const icao = mockStore.getState().app.airport?.iata_code
          expect(icao).toBe('WAW')
    })
    test('get shedule api',async ()=>{
        const mockTempStore = setupStore({app:{airport:{name:'wawa',iata_code:'WAW'},scheduleData:[],flightData:null,errorMessage:''}})
        await mockTempStore.dispatch(getSchedule())
        const iata = mockTempStore.getState().app.scheduleData![0].airline_iata
        expect(iata).toBe('LX')
    })
})
