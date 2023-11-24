// const frontendUrl = 'http://localhost:4200/';
// const backendUrl = 'http://localhost:8080/';
// const loginUrl = 'http://localhost:4200/login';

const frontendUrl = 'https://dev.tube.freedom.buzz/';
const backendUrl = 'https://dev-api.freedom.buzz/';
const loginUrl = 'https://dev.freedom.buzz/login';
const wasabiUrl = 'https://freedom-social.s3.us-east-1.wasabisys.com/'


export const environment = {
  production: true,
  frontendUrl: frontendUrl,
  backendUrl: backendUrl,
  loginUrl: loginUrl,
  apiUrl: `${backendUrl}api/v1/`,
  domain: 'freedom.buzz',
  wasabiUrl: wasabiUrl,
  socketUrl: `${backendUrl}`,
  conferenceUrl: 'https://facetime.tube/'
};

