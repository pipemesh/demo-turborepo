export type Event = { type: string; at: string; data: Record<string, unknown> };
export const event = (type: string, data: Record<string, unknown> = {}): Event =>
  ({ type, at: new Date(0).toISOString(), data });
export const describe = (e: Event): string => `${e.type} ${JSON.stringify(e.data)}`;
