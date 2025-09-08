import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, DollarSign, Building } from 'lucide-react';

export default function HowWereDifferent() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-charcoal mb-4">How We're Different</h1>
          <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
            We believe in doing business differently. Here's what sets Sturij apart from other fitted furniture companies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-charcoal">
                <DollarSign className="h-6 w-6 text-sage-green" />
                Our Transparent Pricing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-charcoal/70">
                Unlike many competitors who use high-pressure sales tactics and inflated "discount" prices, 
                we provide honest, transparent pricing from the start.
              </p>
              <ul className="space-y-2 text-charcoal/70">
                <li>• No artificial discounts or "limited time offers"</li>
                <li>• Clear breakdown of all costs</li>
                <li>• No hidden extras or surprise charges</li>
                <li>• Fair pricing that reflects true value</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-charcoal">
                <Users className="h-6 w-6 text-sage-green" />
                Why Employed Installers Matter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-charcoal/70">
                We employ our installers directly, unlike many companies that use subcontractors. 
                This makes a huge difference to quality and accountability.
              </p>
              <ul className="space-y-2 text-charcoal/70">
                <li>• Consistent quality standards</li>
                <li>• Direct accountability to us</li>
                <li>• Ongoing training and development</li>
                <li>• Pride in workmanship</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-charcoal">
                <Shield className="h-6 w-6 text-sage-green" />
                The Truth About Furniture Discounts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-charcoal/70">
                Many furniture companies inflate their prices only to offer "generous" discounts. 
                We believe this is misleading and unfair to customers.
              </p>
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">What Others Do:</h4>
                <p className="text-red-700 text-sm">
                  Quote £10,000, then offer "50% discount" to £5,000
                </p>
              </div>
              <div className="bg-sage-green/10 p-4 rounded-lg">
                <h4 className="font-semibold text-sage-green mb-2">What We Do:</h4>
                <p className="text-charcoal text-sm">
                  Quote fair price of £5,000 from the start
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-charcoal">
                <Building className="h-6 w-6 text-sage-green" />
                Bespoke vs Modular: Honest Comparison
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-charcoal/70">
                We offer both bespoke and modular solutions, and we'll honestly advise which is best for your needs and budget.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-sage-green/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-sage-green mb-2">Bespoke</h4>
                  <ul className="text-charcoal text-sm space-y-1">
                    <li>• Perfect fit for any space</li>
                    <li>• Unlimited design options</li>
                    <li>• Higher cost</li>
                    <li>• Longer lead times</li>
                  </ul>
                </div>
                <div className="bg-honey-gold/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-honey-gold mb-2">Modular</h4>
                  <ul className="text-charcoal text-sm space-y-1">
                    <li>• Cost-effective solution</li>
                    <li>• Faster installation</li>
                    <li>• Good for standard spaces</li>
                    <li>• Limited customization</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-sage-green/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-sage-green mb-4">Our Promise to You</h2>
          <p className="text-charcoal text-lg">
            We promise honest advice, transparent pricing, quality craftsmanship, and a lifetime guarantee. 
            No gimmicks, no pressure, just great furniture that lasts.
          </p>
        </div>
      </div>
    </div>
  );
}