import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { RegisterationForm } from './components/registeration-form';
import { StudentLists } from './components/student-list';
import {NotificationContainer} from 'react-notifications';

function App() {
  return (
    <div className="App">
        <NotificationContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StudentLists />} />
          <Route path="registeration/*" element={<RegisterationForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
