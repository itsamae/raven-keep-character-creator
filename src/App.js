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

  // Calculate points spent per domain on sub-domains
  const getSubDomainPointsForDomain = (domainKey) => {
    const domain = domainDefinitions[domainKey];
    return domain.subDomains.reduce((total, subDomainKey) => {
      const value = subDomains[subDomainKey] ?? -3;
      if (value > -3) {
        return total + getStatCost(value);
      }
      return total;
    }, 0);
  };

  // Calculate available sub-domain points per domain
  const getAvailableSubDomainPoints = (domainKey) => {
    const domainValue = domains[domainKey];
    if (domainValue > -3) {
      return (domainValue + 3) * 3;
    }
    return 0;
  };

  const domainPointsRemaining = 180 - domainPointsSpent;

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

  const updateSubDomain = (domainKey, subDomainName, newValue) => {
    if (newValue < -3 || newValue > 10) return;
    
    console.log(`Updating ${subDomainName} from ${subDomains[subDomainName] ?? -3} to ${newValue}`);
    
    // Create new sub-domains object with the updated value
    const newSubDomains = { ...subDomains };
    if (newValue === -3) {
      // Remove the sub-domain if it's back to -3
      delete newSubDomains[subDomainName];
    } else {
      newSubDomains[subDomainName] = newValue;
    }
    
    // Debug: Check if the value was set correctly
    console.log(`Set ${subDomainName} to:`, newSubDomains[subDomainName]);
    
    // Calculate points spent for this specific domain
    const domainSubDomains = domainDefinitions[domainKey].subDomains;
    const newDomainSubPointsSpent = domainSubDomains.reduce((total, subDKey) => {
      const value = newSubDomains[subDKey] ?? -3;
      if (value > -3) {
        const cost = getStatCost(value);
        if (subDKey === subDomainName) {
          console.log(`${subDKey}: value=${value}, cost=${cost}`);
        }
        return total + cost;
      }
      return total;
    }, 0);
    
    const availableForDomain = getAvailableSubDomainPoints(domainKey);
    
    console.log(`Domain: ${domainKey}, Points spent: ${newDomainSubPointsSpent}, Available: ${availableForDomain}`);
    
    if (newDomainSubPointsSpent <= availableForDomain) {
      setData(prev => ({ ...prev, subDomains: newSubDomains }));
      console.log('Update successful');
    } else {
      console.log('Update rejected - not enough points');
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

  // Calculate total sub-domain points spent across all domains (for display)
  const totalSubDomainPointsSpent = Object.entries(domainDefinitions).reduce((total, [domainKey]) => {
    return total + getSubDomainPointsForDomain(domainKey);
  }, 0);

  // Calculate total available sub-domain points across all domains (for display)
  const totalAvailableSubDomainPoints = Object.entries(domains).reduce((total, [domainKey, domainValue]) => {
    if (domainValue > -3) {
      return total + ((domainValue + 3) * 3);
    }
    return total;
  }, 0);

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
          <strong>Total Sub-Domain Points:</strong> {totalSubDomainPointsSpent} / {totalAvailableSubDomainPoints}
          <span style={{ color: '#666', marginLeft: '10px' }}>({totalAvailableSubDomainPoints - totalSubDomainPointsSpent} remaining)</span>
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
        const availableSubPoints = getAvailableSubDomainPoints(domainKey);
        const spentSubPoints = getSubDomainPointsForDomain(domainKey);
        const remainingSubPoints = availableSubPoints - spentSubPoints;
        
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
                    <strong> Sub-Points:</strong> {spentSubPoints} / {availableSubPoints} 
                    <span style={{ color: '#666' }}> ({remainingSubPoints} remaining)</span>
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
                  const subDomainValue = subDomains[subDomainKey] ?? -3;
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
                            onClick={() => updateSubDomain(domainKey, subDomainKey, subDomainValue - 1)}
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
                            onClick={() => updateSubDomain(domainKey, subDomainKey, subDomainValue + 1)}
                            disabled={subDomainValue >= 10 || remainingSubPoints <= 0 || isDisabled}
                            style={{ 
                              padding: '3px 8px', 
                              fontSize: '14px',
                              backgroundColor: (subDomainValue < 10 && remainingSubPoints > 0 && !isDisabled) ? '#28a745' : '#ccc',
                              color: 'white',
                              border: 'none',
                              borderRadius: '3px',
                              cursor: (subDomainValue < 10 && remainingSubPoints > 0 && !isDisabled) ? 'pointer' : 'not-allowed'
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

// Step 5: Backgrounds
function BackgroundsStep({ data, setData, onNext, onBack }) {
  const backgrounds = data.backgrounds || [];
  const backgroundPointsSpent = data.backgroundPointsSpent || 0;
  const backgroundPointsRemaining = 200 - backgroundPointsSpent;

  const positiveBackgrounds = {
    'Social Status': [
      {
        id: 'noble_blood',
        name: 'Noble Blood',
        cost: 45,
        description: '+1 to Persuasion, Diplomacy, Leadership\n+1500 starting gil, +150 gil/month\nAccess to noble-only areas'
      },
      {
        id: 'merchant_dynasty',
        name: 'Merchant Dynasty',
        cost: 35,
        description: '+2 to Commerce, +1 to Economics\n+1000 starting gil, +100 gil/month\n15% discount on all purchases'
      }
    ],
    'Physical Traits': [
      {
        id: 'beautiful_handsome',
        name: 'Beautiful/Handsome',
        cost: 30,
        description: '+80 to all Charisma-based rolls\n+2 to Seduction'
      },
      {
        id: 'towering_height',
        name: 'Towering Height',
        cost: 15,
        description: '+1 to Intimidation and Athletics\n+50 to physical presence checks'
      }
    ],
    'Mental Traits': [
      {
        id: 'genius',
        name: 'Genius',
        cost: 120,
        description: '+100 to all Intelligence-based rolls\n+2 skill points per level'
      },
      {
        id: 'quick_witted',
        name: 'Quick Witted',
        cost: 25,
        description: '+50 to Intelligence rolls\n+1 to Tactics and Investigation'
      },
      {
        id: 'natural_empath',
        name: 'Natural Empath',
        cost: 30,
        description: '+80 to all Empathy-based rolls\nCan sense strong emotions'
      }
    ],
    'Education & Training': [
      {
        id: 'academy_educated',
        name: 'Academy Educated',
        cost: 30,
        description: '+2 to any three Intelligence sub-domains\nCan read/write all common languages',
        requiresSelection: true,
        selectionType: 'intelligence_subdomains',
        selectionCount: 3
      },
      {
        id: 'military_training',
        name: 'Military Training',
        cost: 25,
        description: '+2 to Tactics, Athletics, Endurance\n+1 to Leadership\n+50 gil/month veteran pension'
      },
      {
        id: 'apprentice_crafter',
        name: 'Apprentice Crafter',
        cost: 20,
        description: '+3 to one crafting sub-domain\nStart with journeyman tools\nSome Other Benefit To Be Determined',
        requiresSelection: true,
        selectionType: 'crafting_subdomain',
        selectionCount: 1
      }
    ],
    'Wealth': [
      {
        id: 'fabulously_wealthy',
        name: 'Fabulously Wealthy',
        cost: 60,
        description: '+5000 starting gil\n+500 gil/month from investments\nOwn property in major city'
      },
      {
        id: 'well_off',
        name: 'Well-Off',
        cost: 30,
        description: '+2000 starting gil\n+200 gil/month income'
      }
    ],
    'Special Connections': [
      {
        id: 'black_market_uldah',
        name: 'Black Market - Ul\'dah',
        cost: 20,
        description: '+2 to Streetwise\nAccess to illegal goods from Ul\'dah\nCan fence items at 60% value\n+150 reputation with Ul\'dah black market faction'
      },
      {
        id: 'black_market_limsa',
        name: 'Black Market - Limsa Lominsa',
        cost: 20,
        description: '+2 to Streetwise\nSmuggling contracts available\nAccess to pirate goods\n+150 reputation with Limsa black market faction'
      },
      {
        id: 'black_market_gridania',
        name: 'Black Market - Gridania',
        cost: 20,
        description: '+2 to Streetwise\nAccess to rare botanicals\nPoaching contracts available\n+150 reputation with Gridania black market faction'
      },
      {
        id: 'grand_company_veteran',
        name: 'Grand Company Veteran',
        cost: 25,
        description: '+150 reputation with one Grand Company\n+1 to Leadership\nAccess to GC quartermaster',
        requiresSelection: true,
        selectionType: 'grand_company',
        selectionCount: 1
      }
    ],
    'Special Abilities': [
      {
        id: 'aether_touched',
        name: 'Aether-Touched',
        cost: 40,
        description: '+2 to Aetheric Sense and Arcana\nCan see aetheric flows\n+100 to aether-related checks'
      },
      {
        id: 'lucky',
        name: 'Lucky',
        cost: 35,
        description: 'Reroll one failed check per session\n+50 to Gambling rolls'
      },
      {
        id: 'photographic_memory',
        name: 'Photographic Memory',
        cost: 25,
        description: '+2 to all knowledge sub-domains\n+100 to memory-based checks'
      }
    ]
  };

  const negativeBackgrounds = {
    'Social Status': [
      {
        id: 'street_rat',
        name: 'Street Rat',
        points: 25,
        description: 'Only 50 starting gil'
      },
      {
        id: 'poor',
        name: 'Poor',
        points: 40,
        description: 'No starting gil'
      },
      {
        id: 'hideous',
        name: 'Hideous',
        points: 20,
        description: '-100 to all Charisma rolls (except Intimidation)\n+2 to Intimidation'
      }
    ],
    'Burdens': [
      {
        id: 'cursed',
        name: 'Cursed',
        points: 30,
        description: 'GM can force reroll of one success per session\n-100 to all rolls every 13th roll attempt'
      },
      {
        id: 'chronic_illness',
        name: 'Chronic Illness',
        points: 25,
        description: '-1 to STR, DEX, END\nRequires 50 gil/month medicine'
      },
      {
        id: 'dark_secret',
        name: 'Dark Secret',
        points: 20,
        description: 'Requires approval from staff and write up\nIf exposed (GM discretion), lose 200 reputation with all factions\n+1 to Deception'
      }
    ]
  };

  const intelligenceSubdomains = [
    'history', 'culturalKnowledge', 'academics', 'tactics', 'engineering', 'magitek',
    'arcana', 'investigation', 'alchemy', 'astrology', 'cartography', 'linguistics',
    'economics', 'law', 'cryptography', 'appraisal'
  ];

  const craftingSubdomains = [
    'precisionCrafts', 'weaving', 'leatherworking', 'goldsmithing', 'carpentry',
    'gemCrafting', 'blacksmithing', 'brewing', 'alchemy'
  ];

  const grandCompanies = [
    'Immortal Flames', 'Order of the Twin Adder', 'The Maelstrom'
  ];

  const isBackgroundSelected = (backgroundId) => {
    return backgrounds.some(bg => bg.id === backgroundId);
  };

  const getBackgroundSelection = (backgroundId) => {
    const background = backgrounds.find(bg => bg.id === backgroundId);
    return background ? background.selection : null;
  };

  const toggleBackground = (background, isNegative = false) => {
    const currentlySelected = isBackgroundSelected(background.id);
    
    if (currentlySelected) {
      // Remove background
      const newBackgrounds = backgrounds.filter(bg => bg.id !== background.id);
      const newPointsSpent = isNegative 
        ? backgroundPointsSpent + background.points
        : backgroundPointsSpent - background.cost;
      
      setData(prev => ({
        ...prev,
        backgrounds: newBackgrounds,
        backgroundPointsSpent: newPointsSpent
      }));
    } else {
      // Add background
      const costOrPoints = isNegative ? background.points : background.cost;
      const newPointsSpent = isNegative 
        ? backgroundPointsSpent - background.points
        : backgroundPointsSpent + background.cost;
      
      if (!isNegative && newPointsSpent > 200) return; // Can't exceed point limit for positive backgrounds
      if (isNegative && newPointsSpent < 0) return; // Can't go negative with negative backgrounds
      
      const newBackground = { ...background, selection: null };
      setData(prev => ({
        ...prev,
        backgrounds: [...backgrounds, newBackground],
        backgroundPointsSpent: newPointsSpent
      }));
    }
  };

  const updateBackgroundSelection = (backgroundId, selection) => {
    const newBackgrounds = backgrounds.map(bg => 
      bg.id === backgroundId ? { ...bg, selection } : bg
    );
    setData(prev => ({ ...prev, backgrounds: newBackgrounds }));
  };

  const resetBackgrounds = () => {
    setData(prev => ({
      ...prev,
      backgrounds: [],
      backgroundPointsSpent: 0
    }));
  };

  return (
    <div>
      <h2>Backgrounds</h2>
      <p>You start with 200 background points to spend on positive traits, or you can take negative backgrounds to gain additional points. You don't have to spend all points - any leftover points are simply lost.</p>
      
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
          <strong>Background Points:</strong> {backgroundPointsSpent} / 200 
          <span style={{ color: '#666', marginLeft: '10px' }}>({backgroundPointsRemaining} remaining)</span>
        </div>
        <button 
          onClick={resetBackgrounds}
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
          Reset All Backgrounds
        </button>
      </div>

      {/* Positive Backgrounds */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#28a745' }}>Positive Backgrounds (Cost Points)</h3>
        
        {Object.entries(positiveBackgrounds).map(([categoryName, categoryBackgrounds]) => (
          <div key={categoryName} style={{ marginBottom: '25px' }}>
            <h4 style={{ margin: '0 0 15px 0', color: '#333' }}>{categoryName}</h4>
            
            <div style={{ display: 'grid', gap: '15px' }}>
              {categoryBackgrounds.map(background => {
                const isSelected = isBackgroundSelected(background.id);
                const canAfford = backgroundPointsRemaining >= background.cost;
                const canSelect = !isSelected && canAfford;
                
                return (
                  <div key={background.id} style={{ 
                    padding: '15px', 
                    border: `2px solid ${isSelected ? '#28a745' : '#ddd'}`, 
                    borderRadius: '5px',
                    backgroundColor: isSelected ? '#f0fff0' : 'white'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                          <h5 style={{ margin: '0', fontSize: '16px', marginRight: '15px' }}>
                            {background.name}
                          </h5>
                          <span style={{ 
                            padding: '2px 8px', 
                            backgroundColor: '#28a745', 
                            color: 'white', 
                            borderRadius: '3px', 
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}>
                            {background.cost} points
                          </span>
                          <button
                            onClick={() => toggleBackground(background, false)}
                            disabled={!canSelect && !isSelected}
                            style={{
                              marginLeft: '10px',
                              padding: '4px 8px',
                              fontSize: '12px',
                              backgroundColor: isSelected ? '#dc3545' : '#28a745',
                              color: 'white',
                              border: 'none',
                              borderRadius: '3px',
                              cursor: (canSelect || isSelected) ? 'pointer' : 'not-allowed',
                              opacity: (canSelect || isSelected) ? 1 : 0.5
                            }}
                          >
                            {isSelected ? 'Remove' : 'Select'}
                          </button>
                        </div>
                        
                        <div style={{ fontSize: '14px', marginBottom: '10px', whiteSpace: 'pre-line' }}>
                          {background.description}
                        </div>

                        {/* Selection dropdowns for backgrounds that require them */}
                        {isSelected && background.requiresSelection && (
                          <div style={{ marginTop: '10px' }}>
                            {background.selectionType === 'intelligence_subdomains' && (
                              <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                  Select {background.selectionCount} Intelligence Sub-domains:
                                </label>
                                <select 
                                  multiple 
                                  size="5"
                                  value={getBackgroundSelection(background.id) || []}
                                  onChange={(e) => {
                                    const selected = Array.from(e.target.selectedOptions, option => option.value);
                                    if (selected.length <= background.selectionCount) {
                                      updateBackgroundSelection(background.id, selected);
                                    }
                                  }}
                                  style={{ 
                                    width: '100%', 
                                    padding: '5px',
                                    border: '1px solid #ddd',
                                    borderRadius: '3px'
                                  }}
                                >
                                  {intelligenceSubdomains.map(subdomain => (
                                    <option key={subdomain} value={subdomain}>
                                      {subdomain.charAt(0).toUpperCase() + subdomain.slice(1)}
                                    </option>
                                  ))}
                                </select>
                                <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                                  Hold Ctrl/Cmd to select multiple. Selected: {(getBackgroundSelection(background.id) || []).length}/{background.selectionCount}
                                </div>
                              </div>
                            )}
                            
                            {background.selectionType === 'crafting_subdomain' && (
                              <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                  Select Crafting Sub-domain:
                                </label>
                                <select 
                                  value={getBackgroundSelection(background.id) || ''}
                                  onChange={(e) => updateBackgroundSelection(background.id, e.target.value)}
                                  style={{ 
                                    width: '100%', 
                                    padding: '5px',
                                    border: '1px solid #ddd',
                                    borderRadius: '3px'
                                  }}
                                >
                                  <option value="">Select a crafting skill...</option>
                                  {craftingSubdomains.map(subdomain => (
                                    <option key={subdomain} value={subdomain}>
                                      {subdomain.charAt(0).toUpperCase() + subdomain.slice(1)}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}
                            
                            {background.selectionType === 'grand_company' && (
                              <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                  Select Grand Company:
                                </label>
                                <select 
                                  value={getBackgroundSelection(background.id) || ''}
                                  onChange={(e) => updateBackgroundSelection(background.id, e.target.value)}
                                  style={{ 
                                    width: '100%', 
                                    padding: '5px',
                                    border: '1px solid #ddd',
                                    borderRadius: '3px'
                                  }}
                                >
                                  <option value="">Select a Grand Company...</option>
                                  {grandCompanies.map(company => (
                                    <option key={company} value={company}>
                                      {company}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Negative Backgrounds */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#dc3545' }}>Negative Backgrounds (Grant Points)</h3>
        
        {Object.entries(negativeBackgrounds).map(([categoryName, categoryBackgrounds]) => (
          <div key={categoryName} style={{ marginBottom: '25px' }}>
            <h4 style={{ margin: '0 0 15px 0', color: '#333' }}>{categoryName}</h4>
            
            <div style={{ display: 'grid', gap: '15px' }}>
              {categoryBackgrounds.map(background => {
                const isSelected = isBackgroundSelected(background.id);
                
                return (
                  <div key={background.id} style={{ 
                    padding: '15px', 
                    border: `2px solid ${isSelected ? '#dc3545' : '#ddd'}`, 
                    borderRadius: '5px',
                    backgroundColor: isSelected ? '#fff0f0' : 'white'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                          <h5 style={{ margin: '0', fontSize: '16px', marginRight: '15px' }}>
                            {background.name}
                          </h5>
                          <span style={{ 
                            padding: '2px 8px', 
                            backgroundColor: '#dc3545', 
                            color: 'white', 
                            borderRadius: '3px', 
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}>
                            +{background.points} points
                          </span>
                          <button
                            onClick={() => toggleBackground(background, true)}
                            style={{
                              marginLeft: '10px',
                              padding: '4px 8px',
                              fontSize: '12px',
                              backgroundColor: isSelected ? '#6c757d' : '#dc3545',
                              color: 'white',
                              border: 'none',
                              borderRadius: '3px',
                              cursor: 'pointer'
                            }}
                          >
                            {isSelected ? 'Remove' : 'Take Burden'}
                          </button>
                        </div>
                        
                        <div style={{ fontSize: '14px', whiteSpace: 'pre-line' }}>
                          {background.description}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Backgrounds Summary */}
      {backgrounds.length > 0 && (
        <div style={{ 
          marginBottom: '20px', 
          padding: '15px', 
          backgroundColor: '#e9ecef', 
          borderRadius: '5px' 
        }}>
          <h4 style={{ margin: '0 0 10px 0' }}>Selected Backgrounds:</h4>
          <div style={{ display: 'grid', gap: '5px' }}>
            {backgrounds.map(bg => (
              <div key={bg.id} style={{ fontSize: '14px' }}>
                • {bg.name} {bg.cost ? `(-${bg.cost} points)` : `(+${bg.points} points)`}
                {bg.selection && (
                  <span style={{ color: '#666', marginLeft: '10px' }}>
                    → {Array.isArray(bg.selection) ? bg.selection.join(', ') : bg.selection}
                  </span>
                )}
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
          ← Back to Non-Combat Stats
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
          Continue to Lifestyles
        </button>
        
        {backgroundPointsRemaining > 0 && (
          <p style={{ color: '#28a745', marginTop: '10px', marginLeft: '10px' }}>
            💡 You have {backgroundPointsRemaining} background points remaining.
          </p>
        )}
      </div>
    </div>
  );
}

// Step 6: Lifestyles
function LifestylesStep({ data, setData, onNext, onBack }) {
  const lifestyles = data.lifestyles || {};
  const lifestylePoints = data.lifestylePoints || 5;

  // Calculate total points spent (1 point per tier)
  const pointsSpent = Object.values(lifestyles).reduce((total, level) => total + level, 0);
  const pointsRemaining = lifestylePoints - pointsSpent;

  const lifestyleDefinitions = {
    'Crafting Lifestyles': {
      'Combat Gear': [
        {
          id: 'weaponsmithing',
          name: 'Weaponsmithing',
          requirements: 'Blacksmithing 3+',
          products: 'Swords, spears, axes, combat implements',
          materials: 'Metal ores, leather wrappings, gems',
          tierExamples: 'Basic Iron Sword → Reinforced Steel Blade → Enchanted Mithril Weapon → Legendary Named Weapon'
        },
        {
          id: 'armoring',
          name: 'Armoring',
          requirements: 'Blacksmithing 3+ or Leatherworking 3+',
          products: 'Heavy armor, shields, protective gear',
          materials: 'Metal ores, leather, cloth padding',
          tierExamples: 'Leather Vest → Chain Mail → Plate Armor → Dragonscale Mail'
        }
      ],
      'Consumables': [
        {
          id: 'alchemy',
          name: 'Alchemy',
          requirements: 'Alchemy (Int) 3+',
          products: 'Potions, elixirs, bombs, transmutations',
          materials: 'Herbs, minerals, crystals, rare reagents',
          tierExamples: 'Healing Potion → Greater Healing → Elixir of Life → Philosopher\'s Stone'
        },
        {
          id: 'brewing',
          name: 'Brewing',
          requirements: 'Brewing 3+',
          products: 'Ales, wines, spirits, magical drinks',
          materials: 'Grains, fruits, herbs, yeast',
          tierExamples: 'Simple Ale → Fine Wine → Fortifying Mead → Ambrosia'
        }
      ],
      'Magitek Engineering': [
        {
          id: 'magitek_engineering',
          name: 'Magitek Engineering',
          requirements: 'Magitek (Int) 3+ AND Engineering 3+',
          products: 'Devices, gadgets, mechanical items',
          materials: 'Metal components, crystals, ceruleum',
          tierExamples: 'Add later'
        }
      ],
      'Fashion & Accessories': [
        {
          id: 'weaving',
          name: 'Weaving',
          requirements: 'Weaving (Deft) 3+',
          products: 'Cloth armor, robes, fashion items',
          materials: 'Fibers, threads, dyes, magical threads',
          tierExamples: 'Hempen Robe → Silk Dress → Enchanted Cloak → Astral Silk Ensemble'
        },
        {
          id: 'leatherworking',
          name: 'Leatherworking',
          requirements: 'Leatherworking (Deft) 3+',
          products: 'Medium armor, bags, belts, boots',
          materials: 'Hides, scales, sinew, dyes',
          tierExamples: 'Hide Boots → Reinforced Jerkin → Drake Leather → Behemoth King Set'
        },
        {
          id: 'goldsmithing',
          name: 'Goldsmithing',
          requirements: 'Goldsmithing (Deft) 3+',
          products: 'Jewelry, magical focuses, gems, accessories',
          materials: 'Precious metals, gems, crystals',
          tierExamples: 'Copper Ring → Gold Necklace → Enchanted Circlet → Crown of the Elements'
        },
        {
          id: 'gem_crafting',
          name: 'Gem Crafting',
          requirements: 'Gem Crafting (Deft) 3+',
          products: 'Weapon Skill Gems, Spell Gems',
          materials: 'Gems',
          tierExamples: 'Write later'
        },
        {
          id: 'carpentry',
          name: 'Carpentry',
          requirements: 'Carpentry (Deft) 3+',
          products: 'Wands, Staves, Furniture, etc',
          materials: 'Lumber, metal fittings, varnish',
          tierExamples: 'Add later'
        }
      ]
    },
    'Gathering Lifestyles': {
      'Resource Gathering': [
        {
          id: 'mining',
          name: 'Mining',
          requirements: 'Mining (Instinct) 3+',
          monthlyYield: '10/20/30/40/50 ore + 2/4/6/8/10 gems',
          products: 'Iron, silver, gold, mythril, adamantite, crystals',
          special: 'Higher tiers access rare veins and crystal deposits'
        },
        {
          id: 'botany',
          name: 'Botany',
          requirements: 'Botany (Instinct) 3+',
          monthlyYield: '15/30/45/60/75 plants + 5/10/15/20/25 rare herbs',
          products: 'Herbs, wood, fibers, seeds, rare flowers',
          special: 'Seasonal variations affect yields'
        },
        {
          id: 'fishing',
          name: 'Fishing',
          requirements: 'Fishing (Instinct) 3+',
          monthlyYield: '20/40/60/80/100 fish + 1/2/3/4/5 rare catches',
          products: 'Food fish, crafting materials, pearls, exotic species',
          special: 'Location affects available catches'
        },
        {
          id: 'farming',
          name: 'Farming',
          requirements: 'Nature Lore 3+ AND Botany 2+',
          monthlyYield: '25/50/75/100/125 crops + 5/10/15/20/25 specialty produce',
          products: 'Grains, vegetables, fruits, fibers, feed',
          special: 'Add later'
        }
      ]
    },
    'Production Lifestyles': {
      'Food & Animals': [
        {
          id: 'cooking',
          name: 'Cooking',
          requirements: 'Cooking 3+',
          products: 'Meals, rations, buff foods, delicacies',
          materials: 'Raw ingredients from farming/fishing/hunting'
        },
        {
          id: 'ranching',
          name: 'Ranching',
          requirements: 'Husbandry 3+',
          monthlyYield: '10/20/30/40/50 animal products (milk, eggs, wool)',
          products: 'Livestock for food, breeding stock',
          special: 'Animals require feed from farmers'
        },
        {
          id: 'beast_training',
          name: 'Beast Training',
          requirements: 'Animal Handling 3+ AND Husbandry 3+',
          products: 'Trained mounts, combat pets, working animals',
          trainingTime: '3/2/2/1/1 months per creature',
          tierExamples: 'Chocobo → War Bird → Drake → Griffon'
        }
      ]
    },
    'Service Lifestyles': {
      'Professional Services': [
        {
          id: 'merchantry',
          name: 'Merchantry',
          requirements: 'Commerce 3+ OR Economics 3+',
          products: 'Market stall, trade routes, bulk deals',
          monthlyIncome: '+50/150/300/500/750 gil from trading'
        },
        {
          id: 'scholarship',
          name: 'Scholarship',
          requirements: 'Any three Intelligence sub-domains at 3+',
          products: 'Research papers, teaching, discoveries',
          monthlyIncome: '+25/75/150/250/375 gil from institutions',
          special: 'Grants access to special research assistance during leves'
        },
        {
          id: 'entertainment',
          name: 'Entertainment',
          requirements: 'Performance 3+ OR Gambling 3+',
          products: 'Shows, events, gambling operations',
          monthlyIncome: '+40/120/240/400/600 gil from venues',
          special: 'Recognized as a star or someone famous at higher levels'
        },
        {
          id: 'transportation',
          name: 'Transportation',
          requirements: 'Riding 3+ OR Navigation 3+',
          products: 'Courier services, caravan guarding, fast travel',
          monthlyIncome: '+35/105/210/350/525 gil from contracts',
          special: 'Add later'
        }
      ]
    },
    'Shadow Lifestyles (Illicit Activities)': {
      'Criminal Activities': [
        {
          id: 'larceny',
          name: 'Larceny',
          requirements: 'Legerdemain 3+ AND Stealth 3+',
          monthlyIncome: '+30/90/180/300/450 gil from "acquisitions"',
          special: 'Pickpocketing NPCs, burglary jobs, heist planning. Grants access to Special Heists.',
          risk: 'Failed checks may result in bounties or jail time'
        },
        {
          id: 'black_market_dealer',
          name: 'Black Market Dealer',
          requirements: 'Streetwise 3+ AND Commerce 2+',
          monthlyIncome: '+40/120/240/400/600 gil from fence operations',
          special: 'Can fence stolen goods at 40/50/60/70/80% value\nAccess: Illegal items, contraband, restricted materials',
          risk: 'Raids may confiscate inventory'
        },
        {
          id: 'information_broker',
          name: 'Information Broker',
          requirements: 'Investigation 3+ AND Streetwise 3+',
          monthlyIncome: '+25/75/150/250/375 gil from selling secrets',
          special: 'Dabbler: Hear local rumors first\nApprentice: Get 24-hour warning of minor events\nJourneyman: Learn of plot hooks 48 hours early\nExpert: Discover major event details 72 hours in advance\nGrandmaster: Know secrets that shape the world\n\nDM Whispers: Receive private information based on tier'
        },
        {
          id: 'smuggling',
          name: 'Smuggling',
          requirements: 'Navigation 3+ AND Deception 3+',
          monthlyIncome: '+35/105/210/350/525 gil from contraband runs',
          special: 'Can transport illegal goods between cities\nBonus: Avoid customs fees on legal goods too',
          risk: 'Caught smuggling = major fines and reputation loss'
        },
        {
          id: 'forgery',
          name: 'Forgery',
          requirements: 'Forgery 4+ AND Calligraphy 2+',
          products: 'Fake documents, permits, identities',
          monthlyIncome: '+20/60/120/200/300 gil from document sales',
          special: 'Can create temporary legal documents',
          risk: 'Forgeries may be detected over time'
        }
      ]
    }
  };

  const tierNames = ['Dabbler', 'Apprentice', 'Journeyman', 'Expert', 'Grandmaster'];
  const tierBonuses = ['+50', '+150', '+250', '+400', '+500'];
  const tierCostReductions = ['0%', '10%', '20%', '30%', '40%'];

  const updateLifestyle = (lifestyleId, newLevel) => {
    if (newLevel < 0 || newLevel > 5) return;
    
    const currentLevel = lifestyles[lifestyleId] || 0;
    const pointChange = newLevel - currentLevel;
    const newTotalSpent = pointsSpent + pointChange;
    
    // Check if we have enough points
    if (newTotalSpent > lifestylePoints) return;
    
    // Check level 1 restriction: no lifestyle above tier 3
    if (newLevel > 3) return; // Level 1 restriction
    
    const newLifestyles = { ...lifestyles };
    if (newLevel === 0) {
      delete newLifestyles[lifestyleId];
    } else {
      newLifestyles[lifestyleId] = newLevel;
    }
    setData(prev => ({ ...prev, lifestyles: newLifestyles }));
  };

  const resetLifestyles = () => {
    setData(prev => ({ ...prev, lifestyles: {} }));
  };

  const getTierDescription = (tier) => {
    if (tier === 0) return 'Not invested';
    return `${tierNames[tier - 1]} (${tier} point${tier > 1 ? 's' : ''})`;
  };

  return (
    <div>
      <h2>Lifestyles</h2>
      
      {/* Explanation */}
      <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f8f9fa', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h3 style={{ margin: '0 0 15px 0' }}>What Are Lifestyles?</h3>
        <p style={{ marginBottom: '15px' }}>
          Lifestyles represent your character's profession, hobbies, and economic activities outside of adventuring. 
          They determine what goods and services you can create, gather, or provide to the player-driven economy. 
          Unlike combat or non-combat skills which represent your raw ability, Lifestyles represent your access to tools, recipes, techniques, and infrastructure.
        </p>
        <p style={{ marginBottom: '15px' }}>
          Think of it this way: Having Alchemy 10 means you're a genius at understanding chemical reactions, but without investing in the Alchemy Lifestyle, 
          you're working with crude tools and don't know any actual recipes. Lifestyles bridge the gap between knowledge and practical application.
        </p>
        
        <h4 style={{ margin: '15px 0 10px 0' }}>Lifestyle Points & Progression</h4>
        <div style={{ marginBottom: '15px' }}>
          <strong>Starting Allocation:</strong> Level 1: 5 lifestyle points<br />
          <strong>Progression:</strong> +1 point every 2 levels (2, 4, 6, 8, etc.)<br />
          <strong>Total at Level 30:</strong> 13 lifestyle points<br />
          <strong>Level 1 Restriction:</strong> No single lifestyle above tier 3
        </div>
        
        <h4 style={{ margin: '15px 0 10px 0' }}>Investment Tiers</h4>
        <p style={{ marginBottom: '10px' }}>Each tier costs 1 point and unlocks new capabilities:</p>
        <div style={{ display: 'grid', gap: '5px', fontSize: '14px' }}>
          <div><strong>Dabbler (1 point):</strong> Access basic recipes/techniques, +50 bonus</div>
          <div><strong>Apprentice (2 points):</strong> Tier 2 recipes, +150 bonus, 10% cost reduction</div>
          <div><strong>Journeyman (3 points):</strong> Tier 3 recipes, +250 bonus, 20% cost reduction</div>
          <div><strong>Expert (4 points):</strong> Master recipes, +400 bonus, 30% cost reduction</div>
          <div><strong>Grandmaster (5 points):</strong> Legendary items, +500 bonus, 40% cost reduction, create new recipes</div>
        </div>
      </div>

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
          <strong>Lifestyle Points:</strong> {pointsSpent} / {lifestylePoints} 
          <span style={{ color: '#666', marginLeft: '10px' }}>({pointsRemaining} remaining)</span>
          <br />
          <span style={{ fontSize: '12px', color: '#dc3545' }}>
            Level 1 Restriction: Maximum tier 3 per lifestyle
          </span>
        </div>
        <button 
          onClick={resetLifestyles}
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
          Reset All Lifestyles
        </button>
      </div>

      {/* Lifestyle Categories */}
      {Object.entries(lifestyleDefinitions).map(([categoryName, subcategories]) => (
        <div key={categoryName} style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            margin: '0 0 20px 0', 
            padding: '10px', 
            backgroundColor: categoryName.includes('Shadow') ? '#dc3545' : '#007bff', 
            color: 'white', 
            borderRadius: '5px' 
          }}>
            {categoryName}
          </h3>
          
          {Object.entries(subcategories).map(([subcategoryName, lifestyleList]) => (
            <div key={subcategoryName} style={{ marginBottom: '25px' }}>
              <h4 style={{ margin: '0 0 15px 0', color: '#333' }}>{subcategoryName}</h4>
              
              <div style={{ display: 'grid', gap: '20px' }}>
                {lifestyleList.map(lifestyle => {
                  const currentLevel = lifestyles[lifestyle.id] || 0;
                  const maxLevel = 3; // Level 1 restriction
                  
                  return (
                    <div key={lifestyle.id} style={{ 
                      padding: '20px', 
                      border: currentLevel > 0 ? '2px solid #007bff' : '1px solid #ddd', 
                      borderRadius: '5px',
                      backgroundColor: currentLevel > 0 ? '#f0f8ff' : 'white'
                    }}>
                      {/* Header with name and level controls */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                        <div style={{ flex: 1 }}>
                          <h5 style={{ margin: '0 0 5px 0', fontSize: '18px', color: '#333' }}>
                            {lifestyle.name}
                          </h5>
                          <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                            <strong>Requirements:</strong> {lifestyle.requirements}
                          </div>
                          <div style={{ fontSize: '14px', color: '#007bff', fontWeight: 'bold' }}>
                            Current Level: {getTierDescription(currentLevel)}
                          </div>
                        </div>
                        
                        {/* Level Controls */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '20px' }}>
                          <button 
                            onClick={() => updateLifestyle(lifestyle.id, currentLevel - 1)}
                            disabled={currentLevel <= 0}
                            style={{ 
                              padding: '5px 10px', 
                              fontSize: '14px',
                              backgroundColor: currentLevel > 0 ? '#dc3545' : '#ccc',
                              color: 'white',
                              border: 'none',
                              borderRadius: '3px',
                              cursor: currentLevel > 0 ? 'pointer' : 'not-allowed'
                            }}
                          >
                            -
                          </button>
                          <span style={{ 
                            minWidth: '60px', 
                            textAlign: 'center', 
                            fontSize: '16px', 
                            fontWeight: 'bold',
                            padding: '5px 10px',
                            backgroundColor: '#fff',
                            border: '1px solid #ddd',
                            borderRadius: '3px'
                          }}>
                            {currentLevel}/{maxLevel}
                          </span>
                          <button 
                            onClick={() => updateLifestyle(lifestyle.id, currentLevel + 1)}
                            disabled={currentLevel >= maxLevel || pointsRemaining <= 0}
                            style={{ 
                              padding: '5px 10px', 
                              fontSize: '14px',
                              backgroundColor: (currentLevel < maxLevel && pointsRemaining > 0) ? '#28a745' : '#ccc',
                              color: 'white',
                              border: 'none',
                              borderRadius: '3px',
                              cursor: (currentLevel < maxLevel && pointsRemaining > 0) ? 'pointer' : 'not-allowed'
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Lifestyle Details */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', fontSize: '14px' }}>
                        <div>
                          {lifestyle.products && (
                            <div style={{ marginBottom: '10px' }}>
                              <strong>Products:</strong> {lifestyle.products}
                            </div>
                          )}
                          {lifestyle.materials && (
                            <div style={{ marginBottom: '10px' }}>
                              <strong>Materials Needed:</strong> {lifestyle.materials}
                            </div>
                          )}
                          {lifestyle.monthlyYield && (
                            <div style={{ marginBottom: '10px' }}>
                              <strong>Monthly Yield:</strong> {lifestyle.monthlyYield}
                            </div>
                          )}
                          {lifestyle.monthlyIncome && (
                            <div style={{ marginBottom: '10px' }}>
                              <strong>Monthly Income:</strong> {lifestyle.monthlyIncome}
                            </div>
                          )}
                        </div>
                        
                        <div>
                          {lifestyle.tierExamples && (
                            <div style={{ marginBottom: '10px' }}>
                              <strong>Tier Examples:</strong> {lifestyle.tierExamples}
                            </div>
                          )}
                          {lifestyle.trainingTime && (
                            <div style={{ marginBottom: '10px' }}>
                              <strong>Training Time:</strong> {lifestyle.trainingTime}
                            </div>
                          )}
                          {lifestyle.special && (
                            <div style={{ marginBottom: '10px' }}>
                              <strong>Special:</strong> <span style={{ whiteSpace: 'pre-line' }}>{lifestyle.special}</span>
                            </div>
                          )}
                          {lifestyle.risk && (
                            <div style={{ marginBottom: '10px', color: '#dc3545' }}>
                              <strong>Risk:</strong> {lifestyle.risk}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Show next tier preview if not at max */}
                      {currentLevel < maxLevel && (
                        <div style={{ 
                          marginTop: '15px', 
                          padding: '10px', 
                          backgroundColor: '#f8f9fa', 
                          borderRadius: '3px',
                          border: '1px solid #e9ecef'
                        }}>
                          <div style={{ fontSize: '12px', color: '#666' }}>
                            <strong>Next Tier ({tierNames[currentLevel] || 'Dabbler'}):</strong> {tierBonuses[currentLevel]} bonus, {tierCostReductions[currentLevel]} cost reduction
                            {currentLevel === 0 ? ' + Access to basic recipes/techniques' : ''}
                            {currentLevel === 1 ? ' + Tier 2 recipes' : ''}
                            {currentLevel === 2 ? ' + Tier 3 recipes' : ''}
                          </div>
                          <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                            Cost: 1 point
                          </div>
                        </div>
                      )}

                      {/* Level restriction notice */}
                      {currentLevel >= maxLevel && (
                        <div style={{ 
                          marginTop: '15px', 
                          padding: '10px', 
                          backgroundColor: '#fff3cd', 
                          borderRadius: '3px',
                          border: '1px solid #ffeaa7'
                        }}>
                          <div style={{ fontSize: '12px', color: '#856404' }}>
                            <strong>Level 1 Character:</strong> Maximum tier {maxLevel} reached. Higher tiers unlock at higher character levels.
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Selected Lifestyles Summary */}
      {Object.keys(lifestyles).length > 0 && (
        <div style={{ 
          marginBottom: '20px', 
          padding: '15px', 
          backgroundColor: '#e9ecef', 
          borderRadius: '5px' 
        }}>
          <h4 style={{ margin: '0 0 10px 0' }}>Selected Lifestyles:</h4>
          <div style={{ display: 'grid', gap: '5px' }}>
            {Object.entries(lifestyles).map(([id, level]) => {
              const lifestyle = Object.values(lifestyleDefinitions)
                .flatMap(category => Object.values(category))
                .flat()
                .find(ls => ls.id === id);
              
              return (
                <div key={id} style={{ fontSize: '14px' }}>
                  • {lifestyle?.name || id}: {tierNames[level - 1]} ({level} point{level > 1 ? 's' : ''})
                </div>
              );
            })}
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
          ← Back to Backgrounds
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
          Continue to Combat Stats
        </button>
        
        {pointsRemaining > 0 && (
          <p style={{ color: '#28a745', marginTop: '10px', marginLeft: '10px' }}>
            💡 You have {pointsRemaining} lifestyle point{pointsRemaining > 1 ? 's' : ''} remaining.
          </p>
        )}
      </div>
    </div>
  );
}
// Step 7: Combat Stats
function CombatStatsStep({ data, setData, onNext, onBack }) {
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

  // Calculate total points spent
  const pointsSpent = Object.values(combatStats).reduce((total, statValue) => {
    return total + getStatCost(statValue);
  }, 0);

  const pointsRemaining = 20 - pointsSpent;

  const updateStat = (statName, newValue) => {
    if (newValue < -3 || newValue > 10) return;
    
    const newStats = { ...combatStats, [statName]: newValue };
    const newPointsSpent = Object.values(newStats).reduce((total, statValue) => {
      return total + getStatCost(statValue);
    }, 0);
    
    if (newPointsSpent <= 20) {
      setData(prev => ({ ...prev, combatStats: newStats }));
    }
  };

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
        return `${turns} turn${turns > 1 ? 's' : ''} per round, ${initiative >= 0 ? '+' : ''}${initiative} initiative`;
      
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
        const apRecovery = 2 + value;
        return `Recover ${apRecovery} AP per turn`;
      
      default:
        return "";
    }
  };

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
      <p>Allocate your 20 combat stat points. All stats start at -3.</p>
      
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
          <strong>Points Remaining: {pointsRemaining}</strong>
          {pointsRemaining < 0 && <span style={{ color: 'red' }}> (Over limit!)</span>}
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
          ← Back to Lifestyles
        </button>
        
        <button 
          onClick={onNext}
          disabled={pointsRemaining !== 0}
          style={{ 
            padding: '12px 24px', 
            fontSize: '16px',
            backgroundColor: pointsRemaining === 0 ? '#007bff' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: pointsRemaining === 0 ? 'pointer' : 'not-allowed'
          }}
        >
          Continue to Character Overview
        </button>
        
        {pointsRemaining !== 0 && (
          <p style={{ color: '#dc3545', marginTop: '10px' }}>
            You must spend all 20 points to continue.
          </p>
        )}
      </div>
    </div>
  );
}

// Step 8: Character Overview
function CharacterOverviewStep({ data, onBack }) {
  const getStatModifier = (value) => {
    if (value === -3) return -200;
    if (value === -2) return -100;
    if (value === -1) return -50;
    if (value === 0) return 0;
    return value * 20;
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

  const tierNames = ['Dabbler', 'Apprentice', 'Journeyman', 'Expert', 'Grandmaster'];

  return (
    <div>
      <h2>Character Overview</h2>
      <p>Thank you for participating in the RKC 2.0 Beta! Here's your completed character:</p>
      
      {/* Beta Notice */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        backgroundColor: '#fff3cd', 
        border: '1px solid #ffeaa7', 
        borderRadius: '5px' 
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#856404' }}>Important Beta Notes</h3>
        <p style={{ marginBottom: '10px' }}>
          <strong>This is a modular beta system:</strong> Currently, selections like backgrounds don't automatically 
          modify your stats because this isn't connected to a database. In the final system, your background 
          choices would automatically adjust your stats, gil, and reputation as described.
        </p>
        <p style={{ marginBottom: '0' }}>
          <strong>Coming in future beta versions:</strong>
        </p>
        <ul style={{ marginTop: '5px' }}>
          <li>Skill trees and abilities system</li>
          <li>Starting equipment selection</li>
          <li>Additional backgrounds and lifestyles</li>
          <li>Automatic stat calculation from backgrounds</li>
          <li>Full faction reputation system integration</li>
        </ul>
      </div>

      {/* Character Basics */}
      <div style={{ marginBottom: '25px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
        <h3 style={{ margin: '0 0 15px 0' }}>Character Basics</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div><strong>Name:</strong> {data.name || 'Not specified'}</div>
          <div><strong>Age:</strong> {data.age || 'Not specified'}</div>
          <div><strong>Origin:</strong> {data.origin || 'Not specified'}</div>
          <div><strong>Race:</strong> {data.race || 'Not specified'}</div>
          <div><strong>Department:</strong> {data.department || 'Not specified'}</div>
        </div>
      </div>

      {/* Reputation Summary */}
      {data.reputation && Object.keys(data.reputation).length > 0 && (
        <div style={{ marginBottom: '25px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
          <h3 style={{ margin: '0 0 15px 0' }}>Starting Reputation (Sample Factions)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {Object.entries(data.reputation).slice(0, 6).map(([faction, rep]) => (
              <div key={faction} style={{ fontSize: '14px' }}>
                <strong>{faction}:</strong> {rep > 0 ? '+' : ''}{rep} ({getReputationLevel(rep)})
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Non-Combat Stats */}
      <div style={{ marginBottom: '25px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
        <h3 style={{ margin: '0 0 15px 0' }}>Domain Stats</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          {Object.entries(data.domains || {}).map(([domain, value]) => (
            <div key={domain} style={{ fontSize: '14px' }}>
              <strong>{domain.charAt(0).toUpperCase() + domain.slice(1)}:</strong> {value} ({getStatModifier(value) >= 0 ? '+' : ''}{getStatModifier(value)})
            </div>
          ))}
        </div>
        
        {data.subDomains && Object.keys(data.subDomains).length > 0 && (
          <div style={{ marginTop: '15px' }}>
            <h4 style={{ margin: '0 0 10px 0' }}>Trained Sub-Domains</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '5px' }}>
              {Object.entries(data.subDomains)
                .filter(([_, value]) => value > 0)
                .map(([subdomain, value]) => (
                <div key={subdomain} style={{ fontSize: '12px' }}>
                  <strong>{subdomain}:</strong> {value} ({getStatModifier(value) >= 0 ? '+' : ''}{getStatModifier(value)})
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Backgrounds */}
      {data.backgrounds && data.backgrounds.length > 0 && (
        <div style={{ marginBottom: '25px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
          <h3 style={{ margin: '0 0 15px 0' }}>Backgrounds</h3>
          <div style={{ display: 'grid', gap: '5px' }}>
            {data.backgrounds.map(bg => (
              <div key={bg.id} style={{ fontSize: '14px' }}>
                • {bg.name} {bg.cost ? `(-${bg.cost} points)` : `(+${bg.points} points)`}
                {bg.selection && (
                  <span style={{ color: '#666', marginLeft: '10px' }}>
                    → {Array.isArray(bg.selection) ? bg.selection.join(', ') : bg.selection}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
            Points spent: {data.backgroundPointsSpent || 0} / 200
          </div>
        </div>
      )}

      {/* Lifestyles */}
      {data.lifestyles && Object.keys(data.lifestyles).length > 0 && (
        <div style={{ marginBottom: '25px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
          <h3 style={{ margin: '0 0 15px 0' }}>Lifestyles</h3>
          <div style={{ display: 'grid', gap: '5px' }}>
            {Object.entries(data.lifestyles).map(([id, level]) => (
              <div key={id} style={{ fontSize: '14px' }}>
                • {id.charAt(0).toUpperCase() + id.slice(1).replace(/([A-Z])/g, ' $1')}: {tierNames[level - 1]} (Tier {level})
              </div>
            ))}
          </div>
          <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
            Points spent: {Object.values(data.lifestyles).reduce((total, level) => total + level, 0)} / {data.lifestylePoints || 5}
          </div>
        </div>
      )}

      {/* Combat Stats */}
      <div style={{ marginBottom: '25px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
        <h3 style={{ margin: '0 0 15px 0' }}>Combat Stats</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          {Object.entries(data.combatStats || {}).map(([stat, value]) => (
            <div key={stat} style={{ fontSize: '14px' }}>
              <strong>{stat.charAt(0).toUpperCase() + stat.slice(1).replace(/([A-Z])/g, ' $1')}:</strong> {value} ({getStatModifier(value) >= 0 ? '+' : ''}{getStatModifier(value)})
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Reminder */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        backgroundColor: '#d1ecf1', 
        border: '1px solid #bee5eb', 
        borderRadius: '5px' 
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#0c5460' }}>Next Steps</h3>
        <p style={{ marginBottom: '15px' }}>
          <strong>Don't forget to fill out the feedback form!</strong> Your input is crucial for improving the system. 
          If you don't complete the feedback form, you'll be asked to sit out the next beta test.
        </p>
        <p style={{ marginBottom: '0' }}>
          We'll be going through the feedback form together panel by panel to discuss your experience 
          with each part of character creation.
        </p>
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
          ← Back to Combat Stats
        </button>
        
        <button 
          onClick={() => alert('Feedback form would open here in the actual system!')}
          style={{ 
            padding: '12px 24px', 
            fontSize: '16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Continue to Feedback Form
        </button>
      </div>

      <div style={{ 
        marginTop: '30px', 
        padding: '15px', 
        backgroundColor: '#e9ecef', 
        borderRadius: '5px',
        textAlign: 'center'
      }}>
        <p style={{ margin: '0', fontSize: '16px', fontWeight: 'bold' }}>
          Thank you for participating in the RKC 2.0 Beta! 🎉
        </p>
      </div>
    </div>
  );
}


export default App;
