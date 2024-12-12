import React from 'react';
import { Header } from './components/Header';
import { Features } from './components/Features';
import { MainContent } from './components/MainContent';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <Features />
      <MainContent />
    </div>
  );
}

export default App;