import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Award, Home, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Sturij</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Since 2002, we've been creating beautiful fitted furniture that transforms homes and lives. 
            Our story is one of craftsmanship, integrity, and customer satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story Since 2002</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Sturij was founded with a simple mission: to create beautiful, functional fitted furniture 
                that enhances people's lives. What started as a small workshop has grown into one of the 
                region's most trusted fitted furniture specialists.
              </p>
              <p>
                Over the years, we've completed thousands of projects, from simple fitted wardrobes to 
                complete home transformations. But our core values remain unchanged: quality craftsmanship, 
                honest pricing, and exceptional customer service.
              </p>
              <p>
                We believe that your home should work for you, not against you. That's why we take the time 
                to understand your needs, your space, and your lifestyle before creating solutions that are 
                uniquely yours.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-8 flex items-center justify-center">
            <div className="text-center">
              <Award className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-blue-900 mb-2">20+ Years</h3>
              <p className="text-blue-800">of Excellence</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Meet Our Craftsmen</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Our team of skilled craftsmen are employed directly by us, ensuring consistent quality 
                and accountability on every project.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Home className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Our Workshop</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Our modern workshop is equipped with the latest technology and tools, allowing us to 
                create precision furniture to the highest standards.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Customer Stories</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Nothing makes us prouder than hearing how our furniture has transformed our customers' 
                homes and daily lives.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-center text-2xl">What Our Customers Say</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-600 mb-4 italic">
                  "Sturij transformed our bedroom with the most beautiful fitted wardrobes. The quality 
                  is exceptional and the team was professional throughout. Highly recommended!"
                </p>
                <p className="font-semibold">- Sarah & Mike, London</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-600 mb-4 italic">
                  "From design to installation, everything was perfect. The home office they created 
                  has completely changed how I work from home. Worth every penny."
                </p>
                <p className="font-semibold">- James, Surrey</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Join Our Story?</h2>
          <p className="text-blue-100 text-lg mb-6">
            Let us create something beautiful for your home. Book a free consultation and discover 
            the Sturij difference.
          </p>
        </div>
      </div>
    </div>
  );
}