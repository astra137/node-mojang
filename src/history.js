import routine from 'promise-routine';
import request from 'request-promise';

export default function history(uuid) {
  if (Array.isArray(uuid)) return routine(history, ...uuid);

  return request({
    uri: `https://api.mojang.com/user/profiles/${uuid}/names`,
    json: true,
  });
}
