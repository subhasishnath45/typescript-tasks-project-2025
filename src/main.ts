import './style.css';
import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';
import './tutorial.ts';
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="/tasks" target="_blank">
      Go to tasks
    </a>
  </div>
`;
