export interface TrainingSession {
  weekNumber: number;
  weekRange: string;
  dayName: string;
  date: string;
  time: string;
  sessionType: string;
  details: string;
}

export const trainingPlan: TrainingSession[] = [
  // Week 3
  { weekNumber: 3, weekRange: 'Feb 3 – Feb 9', dayName: 'Mon', date: 'Feb 3', time: '6:30 – 7:20 PM', sessionType: 'Easy Run', details: '7 km easy (7:45–8:15 / km)' },
  { weekNumber: 3, weekRange: 'Feb 3 – Feb 9', dayName: 'Tue', date: 'Feb 4', time: '6:30 – 7:30 PM', sessionType: 'Tempo Run', details: '1 km warm-up\n         5 km @ 7:25 / km\n         Cool down walk' },
  { weekNumber: 3, weekRange: 'Feb 3 – Feb 9', dayName: 'Wed', date: 'Feb 5', time: '6:30 – 7:20 PM', sessionType: 'Easy Run', details: '7 km easy' },
  { weekNumber: 3, weekRange: 'Feb 3 – Feb 9', dayName: 'Thu', date: 'Feb 6', time: '—', sessionType: 'Rest', details: 'Stretch / mobility 15–20 min' },
  { weekNumber: 3, weekRange: 'Feb 3 – Feb 9', dayName: 'Fri', date: 'Feb 7', time: '6:30 – 7:05 PM', sessionType: 'Easy Run', details: '5 km easy' },
  { weekNumber: 3, weekRange: 'Feb 3 – Feb 9', dayName: 'Sat', date: 'Feb 8', time: '6:00 – 8:00 AM', sessionType: 'Long Run', details: '14 km easy' },
  { weekNumber: 3, weekRange: 'Feb 3 – Feb 9', dayName: 'Sun', date: 'Feb 9', time: '—', sessionType: 'Rest', details: 'Full rest' },
  
  // Week 4
  { weekNumber: 4, weekRange: 'Feb 10 – Feb 16', dayName: 'Mon', date: 'Feb 10', time: '6:30 – 7:25 PM', sessionType: 'Easy Run', details: '8 km easy' },
  { weekNumber: 4, weekRange: 'Feb 10 – Feb 16', dayName: 'Tue', date: 'Feb 11', time: '6:30 – 7:35 PM', sessionType: 'Tempo Run', details: '1 km warm-up\n         6 km @ 7:20 / km' },
  { weekNumber: 4, weekRange: 'Feb 10 – Feb 16', dayName: 'Wed', date: 'Feb 12', time: '6:30 – 7:25 PM', sessionType: 'Easy Run', details: '8 km easy' },
  { weekNumber: 4, weekRange: 'Feb 10 – Feb 16', dayName: 'Thu', date: 'Feb 13', time: '—', sessionType: 'Rest', details: 'Stretch / mobility' },
  { weekNumber: 4, weekRange: 'Feb 10 – Feb 16', dayName: 'Fri', date: 'Feb 14', time: '6:30 – 7:05 PM', sessionType: 'Easy Run', details: '5 km easy' },
  { weekNumber: 4, weekRange: 'Feb 10 – Feb 16', dayName: 'Sat', date: 'Feb 15', time: '6:00 – 8:15 AM', sessionType: 'Long Run', details: '16 km easy' },
  { weekNumber: 4, weekRange: 'Feb 10 – Feb 16', dayName: 'Sun', date: 'Feb 16', time: '—', sessionType: 'Rest', details: 'Full rest' },
  
  // Week 5
  { weekNumber: 5, weekRange: 'Feb 17 – Feb 23', dayName: 'Mon', date: 'Feb 17', time: '6:30 – 7:30 PM', sessionType: 'Easy Run', details: '8 km easy' },
  { weekNumber: 5, weekRange: 'Feb 17 – Feb 23', dayName: 'Tue', date: 'Feb 18', time: '6:30 – 7:40 PM', sessionType: 'Tempo Run', details: '1 km warm-up\n         7 km @ 7:20 / km' },
  { weekNumber: 5, weekRange: 'Feb 17 – Feb 23', dayName: 'Wed', date: 'Feb 19', time: '6:30 – 7:30 PM', sessionType: 'Easy Run', details: '8 km easy' },
  { weekNumber: 5, weekRange: 'Feb 17 – Feb 23', dayName: 'Thu', date: 'Feb 20', time: '—', sessionType: 'Rest', details: 'Stretch / mobility' },
  { weekNumber: 5, weekRange: 'Feb 17 – Feb 23', dayName: 'Fri', date: 'Feb 21', time: '6:30 – 7:10 PM', sessionType: 'Easy Run', details: '5 km easy' },
  { weekNumber: 5, weekRange: 'Feb 17 – Feb 23', dayName: 'Sat', date: 'Feb 22', time: '6:00 – 8:30 AM', sessionType: 'Long Run', details: '18 km easy' },
  { weekNumber: 5, weekRange: 'Feb 17 – Feb 23', dayName: 'Sun', date: 'Feb 23', time: '—', sessionType: 'Rest', details: 'Full rest' },
  
  // Week 6
  { weekNumber: 6, weekRange: 'Feb 24 – Mar 2', dayName: 'Mon', date: 'Feb 24', time: '6:30 – 7:35 PM', sessionType: 'Easy Run', details: '9 km easy' },
  { weekNumber: 6, weekRange: 'Feb 24 – Mar 2', dayName: 'Tue', date: 'Feb 25', time: '6:30 – 7:45 PM', sessionType: 'Tempo Run', details: '1 km warm-up\n         8 km @ 7:15 / km' },
  { weekNumber: 6, weekRange: 'Feb 24 – Mar 2', dayName: 'Wed', date: 'Feb 26', time: '6:30 – 7:35 PM', sessionType: 'Easy Run', details: '9 km easy' },
  { weekNumber: 6, weekRange: 'Feb 24 – Mar 2', dayName: 'Thu', date: 'Feb 27', time: '—', sessionType: 'Rest', details: 'Stretch / mobility' },
  { weekNumber: 6, weekRange: 'Feb 24 – Mar 2', dayName: 'Fri', date: 'Feb 28', time: '6:30 – 7:10 PM', sessionType: 'Easy Run', details: '5 km easy' },
  { weekNumber: 6, weekRange: 'Feb 24 – Mar 2', dayName: 'Sat', date: 'Mar 1', time: '6:00 – 8:45 AM', sessionType: 'Long Run', details: '20 km easy' },
  { weekNumber: 6, weekRange: 'Feb 24 – Mar 2', dayName: 'Sun', date: 'Mar 2', time: '—', sessionType: 'Rest', details: 'Full rest' },
  
  // Week 7
  { weekNumber: 7, weekRange: 'Mar 3 – Mar 9', dayName: 'Mon', date: 'Mar 3', time: '6:30 – 7:35 PM', sessionType: 'Easy Run', details: '9 km easy' },
  { weekNumber: 7, weekRange: 'Mar 3 – Mar 9', dayName: 'Tue', date: 'Mar 4', time: '6:30 – 7:45 PM', sessionType: 'Tempo Run', details: '1 km warm-up\n         8 km @ 7:15 / km' },
  { weekNumber: 7, weekRange: 'Mar 3 – Mar 9', dayName: 'Wed', date: 'Mar 5', time: '6:30 – 7:35 PM', sessionType: 'Easy Run', details: '9 km easy' },
  { weekNumber: 7, weekRange: 'Mar 3 – Mar 9', dayName: 'Thu', date: 'Mar 6', time: '—', sessionType: 'Rest', details: 'Stretch / mobility' },
  { weekNumber: 7, weekRange: 'Mar 3 – Mar 9', dayName: 'Fri', date: 'Mar 7', time: '6:30 – 7:10 PM', sessionType: 'Easy Run', details: '5 km easy' },
  { weekNumber: 7, weekRange: 'Mar 3 – Mar 9', dayName: 'Sat', date: 'Mar 8', time: '6:00 – 9:00 AM', sessionType: 'Long Run', details: '22 km easy' },
  { weekNumber: 7, weekRange: 'Mar 3 – Mar 9', dayName: 'Sun', date: 'Mar 9', time: '—', sessionType: 'Rest', details: 'Full rest' },
  
  // Week 8
  { weekNumber: 8, weekRange: 'Mar 10 – Mar 16', dayName: 'Mon', date: 'Mar 10', time: '6:30 – 7:40 PM', sessionType: 'Easy Run', details: '10 km easy' },
  { weekNumber: 8, weekRange: 'Mar 10 – Mar 16', dayName: 'Tue', date: 'Mar 11', time: '6:30 – 7:50 PM', sessionType: 'Tempo Run', details: '1 km warm-up\n         9 km @ 7:10 / km' },
  { weekNumber: 8, weekRange: 'Mar 10 – Mar 16', dayName: 'Wed', date: 'Mar 12', time: '6:30 – 7:40 PM', sessionType: 'Easy Run', details: '10 km easy' },
  { weekNumber: 8, weekRange: 'Mar 10 – Mar 16', dayName: 'Thu', date: 'Mar 13', time: '—', sessionType: 'Rest', details: 'Stretch / mobility' },
  { weekNumber: 8, weekRange: 'Mar 10 – Mar 16', dayName: 'Fri', date: 'Mar 14', time: '6:30 – 7:10 PM', sessionType: 'Easy Run', details: '5 km easy' },
  { weekNumber: 8, weekRange: 'Mar 10 – Mar 16', dayName: 'Sat', date: 'Mar 15', time: '6:00 – 9:15 AM', sessionType: 'Long Run', details: '24 km easy\nFuel practice: gel every 45 min' },
  { weekNumber: 8, weekRange: 'Mar 10 – Mar 16', dayName: 'Sun', date: 'Mar 16', time: '—', sessionType: 'Rest', details: 'Full rest' },
  
  // Week 9
  { weekNumber: 9, weekRange: 'Mar 17 – Mar 23', dayName: 'Mon', date: 'Mar 17', time: '6:30 – 7:40 PM', sessionType: 'Easy Run', details: '10 km easy' },
  { weekNumber: 9, weekRange: 'Mar 17 – Mar 23', dayName: 'Tue', date: 'Mar 18', time: '6:30 – 7:55 PM', sessionType: 'Tempo Run', details: '1 km warm-up\n         10 km @ 7:10 / km' },
  { weekNumber: 9, weekRange: 'Mar 17 – Mar 23', dayName: 'Wed', date: 'Mar 19', time: '6:30 – 7:40 PM', sessionType: 'Easy Run', details: '10 km easy' },
  { weekNumber: 9, weekRange: 'Mar 17 – Mar 23', dayName: 'Thu', date: 'Mar 20', time: '—', sessionType: 'Rest', details: 'Stretch / mobility' },
  { weekNumber: 9, weekRange: 'Mar 17 – Mar 23', dayName: 'Fri', date: 'Mar 21', time: '6:30 – 7:10 PM', sessionType: 'Easy Run', details: '5 km easy' },
  { weekNumber: 9, weekRange: 'Mar 17 – Mar 23', dayName: 'Sat', date: 'Mar 22', time: '6:00 – 9:30 AM', sessionType: 'Long Run', details: '26 km easy' },
  { weekNumber: 9, weekRange: 'Mar 17 – Mar 23', dayName: 'Sun', date: 'Mar 23', time: '—', sessionType: 'Rest', details: 'Full rest' },
  
  // Week 10
  { weekNumber: 10, weekRange: 'Mar 24 – Mar 30', dayName: 'Mon', date: 'Mar 24', time: '6:30 – 7:45 PM', sessionType: 'Easy Run', details: '10 km easy' },
  { weekNumber: 10, weekRange: 'Mar 24 – Mar 30', dayName: 'Tue', date: 'Mar 25', time: '6:30 – 8:00 PM', sessionType: 'Marathon Pace Run', details: '1 km warm-up\n         8 km @ 7:05 / km\n         1 km cool-down' },
  { weekNumber: 10, weekRange: 'Mar 24 – Mar 30', dayName: 'Wed', date: 'Mar 26', time: '6:30 – 7:45 PM', sessionType: 'Easy Run', details: '10 km easy' },
  { weekNumber: 10, weekRange: 'Mar 24 – Mar 30', dayName: 'Thu', date: 'Mar 27', time: '—', sessionType: 'Rest', details: 'Stretch / mobility' },
  { weekNumber: 10, weekRange: 'Mar 24 – Mar 30', dayName: 'Fri', date: 'Mar 28', time: '6:30 – 7:10 PM', sessionType: 'Easy Run', details: '5 km easy' },
  { weekNumber: 10, weekRange: 'Mar 24 – Mar 30', dayName: 'Sat', date: 'Mar 29', time: '6:00 – 9:45 AM', sessionType: 'Long Run', details: '28 km easy\nLast 5 km steady' },
  { weekNumber: 10, weekRange: 'Mar 24 – Mar 30', dayName: 'Sun', date: 'Mar 30', time: '—', sessionType: 'Rest', details: 'Full rest' },
  
  // Week 11
  { weekNumber: 11, weekRange: 'Mar 31 – Apr 6', dayName: 'Mon', date: 'Mar 31', time: '6:30 – 7:45 PM', sessionType: 'Easy Run', details: '10 km easy' },
  { weekNumber: 11, weekRange: 'Mar 31 – Apr 6', dayName: 'Tue', date: 'Apr 1', time: '6:30 – 8:05 PM', sessionType: 'Marathon Pace Run', details: '1 km warm-up\n         10 km @ 7:05 / km' },
  { weekNumber: 11, weekRange: 'Mar 31 – Apr 6', dayName: 'Wed', date: 'Apr 2', time: '6:30 – 7:45 PM', sessionType: 'Easy Run', details: '10 km easy' },
  { weekNumber: 11, weekRange: 'Mar 31 – Apr 6', dayName: 'Thu', date: 'Apr 3', time: '—', sessionType: 'Rest', details: 'Stretch / mobility' },
  { weekNumber: 11, weekRange: 'Mar 31 – Apr 6', dayName: 'Fri', date: 'Apr 4', time: '6:30 – 7:10 PM', sessionType: 'Easy Run', details: '5 km easy' },
  { weekNumber: 11, weekRange: 'Mar 31 – Apr 6', dayName: 'Sat', date: 'Apr 5', time: '6:00 – 10:00 AM', sessionType: 'Long Run', details: '30 km easy\nFuel + salt mandatory' },
  { weekNumber: 11, weekRange: 'Mar 31 – Apr 6', dayName: 'Sun', date: 'Apr 6', time: '—', sessionType: 'Rest', details: 'Full rest' },
];
