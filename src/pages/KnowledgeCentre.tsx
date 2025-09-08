import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen, Image, Calculator, HelpCircle } from 'lucide-react';

export default function KnowledgeCentre() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Knowledge Centre</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about fitted furniture, from buying guides to design inspiration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card>
            <CardHeader className="text-center">
              <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Buying Guides</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center mb-4">
                Comprehensive guides to help you make informed decisions about your fitted furniture.
              </p>
              <Button variant="outline" className="w-full">
                View Guides
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Image className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Design Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center mb-4">
                Browse our portfolio of completed projects for inspiration and ideas.
              </p>
              <Button variant="outline" className="w-full">
                View Gallery
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Calculator className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Cost Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center mb-4">
                Get an instant estimate for your fitted furniture project.
              </p>
              <Button variant="outline" className="w-full">
                Calculate Cost
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <HelpCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>FAQ Database</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center mb-4">
                Find answers to the most commonly asked questions about our services.
              </p>
              <Button variant="outline" className="w-full">
                View FAQs
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Popular Buying Guides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h4 className="font-semibold mb-2">Complete Guide to Fitted Wardrobes</h4>
                  <p className="text-gray-600 text-sm">Everything you need to know about choosing the perfect fitted wardrobe for your bedroom.</p>
                </div>
                <div className="border-b pb-4">
                  <h4 className="font-semibold mb-2">Home Office Design Essentials</h4>
                  <p className="text-gray-600 text-sm">Create the perfect workspace with our comprehensive home office guide.</p>
                </div>
                <div className="border-b pb-4">
                  <h4 className="font-semibold mb-2">Materials Guide: MFC vs Solid Wood</h4>
                  <p className="text-gray-600 text-sm">Understanding the pros and cons of different furniture materials.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Maximizing Small Spaces</h4>
                  <p className="text-gray-600 text-sm">Smart storage solutions for compact homes and apartments.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h4 className="font-semibold mb-2">How long does installation take?</h4>
                  <p className="text-gray-600 text-sm">Most projects are completed within 1-3 days, depending on complexity.</p>
                </div>
                <div className="border-b pb-4">
                  <h4 className="font-semibold mb-2">Do you offer payment plans?</h4>
                  <p className="text-gray-600 text-sm">Yes, we offer flexible payment options to suit your budget.</p>
                </div>
                <div className="border-b pb-4">
                  <h4 className="font-semibold mb-2">What's included in the lifetime guarantee?</h4>
                  <p className="text-gray-600 text-sm">Our guarantee covers manufacturing defects, hardware, and workmanship.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Can you work around existing furniture?</h4>
                  <p className="text-gray-600 text-sm">Yes, we can design solutions that complement your existing furniture.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-blue-100 text-lg mb-6">
            Our experts are here to help. Book a free consultation or get in touch with any questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-white text-blue-600 hover:bg-gray-100">
              <Link to="/book-appointment">Book Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}