// Database placeholder - not needed for this version
// Access codes are stored in memory in verify-code/route.ts

export const db = {
  accessCode: {
    findUnique: async () => null,
    create: async () => null,
  },
  user: {
    findUnique: async () => null,
    create: async () => null,
  },
  campaign: {
    create: async () => null,
    findMany: async () => [],
  },
};
