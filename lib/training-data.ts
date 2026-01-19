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
  // Week 1
  { weekNumber: 1, weekRange: 'Jan 20 – Jan 26', dayName: 'Mon', date: 'Jan 20', time: '6:30 – 7:15 PM', sessionType: 'Easy Run', details: '6 km easy (7:45–8:15 / km)' },
  { weekNumber: 1, weekRange: 'Jan 20 – Jan 26', dayName: 'Tue', date: 'Jan 21', time: '6:30 – 7:15 PM', sessionType: 'Tempo Run', details: '1 km warm-up\n         4 km @ 7:30 / km\n         Cool down walk' },
  { weekNumber: 1, weekRange: 'Jan 20 – Jan 26', dayName: 'Wed', date: 'Jan 22', time: '6:30 – 7:15 PM', sessionType: 'Easy Run', details: '6 km easy' },
  { weekNumber: 1, weekRange: 'Jan 20 – Jan 26', dayName: 'Thu', date: 'Jan 23', time: '—', sessionType: 'Rest', details: 'Stretch / mobility 15–20 min' },
  { weekNumber: 1, weekRange: 'Jan 20 – Jan 26', dayName: 'Fri', date: 'Jan 24', time: '6:30 – 7:00 PM', sessionType: 'Easy Run', details: '4 km very easy' },
  { weekNumber: 1, weekRange: 'Jan 20 – Jan 26', dayName: 'Sat', date: 'Jan 25', time: '6:00 – 7:30 AM', sessionType: 'Long Run', details: '10 km easy pace' },
  { weekNumber: 1, weekRange: 'Jan 20 – Jan 26', dayName: 'Sun', date: 'Jan 26', time: '—', sessionType: 'Rest', details: 'Full rest' },
  
  // Week 2
  { weekNumber: 2, weekRange: 'Jan 27 – Feb 2', dayName: 'Mon', date: 'Jan 27', time: '6:30 – 7:20 PM', sessionType: 'Easy Run', details: '7 km easy' },
  { weekNumber: 2, weekRange: 'Jan 27 – Feb 2', dayName: 'Tue', date: 'Jan 28', time: '6:30 – 7:20 PM', sessionType: 'Tempo Run', details: '1 km warm-up\n         5 km @ 7:25 / km' },
  { weekNumber: 2, weekRange: 'Jan 27 – Feb 2', dayName: 'Wed', date: 'Jan 29', time: '6:30 – 7:20 PM', sessionType: 'Easy Run', details: '7 km easy' },
  { weekNumber: 2, weekRange: 'Jan 27 – Feb 2', dayName: 'Thu', date: 'Jan 30', time: '—', sessionType: 'Rest', details: 'Stretch / mobility' },
  { weekNumber: 2, weekRange: 'Jan 27 – Feb 2', dayName: 'Fri', date: 'Jan 31', time: '6:30 – 7:00 PM', sessionType: 'Easy Run', details: '4 km easy' },
  { weekNumber: 2, weekRange: 'Jan 27 – Feb 2', dayName: 'Sat', date: 'Feb 1', time: '6:00 – 7:45 AM', sessionType: 'Long Run', details: '12 km easy' },
  { weekNumber: 2, weekRange: 'Jan 27 – Feb 2', dayName: 'Sun', date: 'Feb 2', time: '—', sessionType: 'Rest', details: 'Full rest' },
  
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
  
  // Week 12
  { weekNumber: 12, weekRange: 'Apr 7 – Apr 13', dayName: 'Mon', date: 'Apr 7', time: '6:30 – 7:45 PM', sessionType: 'Easy Run', details: '10 km easy' },
  { weekNumber: 12, weekRange: 'Apr 7 – Apr 13', dayName: 'Tue', date: 'Apr 8', time: '6:30 – 8:10 PM', sessionType: 'Marathon Pace Run', details: '1 km warm-up\n         12 km @ 7:05 / km\n         1 km cool-down' },
  { weekNumber: 12, weekRange: 'Apr 7 – Apr 13', dayName: 'Wed', date: 'Apr 9', time: '6:30 – 7:45 PM', sessionType: 'Easy Run', details: '10 km easy' },
  { weekNumber: 12, weekRange: 'Apr 7 – Apr 13', dayName: 'Thu', date: 'Apr 10', time: '—', sessionType: 'Rest', details: 'Stretch / mobility' },
  { weekNumber: 12, weekRange: 'Apr 7 – Apr 13', dayName: 'Fri', date: 'Apr 11', time: '6:30 – 7:10 PM', sessionType: 'Easy Run', details: '5 km easy' },
  { weekNumber: 12, weekRange: 'Apr 7 – Apr 13', dayName: 'Sat', date: 'Apr 12', time: '6:00 – 10:30 AM', sessionType: 'Long Run', details: '32 km easy\nFuel + salt mandatory' },
  { weekNumber: 12, weekRange: 'Apr 7 – Apr 13', dayName: 'Sun', date: 'Apr 13', time: '—', sessionType: 'Rest', details: 'Full rest' },
  
  // Week 13
  { weekNumber: 13, weekRange: 'Apr 14 – Apr 20', dayName: 'Mon', date: 'Apr 14', time: '6:30 – 7:50 PM', sessionType: 'Easy Run', details: '11 km easy' },
  { weekNumber: 13, weekRange: 'Apr 14 – Apr 20', dayName: 'Tue', date: 'Apr 15', time: '6:30 – 8:15 PM', sessionType: 'Tempo Run', details: '1 km warm-up\n         10 km @ 7:00 / km\n         1 km cool-down' },
  { weekNumber: 13, weekRange: 'Apr 14 – Apr 20', dayName: 'Wed', date: 'Apr 16', time: '6:30 – 7:50 PM', sessionType: 'Easy Run', details: '11 km easy' },
  { weekNumber: 13, weekRange: 'Apr 14 – Apr 20', dayName: 'Thu', date: 'Apr 17', time: '—', sessionType: 'Rest', details: 'Stretch / mobility' },
  { weekNumber: 13, weekRange: 'Apr 14 – Apr 20', dayName: 'Fri', date: 'Apr 18', time: '6:30 – 7:15 PM', sessionType: 'Easy Run', details: '6 km easy' },
  { weekNumber: 13, weekRange: 'Apr 14 – Apr 20', dayName: 'Sat', date: 'Apr 19', time: '6:00 – 11:00 AM', sessionType: 'Long Run', details: '35 km easy\nFuel + salt mandatory' },
  { weekNumber: 13, weekRange: 'Apr 14 – Apr 20', dayName: 'Sun', date: 'Apr 20', time: '—', sessionType: 'Rest', details: 'Full rest' },
  
  // Week 14
  { weekNumber: 14, weekRange: 'Apr 21 – Apr 27', dayName: 'Mon', date: 'Apr 21', time: '6:30 – 7:50 PM', sessionType: 'Easy Run', details: '11 km easy' },
  { weekNumber: 14, weekRange: 'Apr 21 – Apr 27', dayName: 'Tue', date: 'Apr 22', time: '6:30 – 8:20 PM', sessionType: 'Marathon Pace Run', details: '1 km warm-up\n         14 km @ 7:05 / km\n         1 km cool-down' },
  { weekNumber: 14, weekRange: 'Apr 21 – Apr 27', dayName: 'Wed', date: 'Apr 23', time: '6:30 – 7:50 PM', sessionType: 'Easy Run', details: '11 km easy' },
  { weekNumber: 14, weekRange: 'Apr 21 – Apr 27', dayName: 'Thu', date: 'Apr 24', time: '—', sessionType: 'Rest', details: 'Stretch / mobility' },
  { weekNumber: 14, weekRange: 'Apr 21 – Apr 27', dayName: 'Fri', date: 'Apr 25', time: '6:30 – 7:15 PM', sessionType: 'Easy Run', details: '6 km easy' },
  { weekNumber: 14, weekRange: 'Apr 21 – Apr 27', dayName: 'Sat', date: 'Apr 26', time: '6:00 – 11:15 AM', sessionType: 'Long Run', details: '36 km easy\nFuel + salt mandatory' },
  { weekNumber: 14, weekRange: 'Apr 21 – Apr 27', dayName: 'Sun', date: 'Apr 27', time: '—', sessionType: 'Rest', details: 'Full rest' },
  
  // Week 15
  { weekNumber: 15, weekRange: 'Apr 28 – May 4', dayName: 'Mon', date: 'Apr 28', time: '6:30 – 7:55 PM', sessionType: 'Easy Run', details: '12 km easy' },
  { weekNumber: 15, weekRange: 'Apr 28 – May 4', dayName: 'Tue', date: 'Apr 29', time: '6:30 – 8:25 PM', sessionType: 'Tempo Run', details: '1 km warm-up\n         12 km @ 7:00 / km\n         1 km cool-down' },
  { weekNumber: 15, weekRange: 'Apr 28 – May 4', dayName: 'Wed', date: 'Apr 30', time: '6:30 – 7:55 PM', sessionType: 'Easy Run', details: '12 km easy' },
  { weekNumber: 15, weekRange: 'Apr 28 – May 4', dayName: 'Thu', date: 'May 1', time: '—', sessionType: 'Rest', details: 'Stretch / mobility' },
  { weekNumber: 15, weekRange: 'Apr 28 – May 4', dayName: 'Fri', date: 'May 2', time: '6:30 – 7:20 PM', sessionType: 'Easy Run', details: '6 km easy' },
  { weekNumber: 15, weekRange: 'Apr 28 – May 4', dayName: 'Sat', date: 'May 3', time: '6:00 – 11:30 AM', sessionType: 'Long Run', details: '38 km easy\nFuel + salt mandatory' },
  { weekNumber: 15, weekRange: 'Apr 28 – May 4', dayName: 'Sun', date: 'May 4', time: '—', sessionType: 'Rest', details: 'Full rest' },
  
  // Week 16
  { weekNumber: 16, weekRange: 'May 5 – May 11', dayName: 'Mon', date: 'May 5', time: '6:30 – 7:55 PM', sessionType: 'Easy Run', details: '12 km easy' },
  { weekNumber: 16, weekRange: 'May 5 – May 11', dayName: 'Tue', date: 'May 6', time: '6:30 – 8:30 PM', sessionType: 'Marathon Pace Run', details: '1 km warm-up\n         16 km @ 7:05 / km\n         1 km cool-down' },
  { weekNumber: 16, weekRange: 'May 5 – May 11', dayName: 'Wed', date: 'May 7', time: '6:30 – 7:55 PM', sessionType: 'Easy Run', details: '12 km easy' },
  { weekNumber: 16, weekRange: 'May 5 – May 11', dayName: 'Thu', date: 'May 8', time: '—', sessionType: 'Rest', details: 'Stretch / mobility' },
  { weekNumber: 16, weekRange: 'May 5 – May 11', dayName: 'Fri', date: 'May 9', time: '6:30 – 7:20 PM', sessionType: 'Easy Run', details: '6 km easy' },
  { weekNumber: 16, weekRange: 'May 5 – May 11', dayName: 'Sat', date: 'May 10', time: '6:00 – 11:45 AM', sessionType: 'Long Run', details: '40 km easy\nFuel + salt mandatory' },
  { weekNumber: 16, weekRange: 'May 5 – May 11', dayName: 'Sun', date: 'May 11', time: '—', sessionType: 'Rest', details: 'Full rest' },
  
  // Week 17
  { weekNumber: 17, weekRange: 'May 12 – May 18', dayName: 'Mon', date: 'May 12', time: '6:30 – 8:00 PM', sessionType: 'Easy Run', details: '13 km easy' },
  { weekNumber: 17, weekRange: 'May 12 – May 18', dayName: 'Tue', date: 'May 13', time: '6:30 – 8:35 PM', sessionType: 'Tempo Run', details: '1 km warm-up\n         14 km @ 7:00 / km\n         1 km cool-down' },
  { weekNumber: 17, weekRange: 'May 12 – May 18', dayName: 'Wed', date: 'May 14', time: '6:30 – 8:00 PM', sessionType: 'Easy Run', details: '13 km easy' },
  { weekNumber: 17, weekRange: 'May 12 – May 18', dayName: 'Thu', date: 'May 15', time: '—', sessionType: 'Rest', details: 'Stretch / mobility' },
  { weekNumber: 17, weekRange: 'May 12 – May 18', dayName: 'Fri', date: 'May 16', time: '6:30 – 7:25 PM', sessionType: 'Easy Run', details: '7 km easy' },
  { weekNumber: 17, weekRange: 'May 12 – May 18', dayName: 'Sat', date: 'May 17', time: '6:00 – 12:00 PM', sessionType: 'Long Run', details: '42 km easy\nFull marathon distance!\nFuel + salt mandatory' },
  { weekNumber: 17, weekRange: 'May 12 – May 18', dayName: 'Sun', date: 'May 18', time: '—', sessionType: 'Rest', details: 'Full rest' },
  
  // Week 18
  { weekNumber: 18, weekRange: 'May 19 – May 25', dayName: 'Mon', date: 'May 19', time: '6:30 – 8:00 PM', sessionType: 'Easy Run', details: '13 km easy' },
  { weekNumber: 18, weekRange: 'May 19 – May 25', dayName: 'Tue', date: 'May 20', time: '6:30 – 8:40 PM', sessionType: 'Marathon Pace Run', details: '1 km warm-up\n         18 km @ 7:05 / km\n         1 km cool-down' },
  { weekNumber: 18, weekRange: 'May 19 – May 25', dayName: 'Wed', date: 'May 21', time: '6:30 – 8:00 PM', sessionType: 'Easy Run', details: '13 km easy' },
  { weekNumber: 18, weekRange: 'May 19 – May 25', dayName: 'Thu', date: 'May 22', time: '—', sessionType: 'Rest', details: 'Stretch / mobility' },
  { weekNumber: 18, weekRange: 'May 19 – May 25', dayName: 'Fri', date: 'May 23', time: '6:30 – 7:25 PM', sessionType: 'Easy Run', details: '7 km easy' },
  { weekNumber: 18, weekRange: 'May 19 – May 25', dayName: 'Sat', date: 'May 24', time: '6:00 – 11:30 AM', sessionType: 'Long Run', details: '38 km easy\nFuel + salt mandatory' },
  { weekNumber: 18, weekRange: 'May 19 – May 25', dayName: 'Sun', date: 'May 25', time: '—', sessionType: 'Rest', details: 'Full rest' },
  
  // Week 19
  { weekNumber: 19, weekRange: 'May 26 – Jun 1', dayName: 'Mon', date: 'May 26', time: '6:30 – 8:05 PM', sessionType: 'Easy Run', details: '14 km easy' },
  { weekNumber: 19, weekRange: 'May 26 – Jun 1', dayName: 'Tue', date: 'May 27', time: '6:30 – 8:45 PM', sessionType: 'Tempo Run', details: '1 km warm-up\n         16 km @ 7:00 / km\n         1 km cool-down' },
  { weekNumber: 19, weekRange: 'May 26 – Jun 1', dayName: 'Wed', date: 'May 28', time: '6:30 – 8:05 PM', sessionType: 'Easy Run', details: '14 km easy' },
  { weekNumber: 19, weekRange: 'May 26 – Jun 1', dayName: 'Thu', date: 'May 29', time: '—', sessionType: 'Rest', details: 'Stretch / mobility' },
  { weekNumber: 19, weekRange: 'May 26 – Jun 1', dayName: 'Fri', date: 'May 30', time: '6:30 – 7:30 PM', sessionType: 'Easy Run', details: '7 km easy' },
  { weekNumber: 19, weekRange: 'May 26 – Jun 1', dayName: 'Sat', date: 'May 31', time: '6:00 – 11:45 AM', sessionType: 'Long Run', details: '40 km easy\nFuel + salt mandatory' },
  { weekNumber: 19, weekRange: 'May 26 – Jun 1', dayName: 'Sun', date: 'Jun 1', time: '—', sessionType: 'Rest', details: 'Full rest' },
  
  // Week 20
  { weekNumber: 20, weekRange: 'Jun 2 – Jun 8', dayName: 'Mon', date: 'Jun 2', time: '6:30 – 8:05 PM', sessionType: 'Easy Run', details: '14 km easy' },
  { weekNumber: 20, weekRange: 'Jun 2 – Jun 8', dayName: 'Tue', date: 'Jun 3', time: '6:30 – 8:50 PM', sessionType: 'Marathon Pace Run', details: '1 km warm-up\n         20 km @ 7:05 / km\n         1 km cool-down' },
  { weekNumber: 20, weekRange: 'Jun 2 – Jun 8', dayName: 'Wed', date: 'Jun 4', time: '6:30 – 8:05 PM', sessionType: 'Easy Run', details: '14 km easy' },
  { weekNumber: 20, weekRange: 'Jun 2 – Jun 8', dayName: 'Thu', date: 'Jun 5', time: '—', sessionType: 'Rest', details: 'Stretch / mobility' },
  { weekNumber: 20, weekRange: 'Jun 2 – Jun 8', dayName: 'Fri', date: 'Jun 6', time: '6:30 – 7:30 PM', sessionType: 'Easy Run', details: '7 km easy' },
  { weekNumber: 20, weekRange: 'Jun 2 – Jun 8', dayName: 'Sat', date: 'Jun 7', time: '6:00 – 11:30 AM', sessionType: 'Long Run', details: '38 km easy\nFuel + salt mandatory' },
  { weekNumber: 20, weekRange: 'Jun 2 – Jun 8', dayName: 'Sun', date: 'Jun 8', time: '—', sessionType: 'Rest', details: 'Full rest' },
  
  // Week 21
  { weekNumber: 21, weekRange: 'Jun 9 – Jun 15', dayName: 'Mon', date: 'Jun 9', time: '6:30 – 8:10 PM', sessionType: 'Easy Run', details: '15 km easy' },
  { weekNumber: 21, weekRange: 'Jun 9 – Jun 15', dayName: 'Tue', date: 'Jun 10', time: '6:30 – 8:55 PM', sessionType: 'Tempo Run', details: '1 km warm-up\n         18 km @ 7:00 / km\n         1 km cool-down' },
  { weekNumber: 21, weekRange: 'Jun 9 – Jun 15', dayName: 'Wed', date: 'Jun 11', time: '6:30 – 8:10 PM', sessionType: 'Easy Run', details: '15 km easy' },
  { weekNumber: 21, weekRange: 'Jun 9 – Jun 15', dayName: 'Thu', date: 'Jun 12', time: '—', sessionType: 'Rest', details: 'Stretch / mobility' },
  { weekNumber: 21, weekRange: 'Jun 9 – Jun 15', dayName: 'Fri', date: 'Jun 13', time: '6:30 – 7:35 PM', sessionType: 'Easy Run', details: '8 km easy' },
  { weekNumber: 21, weekRange: 'Jun 9 – Jun 15', dayName: 'Sat', date: 'Jun 14', time: '6:00 – 11:15 AM', sessionType: 'Long Run', details: '36 km easy\nFuel + salt mandatory' },
  { weekNumber: 21, weekRange: 'Jun 9 – Jun 15', dayName: 'Sun', date: 'Jun 15', time: '—', sessionType: 'Rest', details: 'Full rest' },
  
  // Week 22 - Taper begins
  { weekNumber: 22, weekRange: 'Jun 16 – Jun 22', dayName: 'Mon', date: 'Jun 16', time: '6:30 – 8:00 PM', sessionType: 'Easy Run', details: '12 km easy' },
  { weekNumber: 22, weekRange: 'Jun 16 – Jun 22', dayName: 'Tue', date: 'Jun 17', time: '6:30 – 8:20 PM', sessionType: 'Marathon Pace Run', details: '1 km warm-up\n         12 km @ 7:05 / km\n         1 km cool-down' },
  { weekNumber: 22, weekRange: 'Jun 16 – Jun 22', dayName: 'Wed', date: 'Jun 18', time: '6:30 – 8:00 PM', sessionType: 'Easy Run', details: '12 km easy' },
  { weekNumber: 22, weekRange: 'Jun 16 – Jun 22', dayName: 'Thu', date: 'Jun 19', time: '—', sessionType: 'Rest', details: 'Stretch / mobility' },
  { weekNumber: 22, weekRange: 'Jun 16 – Jun 22', dayName: 'Fri', date: 'Jun 20', time: '6:30 – 7:20 PM', sessionType: 'Easy Run', details: '6 km easy' },
  { weekNumber: 22, weekRange: 'Jun 16 – Jun 22', dayName: 'Sat', date: 'Jun 21', time: '6:00 – 10:30 AM', sessionType: 'Long Run', details: '30 km easy\nFuel + salt mandatory' },
  { weekNumber: 22, weekRange: 'Jun 16 – Jun 22', dayName: 'Sun', date: 'Jun 22', time: '—', sessionType: 'Rest', details: 'Full rest' },
  
  // Week 23 - Taper continues
  { weekNumber: 23, weekRange: 'Jun 23 – Jun 29', dayName: 'Mon', date: 'Jun 23', time: '6:30 – 7:50 PM', sessionType: 'Easy Run', details: '10 km easy' },
  { weekNumber: 23, weekRange: 'Jun 23 – Jun 29', dayName: 'Tue', date: 'Jun 24', time: '6:30 – 8:05 PM', sessionType: 'Marathon Pace Run', details: '1 km warm-up\n         10 km @ 7:05 / km\n         1 km cool-down' },
  { weekNumber: 23, weekRange: 'Jun 23 – Jun 29', dayName: 'Wed', date: 'Jun 25', time: '6:30 – 7:50 PM', sessionType: 'Easy Run', details: '10 km easy' },
  { weekNumber: 23, weekRange: 'Jun 23 – Jun 29', dayName: 'Thu', date: 'Jun 26', time: '—', sessionType: 'Rest', details: 'Stretch / mobility' },
  { weekNumber: 23, weekRange: 'Jun 23 – Jun 29', dayName: 'Fri', date: 'Jun 27', time: '6:30 – 7:10 PM', sessionType: 'Easy Run', details: '5 km easy' },
  { weekNumber: 23, weekRange: 'Jun 23 – Jun 29', dayName: 'Sat', date: 'Jun 28', time: '6:00 – 9:30 AM', sessionType: 'Long Run', details: '24 km easy\nFuel + salt mandatory' },
  { weekNumber: 23, weekRange: 'Jun 23 – Jun 29', dayName: 'Sun', date: 'Jun 29', time: '—', sessionType: 'Rest', details: 'Full rest' },
  
  // Week 24 - Final taper
  { weekNumber: 24, weekRange: 'Jun 30 – Jul 6', dayName: 'Mon', date: 'Jun 30', time: '6:30 – 7:40 PM', sessionType: 'Easy Run', details: '8 km easy' },
  { weekNumber: 24, weekRange: 'Jun 30 – Jul 6', dayName: 'Tue', date: 'Jul 1', time: '6:30 – 7:50 PM', sessionType: 'Marathon Pace Run', details: '1 km warm-up\n         8 km @ 7:05 / km\n         1 km cool-down' },
  { weekNumber: 24, weekRange: 'Jun 30 – Jul 6', dayName: 'Wed', date: 'Jul 2', time: '6:30 – 7:40 PM', sessionType: 'Easy Run', details: '8 km easy' },
  { weekNumber: 24, weekRange: 'Jun 30 – Jul 6', dayName: 'Thu', date: 'Jul 3', time: '—', sessionType: 'Rest', details: 'Stretch / mobility' },
  { weekNumber: 24, weekRange: 'Jun 30 – Jul 6', dayName: 'Fri', date: 'Jul 4', time: '6:30 – 7:05 PM', sessionType: 'Easy Run', details: '5 km easy' },
  { weekNumber: 24, weekRange: 'Jun 30 – Jul 6', dayName: 'Sat', date: 'Jul 5', time: '6:00 – 8:30 AM', sessionType: 'Long Run', details: '18 km easy\nFinal long run before race' },
  { weekNumber: 24, weekRange: 'Jun 30 – Jul 6', dayName: 'Sun', date: 'Jul 6', time: '—', sessionType: 'Rest', details: 'Full rest' },
  
  // Week 25 - Race week
  { weekNumber: 25, weekRange: 'Jul 7 – Jul 13', dayName: 'Mon', date: 'Jul 7', time: '6:30 – 7:20 PM', sessionType: 'Easy Run', details: '6 km easy' },
  { weekNumber: 25, weekRange: 'Jul 7 – Jul 13', dayName: 'Tue', date: 'Jul 8', time: '6:30 – 7:30 PM', sessionType: 'Easy Run', details: '5 km easy\nMarathon pace strides' },
  { weekNumber: 25, weekRange: 'Jul 7 – Jul 13', dayName: 'Wed', date: 'Jul 9', time: '6:30 – 7:10 PM', sessionType: 'Easy Run', details: '5 km easy' },
  { weekNumber: 25, weekRange: 'Jul 7 – Jul 13', dayName: 'Thu', date: 'Jul 10', time: '—', sessionType: 'Rest', details: 'Stretch / mobility\nLight walk only' },
  { weekNumber: 25, weekRange: 'Jul 7 – Jul 13', dayName: 'Fri', date: 'Jul 11', time: '6:30 – 7:00 PM', sessionType: 'Easy Run', details: '3 km easy\nShakeout run' },
  { weekNumber: 25, weekRange: 'Jul 7 – Jul 13', dayName: 'Sat', date: 'Jul 12', time: 'Early AM', sessionType: 'RACE DAY', details: '42.2 km MARATHON\nTarget pace: 7:05 / km\nFuel every 45 min\nStay hydrated!' },
  { weekNumber: 25, weekRange: 'Jul 7 – Jul 13', dayName: 'Sun', date: 'Jul 13', time: '—', sessionType: 'Rest', details: 'Recovery day\nLight walk\nCelebrate! 🎉' },
];
