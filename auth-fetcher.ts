/** This is a custom fetecher for the GraphQL codegen
 * It checks if the user is logged in and if so, it adds the auth token to the request
 * It also sets the fetchParams.headers to an object containing application/json as the Content-Type
 * And sets the endpoint to "https://api.lens.dev/"
 */
const endpoint = "https://api.lens.dev/";

export const fetchData = <TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: RequestInit["headers"]
): (() => Promise<TData>) => {
  return async () => {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(options ?? {}),
        // TODO: Auth here
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0] || "Error..";
      throw new Error(message);
    }

    return json.data;
  };
};
