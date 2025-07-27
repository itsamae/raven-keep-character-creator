import React, { useState } from 'react';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [characterData, setCharacterData] = useState({
    name: '',
    race: '',
    department: ''
  });
  
  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Raven's Keep Character Creator - Beta</h1>
      
      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f0f8ff', border: '1px solid #ddd', borderRadius: '5px' }}>
        <strong>Step {currentStep} of 7:</strong> 
        {currentStep === 1 && " Welcome & Agreement"}
        {currentStep === 2 && " Character Basics"}
        {currentStep === 3 && " Department Selection"}
        {currentStep === 4 && " Combat Stats"}
        {currentStep === 5 && " Non-Combat Stats"}
        {currentStep === 6 && " Skill Trees"}
        {currentStep === 7 && " Character Summary"}
      </div>
      
      <div>
        <p>Debug: Current step is {currentStep}</p>
        
        {currentStep === 1 && (
          <WelcomeStep onNext={() => setCurrentStep(2)} />
        )}
        
        {currentStep === 2 && (
          <CharacterBasicsStep 
            data={characterData} 
            setData={setCharacterData} 
            onNext={() => setCurrentStep(3)} 
          />
        )}
        
        {currentStep === 3 && (
          <DepartmentSelectionStep 
            data={characterData} 
            setData={setCharacterData} 
            onNext={() => setCurrentStep(4)} 
          />
        )}
        
        {currentStep === 4 && (
          <div>Combat Stats (Coming Soon)</div>
        )}
      </div>
    </div>
  );
}

function WelcomeStep({ onNext }) {
  const [agreedToBeta, setAgreedToBeta] = useState(false);
  
  return (
    <div>
      <h2>Welcome to the RKC Beta Test!</h2>
      <p>Thank you for participating in our beta test. This character creator is experimental and may have bugs or incomplete features.</p>
      
      <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderRadius: '5px', margin: '20px 0' }}>
        <p><strong>Important Beta Information:</strong></p>
        <ul>
          <li>This is beta software and may not work perfectly</li>
          <li>Character data may be reset during testing</li>
          <li>Features may change before final release</li>
          <li>Your feedback is valuable - please report any issues or suggestions</li>
        </ul>
      </div>
      
      <label style={{ display: 'flex', alignItems: 'center', fontSize: '16px' }}>
        <input 
          type="checkbox" 
          checked={agreedToBeta}
          onChange={(e) => setAgreedToBeta(e.target.checked)}
          style={{ marginRight: '10px', transform: 'scale(1.2)' }}
        />
        I understand this is beta software and wish to continue
      </label>
      
      <br />
      
      <button 
        onClick={onNext}
        disabled={!agreedToBeta}
        style={{ 
          padding: '12px 24px', 
          fontSize: '16px',
          backgroundColor: agreedToBeta ? '#007bff' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: agreedToBeta ? 'pointer' : 'not-allowed'
        }}
      >
        Continue to Character Creation
      </button>
    </div>
  );
}

function CharacterBasicsStep({ data, setData, onNext }) {
  const handleChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };
  
  return (
    <div>
      <h2>Character Basics</h2>
      <p>Let's start with the fundamental details of your character.</p>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Character Name:</label>
        <input 
          type="text"
          value={data.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Enter your character's full name"
          style={{ padding: '10px', width: '400px', border: '1px solid #ccc', borderRadius: '3px', fontSize: '16px' }}
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Race:</label>
        <select 
          value={data.race}
          onChange={(e) => handleChange('race', e.target.value)}
          style={{ padding: '10px', width: '400px', border: '1px solid #ccc', borderRadius: '3px', fontSize: '16px' }}
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
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Character Image (Optional):</label>
        <input type="file" accept="image/*" style={{ fontSize: '14px' }} />
        <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
          Upload a picture of your character if you'd like (for reference only)
        </div>
      </div>
      
      <button 
        onClick={onNext}
        disabled={!data.name || !data.race}
        style={{ 
          padding: '12px 24px', 
          fontSize: '16px',
          backgroundColor: (data.name && data.race) ? '#007bff' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: (data.name && data.race) ? 'pointer' : 'not-allowed'
        }}
      >
        Continue to Department Selection
      </button>
    </div>
  );
}

function DepartmentSelectionStep({ data, setData, onNext }) {
  const departments = [
    {
      id: 'aetheric',
      name: 'Aetheric Studies',
      shortDesc: 'Magic, theory, and aetheric research',
      fullDesc: 'Delve into the mysteries of aether and magic. Whether you seek to master elemental forces, uncover ancient arcane secrets, or develop new magical theories, Aetheric Studies welcomes scholars, mages, and theorists. From practical spellcasting to esoteric research, members explore how aether shapes reality itself. Perfect for characters interested in magic, research, teaching, or pushing the boundaries of what\'s possible with aetheric manipulation.'
    },
    {
      id: 'bioscience',
      name: 'Bio-Science Studies',
      shortDesc: 'Medicine, alchemy, and biological sciences',
      fullDesc: 'The intersection of life, science, and innovation. Bio-Science encompasses not just healing and medicine, but also alchemy, toxicology, bio-engineering, and experimental biology. Members might be traditional healers, poison specialists, alchemists brewing exotic compounds, or bio-engineers grafting new capabilities onto living beings. This department runs the Consortium\'s medical facilities while pushing the boundaries of what life can become through science and innovation.'
    },
    {
      id: 'creation',
      name: 'Creation Studies',  
      shortDesc: 'Engineering, technology, and manufacturing',
      fullDesc: 'Build the future with your hands and mind. Creation Studies covers engineering, robotics, weapon smithing, magitek development, and technological innovation. Whether you\'re crafting precision firearms, building mechanical constructs, developing new tools, or maintaining the Consortium\'s technological infrastructure, this department values practical innovation. Perfect for inventors, engineers, crafters, and anyone who believes problems are solved through superior technology and skilled craftsmanship.'
    },
    {
      id: 'anthropological',
      name: 'Anthropological Studies',
      shortDesc: 'Culture, history, and archaeological research',
      fullDesc: 'Uncover the secrets of civilizations past and present. This department combines archaeology, cultural studies, historical research, and lore preservation. Members might excavate ancient ruins, study foreign cultures, preserve historical artifacts, or investigate mysterious phenomena with scholarly rigor. From deciphering dead languages to understanding the customs of distant peoples, Anthropological Studies bridges the gap between knowledge and wisdom through careful research and cultural understanding.'
    },
    {
      id: 'challenge',
      name: 'Department of Challenge',
      shortDesc: 'Combat training and monster hunting',
      fullDesc: 'Face danger head-on and emerge stronger. The Department of Challenge focuses on combat excellence, monster hunting, physical training, and tactical operations. Members are the Consortium\'s front-line defenders, elite hunters, and combat instructors. Whether tracking dangerous beasts, training fellow Ravens in martial arts, or leading dangerous expeditions into hostile territory, this department values courage, skill, and the relentless pursuit of martial excellence.'
    },
    {
      id: 'wilderness',
      name: 'Wilderness Studies',
      shortDesc: 'Nature, survival, and field research',
      fullDesc: 'Master the untamed world beyond civilization. Wilderness Studies encompasses survival skills, natural sciences, field research, and environmental expertise. Members might be trackers, botanists, survival experts, beast tamers, or field researchers who thrive in dangerous environments. From navigating treacherous terrain to understanding ecosystems, this department values self-reliance, environmental knowledge, and the ability to thrive where others merely survive.'
    }
  ];

  return (
    <div>
      <h2>Department Selection</h2>
      <p style={{ marginBottom: '20px' }}>
        Choose the department that best aligns with your character's interests and expertise. 
        Your department will influence your roleplay opportunities and specialization paths.
      </p>
      
      <div style={{ marginBottom: '20px' }}>
        {departments.map(dept => (
          <div key={dept.id} style={{ 
            marginBottom: '15px', 
            padding: '15px', 
            border: data.department === dept.id ? '2px solid #007bff' : '1px solid #ddd',
            borderRadius: '5px',
            backgroundColor: data.department === dept.id ? '#f0f8ff' : 'white',
            cursor: 'pointer'
          }}
          onClick={() => setData(prev => ({ ...prev, department: dept.id }))}
          >
            <label style={{ cursor: 'pointer', display: 'block' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <input 
                  type="radio"
                  name="department"
                  value={dept.id}
                  checked={data.department === dept.id}
                  onChange={() => setData(prev => ({ ...prev, department: dept.id }))}
                  style={{ marginRight: '10px', marginTop: '5px' }}
                />
                <div>
                  <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{dept.name}</h3>
                  <p style={{ margin: '0 0 10px 0', fontStyle: 'italic', color: '#666' }}>{dept.shortDesc}</p>
                  <p style={{ margin: '0', fontSize: '14px', lineHeight: '1.4', color: '#555' }}>{dept.fullDesc}</p>
                </div>
              </div>
            </label>
          </div>
        ))}
      </div>
      
      <button 
        onClick={onNext}
        disabled={!data.department}
        style={{ 
          padding: '12px 24px', 
          fontSize: '16px',
          backgroundColor: data.department ? '#007bff' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: data.department ? 'pointer' : 'not-allowed'
        }}
      >
        Continue to Combat Stats
      </button>
    </div>
  );
}

export default App;
