"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { adminService, GlobalSettings } from "../../lib/adminService";

interface ThemeControllerProps {
    initialSettings: GlobalSettings | null | undefined;
}

const ThemeController = ({ initialSettings }: ThemeControllerProps) => {
    const pathname = usePathname();

    useEffect(() => {
        const applySettings = (settings: GlobalSettings) => {
            try {
                // Apply SEO Settings
                if (settings && settings.siteTitle) {
                    if (!document.title.includes("|")) {
                        document.title = settings.siteTitle;
                    }
                }

                // Apply Animations
                if (settings && settings.enableAnimations === false) {
                    document.body.classList.add("reduce-motion");
                } else {
                    document.body.classList.remove("reduce-motion");
                }
            } catch (error) {
                console.error("Failed to apply global settings", error);
            }
        };

        const loadAndApply = async () => {
            // If initialSettings is null or defined, it means the server already 
            // attempted to fetch (even if it found nothing). 
            // We only fetch on client if it's strictly undefined.
            if (initialSettings !== undefined) {
                if (initialSettings) applySettings(initialSettings);
                return;
            }

            try {
                const settings = await adminService.getGlobalSettings();
                if (settings) applySettings(settings);
            } catch (error) {
                console.error("Failed to load global settings", error);
            }
        };

        loadAndApply();
    }, [pathname, initialSettings]);

    return null;
};

export default ThemeController;
