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

// Step 3: Reputation & Factions
function ReputationStep({ data, setData, onNext }) {
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

  const allFactions = {
    'Ul\'dah & Thanalan': [
      {
        name: 'The Syndicate',
        description: 'The true power behind Ul\'dah, composed of merchant-princes and oligarchs.',
        raceBonus: ['Lalafell', 'Garlean (Pureblood)'],
        originBonus: ['Ul\'dah & Thanalan'],
        originPenalty: ['Ala Mhigo', 'Azim Steppe', 'Bozja']
      },
      {
        name: 'Brass Blades',
        description: 'Mercenary-style guards hired by Ul\'dah, often corrupt.',
        raceBonus: [],
        originBonus: ['Ul\'dah & Thanalan'],
        originPenalty: ['Ala Mhigo', 'Azim Steppe']
      },
      {
        name: 'Order of Nald\'thal',
        description: 'Religious body controlling death and commerce.',
        raceBonus: ['Lalafell', 'Garlean (Pureblood)'],
        originBonus: [],
        originPenalty: ['Gelmorra (pre-Gridanian subterranean)', 'Tural (Native Origin)']
      },
      {
        name: 'Brass Blade Dissidents',
        description: 'Royalist faction of former Brass Blades members focused on protecting poor citizens in Ul\'Dah',
        raceBonus: [],
        originBonus: ['Ul\'dah & Thanalan'],
        originPenalty: []
      },
      {
        name: 'The Sandguard Militia',
        description: 'Former Royalist militia group protecting the greater Thanalan region, however they have caved to Syndicate pressure in recent years to work in line with them -- however the protection of citizens across Thanalan remains their priority',
        raceBonus: [],
        originBonus: ['Ul\'dah & Thanalan'],
        originPenalty: []
      },
      {
        name: 'The Mirage Caravan',
        description: 'A group of smaller business folk who unite under one banner to promote fair trade deals to remain competitive with The Syndicate',
        raceBonus: [],
        originBonus: ['Ul\'dah & Thanalan'],
        originPenalty: []
      },
      {
        name: 'The Amalj\'aa Tribe Coalition',
        description: 'Multiple Amalj\'aa tribes united under one banner to preserve their culture and identity',
        raceBonus: [],
        originBonus: [],
        originPenalty: [],
        special: 'amalj\'aa'
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
    const tier = reputationTiers.find(t => 
      t.name === getReputationLevel(rep)
    );
    return tier ? tier.color : '#6c757d';
  };

  const calculateFactionReputation = (faction) => {
    let rep = 0;
    
    // Special handling for Amalj'aa Coalition
    if (faction.special === 'amalj\'aa') {
      if (data.race === 'Amalj\'aa (Thanalan)') {
        return 150; // Special bonus
      } else {
        return -200; // Special penalty for non-Amalj'aa
      }
    }
    
    // Standard calculation
    if (faction.raceBonus.includes(data.race)) rep += 20;
    if (faction.originBonus.includes(data.origin)) rep += 20;
    if (faction.originPenalty.includes(data.origin)) rep -= 20;
    
    return rep;
  };

  return (
    <div>
      <h2>Reputation & Factions</h2>
      <p>Your character's reputation with various factions shapes their opportunities and interactions in the world.</p>
      
      {/* Reputation Tier Explanation */}
      <div style={{ marginBottom: '30px' }}>
        <h3>How Reputation Tiers Work</h3>
        <div style={{ display: 'grid', gap: '10px' }}>
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
      </div>

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
          <li>Players may begin with a predefined reputation based on their race, region, or background, using your earlier reputation modifier table.</li>
        </ul>
      </div>

      {/* Current Character's Reputation */}
      <div style={{ marginBottom: '30px' }}>
        <h3>Your Starting Reputation</h3>
        <p style={{ marginBottom: '15px' }}>
          <strong>Character:</strong> {data.name} ({data.race} from {data.origin})
        </p>
        
        {/* Ul'dah & Thanalan Factions */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ 
            margin: '0 0 15px 0', 
            padding: '10px', 
            backgroundColor: '#d4b106', 
            color: 'white', 
            borderRadius: '5px' 
          }}>
            Ul'dah & Thanalan Factions
          </h4>
          
          <div style={{ display: 'grid', gap: '15px' }}>
            {allFactions['Ul\'dah & Thanalan'].map(faction => {
              const rep = calculateFactionReputation(faction);
              const level = getReputationLevel(rep);
              const color = getReputationColor(rep);
              
              return (
                <div key={faction.name} style={{ 
                  padding: '15px', 
                  border: `2px solid ${color}`, 
                  borderRadius: '5px',
                  backgroundColor: 'white'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div>
                      <h5 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>{faction.name}</h5>
                      <p style={{ margin: '0', fontSize: '14px', color: '#666', lineHeight: '1.3' }}>
                        {faction.description}
                      </p>
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
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ 
          padding: '15px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '5px',
          fontStyle: 'italic',
          color: '#666'
        }}>
          <strong>Note:</strong> More factions will be added in later versions of the beta.
        </div>
      </div>

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
  );
}






export default App;
