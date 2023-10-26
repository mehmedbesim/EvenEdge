export async function getBoredAPI() {
  debugger;
  const response = await fetch('http://www.boredapi.com/api/activity/');
  const result = await response.json();
  return result;
}
