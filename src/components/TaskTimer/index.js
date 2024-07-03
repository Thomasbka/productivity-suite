// src/components/TaskTimer/index.js
import React, { useState, useEffect } from 'react';
import './TaskTimer.css';

const TaskTimer = () => {
  const [task, setTask] = useState('');
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([]);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    const savedLogs = JSON.parse(localStorage.getItem('taskLogs')) || [];
    setLogs(savedLogs);

    const savedTask = localStorage.getItem('currentTask') || '';
    setTask(savedTask);

    const savedStartTime = localStorage.getItem('startTime');
    if (savedStartTime) {
      setStartTime(new Date(savedStartTime));
      setIsRunning(true);
    }
  }, []);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        if (startTime) {
          const elapsedTime = Math.floor((new Date() - new Date(startTime)) / 1000);
          setTime(elapsedTime);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, startTime]);

  const handleStart = () => {
    if (task.trim() === '') {
      alert('Please enter a task.');
      return;
    }
    const startTime = new Date();
    setStartTime(startTime);
    localStorage.setItem('startTime', startTime);
    localStorage.setItem('currentTask', task);
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    const endTime = new Date();
    const newLog = {
      task,
      time,
      startTime: startTime.toLocaleString(),
      endTime: endTime.toLocaleString()
    };
    const updatedLogs = [...logs, newLog];
    setLogs(updatedLogs);
    localStorage.setItem('taskLogs', JSON.stringify(updatedLogs));
    localStorage.removeItem('startTime');
    localStorage.removeItem('elapsedTime');
    localStorage.removeItem('currentTask');
    setTask('');
    setTime(0);
    setStartTime(null);
  };

  const handleClearLogs = () => {
    if (window.confirm('Are you sure you want to clear all logs?')) {
      setLogs([]);
      localStorage.removeItem('taskLogs');
    }
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}, ` : ''}${minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''}, ` : ''}${seconds} second${seconds !== 1 ? 's' : ''}`;
  };

  return (
    <div className="task-timer">
      <h2>Task Timer</h2>
      <input
        type="text"
        placeholder="Enter task label"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleStart} disabled={isRunning}>Start Timer</button>
      <button onClick={handleStop} disabled={!isRunning}>Stop Timer</button>
      <div>Time: {formatTime(time)}</div>
      <button onClick={handleClearLogs} className="clear-log">Clear Log</button>
      <h3>Logs</h3>
      <div className="logs">
        {logs.map((log, index) => (
          <div key={index} className="log-entry">
            <div><strong>Task:</strong> {log.task}</div>
            <div><strong>Time:</strong> {formatTime(log.time)}</div>
            <div><strong>Started:</strong> {log.startTime}</div>
            <div><strong>Ended:</strong> {log.endTime}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskTimer;
