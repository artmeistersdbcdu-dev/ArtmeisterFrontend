import {
  Crown,
  Star,
  Shield,
  Wrench,
  Megaphone,
  Pen,
  Medal,
  UserRound,
} from "lucide-react";
import { ROLES, ROLE_DISPLAY } from "@/lib/roles";
import { Badge } from "@/components/ui/badge";

const ROLE_ICONS = {
  [ROLES.PRESIDENT]: Crown,
  [ROLES.VICE_PRESIDENT]: Star,
  [ROLES.GENERAL_SECRETARY]: Shield,
  [ROLES.LOGISTIC]: Wrench,
  [ROLES.SOCIAL_MEDIA_HEAD]: Megaphone,
  [ROLES.CONTENT_HEAD]: Pen,
  [ROLES.CORE_MEMBER]: Medal,
  [ROLES.MEMBER]: UserRound,
};

const ROLE_BADGE_STYLES = {
  [ROLES.PRESIDENT]: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  [ROLES.VICE_PRESIDENT]: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  [ROLES.GENERAL_SECRETARY]:
    "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  [ROLES.LOGISTIC]: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  [ROLES.SOCIAL_MEDIA_HEAD]:
    "bg-pink-500/10 text-pink-400 border-pink-500/20",
  [ROLES.CONTENT_HEAD]: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  [ROLES.CORE_MEMBER]: "bg-teal-500/10 text-teal-400 border-teal-500/20",
  [ROLES.MEMBER]: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

const RoleBadge = ({ role, className }) => {
  const Icon = ROLE_ICONS[role] || UserRound;
  const style = ROLE_BADGE_STYLES[role] || ROLE_BADGE_STYLES[ROLES.MEMBER];

  return (
    <Badge
      variant="outline"
      className={`font-medium flex items-center gap-1 ${style} ${className || ""}`}
    >
      <Icon className="w-3 h-3" />
      {ROLE_DISPLAY[role] || "Member"}
    </Badge>
  );
};

export { RoleBadge, ROLE_ICONS, ROLE_BADGE_STYLES };
