import Header from "../components/layout/Header";
import HeroSection from "../components/sections/HeroSection";
import SearchFilters from "../components/search/SearchFilters";
import FeaturedProperties from "../components/sections/FeaturedProperties";
import Footer from "../components/sections/Footer";

const Index = () => {
  const handleSearch = (filters: any) => {
    console.log("Search filters:", filters);
    // TODO: Implement search functionality
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Search Section */}
        <section className="py-8 bg-background relative -mt-20 z-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SearchFilters onSearch={handleSearch} />
          </div>
        </section>
        
        {/* Featured Properties */}
        <FeaturedProperties />
        
        {/* Additional Sections can be added here */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Find Your Dream Property?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who found their perfect home through our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary-hover transition-colors shadow-elegant hover:shadow-luxury">
                Start Your Search
              </button>
              <button className="px-8 py-3 border border-border bg-background text-foreground rounded-lg font-medium hover:bg-secondary transition-colors">
                List Your Property
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
