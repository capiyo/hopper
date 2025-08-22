import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative hidden min-h-[400px] md:min-h-[500px] bg-gradient-hero overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Professional team collaborating" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="text-center text-primary-foreground space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Find Your
            <span className="block text-primary-light">Dream Career</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            Discover thousands of job opportunities from top companies. Your next career move starts here.
          </p>
          
          <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-card rounded-lg shadow-strong p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-5">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <Input 
                      placeholder="Job title, keywords, or company"
                      className="pl-10 h-12 text-lg"
                    />
                  </div>
                </div>
                <div className="md:col-span-4">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <Input 
                      placeholder="City, state, or remote"
                      className="pl-10 h-12 text-lg"
                    />
                  </div>
                </div>
                <div className="md:col-span-3">
                  <Button variant="hero" size="lg" className="w-full h-12 text-lg">
                    Search Jobs
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8 text-sm opacity-80">
            <span>Popular searches:</span>
            <button className="text-primary-light hover:underline">Software Engineer</button>
            <button className="text-primary-light hover:underline">Product Manager</button>
            <button className="text-primary-light hover:underline">Data Scientist</button>
            <button className="text-primary-light hover:underline">Remote Work</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;