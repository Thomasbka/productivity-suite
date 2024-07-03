// src/routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskTimer from './components/TaskTimer';
import QuickFeedback from './components/QuickFeedback';
import InstantMeetingNotes from './components/InstantMeetingNotes';
import QuickAgenda from './components/QuickAgenda';
import DailyStandupHelper from './components/DailyStandupHelper';
import IdeaBox from './components/IdeaBox';
import QuickPolls from './components/QuickPolls';
import TaskPriorityBoard from './components/TaskPriorityBoard';
import EventCountdown from './components/EventCountdown';
import SimpleChecklist from './components/SimpleChecklist';
import PersonalGoalTracker from './components/PersonalGoalTracker';
import QuickNotes from './components/QuickNotes';
import MeetingTimer from './components/MeetingTimer';
import SimpleToDoList from './components/SimpleToDoList';
import ResourceLinksManager from './components/ResourceLinksManager';
import TeamMoodTracker from './components/TeamMoodTracker';
import BrowserTabOrganizer from './components/BrowserTabOrganizer';
import Home from './components/Home';

const RoutesComponent = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/task-timer" element={<TaskTimer />} />
      <Route path="/quick-feedback" element={<QuickFeedback />} />
      <Route path="/instant-meeting-notes" element={<InstantMeetingNotes />} />
      <Route path="/quick-agenda" element={<QuickAgenda />} />
      <Route path="/daily-standup-helper" element={<DailyStandupHelper />} />
      <Route path="/idea-box" element={<IdeaBox />} />
      <Route path="/quick-polls" element={<QuickPolls />} />
      <Route path="/task-priority-board" element={<TaskPriorityBoard />} />
      <Route path="/event-countdown" element={<EventCountdown />} />
      <Route path="/simple-checklist" element={<SimpleChecklist />} />
      <Route path="/personal-goal-tracker" element={<PersonalGoalTracker />} />
      <Route path="/quick-notes" element={<QuickNotes />} />
      <Route path="/meeting-timer" element={<MeetingTimer />} />
      <Route path="/simple-to-do-list" element={<SimpleToDoList />} />
      <Route path="/resource-links-manager" element={<ResourceLinksManager />} />
      <Route path="/team-mood-tracker" element={<TeamMoodTracker />} />
      <Route path="/browser-tab-organizer" element={<BrowserTabOrganizer />} />
    </Routes>
  </Router>
);

export default RoutesComponent;
