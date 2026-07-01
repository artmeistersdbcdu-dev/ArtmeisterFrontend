import { api } from "./api";

export const getPendingArt = async () => {
  return api("/art/pending-art", {
    method: "GET",
  });
};
export const changeArtStatus = async (id, status) => {
  return api(`/admin/arts/${id}/status?status=${status}`, {
    method: "PATCH",
  });
};
export const changeUserRoleStatus = async (id, payload) => {
  const { status, role } = payload;

  if ((status && role) || (!status && !role)) {
    throw new Error("Provide either status or role");
  }

  const query = status
    ? `status=${encodeURIComponent(status)}`
    : `role=${encodeURIComponent(role)}`;

  return api(`/admin/users/${id}/status?${query}`, {
    method: "PATCH",
  });
};
