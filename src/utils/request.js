import qsStringify from './queryStringify';
import config from 'config';

export default function request(options) {
  const {
    path,
    method,
    body,
    params,
    token
  } = Object.assign({
    method: 'GET',
  }, options);

  const headers = Object.assign({
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }, options.headers || {});

  const paramsPath = Object.keys(params || {}).length ? `?${qsStringify(params)}` : '';
  const endpoint = `${config.apiRoot}/${path.replace(/^\//, '')}${paramsPath}`;
  if (token) headers.Authorization = `Bearer ${token}`;
  let promise;
  if (method.toUpperCase() === 'GET') {
    promise = fetch(endpoint, { headers });
  } else {
    promise = fetch(endpoint, { method, headers, body: JSON.stringify(body) });
  }
  return new Promise((resolve, reject) => {
    promise.then(res => {
      if (![200, 201].includes(res.status)) {
        return reject(new Error('Bad status code from API'));
      }
      return res.text().then(response => {
        let json;
        try {
          json = JSON.parse(response);
        } catch (e) {
          return reject(new Error('Bad JSON response from API'));
        }
        if (!json) reject(new Error('Null JSON response from API'));
        const { error, data } = json;
        if (error) {
          return reject(new Error(error.message));
        }
        return resolve(data, response);
      }).catch(error => reject(error));
    }).catch(error => reject(error));
  });
}
