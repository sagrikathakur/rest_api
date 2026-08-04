import React from 'react';
import AuthForm from '../components/AuthForm';

export default function RegisterPage({ onSuccess, onNavigateToSignIn }) {
  return (
    <div className="py-8 px-4 w-full">
      <AuthForm
        initialTab="register"
        onLoginSuccess={() => {}}
        onRegisterSuccess={onSuccess}
      />
    </div>
  );
}
