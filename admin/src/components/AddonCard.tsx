import { useEffect } from "react";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardFooter, CardHeader } from "./ui/card";
import { Settings } from "lucide-react";

declare global {
  interface Window {
    SPWAAdmin?: {
      ajax_url: string;
      nonce: string;
    };
  }
}

interface AddonCardProps {
  name: string;
  description: string;
  type: "free" | "premium";
  enabled: boolean;
  onToggle?: (enabled: boolean) => void;
  onConfigure: () => void;
}

export function AddonCard({
  name,
  description,
  type,
  enabled,
  onToggle,
  onConfigure,
}: AddonCardProps) {
  const { ajax_url, nonce } = window.SPWAAdmin ?? {};

  if (!ajax_url || !nonce) {
    throw new Error(
      "SPWAAdmin is not available. Did you enqueue wp_localize_script?"
    );
  }

  const addonSlug = name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  const handleToggle = async () => {
    try {
      const response = await fetch(`/wordpress/wp-json/spwa/v1/addon-toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-WP-Nonce": nonce,
        },
        body: JSON.stringify({
          addon_slug: addonSlug,
          enabled: !enabled,
        }),
      });

      const data = await response.json();

      if (data.success) {
        onToggle?.(!enabled);
        
      } else {
        console.error("Toggle failed:", data.message);
        alert("Failed to update addon. Check console for details.");
      }
    } catch (err) {
      console.error("Request error:", err);
      alert("An error occurred while toggling the addon.");
    }
  };

  return (
    <Card className="group hover:shadow-md transition-shadow duration-200 border border-border h-full flex flex-col">
      <CardHeader className="pb-2 md:pb-3 flex-1 p-3 md:p-6">
        <div className="flex items-start justify-between gap-2 md:gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium leading-tight text-sm break-words">
              {name}
            </h3>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2 md:line-clamp-3 break-words leading-relaxed">
              {description}
            </p>
          </div>
          <Badge
            variant={type === "premium" ? "default" : "secondary"}
            className={`${
              type === "premium"
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
            } flex-shrink-0 text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 h-auto`}
          >
            {type === "premium" ? "Premium" : "Free"}
          </Badge>
        </div>
      </CardHeader>

      <CardFooter className="px-3 md:px-6 pb-3 pt-0 flex flex-col gap-2 md:gap-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Switch
              checked={enabled}
              onCheckedChange={handleToggle}
              className="data-[state=checked]:bg-primary scale-75 md:scale-100"
            />
            <span className="text-xs text-muted-foreground">
              {enabled ? "Enabled" : "Disabled"}
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            // onClick={onConfigure}
            disabled={!enabled}
            className="flex items-center gap-1.5 hover:bg-accent text-xs h-7 px-2 md:h-8 md:px-3"
          >
            <Settings className="w-3 h-3" />
            <span className="lg:block hide"></span>
            <span className="lg:hide"></span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
