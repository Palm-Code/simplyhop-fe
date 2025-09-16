# Calendar Sample Data Documentation

This document describes the complex sample data created for the calendar demo, showcasing realistic use cases and edge cases.

## Overview

The sample data includes **30+ events** spanning multiple weeks with realistic scenarios including:
- Overlapping meetings and time conflicts
- Multi-day events and conferences  
- All-day events
- Early morning and late night activities
- Different event categories and priorities
- Complex reminder systems

## Event Categories

### 1. **Work** (💼) - Blue
- Daily standups and team meetings
- Client presentations and reviews
- Sprint planning and architecture reviews
- Emergency bug fixes
- Company retreats and all-hands meetings

### 2. **Personal** (🏠) - Green  
- Coffee breaks and personal time
- Lunch meetings with mentors
- Errands like grocery shopping
- Personal development activities

### 3. **Health & Fitness** (🏥) - Red
- Morning jogs and gym workouts
- Doctor appointments and checkups
- Yoga classes for wellness
- Fitness activities and sports

### 4. **Family** (👨‍👩‍👧‍👦) - Purple
- Soccer practice with kids
- Family dinners and movie nights
- Wedding anniversaries and celebrations
- Weekend family activities

### 5. **Education** (📚) - Indigo
- Technology conferences (multi-day)
- Piano lessons and music classes
- Learning and development sessions
- Training workshops

### 6. **Travel** (✈️) - Yellow
- Business trip preparations
- Flight schedules with specific airlines
- Airport pickups and travel logistics
- Packing and travel planning

### 7. **Social** (🎉) - Pink
- BBQ parties with neighbors
- Team building events
- Social gatherings and networking
- Entertainment and leisure activities

## Complex Scenarios Demonstrated

### Time Conflicts
- **Today**: Daily Standup (9:00-9:30) overlaps with Client Presentation Prep (9:15-10:30)
- **Next Week**: Emergency Bug Fix Meeting (10:00-11:30) conflicts with Manager 1:1 (10:30-11:30)

### Multi-Day Events
- **3-Day Tech Conference**: Days 3-5 with full-day attendance
- **Company Retreat**: Full day event
- **Wedding Anniversary**: All-day celebration

### Edge Cases
- **Late Night**: System Maintenance (23:00-02:00)
- **Early Morning**: Airport Pickup (05:30-07:00), Morning Jog (06:30-07:30)
- **Recurring Events**: Weekly all-hands, piano lessons
- **Priority Levels**: Mix of high, medium, and low priority events

### Rich Event Data
Each event includes:
- **Location**: Specific venues, rooms, or addresses
- **Attendees**: Email addresses for participants
- **Tags**: Categorization for filtering and search
- **Priority**: High/Medium/Low importance levels
- **Descriptions**: Detailed context and notes
- **Reminders**: Multiple types with different timing

## Reminder System

### Reminder Types
- **Notification**: Browser notifications with custom messages
- **Popup**: Modal alerts within the application
- **Email**: Email notifications for important events

### Timing Examples
- 5 minutes before daily standup
- 30 minutes and 1 hour before client presentation
- 2 hours before flight departure
- 1 day before anniversary reminder

## Event Distribution Timeline

### Today (Day 0)
- **7 events** including overlapping meetings
- Mix of work meetings, breaks, and evening gym session
- Demonstrates busy workday with time management challenges

### Tomorrow (Day 1) 
- **5 events** centered around major client presentation
- Early morning jog, team breakfast, big presentation, debrief, doctor appointment
- Shows preparation and follow-up for important events

### Day 2-3
- Travel preparation and conference start
- Business trip logistics and packing
- Multi-day event beginning

### Days 3-5
- **Tech Conference** spanning 3 full days
- All-day event management
- Continuous engagement scenario

### Weekend (Days 6-7)
- **Family-focused activities**: Soccer practice, BBQ, movie night
- Work-life balance demonstration
- Social and personal time allocation

### Next Week (Days 8-12)
- Return to work routine with sprint planning
- Mix of regular meetings and special events
- Architecture reviews and performance evaluations

### Extended Timeline (Days 13-17)
- Recurring weekly events
- Late night maintenance windows
- Early morning activities
- Anniversary celebrations

## Use Case Testing

### Search & Filter Testing
- **Text Search**: "meeting", "client", "conference", "family"
- **Category Filter**: Filter by work, personal, health, etc.
- **Date Range**: Filter by specific weeks or months
- **Priority Filter**: High priority events for critical focus

### Drag & Drop Testing
- Move events between dates
- Reschedule conflicting meetings
- Adjust timing for better organization

### View Switching
- **Month View**: Overview of all events with density visualization
- **Week View**: Detailed weekly schedule with time slots
- **Day View**: Hour-by-hour breakdown with full details

### Mobile Experience
- Touch gestures for navigation
- Responsive event display
- Mobile-optimized event creation

## Data Structure Examples

### Basic Event
```typescript
{
  id: "today-1",
  title: "Daily Standup",
  date: getDateFromToday(0),
  startTime: "09:00",
  endTime: "09:30",
  color: "blue",
  description: "Daily team sync meeting",
  categoryId: "work",
  tags: ["meeting", "standup", "team"],
  priority: "high",
  location: "Conference Room A",
  attendees: ["john@company.com", "sarah@company.com"]
}
```

### All-Day Event
```typescript
{
  id: "fullday-1",
  title: "Company Retreat",
  date: getDateFromToday(14),
  isAllDay: true,
  color: "yellow",
  description: "Annual company retreat and team building",
  categoryId: "work",
  priority: "high",
  location: "Mountain Resort"
}
```

### Recurring Event
```typescript
{
  id: "recurring-1", 
  title: "Weekly All-Hands",
  date: getDateFromToday(12),
  startTime: "15:00",
  endTime: "16:00",
  color: "blue",
  categoryId: "work",
  recurring: "weekly",
  priority: "medium"
}
```

## Demo Instructions

### Quick Demo Actions
1. **Navigate**: Use arrow keys or mini calendar
2. **View Switch**: Press 1 (month), 2 (week), 3 (day)
3. **Search**: Type "meeting" or "client" in search bar
4. **Filter**: Click category colors to filter events
5. **Create**: Press 'N' or click empty date/time
6. **Edit**: Click any event to modify
7. **Drag**: Move events between dates
8. **Conflicts**: Notice warning indicators for overlapping events

### Scenarios to Explore
1. **Today's Schedule**: See overlapping meetings and busy day
2. **Tomorrow's Presentation**: Follow preparation → event → debrief flow
3. **Conference Week**: Multi-day event management
4. **Weekend Balance**: Family vs personal time allocation
5. **Time Conflicts**: How the system handles scheduling conflicts

This comprehensive sample data demonstrates the calendar's capability to handle real-world complexity while maintaining usability and clear visual organization.
