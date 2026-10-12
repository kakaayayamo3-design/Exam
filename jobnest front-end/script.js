const jobs = [
  {
    title: "Software Engineer",
    company: "Google",
    location: "Remote",
    type: "Full-time",
    skills: ["JavaScript", "React", "TypeScript"],
    posted: "2 days ago",
    logo: "G",
    logoClass: "logo-google",
  },
  {
    title: "Product Designer",
    company: "Microsoft",
    location: "New York, NY",
    type: "Full-time",
    skills: ["UI/UX", "Figma", "Design Systems"],
    posted: "3 days ago",
    logo: "",
    logoClass: "logo-microsoft",
  },
  {
    title: "Marketing Specialist",
    company: "Amazon",
    location: "Seattle, WA",
    type: "Full-time",
    skills: ["Communication", "Creativity", "SEO"],
    posted: "4 days ago",
    logo: "a",
    logoClass: "logo-amazon",
  },
  {
    title: "iOS Developer",
    company: "Apple",
    location: "Cupertino, CA",
    type: "Full-time",
    skills: ["Swift", "Xcode", "iOS"],
    posted: "5 days ago",
    logo: "●",
    logoClass: "logo-apple",
  },
  {
    title: "Data Analyst",
    company: "Meta",
    location: "Remote",
    type: "Full-time",
    skills: ["SQL", "Python", "Analytics"],
    posted: "1 day ago",
    logo: "∞",
    logoClass: "logo-meta",
  },
  {
    title: "Customer Service Associate",
    company: "Amazon",
    location: "Remote",
    type: "Part-time",
    skills: ["Communication", "Support", "CRM"],
    posted: "6 days ago",
    logo: "a",
    logoClass: "logo-amazon",
  },
];
const list = document.getElementById("jobList"),
  empty = document.getElementById("emptyState");
function renderJobs(items) {
  list.innerHTML = "";
  empty.hidden = items.length !== 0;
  items.forEach((job, i) => {
    const card = document.createElement("article");
    card.className = "job-card";
    card.innerHTML = `<div class="company-logo ${job.logoClass}">${job.logoClass === "logo-microsoft" ? "<i></i><i></i><i></i><i></i>" : job.logo}</div><div class="job-info"><h3>${job.title}</h3><div class="job-company">${job.company}</div><div class="job-meta"><span class="place">${job.location}</span><span class="type">${job.type}</span></div><div class="skills">${job.skills.map((s) => `<span>${s}</span>`).join("")}</div></div><div class="job-action"><button class="apply-btn" aria-label="Apply for ${job.title}">Apply</button><span class="posted">${job.posted}</span></div>`;
    card.querySelector(".apply-btn").addEventListener("click", (e) => {
      e.currentTarget.textContent = "Applied";
      e.currentTarget.classList.add("applied");
      e.currentTarget.disabled = true;
      showToast(`Application started for ${job.title}`);
    });
    list.appendChild(card);
  });
}
function filterJobs() {
  const q = document.getElementById("jobSearch").value.trim().toLowerCase(),
    loc = document.getElementById("locationSearch").value.trim().toLowerCase();
  renderJobs(
    jobs.filter(
      (j) =>
        (!q ||
          [j.title, j.company, ...j.skills, j.location]
            .join(" ")
            .toLowerCase()
            .includes(q)) &&
        (!loc || j.location.toLowerCase().includes(loc)),
    ),
  );
}
document.getElementById("searchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  filterJobs();
});
document.querySelectorAll("[data-search]").forEach((btn) =>
  btn.addEventListener("click", () => {
    document.getElementById("jobSearch").value = btn.dataset.search;
    filterJobs();
    document.getElementById("jobs").scrollIntoView({ behavior: "smooth" });
  }),
);
document.getElementById("viewAll").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("jobSearch").value = "";
  document.getElementById("locationSearch").value = "";
  renderJobs(jobs);
});
function filterCompany(name) {
  document.getElementById("jobSearch").value = name;
  filterJobs();
  document.getElementById("jobs").scrollIntoView({ behavior: "smooth" });
}
let toastTimer;
function showToast(message) {
  const t = document.getElementById("toast");
  t.textContent = message;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2400);
}
document.getElementById("resumeInput").addEventListener("change", (e) => {
  if (e.target.files[0]) showToast(`Selected: ${e.target.files[0].name}`);
});
renderJobs(jobs);
