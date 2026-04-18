import React, { useEffect, useState } from "react";
import "../style/Profile.css";

const API_BASE_URL = "http://localhost:3001";
const TASKS_URL = `${API_BASE_URL}/tasks`;
const COMPLETIONS_URL = `${API_BASE_URL}/completions`;

// ----- Hjælpefunktioner -----
function formatDate(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

function getWeekStart(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay();
  const diff = (day + 6) % 7;
  d.setDate(d.getDate() - diff);
  return d;
}

function getCompletedDaysForTaskInWeek(taskId, weekStart, currentDateKey, completions) {
  const weekStartKey = formatDate(weekStart);
  const days = new Set(
    completions
      .filter(
        (c) =>
          c.taskId === taskId &&
          c.date >= weekStartKey &&
          c.date <= currentDateKey
      )
      .map((c) => c.date)
  );
  return days.size;
}

function getTasksForDate(date, tasks, completions) {
  const weekday = new Date(date).getDay();
  const weekStart = getWeekStart(date);
  const currentDayKey = formatDate(date);

  const result = [];

  for (const task of tasks) {
    if (task.frequency === "daily") {
      result.push(task);
      continue;
    }

    if (task.frequency === "weekly") {
      const createdDay = new Date(task.createdAt).getDay();
      if (weekday === createdDay) {
        result.push(task);
      }
      continue;
    }

    if (task.frequency === "threePerWeek") {
      const doneDays = getCompletedDaysForTaskInWeek(
        task.id,
        weekStart,
        currentDayKey,
        completions
      );
      if (doneDays < 3) {
        result.push(task);
      }
    }
  }

  return result;
}

// beregn streak i dage
function calculateStreak(tasks, completions) {
  if (!tasks || tasks.length === 0) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let streak = 0;
  let daysBack = 0;
  const MAX_DAYS = 365;

  while (daysBack < MAX_DAYS) {
    const d = new Date(today);
    d.setDate(today.getDate() - daysBack);
    const dateKey = formatDate(d);

    const tasksForDay = getTasksForDate(d, tasks, completions);

    // Ingen opgaver den dag -> tæller ikke, men bryder ikke streak
    if (tasksForDay.length === 0) {
      daysBack += 1;
      continue;
    }

    const doneToday = completions.filter((c) => c.date === dateKey);
    const allDone = tasksForDay.every((task) =>
      doneToday.some((c) => c.taskId === task.id)
    );

    if (allDone) {
      streak += 1;
      daysBack += 1;
    } else {
      break;
    }
  }

  return streak;
}

export default function Profile() {
  const [tasks, setTasks] = useState([]);
  const [completions, setCompletions] = useState([]);
  const [streak, setStreak] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [tasksRes, completionsRes] = await Promise.all([
          fetch(TASKS_URL),
          fetch(COMPLETIONS_URL),
        ]);

        if (!tasksRes.ok || !completionsRes.ok) {
          throw new Error("Kunne ikke hente data fra serveren");
        }

        const tasksData = await tasksRes.json();
        const completionsData = await completionsRes.json();

        setTasks(tasksData);
        setCompletions(completionsData);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Fejl ved indlæsning af data. Er json-server startet?");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const s = calculateStreak(tasks, completions);
    setStreak(s);
  }, [tasks, completions]);

  const todayKey = formatDate(new Date());

  return (
    <div className="profile">
      <h1>Profil</h1>

      {error && <p className="error-message">{error}</p>}

      <section className="streak-section">
        <h2>Din streak 🔥</h2>
        {loading ? (
          <p>Indlæser...</p>
        ) : (
          <p>
            Du har en streak på <strong>{streak}</strong>{" "}
            {streak === 1 ? "dag" : "dage"} i træk, hvor du har klaret alle
            dagens opgaver.
          </p>
        )}
      </section>

      <section className="stats-section">
        <h2>Statistik</h2>
        <p>Antal opgaver i alt: {tasks.length}</p>
        <p>Sidste dato (i dag): {todayKey}</p>
      </section>

      <section className="debug-section">
        {/* Du kan slette denne sektion senere – den er kun til at se data */}
        <h3>(Debug) Rå data</h3>
        <pre style={{ maxHeight: "250px", overflow: "auto" }}>
          {JSON.stringify(
            {
              tasks,
              completions,
            },
            null,
            2
          )}
        </pre>
      </section>
    </div>
  );
}
