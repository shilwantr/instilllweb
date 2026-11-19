import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronLeft, ChevronRight, ArrowRight, Lightbulb, Compass, Shield, Wind, Moon, Heart, Droplets } from 'lucide-react';
import { wellnessArticles, WellnessArticle } from '../data/wellnessArticles';
import { wellnessFacts } from '../data/wellnessFacts';
import { soundEngine } from '../utils/audio';

type CategoryFilter = 'All' | 'Nervous System' | 'Sleep & Focus' | 'Emotional Health' | 'Mind-Body';

export const WellnessLibrarySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  const categories: CategoryFilter[] = ['All', 'Nervous System', 'Sleep & Focus', 'Emotional Health', 'Mind-Body'];

  const filteredArticles = selectedCategory === 'All'
    ? wellnessArticles
    : wellnessArticles.filter((art) => art.category === selectedCategory);

  const currentFact = wellnessFacts[currentFactIndex];

  const handlePrevFact = () => {
    soundEngine.playScrubTick();
    setCurrentFactIndex((prev) => (prev === 0 ? wellnessFacts.length - 1 : prev - 1));
  };

  const handleNextFact = () => {
    soundEngine.playScrubTick();
    setCurrentFactIndex((prev) => (prev === wellnessFacts.length - 1 ? 0 : prev + 1));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Nervous System':
        return <Wind className="w-3.5 h-3.5" />;
      case 'Sleep & Focus':
        return <Moon className="w-3.5 h-3.5" />;
      case 'Emotional Health':
        return <Heart className="w-3.5 h-3.5" />;
      case 'Mind-Body':
        return <Droplets className="w-3.5 h-3.5" />;
      default:
        return <Compass className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section id="learn" className="py-24 px-4 sm:px-8 relative bg-pop-cream text-slate-900 overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-pop-lime text-pop-forest border border-pop-forest/20 shadow-cartoon-sm mb-4">
            <span>📚 Mindful Library</span>
            <span>•</span>
            <span>Clinical & Wellness Guides</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-extrabold tracking-tight mb-4 text-slate-900">
            Understand Your Nervous System
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed">
            Evidence-informed guides on anxiety, sleep, burnout, attention recovery, and somatic calm—paired directly with instilll's daily tools.
          </p>
        </div>

        {/* Interactive Mindful Science • Did You Know? Strip */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative rounded-3xl bg-white/90 border-2 border-slate-900/10 p-6 sm:p-8 shadow-cartoon-sm backdrop-blur-xl transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-sm">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-slate-500">
                    Did You Know? • Mindful Science Fact
                  </h3>
                  <div className="text-sm font-bold text-slate-900">
                    {currentFact.title}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="text-xs font-mono font-bold text-slate-400 mr-2">
                  {currentFactIndex + 1} of {wellnessFacts.length}
                </span>
                <button
                  onClick={handlePrevFact}
                  data-cursor="pointer"
                  aria-label="Previous mindful science fact"
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextFact}
                  data-cursor="pointer"
                  aria-label="Next mindful science fact"
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shadow-sm"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentFact.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-3"
              >
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                  &ldquo;{currentFact.fact}&rdquo;
                </p>
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs text-slate-500 font-mono">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                    Category: {currentFact.category}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Source: {currentFact.scienceSource}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundEngine.playScrubTick();
                setSelectedCategory(cat);
              }}
              data-cursor="pointer"
              aria-label={`Filter articles by ${cat}`}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-sm ${
                selectedCategory === cat
                  ? 'bg-slate-950 text-white shadow-cartoon-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Grid of 8 Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {filteredArticles.map((article) => (
            <motion.div
              key={article.slug}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col justify-between bg-white rounded-3xl p-6 border-2 border-slate-900/10 shadow-cartoon-sm hover:shadow-cartoon transition-all group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-pop-lime/60 text-pop-forest text-[11px] font-mono font-bold">
                    {getCategoryIcon(article.category)}
                    <span>{article.category}</span>
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug mb-2 group-hover:text-pop-forest transition-colors">
                  <a href={`/learn/${article.slug}`} className="hover:underline">
                    {article.title}
                  </a>
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                  {article.lead}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-500 bg-slate-50 px-2.5 py-1 rounded-xl">
                  <span className="text-pop-forest font-bold">Tool:</span>
                  <span className="truncate">{article.featureCta.badge}</span>
                </div>

                <a
                  href={`/learn/${article.slug}`}
                  data-cursor="pointer"
                  onClick={() => soundEngine.playScrubTick()}
                  className="inline-flex items-center justify-between text-xs font-bold font-mono text-pop-forest hover:text-emerald-800 transition-colors group/link pt-1"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA to Full Library */}
        <div className="text-center">
          <a
            href="/learn"
            data-cursor="pointer"
            onClick={() => soundEngine.playBreatheBell()}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-slate-950 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-cartoon hover:bg-slate-800 transition-all transform hover:-translate-y-0.5"
          >
            <BookOpen className="w-4 h-4 text-pop-lime" />
            <span>Explore All Wellness & Clinical Guides</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
