import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Button } from "react-bootstrap";
import Account from "./component/input";
import Header from "./component/header/header";
import { useAuth } from "./shared/AuthProvider";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { resolveValue, Toaster, ToastIcon } from 'react-hot-toast';
import { AuthProvider } from "./shared/AuthProvider";
import Login from "./component/auth/login";
import { ProtectedRoute } from "./shared/ProtectedRoute";
import Register from "./component/auth/register";
import { Transition } from '@headlessui/react';

function App() {
  return (
    <>
    <BrowserRouter>
      <div className="App">
        <div className="app-wrap">
          <AuthProvider>
            <Header />
            <Routes>
              <Route path="/" element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </AuthProvider>
        </div>
      </div>
    </BrowserRouter>
    <Toaster>
    {(t) => (
      <Transition
        appear
        show={t.visible}
        className="flex max-w-[400px] transform rounded rounded-t-[16px] rounded-bl-[16px] bg-white p-4 shadow-lg"
        enter="transition-all duration-150"
        enterFrom="opacity-0 scale-50"
        enterTo="opacity-100 scale-100"
        leave="transition-all duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-75"
      >
        <ToastIcon toast={t} />
        <p className="ml-2 px-2">{resolveValue(t.message, t)}</p>
      </Transition>
    )}
  </Toaster>
  </>
  );
}

export default App;