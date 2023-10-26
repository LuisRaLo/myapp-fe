import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/Home";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/configs/firebase";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user: User) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  function RequireAuth({ children }: { children: JSX.Element }) {
    const location = useLocation();
    if (!currentUser)
      return <Navigate to="/login" state={{ from: location }} />;
    return children;
  }

  return (
    <Fragment>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />
        <Route
          path="/login"
          element={currentUser ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={currentUser ? <Navigate to="/" /> : <SignupPage />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Fragment>
  );
}

export default App;
