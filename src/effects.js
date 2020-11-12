import axios from 'axios';

export async function getPatient(id) {
    const config = {
        method: 'get',
        url: 'https://proxy-ascom.herokuapp.com/CandidateApi/Patient/Get/' + id,
        headers: {
            'Authorization': 'Basic dGVzdDpUZXN0TWVQbGVhc2Uh',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
        }
    };
    const resp = await axios(config);
    return resp
}

export async function getList() {
    const config = {
        method: 'get',
        url: 'https://proxy-ascom.herokuapp.com/CandidateApi/Patient/GetList',
        headers: {
            'Authorization': 'Basic dGVzdDpUZXN0TWVQbGVhc2Uh',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
        }
    };
    const response = await axios(config)
    const res = response.data.map(entry => {
        return {
            ...entry,
            parameters: entry.parameters.length,
            alarm: entry.parameters.some(a => a.alarm === true)
        }
    })
    return res;
}

export async function savePatient(data) {

const config = {
  method: 'post',
  url: 'https://proxy-ascom.herokuapp.com/CandidateApi/Patient/Update',
  headers: { 
    'Authorization': 'Basic dGVzdDpUZXN0TWVQbGVhc2Uh', 
    'Content-Type': 'application/json'
  },
  data : data
};

const response = await axios(config)
return response;
}