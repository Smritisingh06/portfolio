import React, { useState, useEffect, useRef } from 'react';
import chatbotData from '../data/chatbot-data.json';
import portfolioData from '../data/portfolio-data.json';

const initialMessage = {
  text: "👋 Hi! How may I help you today?",
  chips: [
    "Tell me about yourself 👩‍💻",
    "What can you do? 🤔",
    "Show me your work 🎨"
  ]
};

const conversationFlow = {
  "Tell me about yourself 👩‍💻": {
    response: "I'm Smriti Singh, a passionate frontend developer! Would you like to know more about my:",
    chips: [
      "Skills & Expertise 💻",
      "Work Experience 💼",
      "Education 📚"
    ]
  },
  "Skills & Expertise 💻": {
    response: "I specialize in:\n• React.js & JavaScript\n• Responsive Web Development\n\nWould you like to see some examples?",
    chips: [
      "Show me projects 🚀",
      "Technical skills 🔧",
      "Something else 🤔"
    ]
  },
  "Work Experience 💼": {
    response: "I'm currently working at Mobiloitte as a Frontend Developer. I've also been a Teaching Assistant at Coding Ninjas!\n\nWould you like to know more about:",
    chips: [
      "Current role 💼",
      "Past projects 📂",
      "Skills used 🛠️"
    ]
  },
  "What can you do? 🤔": {
    response: "I can help you learn more about Smriti! Here's what you can ask me about:",
    chips: [
      "Professional work 💼",
      "Technical skills 💻",
      "Contact info 📬"
    ]
  },
  "Show me your work 🎨": {
    response: "I'd love to show you my projects! Which type interests you most?",
    chips: [
      "Web Applications 🌐",

      "Full Stack Apps 📱"
    ]
  },
  "Web Applications 🌐": {
    response: "Here are some of my web projects:\n\n1. Nesba - Investment Platform\n2. PG Life - Property Finder\n3. Arago-Travels\n\nWhich one would you like to know more about?",
    chips: [
      "Nesba details 📊",
      "PG Life details 🏠",
      "Arago-Travels ✈️"
    ]
  },
  "Contact info 📬": {
    response: "You can reach me through:\n\n📧 Email: smritisingh@example.com\n🔗 LinkedIn: /smriti-singh\n💼 GitHub: /Smritisingh06\n\nWould you like to:",
    chips: [
      "Connect on LinkedIn 🔗",
      "See my GitHub 💻",
      "Send an email 📧"
    ]
  },
  "Something else 🤔": {
    response: "Sure! What would you like to know?",
    chips: [
      "Contact info 📬",
      "View projects 🎨",
      "Technical skills 💻"
    ]
  }
};

const PortfolioChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [currentChips, setCurrentChips] = useState(chatbotData.initialMessage.chips);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      handleBotResponse(initialMessage.text, initialMessage.chips);
    }
  }, [isOpen]);

  const formatResponse = (type, query) => {
    switch(type) {
      case 'about':
        return `${portfolioData.personalInfo.bio}\n\nI'm currently working as a ${portfolioData.experience.current.title} at ${portfolioData.experience.current.company}.`;
      
      case 'skills':
        const frontendSkills = portfolioData.skills.frontend.map(skill => `• ${skill.name} (${skill.level})`).join('\n');
        return `Here are my key frontend skills:\n${frontendSkills}\n\nWould you like to know more about my backend skills or see my projects?`;
      
      case 'experience':
        const current = portfolioData.experience.current;
        const responsibilities = current.responsibilities.map(r => `• ${r}`).join('\n');
        return `Currently: ${current.title} at ${current.company} (${current.duration})\n\nKey responsibilities:\n${responsibilities}`;
      
      case 'projects':
        const projects = portfolioData.projects.featured.map(project => 
          `• ${project.name} - ${project.type}\n  ${project.description}`
        ).join('\n\n');
        return `Here are some of my featured projects:\n\n${projects}`;
      
      case 'education':
        const edu = portfolioData.education;
        return `${edu.degree} from ${edu.university} (${edu.duration})\n\nAchievements:\n${edu.achievements.map(a => `• ${a}`).join('\n')}`;
      
      case 'contact':
        const { email, socialLinks } = portfolioData.personalInfo;
        return `You can reach me at:\n\n📧 Email: ${email}\n🔗 LinkedIn: ${socialLinks.linkedin}\n💼 GitHub: ${socialLinks.github}`;
      
      default:
        return chatbotData.conversationFlow[query]?.response || 
               "I'm not sure about that. Would you like to know about my skills, projects, or experience?";
    }
  };

  const handleSpecificQuery = (query) => {
    let response = "";
    let newChips = [];

    // Project specific responses
    if (query.includes("Nesba")) {
      const project = portfolioData.projects.featured.find(p => p.name === "Nesba");
      response = `${project.name} - ${project.type}\n\n${project.description}\n\nKey Features:\n${project.features.map(f => `• ${f}`).join('\n')}\n\nTechnologies: ${project.technologies.join(', ')}`;
      newChips = ["View live site 🌐", "See code 💻", "Other projects 🔙"];
    }
    else if (query.includes("PG Life")) {
      const project = portfolioData.projects.featured.find(p => p.name === "PG Life");
      response = `${project.name} - ${project.type}\n\n${project.description}\n\nKey Features:\n${project.features.map(f => `• ${f}`).join('\n')}\n\nTechnologies: ${project.technologies.join(', ')}`;
      newChips = ["View live site 🌐", "See code 💻", "Other projects 🔙"];
    }
    else if (query.includes("Arago")) {
      const project = portfolioData.projects.featured.find(p => p.name === "Arago-Travels");
      response = `${project.name} - ${project.type}\n\n${project.description}\n\nKey Features:\n${project.features.map(f => `• ${f}`).join('\n')}\n\nTechnologies: ${project.technologies.join(', ')}`;
      newChips = ["View live site 🌐", "See code 💻", "Other projects 🔙"];
    }
    // Skill specific responses
    else if (query.includes("Frontend skills")) {
      const frontendSkills = portfolioData.skills.frontend.map(skill => 
        `• ${skill.name} (${skill.level}) - ${skill.experience}`
      ).join('\n');
      response = `My Frontend Skills:\n\n${frontendSkills}`;
      newChips = ["Backend skills 🔧", "See projects ⚡", "Contact me 📬"];
    }
    else if (query.includes("Backend skills")) {
      const backendSkills = portfolioData.skills.backend.map(skill => 
        `• ${skill.name} (${skill.level}) - ${skill.experience}`
      ).join('\n');
      response = `My Backend Skills:\n\n${backendSkills}`;
      newChips = ["Frontend skills 💻", "See projects ⚡", "Contact me 📬"];
    }
    // Default to chatbot data
    else {
      const flowResponse = chatbotData.conversationFlow[query];
      if (flowResponse) {
        response = flowResponse.response;
        newChips = flowResponse.chips;
      } else {
        response = formatResponse('about');
        newChips = chatbotData.initialMessage.chips;
      }
    }

    return { response, chips: newChips };
  };

  const handleChipClick = async (chip) => {
    setMessages(prev => [...prev, { from: "user", text: chip }]);
    setIsTyping(true);
    
    let responseType = 'default';
    if (chip.includes("yourself")) responseType = 'about';
    else if (chip.includes("skills")) responseType = 'skills';
    else if (chip.includes("experience")) responseType = 'experience';
    else if (chip.includes("projects")) responseType = 'projects';
    else if (chip.includes("education")) responseType = 'education';
    else if (chip.includes("contact")) responseType = 'contact';

    const { response, chips } = handleSpecificQuery(chip);
    await handleBotResponse(response || formatResponse(responseType, chip), chips);
  };

  const handleBotResponse = async (text, chips) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
    setMessages(prev => [...prev, { from: "bot", text }]);
    setCurrentChips(chips);
    setIsTyping(false);
  };

  const handleUserInput = async (userMessage) => {
    setMessages(prev => [...prev, { from: "user", text: userMessage }]);
    setInput("");
    setIsTyping(true);
    
    const { response, chips } = handleSpecificQuery(userMessage);
    await handleBotResponse(response, chips);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setMessages([]);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 1000 }}>
      {!isOpen ? (
        <button
          onClick={toggleChat}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00B4DB, #0083B0)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(0, 180, 219, 0.4)',
            color: 'white',
            fontSize: '26px',
            transition: 'all 0.3s ease',
            animation: 'pulse 2s infinite'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 180, 219, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 180, 219, 0.4)';
          }}
        >
          💬
        </button>
      ) : (
        <div style={{
          width: '380px',
          height: '500px',
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
          overflow: 'hidden',
          animation: 'slideIn 0.3s ease-out',
          border: '1px solid rgba(0, 180, 219, 0.1)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            padding: '16px',
            background: 'linear-gradient(135deg, #00B4DB, #0083B0)',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '22px' }}>🤖</span>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '15px' }}>Portfolio Assistant</div>
                <div style={{ fontSize: '12px', opacity: 0.9 }}>Always here to help</div>
              </div>
            </div>
            <button
              onClick={toggleChat}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.transform = 'rotate(90deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.transform = 'rotate(0deg)';
              }}
            >
              ×
            </button>
          </div>

          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            background: '#f8fafc'
          }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.from === "user" ? 'flex-end' : 'flex-start',
                  maxWidth: '75%',
                  animation: 'fadeIn 0.3s ease-out'
                }}
              >
                <div style={{
                  padding: '12px 16px',
                  borderRadius: msg.from === "user" ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: msg.from === "user" 
                    ? 'linear-gradient(135deg, #00B4DB, #0083B0)' 
                    : 'white',
                  color: msg.from === "user" ? 'white' : '#1a1a1a',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  border: msg.from === "bot" ? '1px solid rgba(0, 0, 0, 0.05)' : 'none',
                  whiteSpace: 'pre-wrap'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={{
                alignSelf: 'flex-start',
                background: 'white',
                padding: '12px 16px',
                borderRadius: '18px',
                fontSize: '14px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                color: '#666'
              }}>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <div style={{ animation: 'bounce 0.8s infinite' }}>•</div>
                  <div style={{ animation: 'bounce 0.8s infinite', animationDelay: '0.2s' }}>•</div>
                  <div style={{ animation: 'bounce 0.8s infinite', animationDelay: '0.4s' }}>•</div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={{
            padding: '16px',
            borderTop: '1px solid rgba(0, 0, 0, 0.05)',
            background: 'white'
          }}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '12px'
            }}>
              {currentChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleChipClick(chip)}
                  style={{
                    background: 'rgba(0, 180, 219, 0.1)',
                    color: '#0083B0',
                    padding: '8px 14px',
                    borderRadius: '16px',
                    border: 'none',
                    fontSize: '13px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 180, 219, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 180, 219, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (input.trim()) handleUserInput(input);
              }}
              style={{
                display: 'flex',
                gap: '10px'
              }}
            >
              <input
                ref={inputRef}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '16px',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  outline: 'none',
                  fontSize: '14px',
                  transition: 'all 0.2s ease',
                  backgroundColor: '#f8fafc'
                }}
                placeholder="Type your question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={(e) => e.target.style.border = '1px solid #00B4DB'}
                onBlur={(e) => e.target.style.border = '1px solid rgba(0, 0, 0, 0.1)'}
              />
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #00B4DB, #0083B0)',
                  color: 'white',
                  padding: '12px 20px',
                  borderRadius: '16px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 180, 219, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Send <span style={{ fontSize: '18px' }}>→</span>
              </button>
            </form>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 4px 15px rgba(0, 180, 219, 0.4); }
            50% { transform: scale(1.05); box-shadow: 0 4px 20px rgba(0, 180, 219, 0.6); }
            100% { transform: scale(1); box-shadow: 0 4px 15px rgba(0, 180, 219, 0.4); }
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
          ::-webkit-scrollbar {
            width: 6px;
          }
          ::-webkit-scrollbar-track {
            background: transparent;
          }
          ::-webkit-scrollbar-thumb {
            background: rgba(0, 180, 219, 0.2);
            border-radius: 3px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 180, 219, 0.4);
          }
        `}
      </style>
    </div>
  );
};

export default PortfolioChatbot;