import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Components/Home/Home";
import { Nopage } from "./Components/Nopage./Nopage";
import { Login } from "./Components/Login/Login";
import { AdminHome } from "./Components/AdminHome/AdminHome";
import { Feedback } from "./Components/Feedback/Feedback";
import { ManageStud } from "./Components/ManageStud/ManageStud";
import { AddStud } from "./Components/AddStud/AddStud";
import { AddMarks } from "./Components/AddMarks/AddMarks";
import { MarksTable } from "./Components/MarksTable/MarksTable";
import { AddFeedback } from "./Components/AddFeedback/AddFeedback";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/home/:id" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/adminHome" element={<AdminHome />} />
          <Route path="/adminHome/feedback" element={ <Feedback /> } />
          <Route path="/send/feedback" element={ <AddFeedback /> } />
          <Route path="/adminHome/manageStudents" element={<ManageStud />} />
          <Route path="/adminHome/addMarks" element={<AddMarks />} />
          <Route path="/adminHome/marksTable" element={<MarksTable />} />
          <Route path="/addStud" element={<AddStud />} />
          <Route path="*" element={<Nopage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
