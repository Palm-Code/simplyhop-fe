import { CalendarEventType, EventCategory, EventReminder, CalendarShare } from "@/core/components/calendar";

// Helper function to create dates relative to today
const getDateFromToday = (daysOffset: number, hour?: number, minute?: number) => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  if (hour !== undefined) {
    date.setHours(hour, minute || 0, 0, 0);
  }
  return date;
};

// Sample Categories
export const sampleCategories: EventCategory[] = [
  {
    id: "work",
    name: "Work",
    color: "blue",
    icon: "💼",
    description: "Work-related meetings, deadlines, and tasks",
  },
  {
    id: "personal",
    name: "Personal",
    color: "green",
    icon: "🏠",
    description: "Personal activities and life events",
  },
  {
    id: "health",
    name: "Health & Fitness",
    color: "red",
    icon: "🏥",
    description: "Health appointments and fitness activities",
  },
  {
    id: "family",
    name: "Family",
    color: "purple",
    icon: "👨‍👩‍👧‍👦",
    description: "Family events and gatherings",
  },
  {
    id: "education",
    name: "Education",
    color: "indigo",
    icon: "📚",
    description: "Learning, courses, and educational activities",
  },
  {
    id: "travel",
    name: "Travel",
    color: "yellow",
    icon: "✈️",
    description: "Travel plans and vacation",
  },
  {
    id: "social",
    name: "Social",
    color: "pink",
    icon: "🎉",
    description: "Social events and entertainment",
  },
];

// Complex Sample Events - Realistic scenarios with conflicts and variety
export const complexSampleEvents: CalendarEventType[] = [
  // TODAY - Busy day with overlapping meetings
  {
    id: "today-1",
    title: "Daily Standup",
    date: getDateFromToday(0),
    startTime: "09:00",
    endTime: "09:30",
    color: "blue",
    description: "Daily team sync meeting to discuss progress and blockers",
    categoryId: "work",
    tags: ["meeting", "standup", "team"],
    priority: "high",
    location: "Conference Room A",
    attendees: ["john@company.com", "sarah@company.com", "mike@company.com"],
  },
  {
    id: "today-2",
    title: "Client Presentation Prep",
    date: getDateFromToday(0),
    startTime: "09:15", // OVERLAPPING with standup!
    endTime: "10:30",
    color: "red",
    description: "Prepare slides and demo for tomorrow's client presentation",
    categoryId: "work",
    tags: ["presentation", "client", "preparation"],
    priority: "high",
    location: "Meeting Room B",
    attendees: ["alex@company.com", "lisa@company.com"],
  },
  {
    id: "today-3",
    title: "Coffee Break",
    date: getDateFromToday(0),
    startTime: "10:30",
    endTime: "11:00",
    color: "gray",
    description: "Quick coffee break with the team",
    categoryId: "personal",
    tags: ["break", "coffee"],
    priority: "low",
    location: "Office Kitchen",
  },
  {
    id: "today-4",
    title: "Product Planning Session",
    date: getDateFromToday(0),
    startTime: "11:00",
    endTime: "12:30",
    color: "blue",
    description: "Q4 product roadmap planning with stakeholders",
    categoryId: "work",
    tags: ["planning", "product", "roadmap"],
    priority: "high",
    location: "Conference Room C",
    attendees: ["product@company.com", "engineering@company.com"],
  },
  {
    id: "today-5",
    title: "Lunch with Mentor",
    date: getDateFromToday(0),
    startTime: "12:30",
    endTime: "14:00",
    color: "green",
    description: "Monthly mentorship lunch discussion",
    categoryId: "personal",
    tags: ["lunch", "mentorship", "career"],
    priority: "medium",
    location: "Downtown Café",
    attendees: ["mentor@email.com"],
  },
  {
    id: "today-6",
    title: "Code Review Session",
    date: getDateFromToday(0),
    startTime: "14:00",
    endTime: "15:30",
    color: "blue",
    description: "Review pull requests for the upcoming release",
    categoryId: "work",
    tags: ["code-review", "development"],
    priority: "medium",
    location: "Dev Team Room",
  },
  {
    id: "today-7",
    title: "Gym Workout", 
    date: getDateFromToday(0),
    startTime: "18:00",
    endTime: "19:30",
    color: "red",
    description: "Upper body strength training",
    categoryId: "health",
    tags: ["fitness", "gym", "workout"],
    priority: "medium",
    location: "Local Gym",
  },

  // TOMORROW - Important client day
  {
    id: "tomorrow-1",
    title: "Early Morning Jog",
    date: getDateFromToday(1),
    startTime: "06:30",
    endTime: "07:30",
    color: "red",
    description: "5km morning run in the park",
    categoryId: "health",
    tags: ["running", "exercise", "morning"],
    priority: "low",
    location: "Central Park",
  },
  {
    id: "tomorrow-2",
    title: "Team Breakfast",
    date: getDateFromToday(1),
    startTime: "08:00",
    endTime: "09:00",
    color: "purple",
    description: "Monthly team breakfast before big presentation",
    categoryId: "work",
    tags: ["breakfast", "team", "bonding"],
    priority: "medium",
    location: "Office Café",
  },
  {
    id: "tomorrow-3",
    title: "CLIENT PRESENTATION - Q4 Results",
    date: getDateFromToday(1),
    startTime: "10:00",
    endTime: "12:00",
    color: "red",
    description: "Present quarterly results and future roadmap to major client",
    categoryId: "work",
    tags: ["presentation", "client", "quarterly", "important"],
    priority: "high",
    location: "Executive Conference Room",
    attendees: ["ceo@company.com", "client@bigcompany.com", "sales@company.com"],
  },
  {
    id: "tomorrow-4",
    title: "Post-Presentation Debrief",
    date: getDateFromToday(1),
    startTime: "12:15",
    endTime: "13:00",
    color: "blue",
    description: "Team debrief and next steps discussion",
    categoryId: "work",
    tags: ["debrief", "follow-up"],
    priority: "high",
    location: "Meeting Room A",
  },
  {
    id: "tomorrow-5",
    title: "Doctor Appointment",
    date: getDateFromToday(1),
    startTime: "15:00",
    endTime: "16:00",
    color: "red",
    description: "Annual health checkup",
    categoryId: "health",
    tags: ["doctor", "checkup", "health"],
    priority: "high",
    location: "Medical Center",
  },

  // DAY AFTER TOMORROW - Travel prep day  
  {
    id: "day2-1",
    title: "Pack for Business Trip",
    date: getDateFromToday(2),
    startTime: "07:00",
    endTime: "08:00",
    color: "yellow",
    description: "Pack clothes and materials for 3-day business trip",
    categoryId: "travel",
    tags: ["packing", "travel", "preparation"],
    priority: "medium",
    location: "Home",
  },
  {
    id: "day2-2",
    title: "Final Project Review",
    date: getDateFromToday(2),
    startTime: "09:00",
    endTime: "11:00",
    color: "blue",
    description: "Last review before project deployment",
    categoryId: "work",
    tags: ["review", "project", "deployment"],
    priority: "high",
    location: "Conference Room",
  },
  {
    id: "day2-3",
    title: "Lunch with College Friend",
    date: getDateFromToday(2),
    startTime: "12:30",
    endTime: "14:00",
    color: "pink",
    description: "Catch up with old college roommate",
    categoryId: "social",
    tags: ["lunch", "friends", "college"],
    priority: "medium",
    location: "Italian Restaurant",
  },
  {
    id: "day2-4",
    title: "Flight to Chicago",
    date: getDateFromToday(2),
    startTime: "18:30",
    endTime: "21:45",
    color: "yellow",
    description: "Business trip flight - United Airlines UA1234",
    categoryId: "travel",
    tags: ["flight", "business-trip", "chicago"],
    priority: "high",
    location: "Airport Terminal 2",
  },

  // MULTIPLE DAYS - Conference week
  {
    id: "conf-day1",
    title: "Tech Conference Day 1",
    date: getDateFromToday(3),
    isAllDay: true,
    color: "indigo",
    description: "Annual Technology Innovation Conference - Keynotes and Workshops",
    categoryId: "education",
    tags: ["conference", "technology", "learning"],
    priority: "high",
    location: "Chicago Convention Center",
  },
  {
    id: "conf-day2",
    title: "Tech Conference Day 2", 
    date: getDateFromToday(4),
    isAllDay: true,
    color: "indigo",
    description: "Technology Conference - Networking and Advanced Sessions",
    categoryId: "education", 
    tags: ["conference", "technology", "networking"],
    priority: "high",
    location: "Chicago Convention Center",
  },
  {
    id: "conf-day3",
    title: "Tech Conference Day 3",
    date: getDateFromToday(5),
    isAllDay: true,
    color: "indigo",
    description: "Final day - Closing ceremonies and vendor expo",
    categoryId: "education",
    tags: ["conference", "technology", "closing"],
    priority: "high", 
    location: "Chicago Convention Center",
  },

  // WEEKEND - Family time
  {
    id: "weekend-1",
    title: "Soccer Practice with Kids",
    date: getDateFromToday(6),
    startTime: "09:00",
    endTime: "11:00",
    color: "purple",
    description: "Weekly soccer practice with the children",
    categoryId: "family",
    tags: ["soccer", "kids", "sports"],
    priority: "high",
    location: "Community Sports Field",
  },
  {
    id: "weekend-2",
    title: "Grocery Shopping",
    date: getDateFromToday(6),
    startTime: "11:30",
    endTime: "12:30",
    color: "green",
    description: "Weekly grocery shopping for the family",
    categoryId: "personal",
    tags: ["shopping", "groceries", "errands"],
    priority: "medium",
    location: "Supermarket",
  },
  {
    id: "weekend-3",
    title: "BBQ with Neighbors",
    date: getDateFromToday(6),
    startTime: "16:00",
    endTime: "20:00",
    color: "pink",
    description: "Neighborhood barbecue party in the backyard",
    categoryId: "social",
    tags: ["bbq", "neighbors", "party"],
    priority: "medium",
    location: "Backyard",
  },
  {
    id: "weekend-4",
    title: "Family Movie Night",
    date: getDateFromToday(7),
    startTime: "19:00",
    endTime: "21:30",
    color: "purple",
    description: "Weekly family movie night with popcorn",
    categoryId: "family",
    tags: ["movie", "family", "relaxation"],
    priority: "medium",
    location: "Home Theater",
  },

  // NEXT WEEK - Busy work week
  {
    id: "next-week-1",
    title: "Sprint Planning",
    date: getDateFromToday(8),
    startTime: "09:00",
    endTime: "11:00",
    color: "blue",
    description: "Plan next 2-week sprint with development team",
    categoryId: "work",
    tags: ["sprint", "planning", "agile"],
    priority: "high",
    location: "Scrum Room",
  },
  {
    id: "next-week-2",
    title: "Architecture Review",
    date: getDateFromToday(8),
    startTime: "14:00",
    endTime: "16:00",
    color: "blue",
    description: "Review system architecture for scalability",
    categoryId: "work",
    tags: ["architecture", "review", "scalability"],
    priority: "high",
    location: "Tech Conference Room",
  },
  {
    id: "next-week-3",
    title: "Yoga Class",
    date: getDateFromToday(9),
    startTime: "18:30",
    endTime: "19:30",
    color: "red",
    description: "Evening yoga class for stress relief",
    categoryId: "health",
    tags: ["yoga", "fitness", "relaxation"],
    priority: "medium",
    location: "Wellness Studio",
  },
  {
    id: "next-week-4",
    title: "Performance Reviews",
    date: getDateFromToday(10),
    startTime: "10:00",
    endTime: "12:00",
    color: "blue",
    description: "Quarterly performance review meetings",
    categoryId: "work",
    tags: ["performance", "review", "hr"],
    priority: "high",
    location: "HR Conference Room",
  },
  {
    id: "next-week-5",
    title: "Team Building Event",
    date: getDateFromToday(10),
    startTime: "14:00",
    endTime: "17:00",
    color: "pink",
    description: "Quarterly team building activities and games",
    categoryId: "work",
    tags: ["team-building", "activities", "fun"],
    priority: "medium",
    location: "Outdoor Adventure Park",
  },

  // OVERLAPPING MEETINGS - Simulation of real conflicts
  {
    id: "conflict-1",
    title: "Emergency Bug Fix Meeting",
    date: getDateFromToday(11),
    startTime: "10:00",
    endTime: "11:30",
    color: "red",
    description: "Critical production bug needs immediate attention",
    categoryId: "work",
    tags: ["emergency", "bug", "critical"],
    priority: "high",
    location: "War Room",
  },
  {
    id: "conflict-2", 
    title: "Scheduled 1:1 with Manager",
    date: getDateFromToday(11),
    startTime: "10:30", // CONFLICTS with bug fix meeting!
    endTime: "11:30",
    color: "blue",
    description: "Monthly one-on-one with direct manager",
    categoryId: "work",
    tags: ["1on1", "manager", "monthly"],
    priority: "medium",
    location: "Manager's Office",
  },

  // RECURRING EVENTS
  {
    id: "recurring-1",
    title: "Weekly All-Hands",
    date: getDateFromToday(12),
    startTime: "15:00",
    endTime: "16:00",
    color: "blue",
    description: "Weekly company all-hands meeting",
    categoryId: "work",
    tags: ["all-hands", "company", "weekly"],
    priority: "medium",
    location: "Main Auditorium",
    recurring: "weekly",
  },
  {
    id: "recurring-2",
    title: "Piano Lesson",
    date: getDateFromToday(13),
    startTime: "16:00",
    endTime: "17:00", 
    color: "indigo",
    description: "Weekly piano lesson with instructor",
    categoryId: "education",
    tags: ["piano", "music", "lesson"],
    priority: "medium",
    location: "Music School",
    recurring: "weekly",
  },

  // FULL DAY EVENTS
  {
    id: "fullday-1",
    title: "Company Retreat",
    date: getDateFromToday(14),
    isAllDay: true,
    color: "yellow",
    description: "Annual company retreat and team building",
    categoryId: "work",
    tags: ["retreat", "company", "team-building"],
    priority: "high",
    location: "Mountain Resort",
  },
  {
    id: "fullday-2",
    title: "Wedding Anniversary",
    date: getDateFromToday(15),
    isAllDay: true,
    color: "purple",
    description: "Celebrating 10th wedding anniversary",
    categoryId: "family",
    tags: ["anniversary", "celebration", "marriage"],
    priority: "high",
    location: "Special Restaurant",
  },

  // LATE NIGHT / EARLY MORNING
  {
    id: "late-1",
    title: "System Maintenance",
    date: getDateFromToday(16),
    startTime: "23:00",
    endTime: "02:00",
    color: "gray",
    description: "Scheduled system maintenance window",
    categoryId: "work",
    tags: ["maintenance", "system", "overnight"],
    priority: "high",
    location: "Data Center",
  },
  {
    id: "early-1",
    title: "Airport Pickup",
    date: getDateFromToday(17),
    startTime: "05:30",
    endTime: "07:00",
    color: "yellow",
    description: "Pick up visiting relatives from airport",
    categoryId: "family",
    tags: ["airport", "pickup", "relatives"],
    priority: "high",
    location: "International Airport",
  },
];

// Sample Reminders for complex events
export const complexSampleReminders: EventReminder[] = [
  {
    id: "reminder-1",
    eventId: "today-1",
    type: "notification",
    timing: 5,
    message: "Daily standup starting in 5 minutes - don't forget your updates!",
    isActive: true,
  },
  {
    id: "reminder-2",
    eventId: "tomorrow-3",
    type: "notification",
    timing: 30,
    message: "Big client presentation in 30 minutes - time to shine! 🌟",
    isActive: true,
  },
  {
    id: "reminder-3",
    eventId: "tomorrow-3",
    type: "popup",
    timing: 60,
    isActive: true,
  },
  {
    id: "reminder-4",
    eventId: "tomorrow-5",
    type: "notification",
    timing: 15,
    message: "Doctor appointment reminder - bring insurance card",
    isActive: true,
  },
  {
    id: "reminder-5",
    eventId: "day2-4",
    type: "notification",
    timing: 120,
    message: "Flight departure in 2 hours - head to airport soon!",
    isActive: true,
  },
  {
    id: "reminder-6",
    eventId: "fullday-2",
    type: "notification",
    timing: 1440, // 1 day before
    message: "Anniversary tomorrow - don't forget the surprise dinner reservation!",
    isActive: true,
  },
  {
    id: "reminder-7",
    eventId: "late-1",
    type: "email",
    timing: 60,
    message: "System maintenance starting in 1 hour - prepare for downtime",
    isActive: true,
  },
];

// Sample Shares
export const complexSampleShares: CalendarShare[] = [
  {
    id: "share-1",
    name: "Work Calendar - Public",
    shareType: "public",
    permissions: "view",
    events: complexSampleEvents.filter(e => e.categoryId === "work"),
    createdAt: new Date(2024, 10, 15),
    accessCount: 47,
  },
  {
    id: "share-2", 
    name: "Family Events - Protected",
    shareType: "protected",
    permissions: "edit",
    password: "family123",
    events: complexSampleEvents.filter(e => e.categoryId === "family"),
    createdAt: new Date(2024, 10, 20),
    accessCount: 12,
    expiresAt: new Date(2025, 11, 31),
  },
  {
    id: "share-3",
    name: "Conference Schedule - Team",
    shareType: "private",
    permissions: "view",
    events: complexSampleEvents.filter(e => e.tags?.includes("conference")),
    createdAt: new Date(2024, 11, 1),
    accessCount: 8,
  },
];

// Helper function to get events for a specific date range
export const getEventsInRange = (startDate: Date, endDate: Date) => {
  return complexSampleEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= startDate && eventDate <= endDate;
  });
};

// Helper function to get conflicting events (overlapping times on same day)
export const getConflictingEvents = () => {
  const conflicts: { date: string; events: CalendarEventType[] }[] = [];
  
  // Group events by date
  const eventsByDate = complexSampleEvents.reduce((acc, event) => {
    if (event.isAllDay) return acc; // Skip all-day events
    
    const dateKey = event.date.toDateString();
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(event);
    return acc;
  }, {} as Record<string, CalendarEventType[]>);

  // Check for time conflicts
  Object.entries(eventsByDate).forEach(([date, events]) => {
    if (events.length < 2) return;
    
    const conflictingEvents: CalendarEventType[] = [];
    
    for (let i = 0; i < events.length; i++) {
      for (let j = i + 1; j < events.length; j++) {
        const event1 = events[i];
        const event2 = events[j];
        
        if (!event1.startTime || !event2.startTime) continue;
        
        const start1 = parseTime(event1.startTime);
        const end1 = parseTime(event1.endTime || "23:59");
        const start2 = parseTime(event2.startTime);
        const end2 = parseTime(event2.endTime || "23:59");
        
        // Check for overlap
        if (start1 < end2 && start2 < end1) {
          if (!conflictingEvents.includes(event1)) conflictingEvents.push(event1);
          if (!conflictingEvents.includes(event2)) conflictingEvents.push(event2);
        }
      }
    }
    
    if (conflictingEvents.length > 0) {
      conflicts.push({ date, events: conflictingEvents });
    }
  });
  
  return conflicts;
};

// Helper function to parse time string to minutes
const parseTime = (timeStr: string): number => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};
