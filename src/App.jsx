import { useState } from 'react';
import { useChat } from './hooks/useChat';
import AppShell from './components/AppShell';
import Sidebar from './components/Sidebar';
import MainArea from './components/MainArea';

const TAB_LABELS = {
  chat: 'Chat',
  timeline: 'Timeline',
  guide: 'Voter Guide',
  faq: 'FAQ',
  about: 'About',
};

function App() {
  const { messages, chips, isTyping, stage, sendMessage, resetChat } = useChat();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  return (
    <AppShell>
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />
      <Sidebar
        stage={stage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      <MainArea
        activeTab={activeTab}
        tabLabel={TAB_LABELS[activeTab]}
        messages={messages}
        chips={chips}
        isTyping={isTyping}
        onSend={sendMessage}
        onChipClick={sendMessage}
        onNewChat={resetChat}
        onMenuClick={() => setSidebarOpen(true)}
      />
    </AppShell>
  );
}

export default App;
