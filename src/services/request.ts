import fly from "./fly";

const get = (url: string, params: any) => {
  return new Promise((resolve, reject) => {
    fly
      .get(url, params)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export { get };
