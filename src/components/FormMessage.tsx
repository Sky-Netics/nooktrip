import { cn } from "@/lib/utils";

export function FormMessage({
  message,
  type = "default",
}: {
  message?: string[];
  type: "default" | "success" | "error";
}) {
  if (!message) return null;
  return message.map((msg: string, index: number) => (
    <div
      key={index}
      className={cn("text-foreground text-xs my-1", {
        "text-red-500": type === "error",
        "text-green-600": type === "success",
      })}
    >
      {msg}
    </div>
  ));
}
