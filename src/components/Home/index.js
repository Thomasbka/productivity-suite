// src/components/Home/index.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Draggable from 'react-draggable';
import './Home.css';

const modules = [
  { name: 'Task Timer', path: '/task-timer' },
  { name: 'Quick Feedback', path: '/quick-feedback' },
  { name: 'Instant Meeting Notes', path: '/instant-meeting-notes' },
  { name: 'Quick Agenda', path: '/quick-agenda' },
  { name: 'Daily Standup Helper', path: '/daily-standup-helper' },
  { name: 'Idea Box', path: '/idea-box' },
  { name: 'Quick Polls', path: '/quick-polls' },
  { name: 'Task Priority Board', path: '/task-priority-board' },
  { name: 'Event Countdown', path: '/event-countdown' },
  { name: 'Simple Checklist', path: '/simple-checklist' },
  { name: 'Personal Goal Tracker', path: '/personal-goal-tracker' },
  { name: 'Quick Notes', path: '/quick-notes' },
  { name: 'Meeting Timer', path: '/meeting-timer' },
  { name: 'Simple To-Do List', path: '/simple-to-do-list' },
  { name: 'Resource Links Manager', path: '/resource-links-manager' },
  { name: 'Team Mood Tracker', path: '/team-mood-tracker' },
  { name: 'Browser Tab Organizer', path: '/browser-tab-organizer' }
];

const pastelColors = [
  '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', 
  '#D5BAFF', '#FFBAD6', '#FFBABA', '#BAFFC9', '#BAE1FF'
];

const Home = () => {
  const [positions, setPositions] = useState({});
  const [colors, setColors] = useState({});
  const [selectedModules, setSelectedModules] = useState([]);
  const [colorPickerVisible, setColorPickerVisible] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    const savedPositions = JSON.parse(localStorage.getItem('positions')) || {};
    const savedColors = JSON.parse(localStorage.getItem('colors')) || {};
    const savedSelectedModules = JSON.parse(localStorage.getItem('selectedModules')) || [];

    setPositions(savedPositions);
    setColors(savedColors);
    setSelectedModules(savedSelectedModules);
  }, []);

  const handleStop = (e, data, index) => {
    const newPositions = { ...positions, [index]: { x: data.x, y: data.y } };
    setPositions(newPositions);
    localStorage.setItem('positions', JSON.stringify(newPositions));
  };

  const handleSelectModule = (module) => {
    const moduleName = module.name;
    if (selectedModules.includes(moduleName)) {
      const newSelectedModules = selectedModules.filter((name) => name !== moduleName);
      setSelectedModules(newSelectedModules);
      localStorage.setItem('selectedModules', JSON.stringify(newSelectedModules));
    } else {
      const newSelectedModules = [...selectedModules, moduleName];
      setSelectedModules(newSelectedModules);
      localStorage.setItem('selectedModules', JSON.stringify(newSelectedModules));
    }
  };

  const handleColorChange = (moduleName, color) => {
    const newColors = { ...colors, [moduleName]: color };
    setColors(newColors);
    localStorage.setItem('colors', JSON.stringify(newColors));
  };

  const handleRightClick = (e, moduleName) => {
    e.preventDefault();
    setColorPickerVisible(moduleName);
  };

  return (
    <div className="home">
      <div className={`sidebar ${sidebarVisible ? 'visible' : 'hidden'}`}>
        <h2>Modules</h2>
        <ul>
          {modules.map((module) => (
            <li
              key={module.name}
              onClick={() => handleSelectModule(module)}
              className={selectedModules.includes(module.name) ? 'selected' : ''}
            >
              {module.name}
            </li>
          ))}
        </ul>
        <button className="toggle-sidebar" onClick={() => setSidebarVisible(!sidebarVisible)}>
          {sidebarVisible ? 'Hide' : 'Show'} Sidebar
        </button>
      </div>
      {!sidebarVisible && (
        <button className="show-sidebar" onClick={() => setSidebarVisible(true)}>
          Show Sidebar
        </button>
      )}
      <div className="main-content">
        <h1>Productivity Suite</h1>
        <div className="modules-container">
          {selectedModules.map((moduleName, index) => (
            <Draggable
              key={index}
              position={positions[moduleName] || { x: 0, y: 0 }}
              onStop={(e, data) => handleStop(e, data, moduleName)}
            >
              <div
                className="module"
                style={{ backgroundColor: colors[moduleName] || '#f0f0f0' }}
                onContextMenu={(e) => handleRightClick(e, moduleName)}
              >
                <Link to={modules.find((mod) => mod.name === moduleName).path}>{moduleName}</Link>
                {colorPickerVisible === moduleName && (
                  <div className="color-picker">
                    {pastelColors.map((color) => (
                      <div
                        key={color}
                        className="color-swatch"
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorChange(moduleName, color)}
                      />
                    ))}
                    <button onClick={() => setColorPickerVisible(null)}>Close</button>
                  </div>
                )}
              </div>
            </Draggable>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
