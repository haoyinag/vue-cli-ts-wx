import fly from "../fly";

export const getAssureResult = (params: any) => {
  return new Promise(resolve => {
    fly.get(`/jeecg-boot/bh/bhProject/authenticate`, params).then(response => {
      resolve(response);
    });
  });
};
