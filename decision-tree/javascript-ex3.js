const chatbotDatabase = {
  // The root node where the conversation always begins
  startNode: "q_1_category", 

  nodes: {
    // LEVEL 1: Broad Category
    "q_1_category": {
      type: "question",
      text: "Welcome! What kind of reading experience are you looking for today?",
      options: [
        { label: "Fiction (Immersive made-up stories)", nextId: "q_2_fiction_genre" },
        { label: "Non-Fiction (Real-world knowledge & skills)", nextId: "q_2_nonfiction_topic" }
      ]
    },

    // LEVEL 2: Genre Selection
    "q_2_fiction_genre": {
      type: "question",
      text: "Great! Which fictional world do you want to dive into?",
      options: [
        { label: "Sci-Fi & Fantasy", nextId: "q_3_scifi_preference" },
        { label: "Mystery & Thriller", nextId: "res_thriller" } // This branch ends early at Level 2
      ]
    },
    "q_2_nonfiction_topic": {
      type: "question",
      text: "Which area do you want to level up in?",
      options: [
        { label: "Software Development & Tech", nextId: "res_tech" },
        { label: "Business & Agile Methodologies", nextId: "res_agile" }
      ]
    },

    // LEVEL 3: Sub-Genre / Vibe 
    "q_3_scifi_preference": {
      type: "question",
      text: "Do you prefer futuristic technology or magical realms?",
      options: [
        { label: "Space & Advanced Tech (Sci-Fi)", nextId: "res_scifi" },
        { label: "Dragons, Swords & Magic (Fantasy)", nextId: "q_4_fantasy_length" } // Goes even deeper
      ]
    },

    // LEVEL 4: Commitment Level (Deepest Question)
    "q_4_fantasy_length": {
      type: "question",
      text: "Are you ready for a long journey, or do you want a quick adventure?",
      options: [
        { label: "Give me the LOTR Series (3+ books)", nextId: "res_epic_fantasy" },
        { label: "A quick Standalone book", nextId: "res_standalone_fantasy" }
      ]
    },

    // FINAL RESULTS (Leaf Nodes)
    "res_epic_fantasy": {
      type: "result",
      text: "Recommendation: 'The Lord of the Rings' or 'The Hobbit'. Get ready for a massive journey!",
      productLink: "/books/fantasy-series"
    },
    "res_standalone_fantasy": {
      type: "result",
      text: "Recommendation: 'The Hobbit' or 'Elantris'. Perfect for a weekend read!",
      productLink: "/books/fantasy-standalone"
    },
    "res_scifi": {
      type: "result",
      text: "Recommendation: 'Dune' or 'Project Hail Mary'.",
      productLink: "/books/sci-fi"
    },
    "res_thriller": {
      type: "result",
      text: "Recommendation: 'Gone Girl' or 'The Silent Patient'.",
      productLink: "/books/thriller"
    },
    "res_tech": {
      type: "result",
      text: "Recommendation: 'Clean Architecture' or 'Eloquent JavaScript'.",
      productLink: "/books/programming"
    },
    "res_agile": {
      type: "result",
      text: "Recommendation: 'Scrum: The Art of Doing Twice the Work in Half the Time'.",
      productLink: "/books/agile-management"
    }
  }
};


// Initialize the current state with the starting node ID
let currentNodeId = chatbotDatabase.startNode;

const questionTextEl = document.getElementById("question-text");
const optionsContainerEl = document.getElementById("options-container");

function renderChatbot() {
  const node = chatbotDatabase.nodes[currentNodeId];

  // 1. Set the question text or result text
  questionTextEl.textContent = node.text;

  // 2. Clear old buttons
  optionsContainerEl.innerHTML = "";

  if (node.type === "result") {
    // Display the purchase link
    const linkEl = document.createElement("a");
    linkEl.href = node.productLink;
    linkEl.textContent = "Buy this book";
    linkEl.className = "buy-link";
    
    // Display the restart button
    const restartBtn = document.createElement("button");
    restartBtn.textContent = "Redo the survey";
    restartBtn.className = "restart-btn";
    restartBtn.onclick = () => {
      currentNodeId = chatbotDatabase.startNode;
      renderChatbot();
    };

    optionsContainerEl.appendChild(linkEl);
    optionsContainerEl.appendChild(restartBtn);
  } 
  else if (node.type === "question") {
    // Create buttons for each option
    node.options.forEach((opt, index) => {
      const btnEl = document.createElement("button");
      btnEl.textContent = opt.label;
      
      btnEl.onclick = () => selectOption(index);
      
      optionsContainerEl.appendChild(btnEl);
    });
  }
}

function selectOption(index) {
  const node = chatbotDatabase.nodes[currentNodeId];
  const nextNodeId = node.options[index].nextId;
  
  // Update the current node ID to the next question or result
  currentNodeId = nextNodeId;
  renderChatbot();
}

// Only initialize the bot once
renderChatbot();