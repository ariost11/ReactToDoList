import * as React from 'react';
import { createRoot } from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";

import TaskTable from './TaskTable';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <div>
    <TaskTable/>
  </div>
);
