let characters = [];
let n = 0;

const hamburgerBtn = document.getElementById("hamburgerBtn")
hamburgerBtn.addEventListener("click", hamburgerMenu)
const ccharbtn = document.getElementById("create-char-btn")
ccharbtn.addEventListener("click", divPopUp)
const addChar = document.getElementById("add-char-btn")
addChar.addEventListener("click", addNewCharacter)
const saveChars = document.getElementById("save-chars")
saveChars.addEventListener("click", saveCharacters)
const loadChars = document.getElementById("load-chars")
loadChars.addEventListener("click", loadCharacters)
const close = document.getElementById("close-button")
close.addEventListener("click", closePopUp)
const addSJ = document.getElementById('character-job-input')
addSJ.addEventListener("input", presentSjOptions)

function hamburgerMenu() {
  document.getElementById("hamburgerMenu").classList.toggle("show");

}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");

    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function divPopUp() {
  document.getElementById("character-popup").style.display = "block";
}

// Function to close the pop-up using the close button
function closePopUp() {
  document.getElementById("character-popup").style.display = "none";
}


  function addTags(tags, tagBox) {
    tags.forEach(tag => {
      const button = document.createElement('button');
      button.classList.add('tag-button');
      button.setAttribute('type', 'button');
      button.textContent = tag;
      button.addEventListener('click', () => filterByTag(tag));
      tagBox.appendChild(button);
    });
  }

  function addList(list, itemBox, listType) {
    list.forEach(item => {
      const button = document.createElement('button');
      button.classList.add('item-button');
      button.setAttribute('type', 'button');
      button.textContent = item;
      button.addEventListener('click', () => {switch (listType) {
        case "traits":
            filterByTraits(item)
          break;
        case "allies":
            filterByAllies(item)
          break;
        case "languages":
            filterByLanguages(item)
          break;
      }});
      itemBox.appendChild(button);
    });
  }

const characterList = document.getElementById('character-list');

function createcharacterListItem(character) {
    const characterDiv = document.createElement('div');
    characterDiv.classList.add('character')

    characterDiv.innerHTML = `
        <div class="character-personalities">
            <h3 class="character-name">Name: ${character.name}</h3>
            <h3 class="character-personality">Personality: ${character.personality}</h3>
            <h3 class="character-ideals">Ideals: ${character.ideals}</h3>
            <h3 class="character-bonds">Bonds: ${character.bonds}</h3>
            <h3 class="character-flaws">Flaws: ${character.flaws}</h3>
            <div id="character-traits-${n}" class="traits-buttons-box">
                <h3 class="character-traits">Traits: </h3>
            </div>
        </div>
        <div class="character-being">
            <h3 class="character-species">Species: ${character.species}</h3>
            <h3 class="character-subspecies">Subspecies: ${character.subspecies}</h3>
            <div class="class-section">
              <img src="${character.icon}" class="pic-on-color">
              <div class="class-info">
                <h3 class="character-job colored">Class: ${character.job}</h3>
                <h3 class="character-subjob colored">Subclass: ${character.subjob}</h3>
              </div>
            </div>
            <h3 class="character-background">Background: ${character.background}</h3>
            <h3 class="character-level">Level: ${character.level}</h3>
        </div>
        <div class="character-backgrounds">
            <h3 class="character-backstory">Backstory: ${character.backstory}</h3>
            <div id="character-allies-${n}" class="allies-buttons-box">
                <h3 class="character-allies">Allies/Organizations: </h3>
            </div>
            <div id="character-languages-${n}" class="languages-buttons-box">
                <h3 class="character-languages">Languages: </h3>
            </div>
        </div>
        
        <div id="character-tags-${n}" class="tag-buttons-box"></div>
    `;
    const removeButton = document.createElement('button');
    removeButton.innerHTML = `<i class="fa fa-trash"></i>`;
    removeButton.classList.add('remove-char-btn');
    characterDiv.appendChild(removeButton);
    
    removeButton.addEventListener('click', () => {
      const characterIndex = characters.indexOf(character);
      if (characterIndex !== -1) {
        characters.splice(characterIndex, 1); // Remove character from array
        displayCharacters(characters);  // Update displayed list
      }
    });

    return characterDiv;
  }

  function displayCharacters(filteredCharacters) {
    const characterList = document.getElementById('character-list');
    characterList.innerHTML = ''; // Clear existing list items
  
    filteredCharacters.forEach(character => {
      const characterItem = createcharacterListItem(character);
      characterList.appendChild(characterItem);
      const tagBox = document.getElementById(`character-tags-${n}`);
      const traitsBox = document.getElementById(`character-traits-${n}`);
      const alliesBox = document.getElementById(`character-allies-${n}`);
      const languagesBox = document.getElementById(`character-languages-${n}`);
      addList(character.traits,traitsBox,"traits")
      addList(character.allies,alliesBox,"allies")
      addList(character.languages,languagesBox,"languages")
      addTags(character.tags,tagBox);
      n++;
    });
    n = 0;
  }

  function filterByTag(tag) {
    const lowerCaseTag = tag.toLowerCase(); // Convert the tag to lowercase
    const filteredCharacters = characters.filter(character => {
      return character.tags.some(characterTag => characterTag.toLowerCase() === lowerCaseTag);
    });
    displayCharacters(filteredCharacters);
  }

  function filterByTraits(trait) {
    const lowerCaseTrait = trait.toLowerCase(); // Convert the trait to lowercase
    const filteredCharacters = characters.filter(character => {
      return character.traits.some(characterTrait => characterTrait.toLowerCase() === lowerCaseTrait);
    });
    displayCharacters(filteredCharacters);
  }
  
  function filterByAllies(ally) {
    const lowerCaseAlly = ally.toLowerCase(); // Convert the ally to lowercase
    const filteredCharacters = characters.filter(character => {
      return character.allies.some(characterally => characterally.toLowerCase() === lowerCaseAlly);
    });
    displayCharacters(filteredCharacters);
  }

  function filterByLanguages(language) {
    const lowerCaseLanguage = language.toLowerCase(); // Convert the language to lowercase
    const filteredCharacters = characters.filter(character => {
      return character.languages.some(characterLanguage => characterLanguage.toLowerCase() === lowerCaseLanguage);
    });
    displayCharacters(filteredCharacters);
  }

window.addEventListener('DOMContentLoaded', () => {
displayCharacters(characters);
});

function noneCheck(item) {
  if (item = "") {
    return "None";
  }
}

function stringSplit(item) 
{
  if (item != "None")
  {
    return item.split(", ");
  }
}

function iconSrc(job)
{
  switch (job.toLowerCase()) {
    case "barbarian":
      return "./images/class-icons-barbarian.png";
    case "bard":
      return "./images/class-icons-bard.png";
    case "cleric":
      return "./images/class-icons-cleric.png";
    case "druid":
      return "./images/class-icons-druid.png";
    case "fighter":
      return "./images/class-icons-fighter.png";
    case "monk":
      return "./images/class-icons-monk.png";
    case "paladin":
      return "./images/class-icons-paladin.png";
    case "ranger":
      return "./images/class-icons-ranger.png";
    case "rogue":
      return "./images/class-icons-rogue.png";
    case "sorcerer":
      return "./images/class-icons-sorcerer.png";
    case "warlock":
      return "./images/class-icons-warlock.png";
    case "wizard":
      return "./images/class-icons-wizard.png";
    default:
      return "";
  }
}

function addNewCharacter()
  {
    let name = document.getElementById('character-name-input').value;
    let personality = document.getElementById('character-personality-input').value;
    let ideals = document.getElementById('character-ideals-input').value;
    let bonds = document.getElementById('character-bonds-input').value;
    let flaws = document.getElementById('character-flaws-input').value;
    let traits = document.getElementById('character-traits-input').value;
    let species = document.getElementById('character-species-input').value;
    let subspecies = document.getElementById('character-subspecies-input').value;
    let job = document.getElementById('character-job-input').value;
    let subjob = document.getElementById('character-subjob-input').value;
    let background = document.getElementById('character-background-input').value;
    let level = document.getElementById('character-level-input').value;
    let backstory = document.getElementById('character-backstory-input').textContent;
    let allies = document.getElementById('character-allies-input').value;
    let languages = document.getElementById('character-languages-input').value;
    let tags = document.getElementById('character-tags-input').value;
    let icon = iconSrc(job);
    noneCheck(name);
    noneCheck(personality);
    noneCheck(ideals);
    noneCheck(bonds);
    noneCheck(flaws);
    noneCheck(traits);
    noneCheck(species);
    noneCheck(subspecies);
    noneCheck(job);
    noneCheck(subjob);
    noneCheck(background);
    noneCheck(level);
    noneCheck(backstory);
    noneCheck(allies);
    noneCheck(languages);
    noneCheck(tags);
    let newChar = {}

    newChar["name"] = name;
    newChar["personality"] = personality;
    newChar["ideals"] = ideals;
    newChar["bonds"] = bonds;
    newChar["flaws"] = flaws;
    newChar["species"] = species;
    newChar["subspecies"] = subspecies;
    newChar["job"] = job;
    newChar["subjob"] = subjob;
    newChar["background"] = background;
    newChar["level"] = level;
    newChar["backstory"] = backstory;
    newChar["icon"] = icon;
    newChar["traits"] = stringSplit(traits);
    newChar["allies"] = stringSplit(allies);
    newChar["languages"] = stringSplit(languages);
    newChar["tags"] = stringSplit(tags);
    characters.push(newChar);
    displayCharacters(characters);
    closePopUp();
  }

  const characterPopup = document.getElementById('character-popup');
  let isDragging = false;
  let offsetX, offsetY;
  
  characterPopup.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - characterPopup.offsetLeft;
      offsetY = e.clientY - characterPopup.offsetTop;
  });
  
  document.addEventListener('mouseup', () => {
      isDragging = false;
  });
  
  document.addEventListener('mousemove', (e) => {
      if (isDragging) {
          characterPopup.style.left = (e.clientX - offsetX) + 'px';
          characterPopup.style.top = (e.clientY - offsetY) + 'px';
      }
  });

  function saveCharacters()
  {
    // Convert the characters array to a JSON string
    const jsonData = JSON.stringify(characters, null, 2);

    // Create a Blob object representing the JSON data
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a hidden anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;

    // Prompt the user for the desired filename and download location
    const filename = prompt("Enter the desired filename (without extension):");

    if (filename) {
        a.download = filename + ".json";
    }


    a.click();


    // Revoke the URL to release memory
    URL.revokeObjectURL(url);
  }

  function loadCharacters()
  {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const jsonData = e.target.result;
            const charactersData = JSON.parse(jsonData);
            characters = charactersData;
            displayCharacters(characters);
        };
        reader.readAsText(file);
    };
    input.click();
  }

  function presentSjOptions() 
  {
    let sj = document.getElementById('character-subjob-input')
    let sjDatalist = document.createElement('datalist')
    let job = document.getElementById('character-job-input').value
    switch (job) {
      case 'Artificer':
        sjDatalist.setAttribute('id', 'ArtificerList')
        sjDatalist.innerHTML = `
        <option>Alchemist</option>
        <option>Armorer</option>
        <option>Artillerist</option>
        <option>Battle Smith</option>
        `
        sj.setAttribute('list', 'ArtificerList')
        break;
      case 'Barbarian':
        sjDatalist.setAttribute('id', 'BarbarianList')
        sjDatalist.innerHTML = `
        <option>Path of the Ancestral Guardian</option>
        <option>Path of the Beast</option>
        <option>Path of the Berserker</option>
        <option>Path of the Giant</option>
        <option>Path of the Storm Herald</option>
        <option>Path of the Totem Warrior</option>
        <option>Path of the Zealot</option>
        <option>Path of the Wild Magic</option>
        `
        sj.setAttribute('list', 'BarbarianList')
        break;
      case 'Bard':
        sjDatalist.setAttribute('id', 'BardList')
        sjDatalist.innerHTML = `
        <option>College of Creation</option>
        <option>College of Eloquence</option>
        <option>College of Glamour</option>
        <option>College of Lore</option>
        <option>College of Spirits</option>
        <option>College of Swords</option>
        <option>College of Valor</option>
        <option>College of Whispers</option>
        `
        sj.setAttribute('list', 'BardList')
        break;
      case 'Cleric':
        sjDatalist.setAttribute('id', 'ClericList')
        sjDatalist.innerHTML = `
        <option>Arcana Domain</option>
        <option>Forge Domain</option>
        <option>Grave Domain</option>
        <option>Knowledge Domain</option>
        <option>Life Domain</option>
        <option>Light Domain</option>
        <option>Order Domain</option>
        <option>Peace Domain</option>
        <option>Tempest Domain</option>
        <option>Trickery Domain</option>
        <option>Twilight Domain</option>
        <option>War Domain</option>
        `
        sj.setAttribute('list', 'ClericList')
        break;
      case 'Druid':
        sjDatalist.setAttribute('id', 'DruidList')
        sjDatalist.innerHTML = `
        <option>Circle of Dreams</option>
        <option>Circle of Spores</option>
        <option>Circle of Stars</option>
        <option>Circle of Wildfire</option>
        <option>Circle of the Land</option>
        <option>Circle of the Moon</option>
        <option>Circle of the Shepherd</option>
        `
        sj.setAttribute('list', 'DruidList')
        break;
      case 'Fighter':
        sjDatalist.setAttribute('id', 'FighterList')
        sjDatalist.innerHTML = `
        <option>Arcane Archer</option>
        <option>Battle Master</option>
        <option>Cavalier</option>
        <option>Champion</option>
        <option>Echo Knight</option>
        <option>Eldritch Knight</option>
        <option>Psi Warrior</option>
        <option>Purple Dragon Knight</option>
        <option>Rune Knight</option>
        <option>Samurai</option>
        `
        sj.setAttribute('list', 'FighterList')
        break;
      case 'Monk':
        sjDatalist.setAttribute('id', 'MonkList')
        sjDatalist.innerHTML = `
        <option>Way of Mercy</option>
        <option>Way of Shadow</option>
        <option>Way of the Ascendant Dragon</option>
        <option>Way of the Astral Self</option>
        <option>Way of the Drunken Master</option>
        <option>Way of the Four Elements</option>
        <option>Way of the Kensei</option>
        <option>Way of the Long Death</option>
        <option>Way of the Open Hand</option>
        <option>Way of the Sun Soul</option>
        `
        sj.setAttribute('list', 'MonkList')
        break;
      case 'Paladin':
        sjDatalist.setAttribute('id', 'PaladinList')
        sjDatalist.innerHTML = `
        <option>Oath of Conquest</option>
        <option>Oath of Devotion</option>
        <option>Oath of Glory</option>
        <option>Oath of Redemption</option>
        <option>Oath of the Ancients</option>
        <option>Oath of the Crown</option>
        <option>Oath of the Watchers</option>
        <option>Oath of Vengence</option>
        <option>Oathbreaker</option>
        `
        sj.setAttribute('list', 'PaladinList')
        break;
      case 'Ranger':
        sjDatalist.setAttribute('id', 'RangerList')
        sjDatalist.innerHTML = `
        <option>Beast Master</option>
        <option>Drakewarden</option>
        <option>Fey Wanderer</option>
        <option>Gloom Stalker</option>
        <option>Horizon Walker</option>
        <option>Hunter Ranger</option>
        <option>Monster Slayer</option>
        <option>Swarmkeeper</option>
        `
        sj.setAttribute('list', 'RangerList')
        break;
      case 'Rogue':
        sjDatalist.setAttribute('id', 'RogueList')
        sjDatalist.innerHTML = `
        <option>Arcane Trickster</option>
        <option>Assassin</option>
        <option>Inquisitive</option>
        <option>Mastermind</option>
        <option>Phantom</option>
        <option>Scout</option>
        <option>Soulknife</option>
        <option>Swashbuckler</option>
        <option>Thief</option>
        `
        sj.setAttribute('list', 'RogueList')
        break;
      case 'Sorcerer':
        sjDatalist.setAttribute('id', 'SorcererList')
        sjDatalist.innerHTML = `
        <option>Aberrant Mind</option>
        <option>Clockwork Soul</option>
        <option>Divine Soul</option>
        <option>Draconic Blodline</option>
        <option>Lunar Sorcery</option>
        <option>Shadow Magic</option>
        <option>Storm Sorcery</option>
        <option>Wild Magic</option>
        `
        sj.setAttribute('list', 'SorcererList')
        break;
      case 'Warlock':
        sjDatalist.setAttribute('id', 'WarlockList')
        sjDatalist.innerHTML = `
        <option>Archfey</option>
        <option>Celestial</option>
        <option>Fathomless</option>
        <option>Fiend</option>
        <option>Genie</option>
        <option>Great Old One</option>
        <option>Hexblade</option>
        <option>Undead</option>
        <option>Undying</option>
        `
        sj.setAttribute('list', 'WarlockList')
        break;
      case 'Wizard':
        sjDatalist.setAttribute('id', 'WizardList')
        sjDatalist.innerHTML = `
        <option>Bladesinging</option>
        <option>Chronurgy Magic</option>
        <option>Graviturgy Magic</option>
        <option>Order of Scribes</option>
        <option>School of Abjuration</option>
        <option>School of Divination</option>
        <option>School of Enchantment</option>
        <option>School of Evocation</option>
        <option>School of Illusion</option>
        <option>School of Necromancy</option>
        <option>School of Transmutation</option>
        <option>War Magic</option>
        `
        sj.setAttribute('list', 'WizardList')
        break;
      default:
        break;
    }
    sj.appendChild(sjDatalist);
  }