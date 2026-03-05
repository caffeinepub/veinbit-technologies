import { useMutation, useQuery } from "@tanstack/react-query";
import { useActor } from "./useActor";

export interface Stats {
  projectsCompleted: number;
  clients: number;
  technologiesUsed: number;
  yearsOfExperience: number;
}

const FALLBACK_STATS: Stats = {
  projectsCompleted: 150,
  clients: 80,
  technologiesUsed: 30,
  yearsOfExperience: 5,
};

export function useStats() {
  const { actor, isFetching } = useActor();
  return useQuery<Stats>({
    queryKey: ["stats"],
    queryFn: async () => {
      if (!actor) return FALLBACK_STATS;
      try {
        const raw = await actor.getStats();
        return {
          projectsCompleted: Number(raw.projectsCompleted),
          clients: Number(raw.clients),
          technologiesUsed: Number(raw.technologiesUsed),
          yearsOfExperience: Number(raw.yearsOfExperience),
        };
      } catch {
        return FALLBACK_STATS;
      }
    },
    enabled: !isFetching,
    placeholderData: FALLBACK_STATS,
  });
}

export function useSubmitContact() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
    }: {
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.submitContact(name, email, message);
    },
  });
}
