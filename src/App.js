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
          <CombatStatsStep 
            data={characterData} 
            setData={setCharacterData} 
            onNext={() => setCurrentStep(5)} 
          />
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

function CombatStatsStep({ data, setData, onNext }) {
  // Initialize combat stats if they don't exist
  const combatStats = data.combatStats || {
    strength: -3,
    magicalPower: -3,
    dexterity: -3,
    speed: -3,
    endurance: -3,
    healingPower: -3,
    recovery: -3
  };

  // Calculate point costs for going from -3 to target value
  const getStatCost = (targetValue) => {
    const costs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    let total = 0;
    for (let i = 0; i < targetValue + 3; i++) {
      total += costs[i];
    }
    return total;
  };

  // Calculate total points spent
  const pointsSpent = Object.values(combatStats).reduce((total, statValue) => {
    return total + getStatCost(statValue);
  }, 0);

  const pointsRemaining = 80 - pointsSpent;

  const updateStat = (statName, newValue) => {
    if (newValue < -3 || newValue > 10) return;
    
    const newStats = { ...combatStats, [statName]: newValue };
    const newPointsSpent = Object.values(newStats).reduce((total, statValue) => {
      return total + getStatCost(statValue);
    }, 0);
    
    if (newPointsSpent <= 80) {
      setData(prev => ({ ...prev, combatStats: newStats }));
    }
  };

  // Reset all stats to -3
  const resetStats = () => {
    const resetStats = {
      strength: -3,
      magicalPower: -3,
      dexterity: -3,
      speed: -3,
      endurance: -3,
      healingPower: -3,
      recovery: -3
    };
    setData(prev => ({ ...prev, combatStats: resetStats }));
  };

  // Get stat effects for display
  const getStatEffects = (statName, value) => {
    switch (statName) {
      case 'strength':
      case 'dexterity':
      case 'magicalPower':
        if (value === -3) return "Cannot use weapons, auto fail saves";
        if (value === -2) return "Cannot use weapons, -100 to saves (disadvantage)";
        if (value === -1) return "Cannot use weapons, -50 to saves (disadvantage)";
        if (value === 0) return "Can use weapons at disadvantage, no save bonus";
        return `+${value * 20} to weapon attacks and saves`;
      
      case 'speed':
        const turns = value <= 4 ? 1 : value <= 9 ? 2 : 3;
        let initiative;
        if (value === -3) initiative = -200;
        else if (value === -2) initiative = -100;
        else if (value === -1) initiative = -50;
        else initiative = value * 20;
  
        return (
          <div>
            <div style={{ marginBottom: '8px' }}>
              <strong>Combat:</strong> {turns} turn{turns > 1 ? 's' : ''} per round, {initiative >= 0 ? '+' : ''}${initiative} initiative
            </div>
            <div style={{ fontSize: '12px', color: '#666', lineHeight: '1.3' }}>
              <strong>Equipment Speed Penalties (turns only, not initiative):</strong><br/>
              <strong>Armor:</strong> Light +0, Medium -1, Heavy -2, Ultra-Heavy -3<br/>
              <strong>Weapons:</strong> Light +0, Medium -1, Heavy -2<br/>
              <em>Example: Speed 7 + Heavy Armor (-2) = 5 effective speed = 2 turns/round</em>
            </div>
          </div>
        );
      
      case 'endurance':
        let hp;
        if (value <= 0) hp = 250 + (value + 3) * 50;
        else if (value <= 2) hp = 300 + value * 50;
        else if (value === 3) hp = 500;
        else if (value <= 5) hp = 500 + (value - 3) * 50;
        else if (value === 6) hp = 700;
        else if (value <= 8) hp = 700 + (value - 6) * 50;
        else if (value === 9) hp = 900;
        else hp = 1000;
        
        let saves;
        if (value === -3) saves = "auto fail END saves";
        else if (value === -2) saves = "-100 END saves (disadvantage)";
        else if (value === -1) saves = "-50 END saves (disadvantage)";
        else if (value === 0) saves = "no save bonus";
        else saves = `+${value * 20} END saves`;
        
        return `${hp} HP, ${saves}`;
      
      case 'healingPower':
        if (value === -3) return "Only self-heal via consumables (lowest value), no abilities";
        if (value === -2) return "Only self-heal via consumables (disadvantage), no abilities";
        if (value === -1) return "Only self-heal via consumables, no abilities";
        if (value === 0) return "Can heal others at disadvantage, no bonus";
        return `+${value * 20} bonus to healing rolls`;
      
      case 'recovery':
  let startingAP, gainPerRound;
  
  if (value === -3) {
    startingAP = 1;
    gainPerRound = 0;
  } else if (value === -2) {
    startingAP = 2;
    gainPerRound = 0.5;
  } else if (value === -1) {
    startingAP = 3;
    gainPerRound = 0.5;
  } else if (value === 0) {
    startingAP = 4;
    gainPerRound = 1;
  } else if (value === 1) {
    startingAP = 5;
    gainPerRound = 1;
  } else if (value === 2) {
    startingAP = 6;
    gainPerRound = 1.5;
  } else if (value === 3) {
    startingAP = 7;
    gainPerRound = 1.5;
  } else if (value === 4) {
    startingAP = 8;
    gainPerRound = 2;
  } else if (value === 5) {
    startingAP = 9;
    gainPerRound = 2;
  } else if (value === 6) {
    startingAP = 10;
    gainPerRound = 2.5;
  } else if (value === 7) {
    startingAP = 10;
    gainPerRound = 2.5;
  } else if (value === 8) {
    startingAP = 10;
    gainPerRound = 3;
  } else if (value === 9) {
    startingAP = 10;
    gainPerRound = 3.5;
  } else if (value === 10) {
    startingAP = 10;
    gainPerRound = 4;
  }
  
  return `Start with ${startingAP} AP, gain ${gainPerRound} AP per round (10 AP cap)`;

  const statDescriptions = {
    strength: "Increases damage with STR-based weapons",
    magicalPower: "Increases damage done with spells", 
    dexterity: "Increases damage with DEX-based weapons",
    speed: "Determines initiative and attacks per round",
    endurance: "Determines HP and physical resistance",
    healingPower: "Increases bonus healing amount",
    recovery: "Increases Action Points recovered per round"
  };

  const statNames = {
    strength: "Strength",
    magicalPower: "Magical Power",
    dexterity: "Dexterity", 
    speed: "Speed",
    endurance: "Endurance",
    healingPower: "Healing Power",
    recovery: "Recovery"
  };

  return (
    <div>
      <h2>Combat Stats Allocation</h2>
      <p>Allocate your 80 combat stat points. All stats start at -3. You don't have to spend all points - any remaining points can be saved for future level-ups.</p>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px', 
        padding: '15px', 
        backgroundColor: '#f8f9fa', 
        border: '1px solid #ddd', 
        borderRadius: '5px' 
      }}>
        <div>
          <strong>Points Spent: {pointsSpent} / 80</strong>
          <br />
          <span style={{ color: '#666' }}>Points Remaining: {pointsRemaining}</span>
        </div>
        <button 
          onClick={resetStats}
          style={{ 
            padding: '8px 16px', 
            fontSize: '14px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Reset All Stats
        </button>
      </div>

      {Object.entries(combatStats).map(([statName, value]) => (
        <div key={statName} style={{ 
          marginBottom: '25px', 
          padding: '15px', 
          border: '1px solid #ddd', 
          borderRadius: '5px',
          backgroundColor: 'white'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div>
              <h3 style={{ margin: '0', color: '#333' }}>{statNames[statName]}</h3>
              <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>{statDescriptions[statName]}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button 
                onClick={() => updateStat(statName, value - 1)}
                disabled={value <= -3}
                style={{ 
                  padding: '5px 10px', 
                  fontSize: '16px',
                  backgroundColor: value > -3 ? '#dc3545' : '#ccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: value > -3 ? 'pointer' : 'not-allowed'
                }}
              >
                -
              </button>
              <span style={{ 
                minWidth: '40px', 
                textAlign: 'center', 
                fontSize: '18px', 
                fontWeight: 'bold',
                padding: '5px 10px',
                backgroundColor: '#f8f9fa',
                border: '1px solid #ddd',
                borderRadius: '3px'
              }}>
                {value}
              </span>
              <button 
                onClick={() => updateStat(statName, value + 1)}
                disabled={value >= 10 || pointsRemaining <= 0}
                style={{ 
                  padding: '5px 10px', 
                  fontSize: '16px',
                  backgroundColor: (value < 10 && pointsRemaining > 0) ? '#28a745' : '#ccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: (value < 10 && pointsRemaining > 0) ? 'pointer' : 'not-allowed'
                }}
              >
                +
              </button>
            </div>
          </div>
          
          <div style={{ 
            padding: '10px', 
            backgroundColor: '#f0f8ff', 
            borderRadius: '3px',
            fontSize: '14px',
            fontStyle: 'italic'
          }}>
            <strong>Effect:</strong> {getStatEffects(statName, value)}
          </div>
          
          <div style={{ fontSize: '12px', color: '#888', marginTop: '5px' }}>
            Cost: {getStatCost(value)} points
          </div>
        </div>
      ))}

      <button 
        onClick={onNext}
        style={{ 
          padding: '12px 24px', 
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Continue to Non-Combat Stats
      </button>
      
      {pointsRemaining > 0 && (
        <p style={{ color: '#28a745', marginTop: '10px' }}>
          💡 You have {pointsRemaining} points remaining that will be saved for future level-ups.
        </p>
      )}
    </div>
  );
}

export default App;
