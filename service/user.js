import { api } from "./api";

export const usrById=(id)=>{
  
  return api(`/auth/users/${id}`);
}
export const getAllUser=()=>{
  return api(`/auth/users`);
}
export const getAllApprovedUser=()=>{
  return api(`/auth/main-users`);
}
export const getAllCoreMemberUser=()=>{
  return api(`/auth/core-member`);
}
export const updateUser = async (id, data) => {
  return api(`/auth/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

};