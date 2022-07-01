import axios from 'axios';
import { SERVER_URL,HRC_ID } from '../utils/constants';


export function serviceCall() {
  return axios.post(`${SERVER_URL}`);
}

export function callDummyAPI(name) {
  return axios.post(
    `${SERVER_URL}${HRC_ID}/dummy.do?`,
    {},
    {
      headers: { 'Content-Type': 'application/json' },
      params: { name: name },
    }
  );
}
