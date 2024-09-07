import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
  useNavigate,
} from "react-router-dom";
import LogIn1 from "./pages/LogIn1";
import UpdateContract from "./pages/UpdateContract";
import SignUp from "./pages/SignUp";
import NewContract from "./pages/NewContract";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Profile from "./pages/Profile";
import ContractForm from "./components/ContractForm";
import Notification from "./pages/Notification";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  const navigate = useNavigate(); // For handling redirection

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "Home";
        metaDescription = "Welcome to the homepage.";
        break;
      case "/login":
        title = "Login";
        metaDescription = "Log in to your account.";
        break;
      case "/updateContract":
        title = "Update Contract";
        metaDescription = "Update your contract details.";
        break;
      case "/signup":
        title = "Sign Up";
        metaDescription = "Create a new account.";
        break;
      case "/newContract":
        title = "New Contract";
        metaDescription = "Create a new contract.";
        break;
      case "/profile":
        title = "Profile";
        metaDescription = "View and edit your profile.";
        break;
      case "/create-contract":
        title = "Create Contract";
        metaDescription = "Create a new contract.";
        break;
      case "/marketplace":
        title = "Marketplace";
        metaDescription = "Browse the marketplace.";
        break;
        case "/notifications":
          title = "Notification";
          metaDescription = "Browse the marketplace.";
          break;
      default:
        title = "App";
        metaDescription = "Default description for the app.";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  // Example logout handler that clears the auth token and redirects to login
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogIn1 />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<Profile onLogout={handleLogout} />} />
      <Route path="/create-contract" element={<ContractForm />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/updateContract" element={<UpdateContract />} />
      <Route path="/newContract" element={<NewContract />} />
      <Route path="/notifications" element={<Notification />} />
    </Routes>
  );
}

export default App;
