import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function OurSolutions() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-charcoal mb-4">Our Solutions</h1>
          <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
            From fitted wardrobes to complete home transformations, we create bespoke furniture solutions 
            that maximize your space and reflect your style.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="overflow-hidden card-hover">
            <div className="h-64 bg-sage-green/10"></div>
            <CardHeader>
              <CardTitle className="text-charcoal">Fitted Wardrobes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-charcoal/70 mb-4">
                Transform your bedroom with our bespoke fitted wardrobes. We specialize in maximizing storage 
                while creating beautiful, functional spaces.
              </p>
              <ul className="text-charcoal/70 space-y-2 mb-6">
                <li>• Sliding Door Systems</li>
                <li>• Angled & Awkward Spaces</li>
                <li>• Walk-in Solutions</li>
                <li>• Custom Interior Layouts</li>
              </ul>
              <Button asChild className="bg-sage-green text-warm-white hover:bg-sage-green/90">
                <Link to="/book-appointment">Get Quote</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden card-hover">
            <div className="h-64 bg-honey-gold/10"></div>
            <CardHeader>
              <CardTitle className="text-charcoal">Home Offices</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-charcoal/70 mb-4">
                Create the perfect workspace with our custom home office solutions. From compact desk areas 
                to complete office transformations.
              </p>
              <ul className="text-charcoal/70 space-y-2 mb-6">
                <li>• Built-in Desks & Storage</li>
                <li>• Cable Management Systems</li>
                <li>• Ergonomic Design</li>
                <li>• Multi-functional Spaces</li>
              </ul>
              <Button asChild className="bg-sage-green text-warm-white hover:bg-sage-green/90">
                <Link to="/book-appointment">Get Quote</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden card-hover">
            <div className="h-64 bg-soft-blue-grey/10"></div>
            <CardHeader>
              <CardTitle className="text-charcoal">Media Walls</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-charcoal/70 mb-4">
                Transform your living space with elegant media walls that combine entertainment, storage, 
                and style in one stunning feature.
              </p>
              <ul className="text-charcoal/70 space-y-2 mb-6">
                <li>• TV Integration</li>
                <li>• Hidden Cable Management</li>
                <li>• Integrated Lighting</li>
                <li>• Storage Solutions</li>
              </ul>
              <Button asChild className="bg-sage-green text-warm-white hover:bg-sage-green/90">
                <Link to="/book-appointment">Get Quote</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden card-hover">
            <div className="h-64 bg-charcoal/10"></div>
            <CardHeader>
              <CardTitle className="text-charcoal">Kitchens</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-charcoal/70 mb-4">
                Design and install beautiful, functional kitchens that become the heart of your home. 
                From contemporary to traditional styles.
              </p>
              <ul className="text-charcoal/70 space-y-2 mb-6">
                <li>• Bespoke Kitchen Design</li>
                <li>• Quality Appliance Integration</li>
                <li>• Worktop Solutions</li>
                <li>• Complete Project Management</li>
              </ul>
              <Button asChild className="bg-sage-green text-warm-white hover:bg-sage-green/90">
                <Link to="/book-appointment">Get Quote</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden lg:col-span-2 card-hover">
            <div className="h-64 bg-honey-gold/5"></div>
            <CardHeader>
              <CardTitle className="text-charcoal">Storage Solutions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-charcoal/70 mb-4">
                Maximize every inch of your home with our clever storage solutions. From under-stair storage 
                to complete room transformations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <ul className="text-charcoal/70 space-y-2">
                  <li>• Under-Stair Storage</li>
                  <li>• Alcove Units</li>
                  <li>• Loft Storage</li>
                  <li>• Garage Organization</li>
                </ul>
                <ul className="text-charcoal/70 space-y-2">
                  <li>• Walk-in Pantries</li>
                  <li>• Utility Room Solutions</li>
                  <li>• Children's Storage</li>
                  <li>• Bespoke Shelving</li>
                </ul>
              </div>
              <Button asChild className="bg-sage-green text-warm-white hover:bg-sage-green/90">
                <Link to="/book-appointment">Get Quote</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="bg-sage-green/5 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-charcoal mb-4">Ready to Transform Your Space?</h2>
          <p className="text-charcoal/70 text-lg mb-6">
            Book a free consultation and let our experts help you create the perfect solution for your home.
          </p>
          <Button size="lg" asChild className="bg-sage-green text-warm-white hover:bg-sage-green/90">
            <Link to="/book-appointment">Book Free Consultation</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}