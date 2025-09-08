import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Award, CheckCircle } from 'lucide-react';

export default function MaterialsQuality() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Materials & Quality</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We use only the finest materials from trusted suppliers, backed by our comprehensive lifetime guarantee.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-blue-600" />
                Material Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">MFC (Melamine Faced Chipboard)</h4>
                  <p className="text-gray-600 text-sm">Durable, cost-effective option with excellent finish quality</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Vinyl-Wrapped</h4>
                  <p className="text-gray-600 text-sm">Smooth finish with excellent durability and easy maintenance</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Solid Wood</h4>
                  <p className="text-gray-600 text-sm">Premium natural wood options for traditional aesthetics</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">High Gloss</h4>
                  <p className="text-gray-600 text-sm">Contemporary finish for modern, sleek designs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Award className="h-6 w-6 text-blue-600" />
                Our Suppliers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Egger</h4>
                  <p className="text-gray-600 text-sm">Premium European boards with exceptional quality standards</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Blum</h4>
                  <p className="text-gray-600 text-sm">World-leading hinges and drawer systems with lifetime warranties</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Hafele</h4>
                  <p className="text-gray-600 text-sm">Premium hardware and fittings for superior functionality</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Hettich</h4>
                  <p className="text-gray-600 text-sm">Innovative sliding door systems and mechanisms</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-blue-600" />
                Quality Standards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>All materials sourced from certified suppliers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Rigorous quality control at every stage</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Environmental sustainability standards</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Precision manufacturing processes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Professional installation standards</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Lifetime Guarantee Explained</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-green-600">What's Covered</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Manufacturing defects</li>
                  <li>• Hardware failures</li>
                  <li>• Structural integrity</li>
                  <li>• Finish quality issues</li>
                  <li>• Installation workmanship</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-600">How It Works</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Simple claim process</li>
                  <li>• Rapid response times</li>
                  <li>• Free repairs or replacements</li>
                  <li>• No quibble guarantee</li>
                  <li>• Transferable to new owners</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Our Commitment</h4>
              <p className="text-blue-800">
                We're so confident in our materials and craftsmanship that we guarantee your fitted furniture for life. 
                This isn't just a warranty - it's our promise that your investment will last.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="bg-gray-900 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Quality You Can Trust</h2>
          <p className="text-gray-300 text-lg">
            With over 20 years of experience and thousands of satisfied customers, 
            we've built our reputation on quality materials and exceptional craftsmanship.
          </p>
        </div>
      </div>
    </div>
  );
}