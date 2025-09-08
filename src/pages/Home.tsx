import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Shield, Users, Award } from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-sage-green text-warm-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Beautiful Fitted Furniture
              <span className="block text-honey-gold">Made to Last</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-warm-white/90">
              Since 2002, we've been creating bespoke fitted wardrobes, home offices, and storage solutions with transparent pricing and a lifetime guarantee.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-warm-white text-sage-green hover:bg-warm-white/90 interactive-button">
                <Link to="/book-appointment">Book Free Consultation</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-warm-white text-warm-white hover:bg-warm-white hover:text-sage-green interactive-button">
                <Link to="/our-solutions">View Our Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4">Why Choose Sturij?</h2>
            <p className="text-xl text-charcoal/70">Over 20 years of craftsmanship and customer satisfaction</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="card-hover border-sage-green/10">
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-sage-green mx-auto mb-4" />
                <CardTitle className="text-charcoal">Lifetime Guarantee</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-charcoal/70 text-center">
                  We stand behind our work with a comprehensive lifetime guarantee on all our fitted furniture.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover border-sage-green/10">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-sage-green mx-auto mb-4" />
                <CardTitle className="text-charcoal">Employed Installers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-charcoal/70 text-center">
                  Our skilled craftsmen are employed directly by us, ensuring consistent quality and accountability.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover border-sage-green/10">
              <CardHeader className="text-center">
                <Star className="h-12 w-12 text-sage-green mx-auto mb-4" />
                <CardTitle className="text-charcoal">Transparent Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-charcoal/70 text-center">
                  No hidden costs or surprises. You'll know exactly what you're paying for from day one.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover border-sage-green/10">
              <CardHeader className="text-center">
                <Award className="h-12 w-12 text-sage-green mx-auto mb-4" />
                <CardTitle className="text-charcoal">Since 2002</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-charcoal/70 text-center">
                  Over two decades of experience creating beautiful, functional fitted furniture solutions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solutions Preview */}
      <section className="py-16 bg-sage-green/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4">Our Solutions</h2>
            <p className="text-xl text-charcoal/70">From fitted wardrobes to complete home offices</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden card-hover border-sage-green/10">
              <div className="h-48 bg-sage-green/10"></div>
              <CardHeader>
                <CardTitle className="text-charcoal">Fitted Wardrobes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-charcoal/70 mb-4">
                  Maximize your bedroom storage with our bespoke fitted wardrobes, designed to fit any space perfectly.
                </p>
                <Button variant="outline" asChild className="border-sage-green text-sage-green hover:bg-sage-green hover:text-warm-white interactive-button">
                  <Link to="/our-solutions">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden card-hover border-sage-green/10">
              <div className="h-48 bg-honey-gold/10"></div>
              <CardHeader>
                <CardTitle className="text-charcoal">Home Offices</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-charcoal/70 mb-4">
                  Create the perfect workspace with our custom home office solutions, tailored to your needs.
                </p>
                <Button variant="outline" asChild className="border-sage-green text-sage-green hover:bg-sage-green hover:text-warm-white interactive-button">
                  <Link to="/our-solutions">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden card-hover border-sage-green/10">
              <div className="h-48 bg-soft-blue-grey/10"></div>
              <CardHeader>
                <CardTitle className="text-charcoal">Media Walls</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-charcoal/70 mb-4">
                  Transform your living space with elegant media walls that combine style and functionality.
                </p>
                <Button variant="outline" asChild className="border-sage-green text-sage-green hover:bg-sage-green hover:text-warm-white interactive-button">
                  <Link to="/our-solutions">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-honey-gold text-charcoal py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Space?</h2>
          <p className="text-xl mb-8 text-charcoal/80">
            Book your free consultation today and discover how we can create the perfect fitted furniture solution for your home.
          </p>
          <Button size="lg" asChild className="bg-sage-green text-warm-white hover:bg-sage-green/90 interactive-button">
            <Link to="/book-appointment">Book Free Consultation</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}