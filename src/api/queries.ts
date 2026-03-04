import { useQuery } from '@tanstack/react-query';
import { api } from './client';
import { queryKeys } from './queryKeys';
import { useAuth } from '@/contexts/AuthContext';
import { User, Pact, Submission, StreakData, Notification, ChatMessage } from '@/data/types';

export interface PactWithDetails extends Pact {
  participantDetails?: User[];
}

export function usePacts() {
  const { token } = useAuth();
  return useQuery({
    queryKey: queryKeys.pacts.all,
    queryFn: () => api.get<PactWithDetails[]>('/pacts'),
    enabled: !!token,
  });
}

export function useUsers() {
  const { token } = useAuth();
  return useQuery({
    queryKey: queryKeys.users.all,
    queryFn: () => api.get<User[]>('/users'),
    enabled: !!token,
  });
}

export function useStreaks() {
  const { token } = useAuth();
  return useQuery({
    queryKey: queryKeys.streaks.all,
    queryFn: () => api.get<StreakData[]>('/streaks'),
    enabled: !!token,
  });
}

export function useNotifications() {
  const { token } = useAuth();
  return useQuery({
    queryKey: queryKeys.notifications.all,
    queryFn: () => api.get<Notification[]>('/notifications'),
    enabled: !!token,
  });
}

export function useStreakActivity() {
  const { token } = useAuth();
  return useQuery({
    queryKey: queryKeys.streaks.activity,
    queryFn: () => api.get<Record<string, number>>('/streaks/activity'),
    enabled: !!token,
  });
}

export function useRecentActivity() {
  const { token } = useAuth();
  return useQuery({
    queryKey: queryKeys.submissions.recent,
    queryFn: () => api.get<(Submission & { user: User; pact: Pact })[]>('/submissions/recent'),
    enabled: !!token,
  });
}

export interface UserSearchResult {
  id: string;
  name: string;
  username: string;
  avatar: string;
  friendshipStatus: 'none' | 'pending' | 'accepted' | 'declined';
  friendshipDirection: 'outgoing' | 'incoming' | null;
  friendshipId: string | null;
}

export interface FriendRequest {
  friendshipId: string;
  id: string;
  name: string;
  username: string;
  avatar: string;
  createdAt: string;
}

export function useUserSearch(query: string) {
  const { token } = useAuth();
  return useQuery({
    queryKey: queryKeys.users.search(query),
    queryFn: () => api.get<UserSearchResult[]>(`/users/search?q=${encodeURIComponent(query)}`),
    enabled: !!token && query.length >= 2,
  });
}

export function useFriendRequests() {
  const { token } = useAuth();
  return useQuery({
    queryKey: queryKeys.users.friendRequests,
    queryFn: () => api.get<FriendRequest[]>('/users/friend-requests'),
    enabled: !!token,
  });
}

export function usePactSubmissions(pactId: string) {
  const { token } = useAuth();
  return useQuery({
    queryKey: queryKeys.pacts.submissions(pactId),
    queryFn: () => api.get<(Submission & { user?: User })[]>(`/pacts/${pactId}/submissions`),
    enabled: !!token && !!pactId,
  });
}

export function usePactMessages(pactId: string) {
  const { token } = useAuth();
  return useQuery({
    queryKey: queryKeys.messages.forPact(pactId),
    queryFn: () => api.get<{ messages: ChatMessage[]; hasMore: boolean }>(`/pacts/${pactId}/messages`),
    enabled: !!token && !!pactId,
  });
}
