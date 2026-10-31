'use strict';
const form = document.querySelector('#terminal-form');
const input = document.querySelector('#command');
const output = document.querySelector('#terminal-output');
const history = [];
let historyPosition = 0;
const responses = {
  help: 'Available commands:\n  whoami      A quick introduction\n  work        Technical overview\n  experience  Career history\n  skills      Languages and infrastructure\n  about       Education and publications\n  contact     Get in touch\n  resume      Open the résumé PDF\n  clear       Clear command output',
  whoami: 'Jacob Ogle · Software engineer\nML infrastructure / high-performance computing\nCurrently: Ford Motor Company, ADAS DataOps\nBased in Ottawa Lake, Michigan.',
  skills: 'Languages  Python · Go · C/C++ · Bash · SQL · Rust · TypeScript\nCompute    Linux · Slurm · MPI · Kubernetes · Apptainer · PyTorch\nData       Airflow · Beam · DuckDB · PostgreSQL · TimescaleDB\nCloud      GCP · Azure · AWS',
  contact: 'Email: jakeogle@umich.edu\nGitHub: github.com/jake-ogle\nLinkedIn: linkedin.com/in/jakeogle',
  work: 'Data infrastructure · Research & GPU computing · Production systems.',
  experience: 'Ford → Michigan Medicine → Magna → Bosch / Ford internships → Michigan Medicine research.',
  about: 'M.S. Computer Science in progress at UT Austin.\nPreviously: Oregon State CS coursework; B.S. Chemistry, University of Michigan.'
};
function writeLine(text) {
  const line = document.createElement('p');
  line.textContent = text;
  output.append(line);
  while (output.children.length > 24) output.firstElementChild.remove();
  output.scrollTop = output.scrollHeight;
}
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const raw = input.value.trim();
  if (!raw) return;
  const command = raw.toLowerCase();
  history.push(raw);
  historyPosition = history.length;
  input.value = '';
  if (command === 'clear') { output.replaceChildren(); return; }
  writeLine('$ ' + raw);
  if (command === 'resume') {
    const line = document.createElement('p');
    const link = document.createElement('a');
    link.href = 'assets/Jacob_Ogle_Resume.pdf';
    link.textContent = 'Open Jacob Ogle’s résumé PDF ↗';
    line.append(link);
    output.append(line);
    output.scrollTop = output.scrollHeight;
    return;
  }
  writeLine(responses[command] || 'Command not found. Type help for available commands.');
  if (['work', 'experience', 'about', 'contact'].includes(command)) {
    document.getElementById(command).scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  }
});
input.addEventListener('keydown', (event) => {
  if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
  event.preventDefault();
  historyPosition = Math.max(0, Math.min(history.length, historyPosition + (event.key === 'ArrowUp' ? -1 : 1)));
  input.value = history[historyPosition] || '';
});
document.querySelector('#year').textContent = new Date().getFullYear();
