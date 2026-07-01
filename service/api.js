const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function api(endpoint, options = {}) {
  const isFormData = options.body instanceof FormData;

  const res = await fetch(`${backendUrl}${endpoint}`, {
    credentials: "include",

    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),

      ...options.headers,
    },

    ...options,
  });
  console.log(`${backendUrl}${endpoint}`);
  

  const data = await res.json();
  console.log(data,"res");
  
  if (!res.ok) {
    throw new Error(data.Data.Error || "Something went wrong");
  }

  return data;
}
