export const getHoroscope = async (sign, day = 'today') => {
  const URL = `https://aztro.sameerkumar.website/?sign=${sign}&day=${day}`;
  const response = await fetch(URL, {
    method: 'POST',
  });
  const json = await response.json();

  return json;
};
