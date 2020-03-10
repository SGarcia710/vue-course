const url = 'https://api.coincap.io/v2';

const getAssets = () => {
  return fetch(`${url}/assets?limit=20`)
    .then(res => res.json())
    .then(res => res.data);
};

export default {
  getAssets
};
