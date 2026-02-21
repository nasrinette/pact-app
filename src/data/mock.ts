import { User, Pact, Submission, StreakData, Notification } from './types';

export const currentUser: User = {
  id: 'u1',
  name: 'You',
  username: 'you',
  avatar: 'https://i.pravatar.cc/150?img=1',
  isCurrentUser: true,
};

export const users: User[] = [
  currentUser,
  { id: 'u2', name: 'Sarah Chen', username: 'sarah', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: 'u3', name: 'Jake Miller', username: 'jake', avatar: 'https://i.pravatar.cc/150?img=8' },
  { id: 'u4', name: 'Emma Wilson', username: 'emma', avatar: 'https://i.pravatar.cc/150?img=9' },
  { id: 'u5', name: 'Alex Park', username: 'alex', avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: 'u6', name: 'Mia Johnson', username: 'mia', avatar: 'https://i.pravatar.cc/150?img=16' },
];

export const pacts: Pact[] = [
  {
    id: 'p1',
    title: 'Morning Run',
    icon: 'fitness',
    iconFamily: 'Ionicons',
    color: '#FF6B6B',
    frequency: 'daily',
    participants: ['u1', 'u2', 'u3'],
    createdAt: '2026-01-15',
    deadline: '23:59',
  },
  {
    id: 'p2',
    title: 'Read 30 Min',
    icon: 'book',
    iconFamily: 'Ionicons',
    color: '#FFE66D',
    frequency: 'daily',
    participants: ['u1', 'u4', 'u5'],
    createdAt: '2026-01-20',
    deadline: '23:59',
  },
  {
    id: 'p3',
    title: 'Healthy Meals',
    icon: 'restaurant',
    iconFamily: 'Ionicons',
    color: '#95E1D3',
    frequency: 'weekly',
    timesPerWeek: 5,
    participants: ['u1', 'u2', 'u6'],
    createdAt: '2026-01-10',
    deadline: '23:59',
  },
  {
    id: 'p4',
    title: 'Meditate',
    icon: 'leaf',
    iconFamily: 'Ionicons',
    color: '#4ECDC4',
    frequency: 'daily',
    participants: ['u1', 'u3', 'u4', 'u6'],
    createdAt: '2026-02-01',
    deadline: '22:00',
  },
  {
    id: 'p5',
    title: 'No Phone Before 9am',
    icon: 'phone-portrait-outline',
    iconFamily: 'Ionicons',
    color: '#F38181',
    frequency: 'daily',
    participants: ['u1', 'u5'],
    createdAt: '2026-02-05',
    deadline: '09:00',
  },
];

const today = new Date().toISOString().split('T')[0];

function generateDates(daysBack: number, skipRandom = false): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = daysBack; i >= 0; i--) {
    if (skipRandom && Math.random() < 0.15) continue;
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
}

export const submissions: Submission[] = [
  // Today's submissions (dynamic)
  { id: 's19', pactId: 'p1', userId: 'u1', photoUri: 'https://picsum.photos/seed/run6/400/400', timestamp: `${today}T07:15:00Z`, verified: true },
  { id: 's20', pactId: 'p1', userId: 'u2', photoUri: 'https://picsum.photos/seed/run7/400/400', timestamp: `${today}T06:30:00Z`, verified: true },
  { id: 's21', pactId: 'p2', userId: 'u1', photoUri: 'https://picsum.photos/seed/book5/400/400', timestamp: `${today}T08:00:00Z`, verified: true },
  { id: 's22', pactId: 'p4', userId: 'u6', photoUri: 'https://picsum.photos/seed/med5/400/400', timestamp: `${today}T06:45:00Z`, verified: true },
  { id: 's23', pactId: 'p4', userId: 'u1', photoUri: 'https://picsum.photos/seed/med6/400/400', timestamp: `${today}T07:00:00Z`, verified: true },
  { id: 's24', pactId: 'p5', userId: 'u1', photoUri: 'https://picsum.photos/seed/phone3/400/400', timestamp: `${today}T08:55:00Z`, verified: true },
  // Yesterday
  { id: 's1', pactId: 'p1', userId: 'u2', photoUri: 'https://picsum.photos/seed/run1/400/400', timestamp: '2026-02-18T07:30:00Z', verified: true },
  { id: 's2', pactId: 'p1', userId: 'u3', photoUri: 'https://picsum.photos/seed/run2/400/400', timestamp: '2026-02-18T06:45:00Z', verified: true },
  { id: 's3', pactId: 'p2', userId: 'u4', photoUri: 'https://picsum.photos/seed/book1/400/400', timestamp: '2026-02-18T08:00:00Z', verified: true },
  { id: 's4', pactId: 'p4', userId: 'u6', photoUri: 'https://picsum.photos/seed/med1/400/400', timestamp: '2026-02-18T06:00:00Z', verified: true },
  { id: 's5', pactId: 'p3', userId: 'u2', photoUri: 'https://picsum.photos/seed/meal1/400/400', timestamp: '2026-02-17T19:30:00Z', verified: true },
  { id: 's6', pactId: 'p1', userId: 'u1', photoUri: 'https://picsum.photos/seed/run3/400/400', timestamp: '2026-02-17T07:00:00Z', verified: true },
  { id: 's7', pactId: 'p2', userId: 'u5', photoUri: 'https://picsum.photos/seed/book2/400/400', timestamp: '2026-02-17T21:00:00Z', verified: true },
  { id: 's8', pactId: 'p4', userId: 'u3', photoUri: 'https://picsum.photos/seed/med2/400/400', timestamp: '2026-02-17T07:15:00Z', verified: true },
  { id: 's9', pactId: 'p3', userId: 'u6', photoUri: 'https://picsum.photos/seed/meal2/400/400', timestamp: '2026-02-17T12:30:00Z', verified: true },
  { id: 's10', pactId: 'p1', userId: 'u2', photoUri: 'https://picsum.photos/seed/run4/400/400', timestamp: '2026-02-16T07:30:00Z', verified: true },
  { id: 's11', pactId: 'p5', userId: 'u5', photoUri: 'https://picsum.photos/seed/phone1/400/400', timestamp: '2026-02-18T09:05:00Z', verified: true },
  { id: 's12', pactId: 'p4', userId: 'u4', photoUri: 'https://picsum.photos/seed/med3/400/400', timestamp: '2026-02-16T06:30:00Z', verified: true },
  { id: 's13', pactId: 'p2', userId: 'u1', photoUri: 'https://picsum.photos/seed/book3/400/400', timestamp: '2026-02-16T22:00:00Z', verified: true },
  { id: 's14', pactId: 'p3', userId: 'u1', photoUri: 'https://picsum.photos/seed/meal3/400/400', timestamp: '2026-02-16T13:00:00Z', verified: true },
  { id: 's15', pactId: 'p1', userId: 'u3', photoUri: 'https://picsum.photos/seed/run5/400/400', timestamp: '2026-02-15T06:50:00Z', verified: true },
  { id: 's16', pactId: 'p4', userId: 'u1', photoUri: 'https://picsum.photos/seed/med4/400/400', timestamp: '2026-02-15T07:00:00Z', verified: true },
  { id: 's17', pactId: 'p2', userId: 'u4', photoUri: 'https://picsum.photos/seed/book4/400/400', timestamp: '2026-02-15T20:30:00Z', verified: true },
  { id: 's18', pactId: 'p5', userId: 'u1', photoUri: 'https://picsum.photos/seed/phone2/400/400', timestamp: '2026-02-17T09:00:00Z', verified: true },
];

// Streaks are group-based: for a streak to continue, ALL participants must complete the task.
// Daily pacts: streak = consecutive days completed. Weekly pacts: streak = consecutive weeks meeting the target.
export const streakData: StreakData[] = [
  // p1: Morning Run — daily, group streak 12 days, longest 18 days
  { pactId: 'p1', userId: 'u1', currentStreak: 12, longestStreak: 18, completedDates: generateDates(30), streakType: 'daily' },
  { pactId: 'p1', userId: 'u2', currentStreak: 12, longestStreak: 18, completedDates: generateDates(30), streakType: 'daily' },
  { pactId: 'p1', userId: 'u3', currentStreak: 12, longestStreak: 18, completedDates: generateDates(30), streakType: 'daily' },
  // p2: Read 30 Min — daily, group streak 22 days, longest 22 days
  { pactId: 'p2', userId: 'u1', currentStreak: 22, longestStreak: 22, completedDates: generateDates(30), streakType: 'daily' },
  { pactId: 'p2', userId: 'u4', currentStreak: 22, longestStreak: 22, completedDates: generateDates(30), streakType: 'daily' },
  { pactId: 'p2', userId: 'u5', currentStreak: 22, longestStreak: 22, completedDates: generateDates(30), streakType: 'daily' },
  // p3: Healthy Meals — weekly (5x/week), group streak 4 weeks, longest 6 weeks
  { pactId: 'p3', userId: 'u1', currentStreak: 4, longestStreak: 6, completedDates: generateDates(30), streakType: 'weekly' },
  { pactId: 'p3', userId: 'u2', currentStreak: 4, longestStreak: 6, completedDates: generateDates(30), streakType: 'weekly' },
  { pactId: 'p3', userId: 'u6', currentStreak: 4, longestStreak: 6, completedDates: generateDates(30), streakType: 'weekly' },
  // p4: Meditate — daily, group streak 5 days, longest 10 days
  { pactId: 'p4', userId: 'u1', currentStreak: 5, longestStreak: 10, completedDates: generateDates(17), streakType: 'daily' },
  { pactId: 'p4', userId: 'u3', currentStreak: 5, longestStreak: 10, completedDates: generateDates(17), streakType: 'daily' },
  { pactId: 'p4', userId: 'u4', currentStreak: 5, longestStreak: 10, completedDates: generateDates(17), streakType: 'daily' },
  { pactId: 'p4', userId: 'u6', currentStreak: 5, longestStreak: 10, completedDates: generateDates(17), streakType: 'daily' },
  // p5: No Phone Before 9am — daily, group streak 6 days, longest 13 days
  { pactId: 'p5', userId: 'u1', currentStreak: 6, longestStreak: 13, completedDates: generateDates(13), streakType: 'daily' },
  { pactId: 'p5', userId: 'u5', currentStreak: 6, longestStreak: 13, completedDates: generateDates(13), streakType: 'daily' },
];

export const notifications: Notification[] = [
  { id: 'n1', type: 'nudge', fromUserId: 'u2', pactId: 'p1', message: "Sarah nudged you: Don't break the streak! Go for your run!", timestamp: '2026-02-18T10:00:00Z', read: false },
  { id: 'n2', type: 'deadline_warning', pactId: 'p4', message: 'Meditation deadline is in 2 hours! Your pact friends are waiting.', timestamp: '2026-02-18T20:00:00Z', read: false },
  { id: 'n3', type: 'new_submission', fromUserId: 'u3', pactId: 'p1', message: 'Jake just submitted his morning run!', timestamp: '2026-02-18T06:45:00Z', read: true },
  { id: 'n4', type: 'streak_milestone', pactId: 'p2', message: 'Amazing! 22-day reading streak!', timestamp: '2026-02-17T22:00:00Z', read: true },
  { id: 'n5', type: 'streak_milestone', pactId: 'p3', message: '4-week Healthy Meals streak! Keep it going!', timestamp: '2026-02-16T18:00:00Z', read: true },
  { id: 'n6', type: 'deadline_warning', pactId: 'p3', message: 'Healthy Meals: 3 of 5 done this week. 2 days left to hit your target!', timestamp: '2026-02-18T09:00:00Z', read: false },
];

export function getUserById(id: string): User | undefined {
  return users.find(u => u.id === id);
}

export function getPactById(id: string): Pact | undefined {
  return pacts.find(p => p.id === id);
}

export function getSubmissionsForPact(pactId: string): Submission[] {
  return submissions.filter(s => s.pactId === pactId).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export function getStreakForUserPact(pactId: string, userId: string): StreakData | undefined {
  return streakData.find(s => s.pactId === pactId && s.userId === userId);
}

export function getParticipants(pact: Pact): User[] {
  return pact.participants.map(id => getUserById(id)).filter(Boolean) as User[];
}

export function getPendingParticipants(pact: Pact): User[] {
  const today = new Date().toISOString().split('T')[0];
  const todaySubmissions = submissions.filter(
    (s) => s.pactId === pact.id && s.timestamp.split('T')[0] === today
  );
  const submittedUserIds = new Set(todaySubmissions.map((s) => s.userId));
  return pact.participants
    .filter((id) => !submittedUserIds.has(id) && id !== 'u1')
    .map((id) => getUserById(id))
    .filter(Boolean) as User[];
}

export function getCompletionRate(pactId: string, userId: string): number {
  const pact = getPactById(pactId);
  if (!pact) return 0;
  const streak = getStreakForUserPact(pactId, userId);
  if (!streak) return 0;
  const daysInWindow = pact.frequency === 'daily' ? 7 : 7;
  const target = pact.frequency === 'daily' ? daysInWindow : (pact.timesPerWeek || 3);
  const recentDates = streak.completedDates.slice(-daysInWindow);
  return Math.min(1, recentDates.length / target);
}

export function getUnreadNotificationCount(): number {
  return notifications.filter(n => !n.read).length;
}

export function getAggregateActivity(userId: string): Record<string, number> {
  const activity: Record<string, number> = {};
  streakData
    .filter(s => s.userId === userId)
    .forEach(s => {
      s.completedDates.forEach(date => {
        activity[date] = (activity[date] || 0) + 1;
      });
    });
  return activity;
}

export function getRecentActivity(): (Submission & { user: User; pact: Pact })[] {
  return submissions
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10)
    .map(s => ({
      ...s,
      user: getUserById(s.userId)!,
      pact: getPactById(s.pactId)!,
    }))
    .filter(s => s.user && s.pact);
}
