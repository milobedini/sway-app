export function nameof<TObject, K extends keyof TObject>(
  obj: TObject,
  key: K
): string;

export function nameof<TObject>(key: keyof TObject): string;
export function nameof(nested: Record<string, unknown>): string;
export function nameof(key1: unknown, key2?: string): string {
  return (
    key2 ??
    (typeof key1 === "object" && key1 ? Object.keys(key1)[0] : (key1 as string))
  );
}
