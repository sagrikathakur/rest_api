import React from 'react';
import AuthForm from '../components/AuthForm';

export default function LoginPage({ onLoginSuccess, onNavigateToSignUp, initialEmail = '' }) {
  return (
    <div className="py-8 px-4 w-full">
      <AuthForm
        initialTab="login"
        onLoginSuccess={onLoginSuccess}
        onRegisterSuccess={() => {}}
        initialEmail={initialEmail}
      />
    </div>
  );
}
