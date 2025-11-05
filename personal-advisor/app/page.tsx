'use client';

import { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AdvisorCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const categories: AdvisorCategory[] = [
  { id: 'career', name: 'Career', icon: '💼', description: 'Job, career planning, professional development' },
  { id: 'finance', name: 'Finance', icon: '💰', description: 'Budgeting, investing, financial planning' },
  { id: 'health', name: 'Health', icon: '🏥', description: 'Wellness, fitness, mental health' },
  { id: 'relationships', name: 'Relationships', icon: '💕', description: 'Personal relationships, communication' },
  { id: 'education', name: 'Education', icon: '📚', description: 'Learning, skill development, courses' },
  { id: 'lifestyle', name: 'Lifestyle', icon: '🌟', description: 'Hobbies, habits, life balance' },
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const getAdvice = (userMessage: string, category: string) => {
    const adviceMap: Record<string, string[]> = {
      career: [
        "Focus on building skills that are in demand. Consider what industries are growing and align your development accordingly.",
        "Networking is crucial. Attend industry events, join professional groups, and maintain meaningful connections.",
        "Document your achievements regularly. Keep a success journal for performance reviews and interviews.",
        "Consider seeking a mentor in your field. Their guidance can accelerate your career growth significantly.",
        "Work-life balance matters. A sustainable pace will lead to better long-term career success."
      ],
      finance: [
        "Start with an emergency fund covering 3-6 months of expenses before investing aggressively.",
        "Follow the 50/30/20 rule: 50% needs, 30% wants, 20% savings and debt repayment.",
        "Diversify your investments across different asset classes to manage risk effectively.",
        "Track your expenses for at least a month to understand where your money goes.",
        "Invest in yourself first - education and skills often provide the best returns."
      ],
      health: [
        "Consistency beats intensity. Regular moderate exercise is better than sporadic intense workouts.",
        "Sleep is foundational. Aim for 7-9 hours and maintain a consistent sleep schedule.",
        "Hydration matters more than people think. Start your day with water before coffee.",
        "Mental health is as important as physical health. Consider mindfulness or meditation practices.",
        "Small daily habits compound over time. Focus on sustainable changes rather than drastic overhauls."
      ],
      relationships: [
        "Active listening is more important than having the perfect response. Show genuine interest.",
        "Set healthy boundaries. It's okay to say no and prioritize your well-being.",
        "Express appreciation regularly. Small acknowledgments strengthen relationships over time.",
        "Address conflicts early and directly rather than letting them fester.",
        "Invest time in relationships that energize you and add value to your life."
      ],
      education: [
        "Learn by doing. Apply concepts through projects rather than just consuming information.",
        "Spaced repetition is more effective than cramming. Review material at increasing intervals.",
        "Teach others what you learn. Explaining concepts solidifies your understanding.",
        "Focus on fundamentals before advanced topics. Strong foundations make everything easier.",
        "Set specific learning goals with measurable outcomes to track your progress."
      ],
      lifestyle: [
        "Build routines that support your goals. Willpower is finite, but habits are automatic.",
        "Practice gratitude daily. It shifts perspective and improves overall well-being.",
        "Limit decision fatigue by automating recurring choices (meals, outfits, etc.).",
        "Schedule downtime intentionally. Rest and recovery are productive activities.",
        "Regularly reassess your priorities. What matters most should guide your time allocation."
      ]
    };

    const categoryAdvice = adviceMap[category] || adviceMap['lifestyle'];
    const randomAdvice = categoryAdvice[Math.floor(Math.random() * categoryAdvice.length)];

    return `Based on your ${category} question, here's my advice:\n\n${randomAdvice}\n\nRemember, this is general guidance. Your specific situation may require personalized consideration. Feel free to ask follow-up questions for more specific advice!`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    const newMessages: Message[] = [
      ...messages,
      { role: 'user', content: userMessage }
    ];
    setMessages(newMessages);

    setTimeout(() => {
      const advice = getAdvice(userMessage, selectedCategory || 'lifestyle');
      setMessages([...newMessages, { role: 'assistant', content: advice }]);
      setIsLoading(false);
    }, 1000);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const category = categories.find(c => c.id === categoryId);
    if (category) {
      const greeting = `Hello! I'm your ${category.name} advisor. I'm here to help with ${category.description.toLowerCase()}. What would you like to discuss?`;
      setMessages([{ role: 'assistant', content: greeting }]);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setSelectedCategory('');
    setInput('');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            🤖 Personal Advisor Agent
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Your AI-powered guide for life decisions and personal growth
          </p>
        </header>

        {!selectedCategory ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-left"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {category.description}
                </p>
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
            <div className="bg-indigo-600 dark:bg-indigo-700 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">
                  {categories.find(c => c.id === selectedCategory)?.icon}
                </span>
                <h2 className="text-xl font-semibold text-white">
                  {categories.find(c => c.id === selectedCategory)?.name} Advisor
                </h2>
              </div>
              <button
                onClick={resetChat}
                className="text-white hover:text-indigo-200 transition-colors"
              >
                ← Back
              </button>
            </div>

            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="border-t dark:border-gray-700 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask for advice..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-white"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
