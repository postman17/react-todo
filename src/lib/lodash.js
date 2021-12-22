export const isEmptyString = (obj) => (!obj || obj.length === 0 );
export const isTaskIdExist = (obj) => !isNaN(parseInt(obj));