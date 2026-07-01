import { api } from "./api";
export const loginUser = (formData) =>
  api("/auth/login", {
    method: "POST",
    body: JSON.stringify(formData),
  });

export const signUpUser = (formData) => {
  return api("/auth/users", {
    method: "POST",
    body: JSON.stringify(formData),
  });
};

export const getCurrUser = () => {
  return api("/auth/me");
};

export const logOutUser = () => {
  return api("/auth/logout", {
    method: "POST",
  });
};

export const forgotPassword = async (formData) => {
  const res = await fetch("/api/auth/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.Data?.Error || "Something went wrong");
  }
  return data;
};

export const resetPassword = async (formData) => {
  const res = await fetch("/api/auth/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.Data?.Error || "Something went wrong");
  }
  return data;
};

