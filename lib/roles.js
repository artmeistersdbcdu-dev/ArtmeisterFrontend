export const ROLES = {
  PRESIDENT: "president",
  VICE_PRESIDENT: "vice_president",
  GENERAL_SECRETARY: "general_secretary",
  LOGISTIC: "logistic",
  SOCIAL_MEDIA_HEAD: "social_media_head",
  CONTENT_HEAD: "content_head",
  CORE_MEMBER: "core_member",
  MEMBER: "member",
};

export const ROLE_WEIGHTS = {
  [ROLES.PRESIDENT]: 7,
  [ROLES.VICE_PRESIDENT]: 6,
  [ROLES.GENERAL_SECRETARY]: 5,
  [ROLES.LOGISTIC]: 4,
  [ROLES.SOCIAL_MEDIA_HEAD]: 3,
  [ROLES.CONTENT_HEAD]: 2,
  [ROLES.CORE_MEMBER]: 1,
  [ROLES.MEMBER]: 0,
};

export const ROLE_DISPLAY = {
  [ROLES.PRESIDENT]: "President",
  [ROLES.VICE_PRESIDENT]: "Vice President",
  [ROLES.GENERAL_SECRETARY]: "General Secretary",
  [ROLES.LOGISTIC]: "Logistic",
  [ROLES.SOCIAL_MEDIA_HEAD]: "Social Media Head",
  [ROLES.CONTENT_HEAD]: "Content Head",
  [ROLES.CORE_MEMBER]: "Core Member",
  [ROLES.MEMBER]: "Member",
};

export const ROLE_ORDER = [
  ROLES.PRESIDENT,
  ROLES.VICE_PRESIDENT,
  ROLES.GENERAL_SECRETARY,
  ROLES.LOGISTIC,
  ROLES.SOCIAL_MEDIA_HEAD,
  ROLES.CONTENT_HEAD,
  ROLES.CORE_MEMBER,
  ROLES.MEMBER,
];

export const getRoleWeight = (role) => ROLE_WEIGHTS[role] ?? -1;

export const getRoleDisplay = (role) => ROLE_DISPLAY[role] || "Member";

export const canModerate = (user) =>
  getRoleWeight(user?.Role) >= ROLE_WEIGHTS[ROLES.VICE_PRESIDENT];

export const canAssignRoles = (user) =>
  getRoleWeight(user?.Role) >= ROLE_WEIGHTS[ROLES.PRESIDENT];
