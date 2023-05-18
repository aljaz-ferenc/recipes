export function titleCase(word) {
    const string = word.toLowerCase().split(' ');
    for (let i = 0; i < string.length; i++) {
      string[i] = string[i].charAt(0).toUpperCase() + string[i].slice(1); 
    }
    return string.join(' ');
  }

export function tameText(string, number){
  if(string.length > number){
    return string.slice(0, number).padEnd(number + 3, '.')
  }else{
    return string
  }
}

export function getDaysDifference(commentDate) {
  const currentDate = new Date();
  const timeDifference = currentDate - new Date(commentDate).getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (daysDifference === 0) {
    return "today";
  } else if (daysDifference === 1) {
    return "yesterday";
  } else if (daysDifference > 1) {
    return `${daysDifference} days ago`;
  }
}