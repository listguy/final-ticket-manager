export default function network(
  endpoint,
  queryParams = {},
  { body, ...customConfig } = {}
) {
  const base_url = "/api/tickets";
  const qp = new URLSearchParams(queryParams);
  let query = qp !== "" ? `?${qp}` : "";

  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
  };

  console.log(
    `sending ${config.method} request to ${base_url}${endpoint}${query}`
  );

  return fetch(`${base_url}${endpoint}${query}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}
