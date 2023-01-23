export function setCookie(
  cName: string,
  cValue: string,
  expFromEpoch: number
): string {
  //console.log(expFromEpoch);
  const date: Date = new Date(expFromEpoch * 1000);
  const expires: string = "expires=" + date.toUTCString();
  document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
  return cValue;
}

export function getCookie(cName: string): string {
  const name: string = cName + "=";
  const cDecoded: string = document.cookie;
  const cArr: string[] = cDecoded.split("; ");
  let res: string = "";
  cArr.forEach((val) => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  });
  return res;
}
