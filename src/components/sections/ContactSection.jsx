import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAP } from '@gsap/react';
import { SectionWrapper } from '@components/common/SectionWrapper';
import {
  Mail,
  Linkedin,
  Github,

  Send,
  Check,
  Copy,
  MessageSquare,
  ArrowUpRight,
  Clock,
  MapPin,
  AlertCircle,
} from 'lucide-react';
import { PERSONAL_INFO } from '@constants/portfolio';

gsap.registerPlugin(ScrollTrigger, useGSAP, TextPlugin);

const SOCIAL_LINKS = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'in/priya-das99',
    href: PERSONAL_INFO.socials.linkedin,
    icon: Linkedin,
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'github.com/priya-das99',
    href: PERSONAL_INFO.socials.github,
    icon: Github,
  },
  // {
  //   id: 'twitter',
  //   label: 'X (Twitter)',
  //   value: 'x.com/priya_das',
  //   href: PERSONAL_INFO.socials.twitter,
  //   icon: Twitter,
  // },
];

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'submitted' | 'error'

  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const submitBtnRef = useRef(null);
  const btnTextRef = useRef(null);

  // ============================================================================
  // GSAP ENTRANCE CHOREOGRAPHY
  // ============================================================================
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
          defaults: { ease: 'power3.out' },
        });

        // Left Column elements entrance
        tl.fromTo(
          leftColRef.current?.children || [],
          { autoAlpha: 0, x: -30 },
          { autoAlpha: 1, x: 0, duration: 0.7, stagger: 0.12 },
          0
        );

        // Right Column (Form Container) entrance
        tl.fromTo(
          rightColRef.current,
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 0.8 },
          0.15
        );

        // Form items cascade
        const formItems = rightColRef.current?.querySelectorAll('[data-form-item]') || [];
        if (formItems.length > 0) {
          tl.fromTo(
            formItems,
            { autoAlpha: 0, y: 15 },
            { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08 },
            0.35
          );
        }
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(
          [
            ...(leftColRef.current?.children || []),
            rightColRef.current,
            ...(rightColRef.current?.querySelectorAll('[data-form-item]') || []),
          ],
          { autoAlpha: 1, x: 0, y: 0 }
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  // ============================================================================
  // GSAP INPUT FOCUS / BLUR INTERACTION
  // ============================================================================
  const { contextSafe } = useGSAP({ scope: sectionRef });

  const handleInputFocus = contextSafe((e) => {
    const el = e.target;
    gsap.to(el, {
      borderColor: 'rgba(6, 182, 212, 0.8)',
      boxShadow: '0 0 24px -2px rgba(6, 182, 212, 0.25)',
      backgroundColor: 'rgba(255, 255, 255, 0.07)',
      duration: 0.3,
      ease: 'power2.out',
    });
  });

  const handleInputBlur = contextSafe((e) => {
    const el = e.target;
    gsap.to(el, {
      borderColor: 'rgba(255, 255, 255, 0.12)',
      boxShadow: '0 0 0px transparent',
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      duration: 0.3,
      ease: 'power2.out',
    });
  });

  function handleCopyEmail() {
    navigator.clipboard.writeText(PERSONAL_INFO.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === 'submitting') return;
    if (!formData.name || !formData.email || !formData.subject || !formData.message) return;

    setStatus('submitting');

    // Animate button text to "Sending..." using GSAP TextPlugin
    if (btnTextRef.current) {
      gsap.to(btnTextRef.current, {
        duration: 0.6,
        text: 'Sending...',
        ease: 'none',
      });
    }

    // Trigger GSAP button scale micro-animation
    if (submitBtnRef.current) {
      gsap.to(submitBtnRef.current, {
        scale: 0.96,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
      });
    }

    try {
      // Direct Web3Forms Submission API (Sends email directly to recipient)
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '2f573871-ca94-4ac3-ab34-ed626575313a',
          name: formData.name,
          email: formData.email,
          replyto: formData.email,
          subject: `[Portfolio Inquiry] ${formData.subject}`,
          message: formData.message,
          from_name: formData.name,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus('submitted');
        setFormData({ name: '', email: '', subject: '', message: '' });

        // Animate button text to "Message Sent ✓" using GSAP TextPlugin
        if (btnTextRef.current) {
          gsap.to(btnTextRef.current, {
            duration: 0.6,
            text: 'Message Sent ✓',
            ease: 'none',
          });
        }

        setTimeout(() => {
          setStatus('idle');
          if (btnTextRef.current) {
            gsap.to(btnTextRef.current, {
              duration: 0.6,
              text: 'Send Message',
              ease: 'none',
            });
          }
        }, 4000);
      } else {
        handleErrorState();
      }
    } catch (err) {
      handleErrorState();
    }
  }

  function handleErrorState() {
    setStatus('error');
    if (btnTextRef.current) {
      gsap.to(btnTextRef.current, {
        duration: 0.6,
        text: 'Try Again',
        ease: 'none',
      });
    }

    setTimeout(() => {
      setStatus('idle');
      if (btnTextRef.current) {
        gsap.to(btnTextRef.current, {
          duration: 0.6,
          text: 'Send Message',
          ease: 'none',
        });
      }
    }, 4000);
  }

  return (
    <SectionWrapper id="contact" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-bg overflow-hidden relative">
      {/* Background Ambient Glow Orbs */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-10 w-[500px] h-[500px] rounded-full bg-primary-blue/10 blur-[160px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-primary-purple/10 blur-[160px] pointer-events-none"
      />

      <div ref={sectionRef} className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ====================================================================
              LEFT COLUMN: Editorial Heading, Direct Contact & Social Links
              ==================================================================== */}
          <div ref={leftColRef} className="lg:col-span-5 space-y-8">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-surface-2 border border-white/10 text-cyan text-xs font-sans font-medium tracking-wide">
              <MessageSquare className="w-3.5 h-3.5 text-cyan" />
              <span>Get In Touch</span>
            </div>

            {/* Main Editorial Headline */}
            <div className="space-y-4">
              <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.15] text-content-primary">
                Let's Connect & Build <br />
                <span className="text-gradient-full">Something Amazing!</span>
              </h2>
              <p className="text-content-muted text-base sm:text-lg leading-relaxed font-sans">
                Passionate about backend development, AI agents, and building for Android !
              </p>
            </div>

            {/* Quick Contact Cards */}
            <div className="space-y-3 pt-2">
              {/* Direct Email Card */}
              <div className="group p-4 rounded-20 bg-surface-2/80 backdrop-blur-xl border border-white/10 hover:border-cyan/50 transition-all duration-200 flex items-center justify-between shadow-md">
                <a
                  href={`mailto:${PERSONAL_INFO.socials.email}`}
                  className="flex items-center space-x-3.5 flex-1 min-w-0"
                >
                  <div className="w-10 h-10 rounded-14 bg-cyan/10 border border-cyan/30 flex items-center justify-center text-cyan group-hover:scale-105 transition-transform duration-200 shrink-0">
                    <Mail className="w-5 h-5 text-cyan" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-sans text-[11px] font-semibold text-cyan/80 uppercase tracking-wider">
                      Direct Email
                    </p>
                    <p className="font-sans text-sm sm:text-base font-bold text-white group-hover:text-cyan transition-colors truncate">
                      {PERSONAL_INFO.socials.email}
                    </p>
                  </div>
                </a>

                {/* Prominent Copy Email Button */}
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  title="Copy Email Address"
                  className="px-3 py-2 rounded-12 bg-cyan/10 border border-cyan/30 text-cyan hover:bg-cyan hover:text-surface-950 active:scale-95 transition-all duration-150 ml-3 shrink-0 flex items-center space-x-1.5 text-xs font-sans font-semibold"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-status-success" />
                      <span className="text-status-success">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Response Time & Location Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-18 bg-surface-2/40 border border-white/5 flex items-center space-x-3 text-xs font-sans font-medium text-content-muted">
                  <Clock className="w-4 h-4 text-cyan shrink-0" />
                  <span>&lt; 24h Response Time</span>
                </div>
                <div className="p-3.5 rounded-18 bg-surface-2/40 border border-white/5 flex items-center space-x-3 text-xs font-sans font-medium text-content-muted">
                  <MapPin className="w-4 h-4 text-primary-purple shrink-0" />
                  <span>Remote / Available</span>
                </div>
              </div>
            </div>

            {/* Social Links Row */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <p className="font-sans text-xs font-semibold text-content-disabled uppercase tracking-wider">
                Connect Across Platforms
              </p>
              <div className="flex flex-wrap gap-2.5">
                {SOCIAL_LINKS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.id}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center space-x-2 px-3.5 py-2 rounded-14 bg-surface-2/80 border border-white/10 text-xs font-sans font-medium text-content-secondary hover:text-cyan hover:border-cyan/40 hover:bg-surface-3 transition-all"
                    >
                      <Icon className="w-3.5 h-3.5 text-cyan group-hover:scale-110 transition-transform" />
                      <span>{s.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ====================================================================
              RIGHT COLUMN: Modern Refined Contact Form Card
              ==================================================================== */}
          <div ref={rightColRef} className="lg:col-span-7">
            <div className="group relative p-[1px] rounded-32 bg-gradient-to-b from-white/15 via-white/5 to-transparent shadow-2xl">
              <div className="relative p-6 sm:p-9 lg:p-10 rounded-[31px] bg-surface/90 backdrop-blur-2xl border border-white/10 space-y-6 overflow-hidden">
                {/* Background Subtle Blueprint Grid */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.06)_0,transparent_60%)] pointer-events-none" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] pointer-events-none" />

                <div className="relative z-10 space-y-1" data-form-item>
                  <h3 className="font-heading text-xl font-bold text-content-primary">
                    Send Me a Message
                  </h3>
                  <p className="text-content-muted text-xs font-sans">
                    Fill out the details below to initiate a direct conversation.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="relative z-10 space-y-5 text-left">
                  {/* Name & Email 2-Column Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name Input */}
                    <div className="space-y-1.5" data-form-item>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-sans font-semibold text-cyan uppercase tracking-wider"
                      >
                        Name <span className="text-primary-pink">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        placeholder="Your Name"
                        className="w-full px-4 py-3.5 rounded-16 bg-white/[0.03] border border-white/12 text-white placeholder-white/30 text-sm font-sans backdrop-blur-md focus:outline-none transition-all"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="space-y-1.5" data-form-item>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-sans font-semibold text-cyan uppercase tracking-wider"
                      >
                        Email <span className="text-primary-pink">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3.5 rounded-16 bg-white/[0.03] border border-white/12 text-white placeholder-white/30 text-sm font-sans backdrop-blur-md focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div className="space-y-1.5" data-form-item>
                    <label
                      htmlFor="contact-subject"
                      className="block text-xs font-sans font-semibold text-cyan uppercase tracking-wider"
                    >
                      Subject <span className="text-primary-pink">*</span>
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      placeholder="Job Opportunity / Collaboration / Freelance Project / Just Say Hi 👋"
                      className="w-full px-4 py-3.5 rounded-16 bg-white/[0.03] border border-white/12 text-white placeholder-white/30 text-sm font-sans backdrop-blur-md focus:outline-none transition-all"
                    />
                  </div>

                  {/* Message Textarea */}
                  <div className="space-y-1.5" data-form-item>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-sans font-semibold text-cyan uppercase tracking-wider"
                    >
                      Message <span className="text-primary-pink">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      placeholder="Tell me about your project or inquiry..."
                      className="w-full px-4 py-3.5 rounded-16 bg-white/[0.03] border border-white/12 text-white placeholder-white/30 text-sm font-sans backdrop-blur-md focus:outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Actions Row */}
                  <div className="pt-2" data-form-item>
                    {/* Submit Button */}
                    <button
                      ref={submitBtnRef}
                      type="submit"
                      disabled={status === 'submitting'}
                      className="group relative w-full inline-flex items-center justify-center px-8 py-4 text-sm font-semibold font-heading text-white transition-all duration-300 rounded-18 overflow-hidden bg-gradient-to-r from-primary-blue via-primary-purple to-primary-pink shadow-glow-blue hover:shadow-glow-purple hover:scale-[1.01] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10 flex items-center space-x-3">
                        {status === 'submitted' ? (
                          <Check className="w-4 h-4 text-cyan shrink-0" />
                        ) : status === 'error' ? (
                          <AlertCircle className="w-4 h-4 text-cyan shrink-0" />
                        ) : (
                          <Send className="w-4 h-4 text-cyan group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 shrink-0" />
                        )}
                        <span ref={btnTextRef} className="text-white">
                          Send Message
                        </span>
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

export default ContactSection;

