// import React, { useState, useEffect, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// // Simulated API functions (in real app, these would connect to your backend)
// // const API = {
// //   async login(email, password) {
// //     // Simulate API call
// //     await new Promise(resolve => setTimeout(resolve, 1000));
// //     if (email === 'demo@example.com' && password === 'password') {
// //       return {
// //         token: 'fake-jwt-token',
// //         user: { name: 'Demo User', email: email }
// //       };
// //     }
// //     throw new Error('Invalid credentials');
// //   },
  
// //   async register(name, email, password) {
// //     // Simulate API call
// //     await new Promise(resolve => setTimeout(resolve, 1000));
// //     return {
// //       token: 'fake-jwt-token',
// //       user: { name, email }
// //     };
// //   },
  
// //   async uploadAndSummarize(file, text, length) {
// //     // Simulate processing
// //     await new Promise(resolve => setTimeout(resolve, 2000));
    
// //     // const sampleText = text || This is a sample document content. It contains important information about various topics. The document discusses key concepts and provides detailed explanations. There are multiple sections covering different aspects of the subject matter. The content is well-structured and informative, providing valuable insights for readers.;
// //     const sampleText = text || "This is a sample document content. It contains important information about various topics. The document discusses key concepts and provides detailed explanations. There are multiple sections covering different aspects of the subject matter. The content is well-structured and informative, providing valuable insights for readers.";

// //     const summaries = {
// //       short: "This document covers key concepts with detailed explanations across multiple well-structured sections.",
// //       medium: "This document contains important information about various topics with key concepts and detailed explanations. The content is well-structured across multiple sections, providing valuable insights and covering different aspects of the subject matter for readers.",
// //       long: "This comprehensive document contains important information about various topics, discussing key concepts and providing detailed explanations throughout. The document is well-structured with multiple sections that cover different aspects of the subject matter. Each section provides valuable insights for readers, making the content both informative and accessible. The document serves as a comprehensive resource on the topics discussed."
// //     };
    
// //     return {
// //       text: sampleText,
// //       summary: summaries[length] || summaries.short,
// //       keyPoints: [
// //         "Document discusses key concepts with detailed explanations",
// //         "Content is well-structured across multiple sections",
// //         "Provides valuable insights for readers",
// //         "Covers different aspects of the subject matter",
// //         "Serves as a comprehensive informational resource"
// //       ]
// //     };
// //   }
// // };

// const API = {
//   async processFiles(files) {
//     const formData = new FormData();
//     for (const f of files) {
//       formData.append("files", f);
//     }
//     const res = await fetch("http://127.0.0.1:8000/upload/", {  // ✅ match FastAPI route
//       method: "POST",
//       body: formData
//     });
//     if (!res.ok) throw new Error("Upload failed");
//     return res.json();
//   },

//   async summarize(sessionId) {
//     const formData = new FormData();
//     formData.append("session_id", sessionId);
//     const res = await fetch(`http://127.0.0.1:8000/summary/${sessionId}`, { // ✅ GET endpoint
//       method: "GET"
//     });
//     if (!res.ok) throw new Error("Summarization failed");
//     return res.json();
    
//   },

//   async chat(sessionId, question) {
//     const formData = new FormData();
//     formData.append("session_id", sessionId);
//     formData.append("question", question);
//     const res = await fetch("http://127.0.0.1:8000/chat", {
//       method: "POST",
//       body: formData
//     });
//     return res.json();
//   },

//   async mcqs(sessionId) {
//     const formData = new FormData();
//     formData.append("session_id", sessionId);
//     const res = await fetch("http://127.0.0.1:8000/mcqs", {
//       method: "POST",
//       body: formData
//     });
//     return res.json();
//   }
// };



// // Animated Button Component
// function AnimatedButton({ text = 'Click', loading, onClick, className = '' }) {
//   return (
//     <motion.button
//       whileHover={{ scale: 1.03 }}
//       whileTap={{ scale: 0.98 }}
//       onClick={onClick}
//       disabled={loading}
//       // className={w-full flex items-center justify-center gap-3 p-3 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-md text-white font-semibold ${className}}
//       className={`w-full flex items-center justify-center gap-3 p-3 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-md text-white font-semibold ${className}`}
// >
//       {loading && (
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ repeat: Infinity, duration: 1 }}
//           className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white"
//         />
//       )}
//       <span>{loading ? 'Working...' : text}</span>
//     </motion.button>
//   );
// }

// // Login Component
// function Login({ onLogin }) {
//   const [email, setEmail] = useState('demo@example.com');
//   const [password, setPassword] = useState('password');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
    
//     try {
//       // fake login (accept anything)
//       onLogin({
//         name: "Demo User",
//         email,
//         token: "fake-jwt-token"
//       });

//     } catch (err) {
//       setError(err.message);
//     }
    
//     setLoading(false);
//   }

//   return (
//     <motion.form
//       onSubmit={handleSubmit}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10"
//     >
//       <div className="text-lg font-semibold mb-4">Login</div>
//       <input
//         required
//         value={email}
//         onChange={e => setEmail(e.target.value)}
//         placeholder="Email"
//         className="w-full p-3 rounded-md mb-3 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//       />
//       <input
//         required
//         value={password}
//         onChange={e => setPassword(e.target.value)}
//         type="password"
//         placeholder="Password"
//         className="w-full p-3 rounded-md mb-3 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//       />
//       {error && <div className="text-sm text-red-400 mb-3">{error}</div>}
//       <div className="text-xs text-white/60 mb-4">Demo: demo@example.com / password</div>
//       <AnimatedButton loading={loading} text="Login" />
//     </motion.form>
//   );
// }

// // Signup Component
// function Signup({ onSignup }) {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   async function handleSubmit(e) {
//     e.preventDefault();
//     console.log('Signup form submitted with:', name, email, password);
//     setLoading(true);
//     setError('');
    
//     try {
//       // const result = await API.register(name, email, password);
      
//       // onSignup({ ...result.user, token: result.token });
//       // fake signup (accept anything)
//       onSignup({
//         name,
//         email,
//         token: "fake-jwt-token"
//       });
//       console.log('Signup successful:', result);

//     } catch (err) {
//       console.error('Signup error:', err);
//       setError(err.message || 'Signup failed');
//     }
    
//     setLoading(false);
//   }

//   return (
//     <motion.form
//       onSubmit={handleSubmit}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10"
//     >
//       <div className="text-lg font-semibold mb-4">Sign Up</div>
//       <input
//         required
//         value={name}
//         onChange={e => setName(e.target.value)}
//         placeholder="Full name"
//         className="w-full p-3 rounded-md mb-3 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//       />
//       <input
//         required
//         value={email}
//         onChange={e => setEmail(e.target.value)}
//         placeholder="Email"
//         className="w-full p-3 rounded-md mb-3 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//       />
//       <input
//         required
//         value={password}
//         onChange={e => setPassword(e.target.value)}
//         type="password"
//         placeholder="Password"
//         className="w-full p-3 rounded-md mb-3 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//       />
//       {error && <div className="text-sm text-red-400 mb-3">{error}</div>}
//       <AnimatedButton loading={loading} text="Create Account" />
//     </motion.form>
//   );
// }

// // Upload Area Component
// function UploadArea({ onProcess, loading }) {
//   const [file, setFile] = useState(null);
//   const [extractedText, setExtractedText] = useState('');
//   const [length, setLength] = useState('short');
//   const [isDragActive, setIsDragActive] = useState(false);
//   const [ocrProgress, setOcrProgress] = useState(0);

  

//   const handleDrop = useCallback((e) => {
//     e.preventDefault();
//     setIsDragActive(false);
//     const files = e.dataTransfer?.files || e.target.files;
//     if (files?.[0]) {
//       const f = files[0];
//       setFile(f);
//       setExtractedText('');
      
//       // Simulate OCR for images
//       if (f.type.startsWith('image/')) {
//         setOcrProgress(0);
//         const interval = setInterval(() => {
//           setOcrProgress(prev => {
//             if (prev >= 100) {
//               clearInterval(interval);
//               setExtractedText('Sample extracted text from the uploaded image. This would be the actual OCR result from Tesseract.js in the real application.');
//               return 100;
//             }
//             return prev + 20;
//           });
//         }, 200);
//       }
//     }
//   }, []);

//   const handleDragOver = useCallback((e) => {
//     e.preventDefault();
//     setIsDragActive(true);
//   }, []);

//   const handleDragLeave = useCallback((e) => {
//     e.preventDefault();
//     setIsDragActive(false);
//   }, []);

//   function handleSubmit() {
//     if (!file) return alert('Please upload a file');
//     onProcess({ file, extractedText, length });
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -20 }}
//       animate={{ opacity: 1, x: 0 }}
//       className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
//     >
//       <div
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onClick={() => document.getElementById('file-input')?.click()}
//         className={`p-8 rounded-xl border-2 border-dashed transition-all cursor-pointer ${
//           isDragActive ? 'border-white bg-white/5' : 'border-white/20 hover:border-white/40'
//         }`}
//       >
//         <input
//           id="file-input"
//           type="file"
//           onChange={handleDrop}
//           accept=".pdf,image/*"
//           className="hidden"
//         />
//         <div className="text-center">
//           <motion.div
//             animate={{ y: isDragActive ? -5 : 0 }}
//             className="text-6xl mb-4"
//           >
//             📄
//           </motion.div>
//           <div className="text-xl font-semibold mb-2">
//             {isDragActive ? 'Drop it here!' : 'Drag & drop PDF or Image'}
//           </div>
//           <div className="text-sm opacity-70">
//             Or click to select. OCR runs automatically for images.
//           </div>
//         </div>
//       </div>

//       <AnimatePresence>
//         {file && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             className="mt-6"
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div>
//                 <div className="font-medium">{file.name}</div>
//                 <div className="text-xs opacity-70">{(file.size / 1024).toFixed(1)} KB</div>
//               </div>
//               <select
//                 value={length}
//                 onChange={e => setLength(e.target.value)}
//                 className="bg-white/10 border border-white/20 p-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               >
//                 <option value="short">Short Summary</option>
//                 <option value="medium">Medium Summary</option>
//                 <option value="long">Long Summary</option>
//               </select>
//             </div>

//             {file.type.startsWith('image/') && ocrProgress > 0 && ocrProgress < 100 && (
//               <div className="mb-4">
//                 <div className="text-sm mb-2">OCR Progress: {ocrProgress}%</div>
//                 <div className="w-full bg-white/10 rounded-full h-2">
//                   <motion.div
//                     initial={{ width: 0 }}
//                     // animate={{ width: ${ocrProgress}% }}
//                     animate={{ width: `${ocrProgress}%` }}

//                     className="bg-gradient-to-r from-indigo-500 to-pink-500 h-2 rounded-full"
//                   />
//                 </div>
//               </div>
//             )}

//             {extractedText && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="mb-4 p-4 bg-white/10 rounded-md max-h-32 overflow-auto text-sm"
//               >
//                 <div className="font-semibold mb-2">OCR Preview</div>
//                 <div className="whitespace-pre-wrap">
//                   {extractedText.slice(0, 300)}
//                   {extractedText.length > 300 ? '...' : ''}
//                 </div>
//               </motion.div>
//             )}

//             <AnimatedButton
//               loading={loading}
//               text="Generate Summary"
//               onClick={handleSubmit}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// }

// // Summary Card Component
// function SummaryCard({ result, improvements }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: 20 }}
//       animate={{ opacity: 1, x: 0 }}
//       className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10"
//     >
//       <div className="text-xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
//         📋 Summary Results
//       </div>
      
//       <div className="mb-6">
//         <div className="text-sm font-semibold mb-2 text-white/90">Summary</div>
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-sm bg-white/5 p-4 rounded-md leading-relaxed border border-white/10"
//         >
//           {result.summary}
//         </motion.div>
//       </div>

//       <div className="mb-6">
//         <div className="text-sm font-semibold mb-3 text-white/90">🔑 Key Points</div>
//         <ul className="space-y-2">
//           {result.keyPoints.map((point, i) => (
//             <motion.li
//               key={i}
//               initial={{ opacity: 0, x: -10 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: i * 0.1 }}
//               className="text-sm flex items-start gap-2"
//             >
//               <span className="text-indigo-400 mt-1">•</span>
//               <span>{point}</span>
//             </motion.li>
//           ))}
//         </ul>
//       </div>

//       <div>
//         <div className="text-sm font-semibold mb-3 text-white/90">💡 Improvement Suggestions</div>
//         <ul className="space-y-2">
//           {improvements.map((tip, i) => (
//             <motion.li
//               key={i}
//               initial={{ opacity: 0, x: -10 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: i * 0.1 }}
//               className="text-sm flex items-start gap-2"
//             >
//               <span className="text-pink-400 mt-1">→</span>
//               <span>{tip}</span>
//             </motion.li>
//           ))}
//         </ul>
//       </div>
//     </motion.div>
//   );
// }

// // Dashboard Component
// function Dashboard({ onLogout, user }) {
//   const [summaryResult, setSummaryResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [improvements, setImprovements] = useState([]);

//   //  async function handleUpload({ file, extractedText, length }) {
//   //   setLoading(true);
//   //   setSummaryResult(null);
//   //   setImprovements([]);
    
//   //   try {
//   //     const result = await API.uploadAndSummarize(file, extractedText, length);
//   //     setSummaryResult(result);
      
//   //     // Generate improvement suggestions based on result
//   //     const tips = [];
//   //     if (result.text.length > 500) {
//   //       tips.push('Consider adding section headers to improve document structure.');
//   //     }
//   //     if (result.summary.length < 100) {
//   //       tips.push('Try a longer summary length to capture more details.');
//   //     }
//   //     if (file.type.startsWith('image/')) {
//   //       tips.push('For better OCR results, ensure high image quality and good lighting.');
//   //     }
//   //     if (tips.length === 0) {
//   //       tips.push('Great document! The content is well-structured and clear.');
//   //     }
      
//   //     setImprovements(tips);
//   //   } catch (err) {
//   //     console.error(err);
//   //     alert('Upload failed. Please try again.');
//   //   }
    
//   //   setLoading(false);
//   // }

//   // inside Dashboard component
//   const [sessionId, setSessionId] = useState(null);

//   async function handleUpload({ file, extractedText, length }) {
//     setLoading(true);
//     setSummaryResult(null);
//     setImprovements([]);

//     try {
//       const result = await API.processFiles([file]); // send file to backend
//       setSessionId(result.session_id);

//       // optionally fetch summary immediately
//       const summaryResp = await API.summarize(result.session_id);
//       setSummaryResult({ summary: summaryResp.summary });

//       // improvements logic (same as before)
//       const tips = [];
//       // use returned info if needed: result.text_length etc.
//       if (summaryResp.summary.length < 100) tips.push("Try a longer summary length to capture more details.");
//       setImprovements(tips.length ? tips : ["Great document!"]);
//     } catch (err) {
//       console.error(err);
//       alert("Upload or processing failed: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   }


//   return (
//     <div className="min-h-screen p-8">
//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="flex justify-between items-center mb-8"
//       >
//         <div>
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
//             Document Summary Assistant
//           </h1>
//           <p className="text-white/60 mt-1">Welcome back, {user.name}! 👋</p>
//         </div>
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={onLogout}
//           className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-md border border-white/20 transition-all"
//         >
//           Logout
//         </motion.button>
//       </motion.div>

//       {/* Main Content */}
//       <div className="grid lg:grid-cols-2 gap-8">
//         <UploadArea onProcess={handleUpload} loading={loading} />
        
//         <div>
//           <AnimatePresence>
//             {loading && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 className="p-8 bg-white/5 rounded-xl text-center border border-white/10"
//               >
//                 <motion.div
//                   animate={{ rotate: 360 }}
//                   transition={{ repeat: Infinity, duration: 2 }}
//                   className="w-12 h-12 mx-auto mb-4 rounded-full border-4 border-white/20 border-t-white"
//                 />
//                 <div className="text-lg font-semibold mb-2">Processing Document</div>
//                 <div className="text-sm text-white/60">Please wait while we analyze your file...</div>
//               </motion.div>
//             )}
            
//             {summaryResult && !loading && (
//               <SummaryCard result={summaryResult} improvements={improvements} />
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Main App Component
// export default function App() {
//   const [user, setUser] = useState(null);
//   const [showAuth, setShowAuth] = useState(true);

//   useEffect(() => {
//     // Don't check localStorage in demo - start with clean state
//     setShowAuth(!user);
//   }, [user]);

//   function handleLogin(userData) {
//     setUser(userData);
//     setShowAuth(false);
//     localStorage.setItem('dsa_user', JSON.stringify(userData));
//     localStorage.setItem('dsa_token', userData.token);
//   }

//   function handleSignup(userData) {
//     setUser(userData);
//     setShowAuth(false);
//     localStorage.setItem('dsa_user', JSON.stringify(userData));
//     localStorage.setItem('dsa_token', userData.token);
//   }

//   function handleLogout() {
//     setUser(null);
//     setShowAuth(true);
//     localStorage.removeItem('dsa_user');
//     localStorage.removeItem('dsa_token');
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
//       <AnimatePresence mode="wait">
//         {showAuth ? (
//           <motion.div
//             key="auth"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="flex items-center justify-center min-h-screen px-4"
//           >
//             <div className="w-full max-w-6xl bg-black/20 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/10">
//               <div className="grid lg:grid-cols-2 gap-8">
//                 <div className="space-y-6">
//                   <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="text-center lg:text-left"
//                   >
//                     <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-indigo-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
//                       Document Summary Assistant
//                     </h1>
//                     <p className="text-white/70 mb-8 leading-relaxed">
//                       Upload PDFs or scanned images and get intelligent summaries with key insights. 
//                       Our advanced OCR and AI-powered analysis helps you understand documents faster than ever.
//                     </p>
//                   </motion.div>
                  
//                   <div className="space-y-6">
//                     <Login onLogin={handleLogin} />
//                     <div className="text-center text-white/50">or</div>
//                     <Signup onSignup={handleSignup} />
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-center">
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: 0.2 }}
//                     className="w-80 h-80 rounded-3xl bg-gradient-to-tr from-white/10 to-white/5 flex items-center justify-center border border-white/10"
//                   >
//                     <div className="text-center px-6">
//                       <motion.div
//                         animate={{ 
//                           scale: [1, 1.1, 1],
//                           rotate: [0, 5, -5, 0]
//                         }}
//                         transition={{
//                           duration: 4,
//                           repeat: Infinity,
//                           repeatType: "reverse"
//                         }}
//                         className="text-6xl mb-4"
//                       >
//                         🤖
//                       </motion.div>
//                       <div className="text-xl font-bold mb-3">AI-Powered Analysis</div>
//                       <p className="text-sm text-white/60 leading-relaxed">
//                         Advanced OCR, smart summarization, drag & drop interface, 
//                         and beautiful animations for the best user experience.
//                       </p>
//                     </div>
//                   </motion.div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         ) : (
//           <motion.div
//             key="dashboard"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <Dashboard onLogout={handleLogout} user={user} />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ====== API (frontend) - only upload + summarize ====== */
const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

const API = {
  async upload(file) {
    const formData = new FormData();
    formData.append("file", file); // <-- IMPORTANT: backend expects field name "file"
    const res = await fetch(`${API_BASE}/upload/`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(txt || "Upload failed");
    }
    return res.json(); // { session_id: "...", message: "..." }
  },

  async summarize(sessionId) {
    const res = await fetch(`${API_BASE}/summary/${sessionId}`, {
      method: "GET",
    });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(txt || "Summarization failed");
    }
    return res.json(); // { summary: "..." }
  },
};

/* ====== Animated Button Component ====== */
function AnimatedButton({ text = "Click", loading, onClick, className = "" }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={loading}
      className={`w-full flex items-center justify-center gap-3 p-3 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-md text-white font-semibold ${className}`}
    >
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white"
        />
      )}
      <span>{loading ? "Working..." : text}</span>
    </motion.button>
  );
}

/* ====== Login (fake) ====== */
function Login({ onLogin }) {
  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    // fake login - always success
    onLogin({ name: "Demo User", email, token: "fake-jwt-token" });
    setLoading(false);
  }

  return (
    <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
      <div className="text-lg font-semibold mb-4">Login</div>
      <input required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-3 rounded-md mb-3 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      <input required value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-3 rounded-md mb-3 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      <div className="text-xs text-white/60 mb-4">Demo: any email / any password</div>
      <AnimatedButton loading={loading} text="Login" />
    </motion.form>
  );
}

/* ====== Signup (fake) ====== */
function Signup({ onSignup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    // fake signup - always success
    onSignup({ name: name || "Demo User", email: email || "demo@example.com", token: "fake-jwt-token" });
    setLoading(false);
  }

  return (
    <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
      <div className="text-lg font-semibold mb-4">Sign Up</div>
      <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full p-3 rounded-md mb-3 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      <input required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-3 rounded-md mb-3 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      <input required value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-3 rounded-md mb-3 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      <AnimatedButton loading={loading} text="Create Account" />
    </motion.form>
  );
}

/* ====== UploadArea (unchanged, sends file object to onProcess) ====== */
function UploadArea({ onProcess, loading }) {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [length, setLength] = useState("short");
  const [isDragActive, setIsDragActive] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(0);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(false);
    const files = e.dataTransfer?.files || e.target.files;
    if (files?.[0]) {
      const f = files[0];
      setFile(f);
      setExtractedText("");

      // Simulate OCR for images
      if (f.type.startsWith("image/")) {
        setOcrProgress(0);
        const interval = setInterval(() => {
          setOcrProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              setExtractedText("Sample extracted text from the uploaded image. This would be the actual OCR result from Tesseract.js in the real application.");
              return 100;
            }
            return prev + 20;
          });
        }, 200);
      }
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  function handleSubmit() {
    if (!file) return alert("Please upload a file");
    onProcess({ file, extractedText, length });
  }

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
      <div onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onClick={() => document.getElementById("file-input")?.click()} className={`p-8 rounded-xl border-2 border-dashed transition-all cursor-pointer ${isDragActive ? "border-white bg-white/5" : "border-white/20 hover:border-white/40"}`}>
        <input id="file-input" type="file" onChange={handleDrop} accept=".pdf,image/*" className="hidden" />
        <div className="text-center">
          <motion.div animate={{ y: isDragActive ? -5 : 0 }} className="text-6xl mb-4">
            📄
          </motion.div>
          <div className="text-xl font-semibold mb-2">{isDragActive ? "Drop it here!" : "Drag & drop PDF or Image"}</div>
          <div className="text-sm opacity-70">Or click to select. OCR runs automatically for images.</div>
        </div>
      </div>

      <AnimatePresence>
        {file && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-medium">{file.name}</div>
                <div className="text-xs opacity-70">{(file.size / 1024).toFixed(1)} KB</div>
              </div>
              <select value={length} onChange={(e) => setLength(e.target.value)} className="bg-white/10 border border-white/20 p-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="short">Short Summary</option>
                <option value="medium">Medium Summary</option>
                <option value="long">Long Summary</option>
              </select>
            </div>

            {file.type.startsWith("image/") && ocrProgress > 0 && ocrProgress < 100 && (
              <div className="mb-4">
                <div className="text-sm mb-2">OCR Progress: {ocrProgress}%</div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${ocrProgress}%` }} className="bg-gradient-to-r from-indigo-500 to-pink-500 h-2 rounded-full" />
                </div>
              </div>
            )}

            {extractedText && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 p-4 bg-white/10 rounded-md max-h-32 overflow-auto text-sm">
                <div className="font-semibold mb-2">OCR Preview</div>
                <div className="whitespace-pre-wrap">{extractedText.slice(0, 300)}{extractedText.length > 300 ? "..." : ""}</div>
              </motion.div>
            )}

            <AnimatedButton loading={loading} text="Generate Summary" onClick={handleSubmit} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ====== Summary Card (only summary displayed) ====== */
function SummaryCard({ result }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
      <div className="text-xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">📋 Summary Results</div>
      <div className="text-sm bg-white/5 p-4 rounded-md leading-relaxed border border-white/10">{result.summary}</div>
    </motion.div>
  );
}

/* ====== Dashboard (upload -> summary) ====== */
function Dashboard({ onLogout, user }) {
  const [summaryResult, setSummaryResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  async function handleUpload({ file /*, extractedText, length */ }) {
    setLoading(true);
    setSummaryResult(null);

    try {
      const result = await API.upload(file); // returns {session_id}
      setSessionId(result.session_id);

      // fetch summary
      const summaryResp = await API.summarize(result.session_id);
      setSummaryResult({ summary: summaryResp.summary });
    } catch (err) {
      console.error(err);
      alert("Upload or processing failed: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen p-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">Document Summary Assistant</h1>
          <p className="text-white/60 mt-1">Welcome back, {user.name}! 👋</p>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onLogout} className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-md border border-white/20 transition-all">Logout</motion.button>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        <UploadArea onProcess={handleUpload} loading={loading} />

        <div>
          <AnimatePresence>
            {loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8 bg-white/5 rounded-xl text-center border border-white/10">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2 }} className="w-12 h-12 mx-auto mb-4 rounded-full border-4 border-white/20 border-t-white" />
                <div className="text-lg font-semibold mb-2">Processing Document</div>
                <div className="text-sm text-white/60">Please wait while we summarize your file...</div>
              </motion.div>
            )}

            {summaryResult && !loading && <SummaryCard result={summaryResult} />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ====== Main App (keeps fake auth) ====== */
export default function App() {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(true);

  useEffect(() => {
    setShowAuth(!user);
  }, [user]);

  function handleLogin(userData) {
    setUser(userData);
    setShowAuth(false);
    localStorage.setItem("dsa_user", JSON.stringify(userData));
    localStorage.setItem("dsa_token", userData.token);
  }

  function handleSignup(userData) {
    setUser(userData);
    setShowAuth(false);
    localStorage.setItem("dsa_user", JSON.stringify(userData));
    localStorage.setItem("dsa_token", userData.token);
  }

  function handleLogout() {
    setUser(null);
    setShowAuth(true);
    localStorage.removeItem("dsa_user");
    localStorage.removeItem("dsa_token");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <AnimatePresence mode="wait">
        {showAuth ? (
          <motion.div key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-6xl bg-black/20 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/10">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center lg:text-left">
                    <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-indigo-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">Document Summary Assistant</h1>
                    <p className="text-white/70 mb-8 leading-relaxed">Upload PDFs or scanned images and get intelligent summaries with key insights.</p>
                  </motion.div>

                  <div className="space-y-6">
                    <Login onLogin={handleLogin} />
                    <div className="text-center text-white/50">or</div>
                    <Signup onSignup={handleSignup} />
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="w-80 h-80 rounded-3xl bg-gradient-to-tr from-white/10 to-white/5 flex items-center justify-center border border-white/10">
                    <div className="text-center px-6">
                      <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }} className="text-6xl mb-4">🤖</motion.div>
                      <div className="text-xl font-bold mb-3">AI-Powered Analysis</div>
                      <p className="text-sm text-white/60 leading-relaxed">Advanced OCR, smart summarization and a drag & drop interface.</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Dashboard onLogout={handleLogout} user={user} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
