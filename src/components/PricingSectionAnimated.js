"use client";

import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { CheckCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useId, useRef, useState, useEffect } from "react";
import Link from "next/link";

const PricingSwitch = ({
  button1,
  button2,
  onSwitch,
  className,
  layoutId,
}) => {
  const [selected, setSelected] = useState("0");
  const uniqueId = useId();
  const switchLayoutId = layoutId || `switch-${uniqueId}`;

  const handleSwitch = (value) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div
      className={cn(
        "relative z-10 w-full flex rounded-full bg-neutral-50 border border-gray-200 p-1",
        className,
      )}
    >
      <button
        onClick={() => handleSwitch("0")}
        className={cn(
          "relative z-10 w-full sm:h-14 h-10 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors",
          selected === "0"
            ? "text-white"
            : "text-muted-foreground hover:text-primary",
        )}
      >
        {selected === "0" && (
          <motion.span
            layoutId={switchLayoutId}
            className="absolute top-0 left-0 sm:h-14 h-10 w-full rounded-full shadow-md shadow-primary/20 bg-gradient-to-r from-primary to-[#0ea5e9]"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
        <span className="relative">{button1}</span>
      </button>

      <button
        onClick={() => handleSwitch("1")}
        className={cn(
          "relative z-10 w-full sm:h-14 h-10 flex-shrink-0 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors",
          selected === "1"
            ? "text-white"
            : "text-muted-foreground hover:text-primary",
        )}
      >
        {selected === "1" && (
          <motion.span
            layoutId={switchLayoutId}
            className="absolute top-0 left-0 sm:h-14 h-10 w-full rounded-full shadow-md shadow-primary/20 bg-gradient-to-r from-primary to-[#0ea5e9]"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
        <span className="relative flex justify-center items-center gap-2">
          {button2}
        </span>
      </button>
    </div>
  );
};

export default function PricingSectionAnimated({ dict, locale }) {
  const [isYearly, setIsYearly] = useState(false);
  const pricingRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const pt = dict.pricingTable;
  
  const translations = {
      it: {
          choosePlan: "Scegli il tuo piano",
          included: "Cosa è incluso",
          billing: "Fatturazione",
          save: "Risparmi 78€ (-10%)",
          billingDesc: "Scegli la fatturazione annuale per ottimizzare l'investimento.",
          monthly: "Mensile",
          yearly: "Annuale",
          features: [
              "Hosting Web (Valore 25€ incluso)",
              "2 Interventi di manutenzione / mese",
              "Certificato SSL automatico e Sicurezza",
              "Backup periodici ridondati",
              "Aggiornamento testi e copy",
              "Ottimizzazione e sostituzione immagini",
              "Protezione Anti-Spam (Rate limiting)",
          ]
      },
      en: {
          choosePlan: "Choose your plan",
          included: "What's included",
          billing: "Billing",
          save: "Save 78€ (-10%)",
          billingDesc: "Choose yearly billing to optimize your investment.",
          monthly: "Monthly",
          yearly: "Yearly",
          features: [
              "Web Hosting (€25 value included)",
              "2 Maintenance interventions / month",
              "Automatic SSL Certificate & Security",
              "Periodic redundant backups",
              "Text and copy updates",
              "Image optimization and replacement",
              "Anti-Spam Protection (Rate limiting)",
          ]
      },
      de: {
          choosePlan: "Wählen Sie Ihren Plan",
          included: "Was enthalten ist",
          billing: "Abrechnung",
          save: "78€ sparen (-10%)",
          billingDesc: "Wählen Sie die jährliche Abrechnung, um Ihre Investition zu optimieren.",
          monthly: "Monatlich",
          yearly: "Jährlich",
          features: [
              "Webhosting (25€ Wert inklusive)",
              "2 Wartungseingriffe / Monat",
              "Automatisches SSL-Zertifikat & Sicherheit",
              "Regelmäßige redundante Backups",
              "Text- und Kopieaktualisierungen",
              "Bildoptimierung und -austausch",
              "Anti-Spam-Schutz (Rate limiting)",
          ]
      }
  };

  const t = translations[locale] || translations.it;

  const currentPrice = isYearly ? 750 : 69;

  const toggleBilling = (value) => setIsYearly(parseInt(value) === 1);

  const revealVariants = {
    visible: (i) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };
  const timelineVaraints = {
    visible: (i) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.1,
        duration: 0.4,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  return (
    <div className="px-4 pt-2 pb-8 w-full mx-auto relative bg-transparent" ref={pricingRef}>
      <div className="py-0 px-4">
        <div className="max-w-5xl mx-auto text-center relative z-10">

          {/* Secondary Services Grid */}
          <div className="grid sm:grid-cols-3 gap-6 mt-4 mb-20 w-full">
               <TimelineContent
                as="div"
                animationNum={1}
                timelineRef={pricingRef}
                customVariants={revealVariants}
                className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/50 text-center shadow-lg shadow-primary/5 hover:bg-white/80 transition-all duration-300"
               >
                 <h4 className="font-bold text-gray-900 mb-1">{pt.item1.title}</h4>
                 <span className="font-extrabold text-primary text-2xl block mb-2">{pt.item1.price}</span>
                 <p className="text-sm text-gray-600 font-medium">{pt.item1.desc}</p>
               </TimelineContent>
               
               <TimelineContent
                as="div"
                animationNum={2}
                timelineRef={pricingRef}
                customVariants={revealVariants}
                className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/50 text-center shadow-lg shadow-primary/5 hover:bg-white/80 transition-all duration-300"
               >
                 <h4 className="font-bold text-gray-900 mb-1">{pt.item4.title}</h4>
                 <span className="font-extrabold text-primary text-2xl block mb-2">{pt.item4.price}</span>
                 <p className="text-sm text-gray-600 font-medium">{pt.item4.desc}</p>
               </TimelineContent>

               <TimelineContent
                as="div"
                animationNum={3}
                timelineRef={pricingRef}
                customVariants={revealVariants}
                className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/50 text-center shadow-lg shadow-primary/5 hover:bg-white/80 transition-all duration-300"
               >
                 <h4 className="font-bold text-gray-900 mb-1">{pt.item5.title}</h4>
                 <span className="font-extrabold text-primary text-2xl block mb-2">{pt.item5.price}{pt.year}</span>
                 <p className="text-sm text-gray-600 font-medium">{pt.item5.desc}</p>
               </TimelineContent>
          </div>

          <h2 className="md:text-5xl sm:text-4xl text-3xl font-extrabold text-text-primary mb-6 leading-[120%]">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.15}
              staggerFrom="first"
              reverse={true}
              containerClassName="justify-center"
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 40,
                delay: 0.4,
              }}
            >
              {t.choosePlan}
            </VerticalCutReveal>
          </h2>

          <TimelineContent
            as="p"
            animationNum={1}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            className="text-lg text-text-secondary max-w-2xl mx-auto"
          >
             {dict.pricingPreview.subtitle}
          </TimelineContent>
        </div>
      </div>

      {/* Product Features Core */}
      <div className="px-4 relative z-10 mt-6 w-full">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:gap-16 md:gap-12 gap-8 items-stretch bg-white/80 backdrop-blur-xl border border-white shadow-xl shadow-primary/5 rounded-[2rem] p-6 lg:p-12">
            {/* Features List */}
            <div className="flex flex-col justify-center">
              <TimelineContent
                as="h3"
                animationNum={2}
                timelineRef={pricingRef}
                customVariants={revealVariants}
                className="text-2xl font-bold text-gray-900 mb-6"
              >
                {t.included}
              </TimelineContent>

              <div className="space-y-4">
                {t.features.map((feature, index) => (
                  <TimelineContent
                    key={index}
                    as="div"
                    animationNum={3 + index}
                    timelineRef={pricingRef}
                    customVariants={timelineVaraints}
                    className="flex items-start"
                  >
                    <div className="w-5 h-5 mt-0.5 bg-gradient-to-br from-primary to-accent rounded-full flex-shrink-0 flex items-center justify-center mr-3">
                      <CheckCheck className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-gray-700 leading-relaxed font-medium">{feature}</span>
                  </TimelineContent>
                ))}
              </div>
            </div>

            {/* Pricing Box */}
            <div className="flex flex-col space-y-8 bg-gradient-to-br from-surface-50 to-white border border-surface-200 rounded-2xl p-6 sm:p-8 shadow-sm">
              <TimelineContent
                as="div"
                animationNum={3}
                timelineRef={pricingRef}
                customVariants={revealVariants}
              >
                <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-lg text-gray-900">
                      {t.billing}
                    </h4>
                    {isYearly && <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">{t.save}</span>}
                </div>
                
                <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    {t.billingDesc}
                </p>
                <PricingSwitch
                  button1={t.monthly}
                  button2={t.yearly}
                  onSwitch={toggleBilling}
                  className="grid grid-cols-2 w-full"
                />
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={5}
                timelineRef={pricingRef}
                customVariants={revealVariants}
                className="text-center flex flex-col items-center gap-6 pt-6 border-t border-gray-100 mt-auto"
              >
                <div className="flex items-baseline justify-center w-full min-h-[60px]">
                  {mounted && (
                      <span className="text-5xl font-extrabold text-gray-900 flex items-center">
                        €
                        <NumberFlow
                          value={currentPrice}
                          className="text-5xl font-extrabold tracking-tight"
                        />
                      </span>
                  )}
                  <span className="text-xl text-gray-400 font-semibold ml-1">
                    {isYearly ? pt.year : pt.month}
                  </span>
                </div>
                
                <Link href={`/${locale}/contatti`} className="w-full">
                    <button
                    className="w-full text-white text-[15px] font-semibold h-14 rounded-full shadow-[0_4px_14px_rgba(2,132,199,0.39)] bg-gradient-to-r from-primary to-[#0284c7] hover:shadow-[0_6px_20px_rgba(2,132,199,0.23)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                    >
                    {dict.cta.button}
                    </button>
                </Link>
                
                <p className="text-xs text-gray-500 font-medium text-center px-4">
                     {isYearly ? pt.item3.desc : pt.item2.desc}
                </p>
              </TimelineContent>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
