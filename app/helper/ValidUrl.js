const isValidImageUrl = (url) => {
  return /^(http|https):\/\/\S+\.\S+$/.test(url) ? url:'https://i.pinimg.com/736x/de/59/4e/de594ec09881da3fa66d98384a3c72ff.jpg';
  };
export default isValidImageUrl;