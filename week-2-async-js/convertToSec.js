const convert = (minutes) => {
  const conversion = minutes * 60;
  return `${minutes} minutes is equal to ${conversion} seconds`;
};

console.log(convert(10));
