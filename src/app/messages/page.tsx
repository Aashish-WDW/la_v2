'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { messages, properties, users } from '@/data/dummyData';
import Footer from '@/components/Footer';

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(messages[0]?.id || null);
  const [newMessage, setNewMessage] = useState('');

  const currentUser = users[0]; // Using first user as dummy data
  const chatMessages = messages.filter(
    m => m.senderId === currentUser.id || m.receiverId === currentUser.id
  );

  const getOtherUser = (message: typeof messages[0]) => {
    return message.senderId === currentUser.id
      ? users.find(u => u.id === message.receiverId)
      : users.find(u => u.id === message.senderId);
  };

  const getProperty = (propertyId: string) => {
    return properties.find(p => p.id === propertyId);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;
    // In a real app, this would send the message to the server
    setNewMessage('');
  };

  return (
    <main className="min-h-screen bg-[#f7f7fa]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="flex h-[600px]">
            {/* Chat List */}
            <div className="w-80 border-r">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">Messages</h2>
              </div>
              <div className="overflow-y-auto h-full">
                {chatMessages.map((message) => {
                  const otherUser = getOtherUser(message);
                  const property = getProperty(message.propertyId);
                  if (!otherUser || !property) return null;

                  return (
                    <button
                      key={message.id}
                      onClick={() => setSelectedChat(message.id)}
                      className={`w-full p-4 border-b hover:bg-gray-50 transition-colors ${
                        selectedChat === message.id ? 'bg-gray-50' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={otherUser.avatar}
                          alt={otherUser.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1 text-left">
                          <h3 className="font-medium">{otherUser.name}</h3>
                          <p className="text-sm text-gray-600 truncate">
                            {message.content}
                          </p>
                        </div>
                        {!message.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col">
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b">
                    {(() => {
                      const message = messages.find(m => m.id === selectedChat);
                      const otherUser = message ? getOtherUser(message) : null;
                      const property = message ? getProperty(message.propertyId) : null;
                      if (!otherUser || !property) return null;

                      return (
                        <div className="flex items-center gap-4">
                          <img
                            src={otherUser.avatar}
                            alt={otherUser.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <h3 className="font-medium">{otherUser.name}</h3>
                            <p className="text-sm text-gray-600">{property.title}</p>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages
                      .filter(m => m.id === selectedChat)
                      .map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.senderId === currentUser.id
                              ? 'justify-end'
                              : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              message.senderId === currentUser.id
                                ? 'bg-black text-white'
                                : 'bg-gray-100'
                            }`}
                          >
                            <p>{message.content}</p>
                            <p className="text-xs mt-1 opacity-70">
                              {new Date(message.createdAt).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t">
                    <div className="flex gap-4">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 p-2 border rounded-lg"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleSendMessage();
                          }
                        }}
                      />
                      <button
                        onClick={handleSendMessage}
                        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  Select a conversation to start messaging
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
} 