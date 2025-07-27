import React, { useState } from 'react';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [characterData, setCharacterData] = useState({
    // Basic Info
    name: '',
    age: '',
    origin: '',
    race: '',
    
    // Reputation (calculated)
    reputation: {},
    
    // Non-Combat Stats
    domains: {
      wisdom: -3,
      intelligence: -3,
      deftness: -3,
      charisma: -3,
      instinct: -3,
      empathy: -3
    },
    subDomains: {},
    
    // Backgrounds
    backgrounds: [],
    backgroundPoints: 200,
    
    // Lifestyles
    lifestyles: {},
    lifestylePoints: 5,
    
    // Combat Stats (existing)
    combatStats: {
      strength: -3,
      magicalPower: -3,
      dexterity: -3,
      speed: -3,
      endurance: -3,
      healingPower: -3,
      recovery: -3
    }
  });
  
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Raven's Keep 2.0 Character Creator - Beta</h1>
      
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f0f8ff', border: '1px solid #ddd', borderRadius: '5px' }}>
        <strong>Step {currentStep} of 8:</strong> 
        {currentStep === 1 && " Welcome & Overview"}
        {currentStep === 2 && " Character Basics"}
        {currentStep === 3 && " Reputation & Factions"}
        {currentStep === 4 && " Non-Combat Stats"}
        {currentStep === 5 && " Backgrounds"}
        {currentStep === 6 && " Lifestyles"}
        {currentStep === 7 && " Combat Stats"}
        {currentStep === 8 && " Character Overview"}
      </div>
      
      {currentStep === 1 && <WelcomeStep onNext={() => setCurrentStep(2)} />}
      {currentStep === 2 && <CharacterBasicsStep data={characterData} setData={setCharacterData} onNext={() => setCurrentStep(3)} />}
      {currentStep === 3 && <ReputationStep data={characterData} setData={setCharacterData} onNext={() => setCurrentStep(4)} />}
      {currentStep === 4 && <NonCombatStatsStep data={characterData} setData={setCharacterData} onNext={() => setCurrentStep(5)} />}
      {currentStep === 5 && <BackgroundsStep data={characterData} setData={setCharacterData} onNext={() => setCurrentStep(6)} />}
      {currentStep === 6 && <LifestylesStep data={characterData} setData={setCharacterData} onNext={() => setCurrentStep(7)} />}
      {currentStep === 7 && <CombatStatsStep data={characterData} setData={setCharacterData} onNext={() => setCurrentStep(8)} />}
      {currentStep === 8 && <CharacterOverviewStep data={characterData} />}
    </div>
  );
}

// Step 1: Welcome
function WelcomeStep({ onNext }) {
  const [understood, setUnderstood] = useState(false);
  
  return (
    <div>
      <h2>Welcome to the RKC 2.0 Beta!</h2>
      
      <div style={{ backgroundColor: '#fff3cd', padding: '20px', borderRadius: '5px', margin: '20px 0' }}>
        <p><strong>These are new features being tested and discussed!</strong></p>
        <p>We'll be going through these together panel by panel, so if you have questions as they come up, that's when we'll want to discuss them.</p>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Character Creation Overview:</h3>
        <ol>
          <li><strong>Character Basics</strong> - Name, age, origin, race</li>
          <li><strong>Reputation & Factions</strong> - Starting standing with various groups</li>
          <li><strong>Non-Combat Stats</strong> - 6 domains with multiple sub-skills each</li>
          <li><strong>Backgrounds</strong> - Positive and negative traits that shape your character</li>
          <li><strong>Lifestyles</strong> - Professions and economic activities</li>
          <li><strong>Combat Stats</strong> - Your fighting capabilities</li>
          <li><strong>Character Overview</strong> - Final character sheet</li>
        </ol>
      </div>
      
      <div style={{ backgroundColor: '#f8d7da', padding: '15px', borderRadius: '5px', margin: '20px 0' }}>
        <p><strong>Important Beta Reminders:</strong></p>
        <ul>
          <li>This is beta software - things are likely to change</li>
          <li>Nothing is set in stone</li>
          <li>You'll be linked to a feedback form after this</li>
          <li>If you don't fill out the feedback form, you'll be asked to sit out the next beta</li>
          <li>We'll go through the feedback form together as we complete character creation</li>
        </ul>
      </div>
      
      <label style={{ display: 'flex', alignItems: 'center', fontSize: '16px', marginBottom: '20px' }}>
        <input 
          type="checkbox" 
          checked={understood}
          onChange={(e) => setUnderstood(e.target.checked)}
          style={{ marginRight: '10px', transform: 'scale(1.2)' }}
        />
        I understand this is a beta test and will provide feedback
      </label>
      
      <button 
        onClick={onNext}
        disabled={!understood}
        style={{ 
          padding: '12px 24px', 
          fontSize: '16px',
          backgroundColor: understood ? '#007bff' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: understood ? 'pointer' : 'not-allowed'
        }}
      >
        Begin Character Creation
      </button>
    </div>
  );
}

// Step 2: Character Basics
function CharacterBasicsStep({ data, setData, onNext }) {
  const origins = [
    'Ala Mhigo', 'Azim Steppe', 'Bozja', 'Dalmasca', 'Doma', 'Dravania',
    'Garlemald & Imperial Territories', 'Gelmorra (pre-Gridanian subterranean)',
    'Golmore Jungle', 'Gridania & The Black Shroud', 'Hingashi',
    'Il Mheg (The First – restricted)', 'Ishgard & Coerthas',
    'Limsa Lominsa & La Noscea', 'Mare Lamentorum (Moon – restricted)',
    'Meracydia (ancient – restricted)', 'Norvrandt (The First – restricted)',
    'Radz-at-Han (Thavnair)', 'Sharlayan', 'The Thirteenth / Void (restricted)',
    'Tural (Native Origin)', 'Ul\'dah & Thanalan'
  ];

  const raceCategories = {
    core: [
      'Hyur', 'Elezen', 'Lalafell', 'Miqo\'te', 'Roegadyn', 
      'Au Ra', 'Viera', 'Hrothgar', 'Garlean (Pureblood)'
    ],
    allied: [
      'Arkasodara (Thavnair)', 'Aanta (Gyr Abania)', 'Qiqirn (Thanalan, La Noscea)',
      'Mamool Ja (Tural)', 'Moblin (Tural)', 'Hanuhanu (Tural)', 
      'Yok Huy (Tural)', 'Amalj\'aa (Thanalan)'
    ],
    restricted: [
      'Voidsent-descended Mortal (Thirteenth origin; highly restricted)',
      'Nu Mou (shard-travel explanation required)', 'Loporrit',
      'Construct / Soulbound Automaton (case-by-case approval)'
    ]
  };

  const handleChange = (field, value) => {
    const newData = { ...data, [field]: value };
    
    // Calculate reputation when race or origin changes
    if (field === 'race' || field === 'origin') {
      newData.reputation = calculateReputation(newData.race, newData.origin);
    }
    
    setData(newData);
  };

  // Calculate reputation based on race and origin
  const calculateReputation = (race, origin) => {
    const factions = {
      'The Syndicate': {
        base: 0,
        raceBonus: ['Lalafell', 'Garlean (Pureblood)'],
        originBonus: ['Ul\'dah & Thanalan'],
        originPenalty: ['Ala Mhigo', 'Azim Steppe', 'Bozja']
      },
      'Brass Blades': {
        base: 0,
        raceBonus: [],
        originBonus: ['Ul\'dah & Thanalan'],
        originPenalty: ['Ala Mhigo', 'Azim Steppe']
      },
      'Order of Nald\'thal': {
        base: 0,
        raceBonus: ['Lalafell', 'Garlean (Pureblood)'],
        originBonus: [],
        originPenalty: ['Gelmorra (pre-Gridanian subterranean)', 'Tural (Native Origin)']
      },
      'Brass Blade Dissidents': {
        base: 0,
        raceBonus: [],
        originBonus: ['Ul\'dah & Thanalan'],
        originPenalty: []
      },
      'The Sandguard Militia': {
        base: 0,
        raceBonus: [],
        originBonus: ['Ul\'dah & Thanalan'],
        originPenalty: []
      },
      'The Mirage Caravan': {
        base: 0,
        raceBonus: [],
        originBonus: ['Ul\'dah & Thanalan'],
        originPenalty: []
      },
      'The Amalj\'aa Tribe Coalition': {
        base: 0,
        raceBonus: [],
        originBonus: [],
        originPenalty: [],
        special: true
      }
    };

    const reputation = {};
    
    Object.entries(factions).forEach(([factionName, faction]) => {
      let rep = faction.base;
      
      // Special handling for Amalj'aa Coalition
      if (faction.special && factionName === 'The Amalj\'aa Tribe Coalition') {
        if (race === 'Amalj\'aa (Thanalan)') {
          rep = 150; // Special bonus
        } else {
          rep = -200; // Special penalty for non-Amalj'aa
        }
      } else {
        // Standard reputation calculation
        if (faction.raceBonus.includes(race)) rep += 20;
        if (faction.originBonus.includes(origin)) rep += 20;
        if (faction.originPenalty.includes(origin)) rep -= 20;
      }
      
      reputation[factionName] = rep;
    });

    return reputation;
  };

  const getReputationLevel = (rep) => {
    if (rep <= -301) return 'Hated';
    if (rep <= -101) return 'Distrusted';
    if (rep <= -1) return 'Tolerated';
    if (rep === 0) return 'Unknown';
    if (rep <= 150) return 'Recognized';
    if (rep <= 350) return 'Trusted';
    return 'Agent';
  };

  const getReputationColor = (rep) => {
    if (rep <= -301) return '#dc3545'; // Red
    if (rep <= -101) return '#fd7e14'; // Orange
    if (rep <= -1) return '#ffc107'; // Yellow
    if (rep === 0) return '#6c757d'; // Gray
    if (rep <= 150) return '#20c997'; // Teal
    if (rep <= 350) return '#28a745'; // Green
    return '#007bff'; // Blue
  };

  return (
    <div>
      <h2>Character Basics</h2>
      <p>Let's establish the fundamental details of your character.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Character Name:
          </label>
          <input 
            type="text"
            value={data.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Enter your character's full name"
            style={{ padding: '10px', width: '100%', border: '1px solid #ccc', borderRadius: '3px', fontSize: '16px' }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Character Age:
          </label>
          <input 
            type="number"
            value={data.age || ''}
            onChange={(e) => handleChange('age', e.target.value)}
            placeholder="Age in years"
            min="1"
            max="1000"
            style={{ padding: '10px', width: '100%', border: '1px solid #ccc', borderRadius: '3px', fontSize: '16px' }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Character Region of Origin:
        </label>
        <select 
          value={data.origin || ''}
          onChange={(e) => handleChange('origin', e.target.value)}
          style={{ padding: '10px', width: '100%', border: '1px solid #ccc', borderRadius: '3px', fontSize: '16px' }}
        >
          <option value="">Select region of origin...</option>
          {origins.map(origin => (
            <option key={origin} value={origin}>{origin}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
          Character Race:
        </label>
        
        {/* Core Races */}
        <div style={{ marginBottom: '15px' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#28a745' }}>Core Playable Races</h4>
          <p style={{ fontSize: '14px', color: '#666', margin: '0 0 10px 0' }}>
            These races are widely accepted and require no special approval.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px' }}>
            {raceCategories.core.map(race => (
              <label key={race} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input 
                  type="radio"
                  name="race"
                  value={race}
                  checked={data.race === race}
                  onChange={(e) => handleChange('race', e.target.value)}
                  style={{ marginRight: '8px' }}
                />
                {race}
              </label>
            ))}
          </div>
        </div>

        {/* Allied Society Races */}
        <div style={{ marginBottom: '15px' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#ffc107' }}>Allied Society Races</h4>
          <p style={{ fontSize: '14px', color: '#666', margin: '0 0 10px 0' }}>
            <strong>Requires Staff Approval</strong>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '5px' }}>
            {raceCategories.allied.map(race => (
              <label key={race} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input 
                  type="radio"
                  name="race"
                  value={race}
                  checked={data.race === race}
                  onChange={(e) => handleChange('race', e.target.value)}
                  style={{ marginRight: '8px' }}
                />
                {race}
              </label>
            ))}
          </div>
        </div>

        {/* Restricted Races */}
        <div style={{ marginBottom: '15px' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#dc3545' }}>Restricted Races</h4>
          <p style={{ fontSize: '14px', color: '#666', margin: '0 0 10px 0' }}>
            <strong>Population-Limited – Staff Approval Required</strong>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '5px' }}>
            {raceCategories.restricted.map(race => (
              <label key={race} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input 
                  type="radio"
                  name="race"
                  value={race}
                  checked={data.race === race}
                  onChange={(e) => handleChange('race', e.target.value)}
                  style={{ marginRight: '8px' }}
                />
                {race}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Live Reputation Preview */}
      {data.race && data.origin && (
        <div style={{ 
          marginBottom: '20px', 
          padding: '15px', 
          backgroundColor: '#f8f9fa', 
          border: '1px solid #ddd', 
          borderRadius: '5px' 
        }}>
          <h4 style={{ margin: '0 0 10px 0' }}>Starting Reputation Preview</h4>
          <p style={{ fontSize: '14px', color: '#666', margin: '0 0 10px 0' }}>
            Based on your race and origin selection:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {Object.entries(data.reputation || {}).map(([faction, rep]) => (
              <div key={faction} style={{ 
                padding: '8px', 
                backgroundColor: 'white', 
                borderRadius: '3px',
                border: `2px solid ${getReputationColor(rep)}`
              }}>
                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{faction}</div>
                <div style={{ color: getReputationColor(rep), fontWeight: 'bold' }}>
                  {rep > 0 ? '+' : ''}{rep} ({getReputationLevel(rep)})
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button 
        onClick={onNext}
        disabled={!data.name || !data.age || !data.origin || !data.race}
        style={{ 
          padding: '12px 24px', 
          fontSize: '16px',
          backgroundColor: (data.name && data.age && data.origin && data.race) ? '#007bff' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: (data.name && data.age && data.origin && data.race) ? 'pointer' : 'not-allowed'
        }}
      >
        Continue to Reputation & Factions
      </button>
    </div>
  );
}




export default App;
