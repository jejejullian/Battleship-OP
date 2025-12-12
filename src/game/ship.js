export const Ship = (length) => {
  return {
    length: length,
    hits: 0,
    sunk: false,
    hit(){ this.hits++ },
    isSunk(){ return this.hits >= this.length }
  };
};