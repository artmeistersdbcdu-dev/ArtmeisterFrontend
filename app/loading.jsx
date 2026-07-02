import React from "react";

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-foreground"></div>
    </div>
  );
};

export default Loading;