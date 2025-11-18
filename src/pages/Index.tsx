import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ClientVoices from '@/components/ClientVoices';
import StayUpdated from '@/components/StayUpdated';
import Footer from '@/components/Footer';
import React, { Suspense, lazy } from 'react';

// Lazy-load heavier or non-critical components to reduce initial bundle
const GalleryShowcase = lazy(() => import('@/components/GalleryShowcase'));
const MembershipPlans = lazy(() => import('@/components/MembershipPlans'));
const Trainers = lazy(() => import('@/components/Trainers'));
const BMICalculator = lazy(() => import('@/components/BMICalculator'));
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>EliteFit — Premium Gym & Personal Training</title>
        <meta name="description" content="Join EliteFit — premium equipment, certified trainers, and personalised workout plans." />
        <meta name="keywords" content="elite gym, personal trainer, HIIT, nutrition coaching, workout plans" />
        <link rel="canonical" href="https://www.elitefit.example/" />
        <meta property="og:title" content="EliteFit — Premium Gym & Personal Training" />
        <meta property="og:description" content="Join EliteFit — premium equipment, certified trainers, and personalised workout plans." />
        <meta property="og:image" content="/opengraph.png" />
      </Helmet>
      <Navbar />
      <Hero />
      <Features />
      <Suspense fallback={<div className="py-12">Loading gallery...</div>}>
        <GalleryShowcase />
      </Suspense>
      <Suspense fallback={<div className="py-12">Loading plans...</div>}>
        <MembershipPlans />
      </Suspense>
      <ClientVoices />
      <Suspense fallback={<div className="py-12">Loading trainers...</div>}>
        <Trainers />
      </Suspense>
      <Suspense fallback={<div className="py-12">Loading calculator...</div>}>
        <BMICalculator />
      </Suspense>
      <StayUpdated />
      <Footer />
    </div>
  );
};

export default Index;