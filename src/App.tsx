import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/Navbar";
import Home from "./pages/Home";
import Summarize from "./pages/Summarize";
import Profile from "./pages/Profile";
import SummaryView from "./pages/SummaryView";
import { AuthProvider } from "./contexts/AuthContext";

const App: React.FC = () => (
  <AuthProvider>
    <Router>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/summarize" element={<Summarize />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/summary/:id" element={<SummaryView/>} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;







// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
