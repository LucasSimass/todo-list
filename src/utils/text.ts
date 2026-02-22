export const capitalize = (txt: string) => {
  if (txt.length == 0){ return ""; }

  return txt.charAt(0)!.toUpperCase() + txt.slice(1);
}