export const cutAddress = (address: string) => {
  const str1 = address.slice(0, 3);
  const str2 = address.slice(address.length - 5, address.length);
  return str1 + "..." + str2;
};

export const parseBalance = (balance: string, decimals: number = 2) => {
  return parseFloat(balance).toFixed(decimals);
};

export const loadDefaultAvatar = (e: Event) => {
  const img = e.target as HTMLImageElement;
  img.src = new URL(`../src/assets/img/no-avatar.webp`, import.meta.url).href;
};

export const stringToBoolean = (str: string | null) => {
  return str === "true" ? true : false;
};

export const extractNumberFromString = (str: string) => {
  return +str.replace(/^\D+/g, "");
};

export const sleep = (ms: number = 250) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const fromNow = (date: string) => {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );
  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};
