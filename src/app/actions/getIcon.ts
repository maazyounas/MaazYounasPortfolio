"use server";

import { getIconComponent } from "@/components/admin/about/iconUtils";
import React from "react";

export async function getIconAction(name: string) {
  if (!name) return null;
  const Icon = await getIconComponent(name);
  if (!Icon) return null;
  return React.createElement(Icon, { className: "w-full h-full text-inherit" });
}
