import { Link } from "react-router-dom";
import { ArrowRight, Brain, Shield, Sparkles } from "lucide-react";

export function Landing() {
  return (
    <div className="min-h-screen bg-brand-bg text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <nav className="relative z-10 container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-black" />
          </div>
          <span className="text-xl font-bold">MindPulse</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-brand-text-muted">
          <a href="#" className="hover:text-white transition-colors">Features</a>
          <a href="#" className="hover:text-white transition-colors">Science</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
        </div>
        <div className="flex gap-4">
          <Link to="/overview" className="text-sm font-medium hover:text-brand-primary transition-colors py-2">Log In</Link>
          <Link to="/overview" className="bg-brand-primary hover:bg-brand-secondary text-black px-5 py-2 rounded-full text-sm font-bold transition-all">Get Started</Link>
        </div>
      </nav>

      <main className="relative z-10 container mx-auto px-6 pt-20 pb-32">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-custom-green/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
              AI-Powered Wellness Tools
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Predictive Care <br />
              for Your <span className="text-brand-primary">Mental <br />Well-being</span>
            </h1>
            
            <p className="text-xl text-brand-text-muted max-w-xl leading-relaxed">
              The first journaling platform that uses GenAI to listen, understand, and anticipate your needs before you do. Experience proactive support tailored just for you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/overview" className="bg-brand-primary hover:bg-brand-secondary text-black px-8 py-4 rounded-xl text-lg font-bold transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95">
                Start Your Journal
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="px-8 py-4 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-lg font-medium flex items-center justify-center gap-2">
                View Demo
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                  <div className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-black border-b-4 border-b-transparent ml-0.5" />
                </div>
              </button>
            </div>

            <div className="flex items-center gap-4 pt-8 opacity-70">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-8 h-8 rounded-full border-2 border-brand-bg" alt="User" />
                ))}
              </div>
              <p className="text-sm">Trusted by 10,000+ early adopters</p>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-brand-primary/20 blur-[100px] z-0" />
            <div className="relative z-10 bg-brand-card border border-white/10 rounded-3xl p-2 shadow-2xl skew-y-3 hover:skew-y-0 transition-transform duration-700">
               <div className="bg-brand-bg rounded-2xl overflow-hidden aspect-video relative">
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620641788421-7a1a2b292e1e?q=80&w=2800&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <Brain className="w-32 h-32 text-brand-primary/20 animate-pulse" />
                 </div>
                 
                 {/* Floating UI Elements Mockup */}
                 <div className="absolute bottom-6 left-6 right-6 bg-brand-card/90 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-start gap-4 shadow-xl">
                    <div className="p-2 bg-brand-primary/20 rounded-lg">
                      <Sparkles className="w-5 h-5 text-brand-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-brand-primary mb-1 uppercase">Insight Detected</p>
                      <p className="text-sm font-medium">"Your journal suggests elevated anxiety levels related to work deadlines. Would you like to try a breathing exercise?"</p>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Understanding You, <span className="text-brand-primary">Scientifically</span></h2>
            <p className="text-brand-text-muted max-w-2xl mx-auto">
              Our platform combines cutting-edge generative AI with proven psychological frameworks to provide support that actually feels human.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Brain, title: "GenAI Analysis", desc: "Our AI detects subtle emotional patterns in your writing, offering insights that a simple mood tracker would miss." },
              { icon: Shield, title: "Proactive Support", desc: "Receive personalized coping mechanisms and guided meditations the moment your stress levels begin to rise." },
              { icon: Shield, title: "Privacy by Design", desc: "Your thoughts are encrypted end-to-end. We use a zero-knowledge architecture so only you hold the keys to your mind." }
            ].map((feature, i) => (
              <div key={i} className="bg-brand-card/50 p-8 rounded-2xl border border-white/5 hover:border-brand-primary/30 transition-colors group">
                <div className="w-12 h-12 bg-green-900/30 rounded-xl flex items-center justify-center mb-6 text-brand-primary group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-brand-text-muted leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Highlight Section */}
        <div className="mt-32 flex flex-col md:flex-row items-center gap-16">
             <div className="md:w-1/2">
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2600&auto=format&fit=crop" alt="Journaling" className="w-full" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent" />
                </div>
             </div>
             <div className="md:w-1/2 space-y-6">
                <h2 className="text-4xl font-bold">More than just a diary. <br/> It's your <span className="text-brand-primary">digital therapist</span>.</h2>
                <div className="space-y-4">
                    {[
                        { title: "Smart Prompts", desc: "Get unstuck with AI-generated prompts based on your recent entries and mood trends." },
                        { title: "Mood Forecasting", desc: "Our algorithms predict potential burnouts before they happen, alerting you to take a break." },
                        { title: "Voice Journaling", desc: "Speak your mind freely. We transcribe and analyze your tone for deeper emotional insights." }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="mt-1 w-6 h-6 rounded-full bg-brand-primary/20 flex items-center justify-center shrink-0">
                                <span className="w-2 h-2 rounded-full bg-brand-primary" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">{item.title}</h4>
                                <p className="text-brand-text-muted text-sm">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 text-center pb-20">
             <div className="bg-gradient-to-br from-brand-card to-brand-primary/10 rounded-3xl p-12 md:p-20 border border-white/5 relative overflow-hidden">
                <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                    <h2 className="text-4xl md:text-5xl font-bold">Ready to reclaim your <span className="text-brand-primary">peace of mind</span>?</h2>
                    <p className="text-xl text-brand-text-muted">Join thousands of users who are discovering a better way to manage their mental health with MindPulse.</p>
                    <button className="bg-brand-primary hover:bg-brand-secondary text-black px-10 py-4 rounded-xl text-lg font-bold transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                        Start Your Free Trial
                    </button>
                    <p className="text-xs text-brand-text-muted">No credit card required for 14-day trial.</p>
                </div>
             </div>
        </div>

      </main>

      <footer className="border-t border-white/5 py-12 bg-black/20">
          <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
              <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-brand-primary" />
                    <span className="text-lg font-bold">MindPulse</span>
                  </div>
                  <p className="text-sm text-brand-text-muted">Empowering mental wellness through artificial intelligence and secure journaling.</p>
              </div>
              <div>
                  <h4 className="font-bold mb-4">Platform</h4>
                  <ul className="space-y-2 text-sm text-brand-text-muted">
                      <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                  </ul>
              </div>
               <div>
                  <h4 className="font-bold mb-4">Company</h4>
                  <ul className="space-y-2 text-sm text-brand-text-muted">
                      <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  </ul>
              </div>
               <div>
                  <h4 className="font-bold mb-4">Legal</h4>
                  <ul className="space-y-2 text-sm text-brand-text-muted">
                      <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                  </ul>
              </div>
          </div>
          <div className="container mx-auto px-6 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-brand-text-muted">
              <p>&copy; 2023 MindPulse Wellness Inc. All rights reserved.</p>
              <div className="flex gap-4 mt-4 md:mt-0">
                  <a href="#" className="hover:text-white transition-colors"><TwitterIcon className="w-4 h-4" /></a>
                  <a href="#" className="hover:text-white transition-colors"><GithubIcon className="w-4 h-4" /></a>
              </div>
          </div>
      </footer>
    </div>
  );
}

function TwitterIcon({ className }: { className?: string }) {
    return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>;
}

function GithubIcon({ className }: { className?: string }) {
    return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
}
