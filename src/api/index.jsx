import axios from "axios";
import { DateTime } from "luxon";



const API_URL = "http://localhost:3005";
// const token = localStorage.getItem('token');
const API_KEY = "53d489c7a70cbab23593b115345f9e5e";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + '/' + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
console.log(url)
    return fetch(url).then((res) => res.json()).then((data) => data);
}

const formatCurrentWeather = (data) => {
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        list,
        wind: { speed }
    } = data
    let { main: details, icon } = weather[0];
     
    return { lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, speed, details, icon , list};
}

const formatForecastWeather = (data) => {
    console.log(data)
    let { timezone, list} = data;
    list = list.slice(1,6).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
            day: formatToLocalTime(d.dt, timezone, 'ccc' ),
            temp: d.main.temp,
            humidity: d.main.humidity,
            icon: d.weather[0].icon,
            details: d.weather[0].description,
            speed: d.wind.speed,
            temp_min: d.main.temp_min,
            temp_max: d.main.temp_max,
            
        }
    })

   

    return { timezone, list };
}

export const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather);

    // return formattedCurrentWeather

    const { lat, lon } = formattedCurrentWeather
    const formattedForecastWeather = await getWeatherData("forecast", {
        lat,
        lon,
        // exclude: "current, minutely, alerts",
        units: searchParams.units
    }).then(formatForecastWeather)

    return { ...formattedCurrentWeather, ...formattedForecastWeather }
}

export const formatToLocalTime = (
    secs,
    zone,
    format = "cccc, dd LLL yyyy'| Local time: 'hh:mm a'"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const getHeaders = () => {
    return {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
    }
}

export const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`


export const newRegister = (data) => {
    return axios.post(`${API_URL}/register`, data);
}

export const authLogin = (data) => {
    return axios.post(`${API_URL}/login`, data);
};

export const leaveFrom = (data) => {
    return axios.post(`${API_URL}/leave_form`, data, getHeaders());
}

export const changeManagementForm = (data) => {
    return axios.post(`${API_URL}/change_management`, data, getHeaders());
}

export const projectOnboarding = (data) => {
    return axios.post(`${API_URL}/project_onboarding`, data, getHeaders());
}

export const timetrackerform = (data) => {
    return axios.post(`${API_URL}/time_trackers`, data, getHeaders())
}


export const appraisalform = (data) => {
    return axios.post(`${API_URL}/appraisal`, data, getHeaders());
}

export const kanbanform = (data) => {
    return axios.post(`${API_URL}/kanban`, data, getHeaders());
}


export const userleavedata = () => {
    return axios.get(`${API_URL}/leave-list`, getHeaders());
}

export const userlatestleavedata = () => {
    return axios.get(`${API_URL}/leave-list?latest=1`, getHeaders());
}

export const userchangemanagementdata = () => {
    return axios.get(`${API_URL}/changemanagement-list`, getHeaders());
}

export const userlatestchangemanagementdata = () => {
    return axios.get(`${API_URL}/changemanagement-list?latest=1`, getHeaders());
}

export const userprojectonboardingdata = () => {
    return axios.get(`${API_URL}/projectonboarding-list`, getHeaders());
}

export const userlatestprojectmanagementdata = () => {
    return axios.get(`${API_URL}/projectonboarding-list?latest=1`, getHeaders());
}

export const usertimetrackerdata = () => {
    return axios.get(`${API_URL}/timetracker-list`, getHeaders());
}

export const userlatesttimetrackerdata = () => {
    return axios.get(`${API_URL}/timetracker-list?latest=1`, getHeaders());
}

export const userappraisaldata = () => {
    return axios.get(`${API_URL}/appraisal-list`, getHeaders());
}

export const userlatestappraisaldata = () => {
    return axios.get(`${API_URL}/appraisal-list?latest=1`, getHeaders());
}

export const userkanbandata = () => {
    return axios.get(`${API_URL}/kanban-list`, getHeaders());
}



// export const userleavedata = ()=>{
//     return axios.get(`${API_URL}/leave-list`).then((res)=>{
//         console.log(res);

//     }) 
// }




// export const getMotivationalQuote = () =>{
//     axios.get("http://api.quotable.io/random").then((res)=>{
//         console.log(res.data.content);
//         console.log(res.data.author);
//     });
// }



export const getMotivationalQuote = () => {
   return axios.get("http://api.quotable.io/random", getHeaders());
}


export const getUserList = () => {
   return axios.get(`${API_URL}/user-list`, getHeaders());
}

export const updateKanban = (data) => {
    return axios.put(`${API_URL}/kanban-update`, data, getHeaders());
}


export const updateClose= (task_id) => {
    return axios.post(`${API_URL}/kanban-close/${task_id}`, {}, getHeaders());
}

export const allkanbandata = () => {
    return axios.get(`${API_URL}/kanban-list`, getHeaders());
}

export const updateCheckIn= (check_type,en_ip) => {
    en_ip = btoa(en_ip);
    return axios.post(`${API_URL}/check-in/${check_type}/${en_ip}`, {}, getHeaders());
}


export const getCheckStatus = () =>{
    return axios.get(`${API_URL}/check-in/status`, getHeaders());
}


// ===============================================================================

export const fetchProductApi = () => {
    return axios.get(`${process.env.PUBLIC_URL}/api/product.json`);
};

export const fetchChatApi1 = () => {
    return axios.get(`${process.env.PUBLIC_URL}/api/chatMember.json`);
};

export const fetchChatApi2 = () => {
    return axios.get(`${process.env.PUBLIC_URL}/api/chat.chats.json`);
};

export const fetchEmailApi = () => {
    return axios.get(`${process.env.PUBLIC_URL}/api/email.json`);
};

export const fetchBookmaekApi = () => {
    return axios.get(`${process.env.PUBLIC_URL}/api/bookmark.json`);
};

export const fetchTodoApi = () => {
    return axios.get(`${process.env.PUBLIC_URL}/api/todo.json`);
};

export const fetchTaskApi = () => {
    return axios.get(`${process.env.PUBLIC_URL}/api/task.json`);
};

export const fetchProjectApi = () => {
    return axios.get(`${process.env.PUBLIC_URL}/api/project.json`);
};
