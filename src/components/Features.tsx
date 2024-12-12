import React from 'react';
import { Clock, FileSpreadsheet, RefreshCw } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

const features = [
  {
    icon: Clock,
    title: "Poilsio laiko sekimas",
    description: "Automatiškai sekite ir analizuokite vairuotojų poilsio periodus"
  },
  {
    icon: FileSpreadsheet,
    title: "Excel integracija",
    description: "Lengvai eksportuokite ir atnaujinkite duomenis Excel formatu"
  },
  {
    icon: RefreshCw,
    title: "Realaus laiko atnaujinimai",
    description: "Palaikykite duomenis aktualius su momentiniais atnaujinimais"
  }
];

export const Features = () => {
  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            index={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};