import routine from 'promise-routine';
import request from 'request-promise';

export default function uuid(username, time = null) {
  if (Array.isArray(username)) {
    if (time) {
      const tuples = username.map(name => [name, time]);
      return routine(history, ...tuples);
    }

    return request({
      method: 'POST',
      uri: 'https://api.mojang.com/profiles/minecraft',
      body: username,
      json: true,
    });
  }

  if (typeof username === 'object' && !Array.isArray(username)) {
    const tuples = [];
    for (const name in username) {
      if (username.hasOwnProperty(name)) {
        tuples.push([name, username[name]]);
      }
    }
    return routine(history, ...tuples);
  }

  return request({
    uri: `https://api.mojang.com/users/profiles/minecraft/${username}${time ? `?at=${time}` : ''}`,
    json: true,
  });
}
