import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, FileText, Hammer, Home, HeadphonesIcon } from 'lucide-react';

export default function SturijProcess() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">The Sturij Process</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From initial consultation to final installation, we've refined our process over 20 years 
            to ensure a smooth, stress-free experience for every customer.
          </p>
        </div>

        <div className="space-y-8 mb-16">
          <Card className="overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/3 bg-blue-50 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900">Step 1</h3>
                </div>
              </div>
              <div className="lg:w-2/3 p-8">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-2xl">Design Consultation</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-gray-600 mb-4">
                    Our expert designer visits your home at a time convenient for you. We'll measure your space, 
                    discuss your needs, and explore design options together.
                  </p>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Free home visit at your convenience</li>
                    <li>• Detailed space measurement and assessment</li>
                    <li>• Discussion of your requirements and preferences</li>
                    <li>• Initial design concepts and material options</li>
                    <li>• No pressure, just expert advice</li>
                  </ul>
                </CardContent>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/3 bg-green-50 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-green-900">Step 2</h3>
                </div>
              </div>
              <div className="lg:w-2/3 p-8">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-2xl">Transparent Quotation</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-gray-600 mb-4">
                    Within 48 hours, you'll receive detailed 3D designs and a comprehensive quote 
                    with no hidden costs or surprises.
                  </p>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Detailed 3D visualizations of your design</li>
                    <li>• Comprehensive quote with full cost breakdown</li>
                    <li>• Material specifications and options</li>
                    <li>• Clear timeline for completion</li>
                    <li>• No hidden costs or surprise charges</li>
                  </ul>
                </CardContent>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/3 bg-purple-50 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Hammer className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-purple-900">Step 3</h3>
                </div>
              </div>
              <div className="lg:w-2/3 p-8">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-2xl">Manufacturing</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-gray-600 mb-4">
                    Once you approve the design, we begin manufacturing your furniture in our workshop 
                    using premium materials and precision techniques.
                  </p>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Precision cutting and manufacturing</li>
                    <li>• Quality control at every stage</li>
                    <li>• Premium materials from trusted suppliers</li>
                    <li>• Regular progress updates</li>
                    <li>• Careful packaging for delivery</li>
                  </ul>
                </CardContent>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/3 bg-orange-50 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Home className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-orange-900">Step 4</h3>
                </div>
              </div>
              <div className="lg:w-2/3 p-8">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-2xl">Installation by Our Team</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-gray-600 mb-4">
                    Our employed craftsmen install your furniture with precision and care, 
                    ensuring perfect fit and finish.
                  </p>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Professional installation by employed craftsmen</li>
                    <li>• Minimal disruption to your daily routine</li>
                    <li>• Clean, tidy work practices</li>
                    <li>• Final quality checks and adjustments</li>
                    <li>• Complete cleanup after installation</li>
                  </ul>
                </CardContent>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/3 bg-teal-50 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HeadphonesIcon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-teal-900">Step 5</h3>
                </div>
              </div>
              <div className="lg:w-2/3 p-8">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-2xl">Aftercare & Support</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-gray-600 mb-4">
                    Our relationship doesn't end with installation. We provide ongoing support 
                    and honor our lifetime guarantee.
                  </p>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Comprehensive lifetime guarantee</li>
                    <li>• Ongoing customer support</li>
                    <li>• Maintenance advice and tips</li>
                    <li>• Quick response to any issues</li>
                    <li>• Customer satisfaction follow-up</li>
                  </ul>
                </CardContent>
              </div>
            </div>
          </Card>
        </div>

        <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-blue-100 text-lg mb-6">
            Experience the Sturij difference with our proven process and exceptional service.
          </p>
          <Button size="lg" asChild className="bg-white text-blue-600 hover:bg-gray-100">
            <Link to="/book-appointment">Book Your Free Consultation</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}