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
      {currentStep === 2 && <CharacterBasicsStep data={characterData} setData={setCharacterData} onNext={() => setCurrentStep(3)} onBack={() => setCurrentStep(1)} />}
      {currentStep === 3 && <ReputationStep data={characterData} setData={setCharacterData} onNext={() => setCurrentStep(4)} onBack={() => setCurrentStep(2)} />}
      {currentStep === 4 && <NonCombatStatsStep data={characterData} setData={setCharacterData} onNext={() => setCurrentStep(5)} onBack={() => setCurrentStep(3)} />}
      {currentStep === 5 && <BackgroundsStep data={characterData} setData={setCharacterData} onNext={() => setCurrentStep(6)} onBack={() => setCurrentStep(4)} />}
      {currentStep === 6 && <LifestylesStep data={characterData} setData={setCharacterData} onNext={() => setCurrentStep(7)} onBack={() => setCurrentStep(5)} />}
      {currentStep === 7 && <CombatStatsStep data={characterData} setData={setCharacterData} onNext={() => setCurrentStep(8)} onBack={() => setCurrentStep(6)} />}
      {currentStep === 8 && <CharacterOverviewStep data={characterData} onBack={() => setCurrentStep(7)} />}
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

// Step 2: Character Basics (UPDATED)
function CharacterBasicsStep({ data, setData, onNext, onBack }) {
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

  const handleChange = (field, value) => {
    const newData = { ...data, [field]: value };
    
    // Calculate reputation when race or origin changes
    if (field === 'race' || field === 'origin') {
      newData.reputation = calculateReputation(newData.race, newData.origin, data.bonusFactions || []);
    }
    
    setData(newData);
  };

  // Updated reputation calculation with sample factions
  const calculateReputation = (race, origin, bonusFactions = []) => {
    const sampleFactions = {
      'The Syndicate': {
        base: 0,
        raceBonus: ['Lalafell', 'Garlean (Pureblood)'],
        originBonus: ['Ul\'dah & Thanalan'],
        originPenalty: ['Ala Mhigo', 'Gyr Abania', 'Bozja']
      },
      'Immortal Flames': {
        base: 0,
        raceBonus: [],
        originBonus: ['Ul\'dah & Thanalan', 'Ala Mhigo & Gyr Abania'],
        originPenalty: ['Garlemald & Imperial Territories']
      },
      'Order of the Twin Adder': {
        base: 0,
        raceBonus: [],
        originBonus: ['Gridania & The Black Shroud'],
        originPenalty: ['Garlemald & Imperial Territories', 'Ishgard & Coerthas']
      },
      'The Maelstrom': {
        base: 0,
        raceBonus: [],
        originBonus: ['Limsa Lominsa & La Noscea'],
        originPenalty: ['Garlemald & Imperial Territories']
      },
      'Temple Knights': {
        base: 0,
        raceBonus: ['Elezen'],
        originBonus: ['Ishgard & Coerthas'],
        originPenalty: ['Dravania', 'Garlemald & Imperial Territories']
      },
      'The Amalj\'aa Tribe Coalition': {
        base: 0,
        raceBonus: [],
        originBonus: [],
        originPenalty: [],
        special: 'amalj\'aa'
      }
    };

    const reputation = {};
    
    Object.entries(sampleFactions).forEach(([factionName, faction]) => {
      let rep = faction.base;
      
      // Special handling for Amalj'aa Coalition
      if (faction.special === 'amalj\'aa') {
        if (race === 'Amalj\'aa (Thanalan)') {
          rep = 150;
        } else {
          rep = -200;
        }
      } else {
        // Standard reputation calculation
        if (faction.raceBonus.includes(race)) rep += 20;
        if (faction.originBonus.includes(origin)) rep += 20;
        if (faction.originPenalty.includes(origin)) rep -= 20;
      }
      
      // Add bonus faction modifier
      if (bonusFactions.includes(factionName)) rep += 150;
      
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
    if (rep <= -301) return '#dc3545';
    if (rep <= -101) return '#fd7e14';
    if (rep <= -1) return '#ffc107';
    if (rep === 0) return '#6c757d';
    if (rep <= 150) return '#20c997';
    if (rep <= 350) return '#28a745';
    return '#007bff';
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

      <div style={{ marginBottom: '30px' }}>
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

      {/* Department Selection */}
      <div style={{ marginBottom: '30px' }}>
        <h3>Department Selection</h3>
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
            onClick={() => handleChange('department', dept.id)}
            >
              <label style={{ cursor: 'pointer', display: 'block' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <input 
                    type="radio"
                    name="department"
                    value={dept.id}
                    checked={data.department === dept.id}
                    onChange={() => handleChange('department', dept.id)}
                    style={{ marginRight: '10px', marginTop: '5px' }}
                  />
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{dept.name}</h4>
                    <p style={{ margin: '0 0 10px 0', fontStyle: 'italic', color: '#666' }}>{dept.shortDesc}</p>
                    <p style={{ margin: '0', fontSize: '14px', lineHeight: '1.4', color: '#555' }}>{dept.fullDesc}</p>
                  </div>
                </div>
              </label>
            </div>
          ))}
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
          <h4 style={{ margin: '0 0 10px 0' }}>Starting Reputation Preview (Sample)</h4>
          <p style={{ fontSize: '14px', color: '#666', margin: '0 0 10px 0' }}>
            Based on your race and origin selection (full faction list on next step):
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {Object.entries(calculateReputation(data.race, data.origin, data.bonusFactions || [])).map(([faction, rep]) => (
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

      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={onBack}
          style={{ 
            padding: '12px 24px', 
            fontSize: '16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          ← Back to Welcome
        </button>
        
        <button 
          onClick={onNext}
          disabled={!data.name || !data.age || !data.origin || !data.race || !data.department}
          style={{ 
            padding: '12px 24px', 
            fontSize: '16px',
            backgroundColor: (data.name && data.age && data.origin && data.race && data.department) ? '#007bff' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: (data.name && data.age && data.origin && data.race && data.department) ? 'pointer' : 'not-allowed'
          }}
        >
          Continue to Reputation & Factions
        </button>
      </div>
    </div>
  );
}

// Step 3: Reputation & Factions (COMPLETE)
function ReputationStep({ data, setData, onNext, onBack }) {
  const [selectedFactions, setSelectedFactions] = useState(data.bonusFactions || []);

  const allFactions = {
    'Ul\'dah & Thanalan': [
      {
        name: 'The Syndicate',
        description: 'The true power behind Ul\'dah, composed of merchant-princes and oligarchs.',
        raceBonus: ['Lalafell', 'Garlean (Pureblood)'],
        originBonus: ['Ul\'dah & Thanalan'],
        originPenalty: ['Ala Mhigo', 'Gyr Abania', 'Bozja']
      },
      {
        name: 'Immortal Flames',
        description: 'Ul\'dah\'s Grand Company military organization.',
        raceBonus: [],
        originBonus: ['Ul\'dah & Thanalan', 'Ala Mhigo & Gyr Abania'],
        originPenalty: ['Garlemald & Imperial Territories']
      },
      {
        name: 'Brass Blades',
        description: 'Mercenary-style guards hired by Ul\'dah, often corrupt.',
        raceBonus: [],
        originBonus: ['Ul\'dah & Thanalan'],
        originPenalty: ['Ala Mhigo', 'Gyr Abania', 'Azim Steppe']
      },
      {
        name: 'Order of Nald\'thal',
        description: 'Religious body controlling death and commerce.',
        raceBonus: ['Lalafell', 'Garlean (Pureblood)'],
        originBonus: [],
        originPenalty: ['Gyr Abania', 'Gelmorra (pre-Gridanian subterranean)', 'Tural (Native Origin)']
      },
      {
        name: 'Brass Blade Dissidents',
        description: 'Royalist faction of former Brass Blades members focused on protecting poor citizens.',
        raceBonus: [],
        originBonus: ['Ul\'dah & Thanalan'],
        originPenalty: []
      },
      {
        name: 'The Sandguard Militia',
        description: 'Former Royalist militia protecting greater Thanalan region.',
        raceBonus: [],
        originBonus: ['Ul\'dah & Thanalan'],
        originPenalty: []
      },
      {
        name: 'The Mirage Caravan',
        description: 'Smaller business folk united to compete with The Syndicate.',
        raceBonus: [],
        originBonus: ['Ul\'dah & Thanalan'],
        originPenalty: []
      },
      {
        name: 'The Amalj\'aa Tribe Coalition',
        description: 'Multiple Amalj\'aa tribes united to preserve their culture.',
        raceBonus: [],
        originBonus: [],
        originPenalty: [],
        special: 'amalj\'aa'
      }
    ],
    'Gridania & The Black Shroud': [
      {
        name: 'Order of the Twin Adder',
        description: 'Gridania\'s Grand Company military organization.',
        raceBonus: [],
        originBonus: ['Gridania & The Black Shroud'],
        originPenalty: ['Garlemald & Imperial Territories', 'Ishgard & Coerthas']
      },
      {
        name: 'Wood Wailers',
        description: 'Gridania\'s forest guardians and peacekeepers.',
        raceBonus: ['Elezen'],
        originBonus: ['Gridania & The Black Shroud'],
        originPenalty: ['Gelmorra (pre-Gridanian subterranean)']
      },
      {
        name: 'Gods\' Quiver',
        description: 'Elite archers protecting the Black Shroud.',
        raceBonus: ['Elezen'],
        originBonus: ['Gridania & The Black Shroud'],
        originPenalty: ['Garlemald & Imperial Territories']
      },
      {
        name: 'Conjurer\'s Guild / Stillglade Fane',
        description: 'Healers and nature magic practitioners.',
        raceBonus: ['Hyur'],
        originBonus: ['Gridania & The Black Shroud'],
        originPenalty: ['Garlemald & Imperial Territories', 'Gelmorra (pre-Gridanian subterranean)']
      },
      {
        name: 'Whispering Pines',
        description: 'Whispering Pines is a secretive assassins’ guild that operates like a family. Raised from childhood, members serve siblings and “Mother” or “Father.”',
        raceBonus: [],
        originBonus: ['Gridania & The Black Shroud'],
        originPenalty: ['Garlemald & Imperial Territories']
      },
      {
        name: 'Sylph Tribe',
        description: 'Forest-dwelling beastmen allied with Gridania.',
        raceBonus: [],
        originBonus: [],
        originPenalty: ['Garlemald & Imperial Territories']
      }
    ],
    'Limsa Lominsa & La Noscea': [
      {
        name: 'The Maelstrom',
        description: 'Limsa Lominsa\'s Grand Company naval force.',
        raceBonus: [],
        originBonus: ['Limsa Lominsa & La Noscea'],
        originPenalty: ['Garlemald & Imperial Territories']
      },
      {
        name: 'Yellowjackets',
        description: 'Limsa Lominsa\'s maritime security force.',
        raceBonus: [],
        originBonus: ['Limsa Lominsa & La Noscea'],
        originPenalty: ['Hingashi', 'Tural (Native Origin)']
      },
      {
        name: 'Kraken\'s Arms / East Aldenard Trading Co.',
        description: 'Major trading consortium.',
        raceBonus: ['Roegadyn'],
        originBonus: ['Limsa Lominsa & La Noscea'],
        originPenalty: ['Garlemald & Imperial Territories']
      },
      {
        name: 'Sanguine Sirens',
        description: 'Pirate crew with legitimate business interests.',
        raceBonus: ['Hyur'],
        originBonus: ['Limsa Lominsa & La Noscea'],
        originPenalty: ['Radz-at-Han (Thavnair)']
      },
      {
        name: 'Bloody Executioners',
        description: 'Notorious pirate crew.',
        raceBonus: [],
        originBonus: ['Limsa Lominsa & La Noscea'],
        originPenalty: []
      },
      {
        name: 'Company of Heroes (Legacy)',
        description: 'Veteran adventuring company.',
        raceBonus: [],
        originBonus: ['Limsa Lominsa & La Noscea'],
        originPenalty: []
      },
      {
        name: 'Kobold Tribes',
        description: 'Mining beastmen of La Noscea.',
        raceBonus: [],
        originBonus: [],
        originPenalty: [],
        special: 'kobold'
      },
      {
        name: 'Sahagin Tribe',
        description: 'Sea-dwelling beastmen.',
        raceBonus: [],
        originBonus: [],
        originPenalty: [],
        special: 'sahagin'
      }
    ],
    'Ishgard & Coerthas': [
      {
        name: 'Temple Knights',
        description: 'Elite religious warriors of Ishgard.',
        raceBonus: ['Elezen'],
        originBonus: ['Ishgard & Coerthas'],
        originPenalty: ['Dravania', 'Garlemald & Imperial Territories']
      },
      {
        name: 'Holy See Clergy',
        description: 'Religious leadership of Ishgard.',
        raceBonus: ['Elezen'],
        originBonus: ['Ishgard & Coerthas'],
        originPenalty: ['Sharlayan']
      },
      {
        name: 'House Fortemps',
        description: 'Noble house known for honor and diplomacy.',
        raceBonus: ['Elezen'],
        originBonus: ['Ishgard & Coerthas'],
        originPenalty: []
      },
      {
        name: 'House Durendaire',
        description: 'Noble house with military traditions.',
        raceBonus: ['Elezen'],
        originBonus: ['Ishgard & Coerthas'],
        originPenalty: ['Dravania']
      },
      {
        name: 'House Dzemael',
        description: 'Noble house with mining interests.',
        raceBonus: ['Elezen'],
        originBonus: ['Ishgard & Coerthas'],
        originPenalty: []
      },
      {
        name: 'House Haillenarte',
        description: 'Noble house with crafting traditions.',
        raceBonus: [],
        originBonus: ['Ishgard & Coerthas'],
        originPenalty: ['Garlemald & Imperial Territories']
      },
      {
        name: 'Ishgardian Restorationists',
        description: 'Citizens working to rebuild Ishgard.',
        raceBonus: [],
        originBonus: ['Ishgard & Coerthas'],
        originPenalty: []
      },
      {
        name: 'Hraesvelgr\'s Brood',
        description: 'Dragon clan allied with some Ishgardians.',
        raceBonus: [],
        originBonus: ['Dravania'],
        originPenalty: ['Ishgard & Coerthas']
      },
      {
        name: 'Moogles of Moghome',
        description: 'Helpful creatures of the Churning Mists.',
        raceBonus: [],
        originBonus: [],
        originPenalty: []
      }
    ],
    'Ala Mhigo & Gyr Abania': [
      {
        name: 'Ala Mhigan Resistance / Alliance',
        description: 'Freedom fighters who liberated Ala Mhigo from Garlemald.',
        raceBonus: ['Hyur'],
        originBonus: ['Ala Mhigo', 'Ul\'dah & Thanalan'],
        originPenalty: ['Garlemald & Imperial Territories', 'Gridania & The Black Shroud']
      },
      {
        name: 'Fist of Rhalgr',
        description: 'Monks and martial artists following the Destroyer.',
        raceBonus: ['Hyur'],
        originBonus: ['Ala Mhigo'],
        originPenalty: ['Garlemald & Imperial Territories', 'Gridania & The Black Shroud']
      },
      {
        name: 'Alacran Syndicate',
        description: 'Post-liberation criminal organization.',
        raceBonus: [],
        originBonus: ['Ala Mhigo'],
        originPenalty: ['Doma', 'Hingashi']
      },
      {
        name: 'Ananta Tribe (Vira)',
        description: 'Snake-like beastmen of the Peaks.',
        raceBonus: ['Aanta (Gyr Abania)'],
        originBonus: ['Ala Mhigo'],
        originPenalty: ['Garlemald & Imperial Territories']
      }
    ],
    'Doma & Yanxia': [
      {
        name: 'Doman Liberation Front',
        description: 'Rebels who freed Doma from imperial rule.',
        raceBonus: ['Au Ra'],
        originBonus: ['Doma', 'Hingashi'],
        originPenalty: ['Garlemald & Imperial Territories', 'Azim Steppe']
      },
      {
        name: 'Doman Regency',
        description: 'New government rebuilding Doma.',
        raceBonus: [],
        originBonus: ['Doma', 'Sharlayan'],
        originPenalty: []
      },
      {
        name: 'The Confederacy',
        description: 'River pirates turned legitimate traders.',
        raceBonus: [],
        originBonus: ['Doma', 'Hingashi'],
        originPenalty: ['Garlemald & Imperial Territories']
      },
      {
        name: 'Kojin Tribe (Blue)',
        description: 'Peaceful turtle-like traders.',
        raceBonus: [],
        originBonus: ['Radz-at-Han (Thavnair)'],
        originPenalty: ['Garlemald & Imperial Territories']
      },
      {
        name: 'Lupin Clans',
        description: 'Wolf-like beastmen of Yanxia.',
        raceBonus: [],
        originBonus: ['Doma'],
        originPenalty: ['Garlemald & Imperial Territories']
      },
      {
        name: 'Sui-no-Sato',
        description: 'Hidden underwater village of Raen Au Ra.',
        raceBonus: ['Au Ra'],
        originBonus: [],
        originPenalty: [] // Special: all non-Au Ra get penalty
      }
    ],
    'Hingashi': [
      {
        name: 'Kugane Sekiseigumi',
        description: 'Kugane\'s peacekeeping force.',
        raceBonus: [],
        originBonus: ['Hingashi'],
        originPenalty: ['Garlemald & Imperial Territories']
      },
      {
        name: 'Hingan Government (Bakufu)',
        description: 'Traditional isolationist government.',
        raceBonus: [],
        originBonus: ['Hingashi'],
        originPenalty: [] // Special: all non-Hingans get penalty
      }
    ],
    'Sharlayan': [
      {
        name: 'The Forum',
        description: 'Scholarly governing body of Sharlayan.',
        raceBonus: [],
        originBonus: ['Sharlayan'],
        originPenalty: ['Garlemald & Imperial Territories']
      },
      {
        name: 'Students of Baldesion',
        description: 'Researchers studying primals and aether.',
        raceBonus: [],
        originBonus: ['Sharlayan', 'Radz-at-Han (Thavnair)'],
        originPenalty: []
      },
      {
        name: 'The Studium / Library Guilds',
        description: 'Academic institutions and knowledge keepers.',
        raceBonus: [],
        originBonus: ['Sharlayan'],
        originPenalty: []
      }
    ],
    'Garlemald & Imperial Territories': [
      {
        name: 'Garlean Empire',
        description: 'The conquered imperial remnants.',
        raceBonus: ['Garlean (Pureblood)'],
        originBonus: ['Garlemald & Imperial Territories'],
        originPenalty: ['Ul\'dah & Thanalan', 'Gridania & The Black Shroud', 'Limsa Lominsa & La Noscea'] // All Grand Company origins
      },
      {
        name: 'Populares (Moderates)',
        description: 'Imperial moderates seeking reconciliation.',
        raceBonus: [],
        originBonus: ['Garlemald & Imperial Territories', 'Dalmasca', 'Bozja'],
        originPenalty: []
      },
      {
        name: 'Optimates (Hardliners)',
        description: 'Imperial hardliners wanting restoration.',
        raceBonus: [],
        originBonus: ['Garlemald & Imperial Territories'],
        originPenalty: []
      }
    ],
    'Radz-at-Han (Thavnair)': [
      {
        name: 'Radz-at-Han Government',
        description: 'Mercantile government of the great trade city.',
        raceBonus: [],
        originBonus: ['Radz-at-Han (Thavnair)', 'Sharlayan'],
        originPenalty: ['Garlemald & Imperial Territories']
      },
      {
        name: 'Radiant Host',
        description: 'Thavnair\'s military and peacekeeping force.',
        raceBonus: [],
        originBonus: ['Radz-at-Han (Thavnair)'],
        originPenalty: ['Garlemald & Imperial Territories']
      },
      {
        name: 'Arkasodara Tribe',
        description: 'Elephant-like beastmen traders.',
        raceBonus: ['Arkasodara (Thavnair)'],
        originBonus: ['Radz-at-Han (Thavnair)'],
        originPenalty: []
      },
      {
        name: 'Great Work (Alchemists)',
        description: 'Alchemical research organization.',
        raceBonus: [],
        originBonus: ['Radz-at-Han (Thavnair)', 'Ul\'dah & Thanalan'],
        originPenalty: []
      },
      {
        name: 'Satrap\'s Favorites (Honorary)',
        description: 'Elite social circle of Thavnair.',
        raceBonus: [],
        originBonus: ['Radz-at-Han (Thavnair)'],
        originPenalty: []
      }
    ],
    'The First (Restricted)': [
      {
        name: 'The Crystarium',
        description: 'Crystal city-state on the First.',
        raceBonus: [],
        originBonus: ['Norvrandt (The First – restricted)'],
        originPenalty: []
      },
      {
        name: 'Eulmore',
        description: 'Decadent city of consumption.',
        raceBonus: [],
        originBonus: ['Norvrandt (The First – restricted)'],
        originPenalty: []
      },
      {
        name: 'Night\'s Blessed (Fanow)',
        description: 'Viera community in Rak\'tika.',
        raceBonus: ['Viera'],
        originBonus: ['Norvrandt (The First – restricted)'],
        originPenalty: []
      },
      {
        name: 'Dwarven Clans',
        description: 'Underground craftsmen of the First.',
        raceBonus: [],
        originBonus: ['Norvrandt (The First – restricted)'],
        originPenalty: []
      }
    ],
    'The Void (Restricted)': [
      {
        name: 'Void Warlords',
        description: 'Powerful voidsent rulers.',
        raceBonus: ['Voidsent-descended Mortal (Thirteenth origin; highly restricted)'],
        originBonus: [],
        originPenalty: []
      },
      {
        name: 'Thirteenth Survivors',
        description: 'Remnants of the lost shard.',
        raceBonus: [],
        originBonus: ['The Thirteenth / Void (restricted)'],
        originPenalty: []
      }
    ],
    'Meracydia (Restricted)': [
      {
        name: 'Meracydian Confederacy (Ancient)',
        description: 'Ancient dragon civilization.',
        raceBonus: [],
        originBonus: ['Dravania'],
        originPenalty: ['Garlemald & Imperial Territories']
      }
    ]
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
    if (rep <= -301) return '#dc3545';
    if (rep <= -101) return '#fd7e14';
    if (rep <= -1) return '#ffc107';
    if (rep === 0) return '#6c757d';
    if (rep <= 150) return '#20c997';
    if (rep <= 350) return '#28a745';
    return '#007bff';
  };

  const calculateFactionReputation = (faction) => {
    let rep = 0;
    
    // Special handling for specific factions
    if (faction.special === 'amalj\'aa') {
      if (data.race === 'Amalj\'aa (Thanalan)') return 150;
      else return -200;
    }
    if (faction.special === 'kobold') {
      if (data.race === 'Kobold') return 150;
      else if (data.origin === 'Limsa Lominsa & La Noscea') return -200;
      return 0;
    }
    if (faction.special === 'sahagin') {
      if (data.race === 'Sahagin') return 150;
      else if (data.origin === 'Limsa Lominsa & La Noscea') return -200;
      return 0;
    }
    
    // Special penalties for certain factions
    if (faction.name === 'Sui-no-Sato' && !data.race.includes('Au Ra')) {
      rep -= 20; // All non-Au Ra penalty
    }
    if (faction.name === 'Hingan Government (Bakufu)' && data.origin !== 'Hingashi') {
      rep -= 20; // All non-Hingans penalty
    }
    
    // Standard calculation
    if (faction.raceBonus.includes(data.race)) rep += 20;
    if (faction.originBonus.includes(data.origin)) rep += 20;
    if (faction.originPenalty.includes(data.origin)) rep -= 20;
    
    // Add bonus faction modifier
    if (selectedFactions.includes(faction.name)) rep += 150;
    
    return rep;
  };

  const handleFactionToggle = (factionName) => {
    let newSelected = [...selectedFactions];
    
    if (newSelected.includes(factionName)) {
      newSelected = newSelected.filter(name => name !== factionName);
    } else if (newSelected.length < 2) {
      newSelected.push(factionName);
    }
    
    setSelectedFactions(newSelected);
    setData(prev => ({ ...prev, bonusFactions: newSelected }));
  };

  const reputationTiers = [
    {
      name: 'Hated',
      range: '(-500 to -301)',
      color: '#dc3545',
      description: 'The faction despises you. You are viewed as a direct threat, criminal, traitor, heretic, or enemy. Members will refuse to aid or work with you; may attack on sight in some RP settings. Cannot engage in faction quests, trade, or events. Redemption requires a significant in-character arc and staff approval.'
    },
    {
      name: 'Distrusted',
      range: '(-300 to -101)',
      color: '#fd7e14',
      description: 'Known, but negatively perceived. Faction members may tolerate your presence, but interactions are strained, cold, or monitored. Cannot hold roles of power or sensitive access within the faction. Influence checks are harder; you may be penalized in social scenes or diplomacy. Can gradually improve reputation through RP or event outcomes.'
    },
    {
      name: 'Tolerated',
      range: '(-100 to -1)',
      color: '#ffc107',
      description: 'A neutral or unremarkable presence. You are not trusted, but not explicitly disliked. You may operate in faction spaces but are offered minimal support. Expect cold shoulders or red tape.'
    },
    {
      name: 'Unknown',
      range: '(0)',
      color: '#6c757d',
      description: 'You are not on their radar. No reputation bonuses applied; considered "unaligned" or "foreign." Most factions will not grant access or missions until some interaction has occurred. Some factions treat unknowns as Tolerated, others with suspicion. You must earn visibility and entry through RP.'
    },
    {
      name: 'Recognized',
      range: '(1 to 150)',
      color: '#20c997',
      description: 'The faction is aware of your deeds or name. You may be regarded as useful, reliable, or interesting. You can receive quests, jobs, and moderate-level support or resources. May participate in faction events and serve as an intermediary. Start earning minor perks like access to rumor networks, supply trade, or favors.'
    },
    {
      name: 'Trusted',
      range: '(151 to 350)',
      color: '#28a745',
      description: 'You are considered a known ally or supporter of the faction\'s goals. You are often offered sensitive work, missions of importance, or front-line access. Can represent the faction in political or cross-faction RP. Begins to unlock higher-tier faction rewards or shops. May be granted temporary authority in faction territory. Access to Faction Stores and other Faction Bonuses.'
    },
    {
      name: 'Agent',
      range: '(351 to 500)',
      color: '#007bff',
      description: 'You are "one of them." You may operate as a covert asset, diplomat, warrior, or embedded insider. Faction secrets, safehouses, internal resources, and personal connections become available. You may receive narrative priority in that faction\'s stories and have leverage in negotiations. Eligible for Agent Tiers in post-beta development.'
    }
  ];

  return (
    <div>
      <h2>Reputation & Factions</h2>
      <p>Your character's reputation with various factions shapes their opportunities and interactions in the world.</p>
      
      {/* Reputation Tier Explanation (Collapsible) */}
      <details style={{ marginBottom: '30px' }}>
        <summary style={{ 
          cursor: 'pointer', 
          padding: '10px', 
          backgroundColor: '#f8f9fa', 
          border: '1px solid #ddd', 
          borderRadius: '5px',
          fontWeight: 'bold'
        }}>
          How Reputation Tiers Work (Click to expand)
        </summary>
        <div style={{ marginTop: '15px', display: 'grid', gap: '10px' }}>
          {reputationTiers.map(tier => (
            <div key={tier.name} style={{ 
              padding: '15px', 
              border: `2px solid ${tier.color}`, 
              borderRadius: '5px',
              backgroundColor: 'white'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ 
                  width: '20px', 
                  height: '20px', 
                  backgroundColor: tier.color, 
                  borderRadius: '50%', 
                  marginRight: '10px' 
                }}></div>
                <h4 style={{ margin: 0, color: tier.color }}>
                  {tier.name} {tier.range}
                </h4>
              </div>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.4' }}>
                {tier.description}
              </p>
            </div>
          ))}
        </div>
      </details>

      {/* Faction Bonus Selection */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        backgroundColor: '#e7f3ff', 
        border: '2px solid #007bff', 
        borderRadius: '5px' 
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#007bff' }}>
          Choose Your Starting Reputation Bonuses
        </h3>
        <p style={{ marginBottom: '15px' }}>
          Select up to <strong>2 factions</strong> to gain <strong>+150 reputation</strong> with. 
          This represents prior relationships, employment, or connections your character has established.
        </p>
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#fff', 
          borderRadius: '3px',
          fontSize: '14px',
          fontWeight: 'bold'
        }}>
          Selected: {selectedFactions.length}/2 
          {selectedFactions.length > 0 && (
            <span style={{ marginLeft: '10px', color: '#28a745' }}>
              {selectedFactions.join(', ')}
            </span>
          )}
        </div>
      </div>

      {/* All Factions by Region */}
      {Object.entries(allFactions).map(([regionName, factions]) => (
        <div key={regionName} style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            margin: '0 0 15px 0', 
            padding: '10px', 
            backgroundColor: regionName.includes('Restricted') ? '#dc3545' : '#6c757d', 
            color: 'white', 
            borderRadius: '5px' 
          }}>
            {regionName}
          </h3>
          
          <div style={{ display: 'grid', gap: '15px' }}>
            {factions.map(faction => {
              const rep = calculateFactionReputation(faction);
              const level = getReputationLevel(rep);
              const color = getReputationColor(rep);
              const isSelected = selectedFactions.includes(faction.name);
              const canSelect = selectedFactions.length < 2 || isSelected;
              
              return (
                <div key={faction.name} style={{ 
                  padding: '15px', 
                  border: `2px solid ${isSelected ? '#007bff' : color}`, 
                  borderRadius: '5px',
                  backgroundColor: isSelected ? '#f0f8ff' : 'white',
                  position: 'relative'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                        <h5 style={{ margin: '0', fontSize: '16px', marginRight: '10px' }}>
                          {faction.name}
                        </h5>
                        <button
                          onClick={() => handleFactionToggle(faction.name)}
                          disabled={!canSelect}
                          style={{
                            padding: '4px 8px',
                            fontSize: '12px',
                            backgroundColor: isSelected ? '#dc3545' : '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: canSelect ? 'pointer' : 'not-allowed',
                            opacity: canSelect ? 1 : 0.5
                          }}
                        >
                          {isSelected ? 'Remove Bonus' : 'Add Bonus'}
                        </button>
                      </div>
                      <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666' }}>
                        {faction.description}
                      </p>
                      
                      {/* Show modifiers */}
                      <div style={{ fontSize: '12px', color: '#666' }}>
                       {faction.raceBonus.includes(data.race) && (
                         <span style={{ color: '#28a745', marginRight: '15px' }}>
                           ✓ Race Bonus: +20
                         </span>
                       )}
                       {faction.originBonus.includes(data.origin) && (
                         <span style={{ color: '#28a745', marginRight: '15px' }}>
                           ✓ Origin Bonus: +20
                         </span>
                       )}
                       {faction.originPenalty.includes(data.origin) && (
                         <span style={{ color: '#dc3545', marginRight: '15px' }}>
                           ✗ Origin Penalty: -20
                         </span>
                       )}
                       {isSelected && (
                         <span style={{ color: '#007bff', marginRight: '15px' }}>
                           ★ Selected Bonus: +150
                         </span>
                       )}
                       {faction.special === 'amalj\'aa' && data.race === 'Amalj\'aa (Thanalan)' && (
                         <span style={{ color: '#007bff', marginRight: '15px' }}>
                           ★ Special Amalj'aa Bonus: +150
                         </span>
                       )}
                       {faction.special === 'amalj\'aa' && data.race !== 'Amalj\'aa (Thanalan)' && (
                         <span style={{ color: '#dc3545', marginRight: '15px' }}>
                           ★ Non-Amalj'aa Penalty: -200
                         </span>
                       )}
                       {faction.special === 'kobold' && data.race === 'Kobold' && (
                         <span style={{ color: '#007bff', marginRight: '15px' }}>
                           ★ Special Kobold Bonus: +150
                         </span>
                       )}
                       {faction.special === 'kobold' && data.origin === 'Limsa Lominsa & La Noscea' && data.race !== 'Kobold' && (
                         <span style={{ color: '#dc3545', marginRight: '15px' }}>
                           ★ Limsan Penalty: -200
                         </span>
                       )}
                       {faction.special === 'sahagin' && data.race === 'Sahagin' && (
                         <span style={{ color: '#007bff', marginRight: '15px' }}>
                           ★ Special Sahagin Bonus: +150
                         </span>
                       )}
                       {faction.special === 'sahagin' && data.origin === 'Limsa Lominsa & La Noscea' && data.race !== 'Sahagin' && (
                         <span style={{ color: '#dc3545', marginRight: '15px' }}>
                           ★ Limsan Penalty: -200
                         </span>
                       )}
                       {faction.name === 'Sui-no-Sato' && !data.race.includes('Au Ra') && (
                         <span style={{ color: '#dc3545', marginRight: '15px' }}>
                           ✗ Non-Au Ra Penalty: -20
                         </span>
                       )}
                       {faction.name === 'Hingan Government (Bakufu)' && data.origin !== 'Hingashi' && (
                         <span style={{ color: '#dc3545', marginRight: '15px' }}>
                           ✗ Non-Hingan Penalty: -20
                         </span>
                       )}
                     </div>
                   </div>
                   
                   <div style={{ textAlign: 'right', minWidth: '120px', marginLeft: '15px' }}>
                     <div style={{ 
                       fontSize: '18px', 
                       fontWeight: 'bold', 
                       color: color,
                       marginBottom: '5px'
                     }}>
                       {rep > 0 ? '+' : ''}{rep}
                     </div>
                     <div style={{ 
                       fontSize: '14px', 
                       fontWeight: 'bold', 
                       color: color,
                       padding: '2px 8px',
                       backgroundColor: `${color}20`,
                       borderRadius: '3px'
                     }}>
                       {level}
                     </div>
                   </div>
                 </div>
               </div>
             );
           })}
         </div>
       </div>
     ))}

     {/* Reputation Tracking Notes */}
     <div style={{ 
       marginBottom: '30px', 
       padding: '15px', 
       backgroundColor: '#e9ecef', 
       borderRadius: '5px' 
     }}>
       <h4 style={{ margin: '0 0 10px 0' }}>Reputation Tracking Notes</h4>
       <ul style={{ margin: 0, paddingLeft: '20px' }}>
         <li>Reputation may be earned through RP, influence point investment, event participation, or story arcs.</li>
         <li>Staff may assign reputation shifts during faction events based on character behavior and narrative impact.</li>
         <li>Faction leaders (PC or NPC) may petition staff to shift someone's standing within their group.</li>
         <li>Players may begin with a predefined reputation based on their race, region, or background.</li>
       </ul>
     </div>

     <div style={{ display: 'flex', gap: '10px' }}>
       <button 
         onClick={onBack}
         style={{ 
           padding: '12px 24px', 
           fontSize: '16px',
           backgroundColor: '#6c757d',
           color: 'white',
           border: 'none',
           borderRadius: '5px',
           cursor: 'pointer'
         }}
       >
         ← Back to Character Basics
       </button>
       
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
     </div>
   </div>
 );
} 
function NonCombatStatsStep({ data, setData, onNext, onBack }) {
  // Initialize non-combat stats if they don't exist
  const domains = data.domains || {
    wisdom: -3,
    intelligence: -3,
    deftness: -3,
    charisma: -3,
    instinct: -3,
    empathy: -3
  };

  const subDomains = data.subDomains || {};

  const domainDefinitions = {
    wisdom: {
      name: 'Wisdom',
      description: 'The Mindful Path',
      subDomains: [
        'perception', 'insight', 'navigation', 'survival', 'diagnosis', 
        'treatment', 'herbalism', 'religion', 'natureLore', 'cooking', 'brewing'
      ]
    },
    intelligence: {
      name: 'Intelligence', 
      description: 'The Scholar\'s Mind',
      subDomains: [
        'history', 'culturalKnowledge', 'academics', 'tactics', 'engineering',
        'magitek', 'arcana', 'investigation', 'alchemy', 'astrology',
        'cartography', 'linguistics', 'economics', 'law', 'cryptography', 'appraisal'
      ]
    },
    deftness: {
      name: 'Deftness',
      description: 'The Agile Body', 
      subDomains: [
        'stealth', 'legerdemain', 'security', 'forgery', 'acrobatics',
        'escapeArtist', 'precisionCrafts', 'weaving', 'leatherworking',
        'goldsmithing', 'carpentry', 'climbing', 'gemCrafting'
      ]
    },
    charisma: {
      name: 'Charisma',
      description: 'The Social Grace',
      subDomains: [
        'persuasion', 'intimidation', 'deception', 'performance', 'leadership',
        'diplomacy', 'seduction', 'streetwise', 'gambling', 'instruction',
        'propaganda', 'commerce'
      ]
    },
    instinct: {
      name: 'Instinct',
      description: 'The Primal Core',
      subDomains: [
        'reflexes', 'athletics', 'brawling', 'animalHandling', 'husbandry',
        'tracking', 'mining', 'blacksmithing', 'fishing', 'botany',
        'aethericSense', 'dangerSense', 'scavenging', 'improvisation'
      ]
    },
    empathy: {
      name: 'Empathy',
      description: 'The Heart\'s Understanding',
      subDomains: [
        'comforting', 'mediation', 'counseling', 'emotionalInsight', 'culturalAwareness',
        'communityBuilding', 'painting', 'drawing', 'sculpting', 'tattooing',
        'calligraphy', 'pottery', 'dancing', 'acting'
      ]
    }
  };

  const subDomainNames = {
    // Wisdom
    perception: 'Perception - Spotting hidden objects, noticing details, awareness',
    insight: 'Insight - Reading people, detecting lies, understanding motivations',
    navigation: 'Navigation - Maps, directions, pathfinding, not getting lost',
    survival: 'Survival - Wilderness skills, foraging, weather prediction',
    diagnosis: 'Diagnosis - Identifying diseases, poisons, injuries, medical assessment',
    treatment: 'Treatment - Surgery, first aid, healing techniques, bedside manner',
    herbalism: 'Herbalism - Natural remedies, medicinal plants, poultices',
    religion: 'Religion - Theology, rituals, prayer, divine knowledge',
    natureLore: 'Nature Lore - Flora/fauna identification, ecosystems, animal behavior',
    cooking: 'Cooking - Meal preparation, recipe knowledge, taste',
    brewing: 'Brewing - Alcohol creation, fermentation, distilling',

    // Intelligence  
    history: 'History - Past events, historical figures, ancient civilizations',
    culturalKnowledge: 'Cultural Knowledge - Academic understanding of customs, traditions, beliefs',
    academics: 'Academics - Mathematics, literature, philosophy, general education',
    tactics: 'Tactics - Battle strategy, troop movements, war theory',
    engineering: 'Engineering - Mechanical design, structural analysis, physics',
    magitek: 'Magitek - Allagan technology, device operation, tech repair',
    arcana: 'Arcana - Magical theory, aether manipulation, spell analysis',
    investigation: 'Investigation - Research, deduction, clue analysis',
    alchemy: 'Alchemy - Potion brewing, transmutation, chemistry',
    astrology: 'Astrology - Star navigation, fortune telling, celestial events',
    cartography: 'Cartography - Map-making, geography, terrain analysis',
    linguistics: 'Linguistics - Languages, codes, translation, etymology',
    economics: 'Economics - Markets, trade, supply/demand, accounting',
    law: 'Law - Legal systems, contracts, jurisprudence',
    cryptography: 'Cryptography - Encryption, codebreaking, secret communication',
    appraisal: 'Appraisal - Evaluating worth and properties of items',

    // Deftness
    stealth: 'Stealth - Sneaking, hiding, moving silently',
    legerdemain: 'Legerdemain - Pickpocketing, sleight of hand, stage magic',
    security: 'Security - Lockpicking, trap detection/disarmament',
    forgery: 'Forgery - Document creation, handwriting mimicry',
    acrobatics: 'Acrobatics - Tumbling, balance, contortion, parkour',
    escapeArtist: 'Escape Artist - Bonds, restraints, tight spaces',
    precisionCrafts: 'Precision Crafts - Fine detail work, steady hands, delicate assembly',
    weaving: 'Weaving - Cloth creation, tailoring, embroidery',
    leatherworking: 'Leatherworking - Hide preparation, armor crafting',
    goldsmithing: 'Goldsmithing - Jewelry, fine metalwork, gem cutting',
    carpentry: 'Carpentry - Woodworking, furniture, construction',
    climbing: 'Climbing - Scaling surfaces, rappelling, mountaineering',
    gemCrafting: 'Gem Crafting - Creating gems that can enhance spells and abilities',

    // Charisma
    persuasion: 'Persuasion - Logical arguments, emotional appeals',
    intimidation: 'Intimidation - Threats, fear tactics, commanding presence',
    deception: 'Deception - Lies, disguises, false identities',
    performance: 'Performance - Getting people\'s attention and maintaining it',
    leadership: 'Leadership - Command, inspiration, morale building',
    diplomacy: 'Diplomacy - Negotiation, etiquette, political maneuvering',
    seduction: 'Seduction - Charm, romance, reading desires',
    streetwise: 'Streetwise - Criminal contacts, black markets, gangs',
    gambling: 'Gambling - Games of chance, reading tells, probability',
    instruction: 'Instruction - Teaching, mentoring, clear communication',
    propaganda: 'Propaganda - Public opinion, rumors, information warfare',
    commerce: 'Commerce - Sales, customer service, market presence',

    // Instinct
    reflexes: 'Reflexes - Reaction time, quick movements',
    athletics: 'Athletics - Running, jumping, swimming, endurance',
    brawling: 'Brawling - Unarmed combat, grappling, street fighting',
    animalHandling: 'Animal Handling - Taming, training, riding, calming animals',
    husbandry: 'Husbandry - Breeding, raising, caring for domestic animals',
    tracking: 'Tracking - Following trails, reading signs, hunting',
    mining: 'Mining - Ore extraction, tunnel safety, explosives',
    blacksmithing: 'Blacksmithing - Metal forging, tool creation, tempering',
    fishing: 'Fishing - Angling, net work, marine knowledge',
    botany: 'Botany - Plant gathering, cultivation, growth cycles',
    aethericSense: 'Aetheric Sense - Ley line detection, crystal attunement',
    dangerSense: 'Danger Sense - Intuition, gut feelings, sixth sense',
    scavenging: 'Scavenging - Finding useful materials in any environment',
    improvisation: 'Improvisation - Crafting makeshift items and solutions',

    // Empathy
    comforting: 'Comforting - Providing genuine emotional support',
    mediation: 'Mediation - Resolving conflicts, finding middle ground',
    counseling: 'Counseling - Long-term emotional guidance, therapy',
    emotionalInsight: 'Emotional Insight - Understanding deep motivations and trauma',
    culturalAwareness: 'Cultural Awareness - Reading social cues, adapting to local customs',
    communityBuilding: 'Community Building - Fostering group cohesion and belonging',
    painting: 'Painting - Creating images with paints, inks, brushes, pigment',
    drawing: 'Drawing - Sketching, charcoal art, pencil and ink illustrations',
    sculpting: 'Sculpting - Carving and shaping wood, stone, clay, and metal',
    tattooing: 'Tattooing - Designing and applying body art, symbolic markings, tribal or magical tattoos',
    calligraphy: 'Calligraphy - Elegant handwriting, decorative script',
    pottery: 'Pottery - Crafting ceramics, clay vessels, fine dishware',
    dancing: 'Dancing - Expressing emotion, culture, or storytelling through rhythmic body movement, gesture, and choreography',
    acting: 'Acting - Conveying genuine emotion and narrative through performance, embodying characters authentically, and passing yourself off genuinely as another person'
  };

  // Calculate point costs (same as combat stats)
  const getStatCost = (targetValue) => {
    if (targetValue <= -3) return 0; // Base value, no cost
    
    const costs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    let total = 0;
    
    // For value -2, we want 1 iteration (index 0), so targetValue + 3 = 1
    // For value -1, we want 2 iterations (index 0,1), so targetValue + 3 = 2
    // For value 0, we want 3 iterations (index 0,1,2), so targetValue + 3 = 3
    // etc.
    const iterations = targetValue + 3;
    
    for (let i = 0; i < iterations; i++) {
      if (i < costs.length) {
        total += costs[i];
      }
    }
    return total;
  };

  // Calculate total points spent on domains
  const domainPointsSpent = Object.values(domains).reduce((total, statValue) => {
    return total + getStatCost(statValue);
  }, 0);

  // Calculate total points spent on sub-domains - only count values above -3
  const subDomainPointsSpent = Object.entries(domainDefinitions).reduce((total, [domainKey, domain]) => {
    return domain.subDomains.reduce((subTotal, subDomainKey) => {
      const value = subDomains[subDomainKey] || -3;
      if (value > -3) {
        return subTotal + getStatCost(value);
      }
      return subTotal;
    }, total);
  }, 0);

  // Calculate available sub-domain points from domains
  const availableSubDomainPoints = Object.values(domains).reduce((total, domainValue) => {
    if (domainValue > -3) {
      return total + ((domainValue + 3) * 3); // 3 sub-points per domain point above -3
    }
    return total;
  }, 0);

  const domainPointsRemaining = 180 - domainPointsSpent;
  const subDomainPointsRemaining = availableSubDomainPoints - subDomainPointsSpent;

  const updateDomain = (domainName, newValue) => {
    if (newValue < -3 || newValue > 10) return;
    
    const newDomains = { ...domains, [domainName]: newValue };
    const newDomainPointsSpent = Object.values(newDomains).reduce((total, statValue) => {
      return total + getStatCost(statValue);
    }, 0);
    
    if (newDomainPointsSpent <= 180) {
      setData(prev => ({ ...prev, domains: newDomains }));
    }
  };

  const updateSubDomain = (subDomainName, newValue) => {
    if (newValue < -3 || newValue > 10) return;
    
    // Create new sub-domains object with the updated value
    const newSubDomains = { ...subDomains };
    if (newValue === -3) {
      // Remove the sub-domain if it's back to -3
      delete newSubDomains[subDomainName];
    } else {
      newSubDomains[subDomainName] = newValue;
    }
    
    // Calculate new sub-domain points spent - using the same method as initial calculation
    const newSubDomainPointsSpent = Object.entries(domainDefinitions).reduce((total, [domainKey, domain]) => {
      return domain.subDomains.reduce((subTotal, subDKey) => {
        const value = newSubDomains[subDKey] || -3;
        if (value > -3) {
          return subTotal + getStatCost(value);
        }
        return subTotal;
      }, total);
    }, 0);
    
    if (newSubDomainPointsSpent <= availableSubDomainPoints) {
      setData(prev => ({ ...prev, subDomains: newSubDomains }));
    }
  };

  const resetStats = () => {
    const resetDomains = {
      wisdom: -3,
      intelligence: -3,
      deftness: -3,
      charisma: -3,
      instinct: -3,
      empathy: -3
    };
    setData(prev => ({ ...prev, domains: resetDomains, subDomains: {} }));
  };

  // Get stat modifier for display
  const getStatModifier = (value) => {
    if (value === -3) return -200;
    if (value === -2) return -100;
    if (value === -1) return -50;
    if (value === 0) return 0;
    return value * 20;
  };

  // Get training status
  const getTrainingStatus = (value) => {
    if (value <= 0) return 'Untrained';
    return 'Trained';
  };

  return (
    <div>
      <h2>Non-Combat Stats Allocation</h2>
      <p>Allocate your 180 domain points across 6 domains. Each domain point grants 3 sub-domain points to distribute within that domain's specializations.</p>
      
      {/* Skill Check Rules */}
      <details style={{ marginBottom: '30px' }}>
        <summary style={{ 
          cursor: 'pointer', 
          padding: '10px', 
          backgroundColor: '#f8f9fa', 
          border: '1px solid #ddd', 
          borderRadius: '5px',
          fontWeight: 'bold'
        }}>
          Skill Check Rules (Click to expand)
        </summary>
        <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '5px' }}>
          <h4>Basic Roll:</h4>
          <p><strong>d1000 + sub-domain bonus</strong></p>
          
          <h4>Trained vs Untrained:</h4>
          <ul>
            <li><strong>Trained (1+ in sub-domain):</strong> Full bonus, normal critical ranges</li>
            <li><strong>Untrained (0 or negative):</strong> Use domain bonus -150, quadruple critical fail range, no critical successes</li>
            <li><strong>Completely Unfamiliar (-3 in both):</strong> Cannot attempt above DC 400</li>
          </ul>
          
          <h4>Critical Ranges:</h4>
          <ul>
            <li><strong>Critical Success:</strong> Natural 950+</li>
            <li><strong>Critical Fail:</strong> Natural 50 or less</li>
            <li><strong>Untrained quadruples fail range:</strong> 200 or less</li>
          </ul>
          
          <h4>Difficulty Classes:</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginTop: '10px' }}>
            <div>Trivial: 200</div>
            <div>Easy: 400</div>
            <div>Moderate: 600</div>
            <div>Hard: 800</div>
            <div>Extreme: 1000</div>
            <div>Legendary: 1200</div>
            <div>Impossible: 1400+</div>
          </div>
        </div>
      </details>

      {/* Points Summary */}
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
          <strong>Domain Points:</strong> {domainPointsSpent} / 180 
          <span style={{ color: '#666', marginLeft: '10px' }}>({domainPointsRemaining} remaining)</span>
          <br />
          <strong>Sub-Domain Points:</strong> {subDomainPointsSpent} / {availableSubDomainPoints}
          <span style={{ color: '#666', marginLeft: '10px' }}>({subDomainPointsRemaining} remaining)</span>
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

      {/* Domain and Sub-Domain Allocation */}
      {Object.entries(domainDefinitions).map(([domainKey, domain]) => {
        const domainValue = domains[domainKey];
        const domainModifier = getStatModifier(domainValue);
        
        return (
          <div key={domainKey} style={{ 
            marginBottom: '30px', 
            border: '2px solid #ddd', 
            borderRadius: '5px',
            backgroundColor: 'white'
          }}>
            {/* Domain Header */}
            <div style={{ 
              padding: '15px', 
              backgroundColor: '#f8f9fa',
              borderBottom: '1px solid #ddd'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0', color: '#333' }}>{domain.name}</h3>
                  <p style={{ margin: '5px 0', fontSize: '14px', color: '#666', fontStyle: 'italic' }}>
                    {domain.description}
                  </p>
                  <div style={{ fontSize: '14px', color: '#555' }}>
                    <strong>Modifier:</strong> {domainModifier >= 0 ? '+' : ''}{domainModifier} | 
                    <strong> Available Sub-Points:</strong> {domainValue > -3 ? (domainValue + 3) * 3 : 0}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button 
                    onClick={() => updateDomain(domainKey, domainValue - 1)}
                    disabled={domainValue <= -3}
                    style={{ 
                      padding: '5px 10px', 
                      fontSize: '16px',
                      backgroundColor: domainValue > -3 ? '#dc3545' : '#ccc',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: domainValue > -3 ? 'pointer' : 'not-allowed'
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
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '3px'
                  }}>
                    {domainValue}
                  </span>
                  <button 
                    onClick={() => updateDomain(domainKey, domainValue + 1)}
                    disabled={domainValue >= 10 || domainPointsRemaining <= 0}
                    style={{ 
                      padding: '5px 10px', 
                      fontSize: '16px',
                      backgroundColor: (domainValue < 10 && domainPointsRemaining > 0) ? '#28a745' : '#ccc',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: (domainValue < 10 && domainPointsRemaining > 0) ? 'pointer' : 'not-allowed'
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
              <div style={{ fontSize: '12px', color: '#888', marginTop: '5px' }}>
                Domain Cost: {getStatCost(domainValue)} points
              </div>
            </div>

            {/* Sub-Domains - Always visible */}
            <div style={{ padding: '15px' }}>
              <h4 style={{ margin: '0 0 15px 0', color: '#555' }}>Sub-Domain Specializations</h4>
              <div style={{ display: 'grid', gap: '10px' }}>
                {domain.subDomains.map(subDomainKey => {
                  const subDomainValue = subDomains[subDomainKey] || -3;
                  const subDomainModifier = getStatModifier(subDomainValue);
                  const trainingStatus = getTrainingStatus(subDomainValue);
                  const isDisabled = domainValue <= -3;
                  
                  return (
                    <div key={subDomainKey} style={{ 
                      padding: '10px', 
                      border: '1px solid #eee', 
                      borderRadius: '3px',
                      backgroundColor: isDisabled ? '#f0f0f0' : '#fafafa',
                      opacity: isDisabled ? 0.6 : 1
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                            {subDomainNames[subDomainKey]}
                          </div>
                          <div style={{ fontSize: '12px', color: '#666' }}>
                            <strong>Modifier:</strong> {subDomainModifier >= 0 ? '+' : ''}{subDomainModifier} | 
                            <strong> Status:</strong> <span style={{ color: trainingStatus === 'Trained' ? '#28a745' : '#dc3545' }}>
                              {trainingStatus}
                            </span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <button 
                            onClick={() => updateSubDomain(subDomainKey, subDomainValue - 1)}
                            disabled={subDomainValue <= -3 || isDisabled}
                            style={{ 
                              padding: '3px 8px', 
                              fontSize: '14px',
                              backgroundColor: (subDomainValue > -3 && !isDisabled) ? '#dc3545' : '#ccc',
                              color: 'white',
                              border: 'none',
                              borderRadius: '3px',
                              cursor: (subDomainValue > -3 && !isDisabled) ? 'pointer' : 'not-allowed'
                            }}
                          >
                            -
                          </button>
                          <span style={{ 
                            minWidth: '30px', 
                            textAlign: 'center', 
                            fontSize: '14px', 
                            fontWeight: 'bold',
                            padding: '3px 6px',
                            backgroundColor: '#fff',
                            border: '1px solid #ddd',
                            borderRadius: '3px'
                          }}>
                            {subDomainValue}
                          </span>
                          <button 
                            onClick={() => {
                              if (!isDisabled && subDomainValue < 10 && subDomainPointsRemaining > 0) {
                                updateSubDomain(subDomainKey, subDomainValue + 1);
                              }
                            }}
                            disabled={subDomainValue >= 10 || subDomainPointsRemaining <= 0 || isDisabled}
                            style={{ 
                              padding: '3px 8px', 
                              fontSize: '14px',
                              backgroundColor: (subDomainValue < 10 && subDomainPointsRemaining > 0 && !isDisabled) ? '#28a745' : '#ccc',
                              color: 'white',
                              border: 'none',
                              borderRadius: '3px',
                              cursor: (subDomainValue < 10 && subDomainPointsRemaining > 0 && !isDisabled) ? 'pointer' : 'not-allowed'
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div style={{ fontSize: '11px', color: '#888', marginTop: '3px' }}>
                        Cost: {getStatCost(subDomainValue)} sub-points
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}

      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={onBack}
          style={{ 
            padding: '12px 24px', 
            fontSize: '16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          ← Back to Reputation
        </button>
        
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
          Continue to Backgrounds
        </button>
        
        {domainPointsRemaining > 0 && (
          <p style={{ color: '#28a745', marginTop: '10px', marginLeft: '10px' }}>
            💡 You have {domainPointsRemaining} domain points remaining.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
