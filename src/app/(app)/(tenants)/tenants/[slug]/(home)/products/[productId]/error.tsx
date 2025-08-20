"use client";

import { TriangleAlertIcon } from "lucide-react";

import { SystemMessage } from "@/components/system-message";

const ErrorPage = () => {
  return (
    <SystemMessage Icon={TriangleAlertIcon} message="Something went wrong." />
  );
};

export default ErrorPage;
