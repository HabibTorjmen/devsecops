// Simple fake data for recent runs
const runs = [
  {
    id: "#1245",
    branch: "main",
    status: "success",
    findings: "0 critical, 1 high",
    duration: "4m 02s",
    triggered: "2 min ago",
  },
  {
    id: "#1244",
    branch: "feature/login",
    status: "failed",
    findings: "1 critical, 2 high",
    duration: "3m 47s",
    triggered: "18 min ago",
  },
  {
    id: "#1243",
    branch: "main",
    status: "success",
    findings: "0 critical, 0 high",
    duration: "4m 28s",
    triggered: "1 h ago",
  },
  {
    id: "#1242",
    branch: "bugfix/payment",
    status: "warning",
    findings: "0 critical, 3 medium",
    duration: "5m 01s",
    triggered: "3 h ago",
  },
  {
    id: "#1241",
    branch: "main",
    status: "success",
    findings: "0 critical, 1 low",
    duration: "3m 55s",
    triggered: "8 h ago",
  },
];

function statusClass(status) {
  switch (status) {
    case "success":
      return "status-success";
    case "failed":
      return "status-failed";
    case "warning":
      return "status-warning";
    default:
      return "";
  }
}

function statusText(status) {
  switch (status) {
    case "success":
      return "Passed";
    case "failed":
      return "Failed";
    case "warning":
      return "Passed with warnings";
    default:
      return status;
  }
}

function renderRuns() {
  const tbody = document.getElementById("runsTableBody");
  tbody.innerHTML = "";

  runs.forEach((run) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${run.id}</td>
      <td>${run.branch}</td>
      <td>
        <span class="status-label ${statusClass(run.status)}">
          ${statusText(run.status)}
        </span>
      </td>
      <td>${run.findings}</td>
      <td>${run.duration}</td>
      <td>${run.triggered}</td>
    `;

    tbody.appendChild(tr);
  });
}

function refreshHealth() {
  const now = new Date();
  const timeStr = now.toLocaleString();
  const healthStatusText = document.getElementById("healthStatusText");
  const lastRunTime = document.getElementById("lastRunTime");

  healthStatusText.textContent = `Health check: OK • Last update: ${timeStr}`;
  lastRunTime.textContent = timeStr;

  // Very simple random update of findings
  const critical = document.getElementById("criticalCount");
  const high = document.getElementById("highCount");
  const medium = document.getElementById("mediumCount");
  const low = document.getElementById("lowCount");

  critical.textContent = Math.random() < 0.2 ? 1 : 0;
  high.textContent = Math.floor(Math.random() * 3);
  medium.textContent = Math.floor(Math.random() * 5);
  low.textContent = Math.floor(Math.random() * 8);

  const lastStatus = document.getElementById("lastStatus");
  lastStatus.textContent =
    parseInt(critical.textContent) > 0 ? "DEGRADED" : "OK";
}

document.addEventListener("DOMContentLoaded", () => {
  renderRuns();
  refreshHealth();

  const refreshButton = document.getElementById("refreshButton");
  refreshButton.addEventListener("click", refreshHealth);
});
