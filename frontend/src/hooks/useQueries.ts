import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { UserProfile, DailyCheckIn, RiskAssessment } from '../backend';
import { Principal } from '@dfinity/principal';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useSubmitCheckIn() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (checkIn: DailyCheckIn) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitCheckIn(checkIn);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checkIns'] });
      queryClient.invalidateQueries({ queryKey: ['checkInByDate'] });
      queryClient.invalidateQueries({ queryKey: ['currentRiskAssessment'] });
      queryClient.invalidateQueries({ queryKey: ['riskHistory'] });
    },
  });
}

export function useGetCheckInByDate(date: string) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<DailyCheckIn | null>({
    queryKey: ['checkInByDate', date],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCheckInByDate(date);
    },
    enabled: !!actor && !actorFetching && !!date,
  });
}

export function useGetCallerCheckIns(limit: number = 30) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<DailyCheckIn[]>({
    queryKey: ['checkIns', limit],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCallerCheckIns(BigInt(limit));
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetCurrentRiskAssessment() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<RiskAssessment | null>({
    queryKey: ['currentRiskAssessment'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCurrentRiskAssessment();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetRiskHistory(limit: number = 30) {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<Array<[DailyCheckIn, RiskAssessment]>>({
    queryKey: ['riskHistory', limit],
    queryFn: async () => {
      if (!actor || !identity) return [];
      const principal = Principal.fromText(identity.getPrincipal().toString());
      return actor.getRiskHistory(principal, BigInt(limit));
    },
    enabled: !!actor && !actorFetching && !!identity,
  });
}
