import React, { useState } from 'react';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Raven's Keep Character Creator - Beta</h1>
      <p>Current Step: {currentStep}</p>
      
      {currentStep === 1 && <WelcomeStep onNext={() => setCurrentStep(2)} />}
      {currentStep === 2 && <CharacterBasicsStep onNext={() => setCurrentStep(3)} />}
    </div>
  );
}

function WelcomeStep({ onNext }) {
  const [agreedToBeta, setAgreedToBeta] = useState(false);
  
  return (
    <div>
      <h2>Welcome to the RKC Beta Test!</h2>
      <p>Thank you for participating in our beta test. This character creator is experimental and may have bugs or incomplete features.</p>
      
      <p>By continuing, you understand that:</p>
      <ul>
        <li>This is beta software and may not work perfectly</li>
        <li>Character data may be reset during testing</li>
        <li>Features may change before final release</li>
      </ul>
      
      <label>
        <input 
          type="checkbox" 
          checked={agreedToBeta}
          onChange={(e) => setAgreedToBeta(e.target.checked)}
        />
        I understand this is beta software and wish to continue
      </label>
      
      <br /><br />
      
      <button 
        onClick={onNext}
        disabled={!agreedToBeta}
        style={{ 
          padding: '10px 20px', 
          backgroundColor: agreedToBeta ? '#007bff' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        Continue to Character Creation
      </button>
    </div>
  );
}

function CharacterBasicsStep({ onNext }) {
  const [characterName, setCharacterName] = useState('');
  const [characterRace, setCharacterRace] = useState('');
  
  return (
    <div>
      <h2>Character Basics</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <label>Character Name:</label><br />
        <input 
          type="text"
          value={characterName}
          onChange={(e) => setCharacterName(e.target.value)}
          style={{ padding: '8px', width: '300px', border: '1px solid #ccc' }}
        />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label>Race:</label><br />
        <select 
          value={characterRace}
          onChange={(e) => setCharacterRace(e.target.value)}
          style={{ padding: '8px', width: '300px', border: '1px solid #ccc' }}
        >
          <option value="">Select a race...</option>
          <option value="hyur">Hyur</option>
          <option value="miqote">Miqo'te</option>
          <option value="elezen">Elezen</option>
          <option value="lalafell">Lalafell</option>
          <option value="roegadyn">Roegadyn</option>
          <option value="au_ra">Au Ra</option>
          <option value="viera">Viera</option>
          <option value="hrothgar">Hrothgar</option>
        </select>
      </div>
      
      <button 
        onClick={onNext}
        disabled={!characterName || !characterRace}
        style={{ 
          padding: '10px 20px', 
          backgroundColor: (characterName && characterRace) ? '#007bff' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        Continue to Departments
      </button>
    </div>
  );
}

export default App;
