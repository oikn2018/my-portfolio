import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, MessageSquare, User, Mail, Linkedin, Github, Rss, Newspaper, Sun, Moon, FileText, ArrowRight } from 'lucide-react';

// --- YOUR DATA ---
// In a real project, you would move this object into its own file (e.g., src/data.json) and import it.
const portfolioData = {
  personalInfo: {
    name: "Oikantik Nath",
    titles: ["hello_world()", "phd_researcher_by_day()", "bookworm_by_night()", "tech_whisperer()"],
    imageUrl: "https://i.imgur.com/yna2stt.png",
    advisor: {
        name: "Mitesh M. Khapra",
        url: "https://www.cse.iitm.ac.in/~miteshk/"
    },
    email: "oikantik@cse.iitm.ac.in",
    linkedin: "https://www.linkedin.com/in/oikantiknath/",
    github: "https://github.com/oikn2018",
    googleScholar: "https://scholar.google.com/citations?user=Lfa-m6MAAAAJ&hl=en",
    tags: ["#multimodality", "#document-processing", "#OCR", "#LLMs"],
    cvUrl: "https://oikantik-resume.tiiny.site" // Replace with a link to your CV PDF
  },
  publications: [
    { year: "2025", title: "Can Vision-Language Models Evaluate Handwritten Math?", authors: "Oikantik Nath, Hanani Bathina, Mohammed Safi Ur Rahman Khan, Mitesh M. Khapra", journal: "Association for Computational Linguistics (ACL)", url: "#" },
    { year: "2025", title: "IndicDLP: A Foundational Dataset for Multi-Lingual and Multi-Domain Document Layout Parsing", authors: "Oikantik Nath, Sahithi Kukkala, Mitesh Khapra, Ravi Kiran Sarvadevabhatla", journal: "International Conference on Document Analysis and Recognition (ICDAR)", url: "#" }
  ],
  blogPosts: [
    { date: "July 01, 2025", title: "So empty :(", excerpt: "I am working on putting in blogs and discussions related to my research", url: "#" },
  ],
  newsItems: [
    { date: "May 16, 2025", title: "Our paper 'FERMAT' has been accepted to ACL 2025.", excerpt: "Looking forward to presenting our latest work and connecting with fellow researchers in Vienna.", url: "#" },
    { date: "June 7, 2025", title: "Our paper 'IndicDLP' has been accepted to ICDAR 2025.", excerpt: "Thrilled to announce that our paper on Document Layout Parsing has been accepted to the 19th International Conference on Document Analysis and Recognition.", url: "#" },
    { date: "July 8, 2024", title: "Started my PhD Journey at IIT Madras", excerpt: "Excited to officially begin my doctoral research in the Department of Computer Science & Engineering.", url: "#" }
  ]
};


// --- Helper Components ---
const Typewriter = ({ titles }) => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    useEffect(() => {
        if (subIndex === titles[index].length + 1 && !isDeleting) { setTimeout(() => setIsDeleting(true), 2000); return; }
        if (subIndex === 0 && isDeleting) { setIsDeleting(false); setIndex((prev) => (prev + 1) % titles.length); return; }
        const timeout = setTimeout(() => { setSubIndex((prev) => prev + (isDeleting ? -1 : 1)); setText(titles[index].substring(0, subIndex)); }, isDeleting ? 75 : 150);
        return () => clearTimeout(timeout);
    }, [subIndex, index, isDeleting, titles]);
    return (<p className="text-lg text-accent font-mono mt-2 h-6">{text}<span className="animate-blink">|</span></p>);
};

const SquircleBackground = () => (
    <div className="absolute inset-0 w-full h-full">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs><linearGradient id="squircleGradient" gradientTransform="rotate(90)"><stop offset="0%" stopColor="#00aaff" /><stop offset="100%" stopColor="#00aaff" /></linearGradient></defs>
            <path fill="url(#squircleGradient)" d="M 50,0 C 10,0 0,10 0,50 L 0,150 C 0,190 10,200 50,200 L 150,200 C 190,200 200,190 200,150 L 200,50 C 200,10 190,0 150,0 Z"></path>
        </svg>
    </div>
);

// --- Main Page Sections ---
const About = ({ info, news, onSwitchTab }) => (
  <div className="animate-fade-in">
    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
      {/* Final Image Container with precise CSS mask */}
      <div className="relative w-64 h-64 lg:w-72 lg:h-72 flex-shrink-0">
        {/* Layer 1: The squircle sits in the background */}
        <div className="absolute inset-x-0 bottom-0 h-5/6">
          <SquircleBackground />
        </div>
        
        {/* Layer 2: A container for the image that will be masked */}
        <div className="image-pop-out-mask absolute inset-0">
            <img 
              src={info.imageUrl} 
              alt={info.name} 
              className="absolute bottom-[0.07%] left-[58.3%] -translate-x-[55.5%] w-[90%] max-w-none h-auto drop-shadow-2xl" 
              onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/500x550/transparent/ffffff?text=Your+Photo+Here'; }} 
            />
        </div>
      </div>
      <div className="flex-grow text-center lg:text-left mt-8 lg:mt-0">
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tighter">{info.name}</h1>
        <Typewriter titles={info.titles} />
        <p className="text-gray-600 dark:text-gray-300 mt-6 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            I am a PhD student in the Department of Computer Science & Engineering at IIT Madras, advised by Prof. <a href={info.advisor.url} target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">{info.advisor.name}</a>. My research lies at the intersection of Vision and Language Technologies, with a specific focus on Intelligent Document Processing and OCR.
            <br/><br/>
            Before starting my PhD, I completed my MS (by Research) from the same department under Prof. Khapra's guidance. I hold a B.Tech degree from IEM Kolkata.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start">
            {info.tags.map(tag => (
                <div key={tag} className="group relative rounded-full text-xs font-medium transition-all duration-300 hover:-translate-y-0.5">
                    <div className="relative bg-white/60 dark:bg-neutral-900/60 group-hover:bg-white/40 dark:group-hover:bg-neutral-900/40 backdrop-blur-sm px-4 py-2 rounded-full text-gray-600 dark:text-gray-300 transition-colors duration-300">{tag}</div>
                </div>
            ))}
        </div>
        <div className="mt-8 flex justify-center lg:justify-start items-center gap-6">
            <a href={`mailto:${info.email}`} title="Email" className="text-gray-500 dark:text-gray-400 hover:text-accent transition-colors duration-300"><Mail className="w-6 h-6" /></a>
            <a href={info.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="text-gray-500 dark:text-gray-400 hover:text-accent transition-colors duration-300"><Linkedin className="w-6 h-6" /></a>
            <a href={info.github} target="_blank" rel="noopener noreferrer" title="GitHub" className="text-gray-500 dark:text-gray-400 hover:text-accent transition-colors duration-300"><Github className="w-6 h-6" /></a>
            <a href={info.googleScholar} target="_blank" rel="noopener noreferrer" title="Google Scholar" className="text-gray-500 dark:text-gray-400 hover:text-accent transition-colors duration-300"><Rss className="w-6 h-6" /></a>
            <a href={info.cvUrl} target="_blank" rel="noopener noreferrer" title="View CV" className="text-gray-500 dark:text-gray-400 hover:text-accent transition-colors duration-300"><FileText className="w-6 h-6" /></a>
        </div>
      </div>
    </div>
    <div className="mt-20">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center"><Newspaper className="w-6 h-6 mr-3 text-accent" />Recent Updates</h2>
        <div className="space-y-6">{news.slice(0, 3).map((item, index) => (<ContentCard key={index} item={item} />))}</div>
        <div className="mt-8 text-center"><button onClick={() => onSwitchTab('news')} className="group inline-flex items-center text-accent font-semibold">View All Updates<ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" /></button></div>
    </div>
  </div>
);

const ContentCard = ({ item }) => {
    const cardRef = useRef(null);
    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cardRef.current.style.setProperty('--mouse-x-card', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y-card', `${y}px`);
    };
    return (
        <div ref={cardRef} onMouseMove={handleMouseMove} className="card-spotlight group relative rounded-lg transition-all duration-300 hover:-translate-y-1">
            <div className="relative p-6 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md rounded-lg transition-colors duration-300">
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.date || item.year}</p>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-2">{item.title}</h3>
                {item.authors && <p className="text-gray-500 dark:text-gray-400 mt-2 italic">{item.authors}</p>}
                {item.journal && <p className="text-gray-600 dark:text-gray-300 mt-3">{item.journal}</p>}
                {item.excerpt && <p className="text-gray-600 dark:text-gray-300 mt-3">{item.excerpt}</p>}
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline mt-4 inline-block font-semibold">{item.authors ? 'View Publication' : 'Read More'} &rarr;</a>
            </div>
        </div>
    );
};

const Publications = ({ publications }) => (<div className="animate-fade-in"><h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center"><BookOpen className="w-7 h-7 mr-3 text-accent" />Research Publications</h2><div className="space-y-6">{publications.map((pub, index) => (<ContentCard key={index} item={pub} />))}</div></div>);
const Blog = ({ posts }) => (<div className="animate-fade-in"><h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center"><MessageSquare className="w-7 h-7 mr-3 text-accent" />Personal Blog</h2><div className="space-y-6">{posts.map((post, index) => (<ContentCard key={index} item={post} />))}</div></div>);
const News = ({ items }) => (<div className="animate-fade-in"><h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center"><Newspaper className="w-7 h-7 mr-3 text-accent" />All News & Updates</h2><div className="space-y-6">{items.map((item, index) => (<ContentCard key={index} item={item} />))}</div></div>);

// --- Main App Component ---
export default function App() {
  const [activeTab, setActiveTab] = useState('about');
  const [theme, setTheme] = useState('light'); // Default theme set to light
  const navRef = useRef(null);

  useEffect(() => { const handleMouseMove = (e) => { document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`); document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`); if (navRef.current) { const rect = navRef.current.getBoundingClientRect(); const x = e.clientX - rect.left; const y = e.clientY - rect.top; navRef.current.style.setProperty('--mouse-x-nav', `${x}px`); navRef.current.style.setProperty('--mouse-y-nav', `${y}px`); } }; window.addEventListener('mousemove', handleMouseMove); return () => window.removeEventListener('mousemove', handleMouseMove); }, []);
  useEffect(() => { if (theme === 'dark') { document.documentElement.classList.add('dark'); } else { document.documentElement.classList.remove('dark'); } }, [theme]);
  
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const handleSwitchTab = (tabId) => setActiveTab(tabId);

  const navItems = [{ id: 'about', label: 'About Me', icon: User }, { id: 'publications', label: 'Publications', icon: BookOpen }, { id: 'news', label: 'News', icon: Newspaper }, { id: 'blog', label: 'Blog', icon: MessageSquare }];
  
  const renderContent = () => { 
    switch (activeTab) { 
      case 'publications': return <Publications publications={portfolioData.publications} />; 
      case 'blog': return <Blog posts={portfolioData.blogPosts} />; 
      case 'news': return <News items={portfolioData.newsItems} />; 
      case 'about': default: return <About info={portfolioData.personalInfo} news={portfolioData.newsItems} onSwitchTab={handleSwitchTab} />; 
    } 
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" /><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&family=Roboto+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <div className="bg-gray-50 dark:bg-black min-h-screen text-gray-800 dark:text-gray-200 overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
        <style>{`
          :root {
            --accent-hue: 200;
            --accent-static-blue: hsl(var(--accent-hue), 100%, 50%);
            --mouse-x: 50%;
            --mouse-y: 50%;
            --gradient-color-1: hsl(var(--accent-hue), 100%, 50%);
            --gradient-color-2: hsl(calc(var(--accent-hue) + 60), 100%, 60%);
          }
          .text-accent { color: var(--accent-static-blue); }
          .font-mono { font-family: 'Roboto Mono', monospace; }
          
          @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
          @keyframes blink { 50% { opacity: 0; } }
          .animate-blink { animation: blink 1s step-end infinite; }

          .spotlight-bg::before { 
            content: ''; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; 
            background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), hsl(var(--accent-hue), 100%, 70%, 0.1), transparent 25%); 
            z-index: 0; pointer-events: none; transition: background 0.5s ease-out;
          }
          .dark .spotlight-bg::before { 
            background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), hsl(var(--accent-hue), 100%, 50%, 0.1), transparent 30%); 
          }
          
          nav.spotlight-nav { --mouse-x-nav: -100px; --mouse-y-nav: -100px; }
          nav.spotlight-nav::before { 
            content: ''; position: absolute; left: 0; top: 0; width: 100%; height: 100%; border-radius: 0.5rem; 
            background: radial-gradient(circle at var(--mouse-x-nav) var(--mouse-y-nav), hsl(var(--accent-hue), 100%, 50%, 0.15), transparent 20%); 
            opacity: 0; transition: opacity 0.2s, background 0.5s ease-out; pointer-events: none; 
          }
          nav.spotlight-nav:hover::before { opacity: 1; }

          .card-spotlight { --mouse-x-card: 50%; --mouse-y-card: 50%; }
          .card-spotlight > div::before {
            content: ''; position: absolute; left: 0; top: 0; width: 100%; height: 100%;
            border-radius: 0.5rem;
            background: radial-gradient(circle 200px at var(--mouse-x-card) var(--mouse-y-card), hsl(var(--accent-hue), 100%, 50%, 0.2), transparent);
            opacity: 0; transition: opacity 0.4s ease-out;
          }
          .card-spotlight:hover > div::before { opacity: 1; }

          /* Final CSS Mask for precise clipping */
          .image-pop-out-mask {
            mask-image:
              /* A squircle shape that covers the bottom 5/6 of the container */
              url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path fill="black" d="M 50,0 C 10,0 0,10 0,50 L 0,150 C 0,190 10,200 50,200 L 150,200 C 190,200 200,190 200,150 L 200,50 C 200,10 190,0 150,0 Z"></path></svg>'),
              /* A rectangular shape that covers the top half, allowing the head to pop out */
              linear-gradient(to bottom, black 50%, transparent 100%);
            mask-size: 100% 83.33%, 100% 100%;
            mask-position: bottom, top;
            mask-repeat: no-repeat;
            mask-composite: add;
            -webkit-mask-image:
              url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path fill="black" d="M 50,0 C 10,0 0,10 0,50 L 0,150 C 0,190 10,200 50,200 L 150,200 C 190,200 200,190 200,150 L 200,50 C 200,10 190,0 150,0 Z"></path></svg>'),
              linear-gradient(to bottom, black 50%, transparent 100%);
            -webkit-mask-size: 100% 83.33%, 100% 100%;
            -webkit-mask-position: bottom, top;
            -webkit-mask-repeat: no-repeat;
            -webkit-mask-composite: source-over;
          }
        `}</style>
        <div className="spotlight-bg"></div>
        <div className="relative z-10 container mx-auto max-w-5xl p-4 sm:p-6 lg:p-8 pb-24 sm:pb-8">
          <header className="fixed bottom-4 left-4 right-4 z-20 sm:sticky sm:top-4 sm:left-auto sm:right-auto sm:mb-12">
            <nav ref={navRef} className="spotlight-nav bg-white/50 dark:bg-black/30 backdrop-blur-lg border border-gray-200 dark:border-neutral-800 rounded-lg p-2 flex justify-between items-center">
              <div className="flex justify-around sm:justify-start w-full sm:w-auto">
                {navItems.map((item) => (
                  <button key={item.id} onClick={() => setActiveTab(item.id)} className={`relative flex items-center justify-center p-3 sm:px-4 sm:py-2.5 rounded-md text-sm sm:text-base font-medium transition-colors duration-300 ease-in-out outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-light dark:focus-visible:ring-accent-dark ${activeTab === item.id ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>
                    {activeTab === item.id && ( <span className="absolute inset-0 bg-black/5 dark:bg-white/10 rounded-md"></span> )}
                    <item.icon className="w-6 h-6 sm:w-4 sm:h-4 sm:mr-2" />
                    <span className="relative hidden sm:inline-block">{item.label}</span>
                  </button>
                ))}
              </div>
              <button onClick={toggleTheme} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-neutral-800 transition-colors duration-300 hidden sm:block">
                <Sun className="h-5 w-5 hidden dark:block" />
                <Moon className="h-5 w-5 block dark:hidden" />
              </button>
            </nav>
          </header>
          <main>{renderContent()}</main>
          <footer className="text-center text-gray-500 dark:text-gray-500 mt-20 py-6 border-t border-gray-200 dark:border-neutral-900">
            <p>&copy; {new Date().getFullYear()} {portfolioData.personalInfo.name}. All Rights Reserved.</p>
            <p className="text-sm mt-2">Built with React & Tailwind CSS.</p>
          </footer>
        </div>
      </div>
    </>
  );
}
