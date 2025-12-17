import { useState, useEffect } from 'react';
import Banner from '../components/home/Banner.jsx';
import BannerGrid from '../components/home/BannerGrid.jsx';
import ProductCarousel from '../components/product/ProductCarousel.jsx';
import ProductGrid from '../components/product/ProductGrid.jsx';
import ScrollReveal from '../components/common/ScrollReveal.jsx';
import SEO from '../components/common/SEO.jsx';
import { getHomeWidgets } from '../services/api.js';
import { ServerCrash, PackageOpen } from 'lucide-react';

const Home = () => {
  const [widgets, setWidgets] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getHomeWidgets();
        setWidgets(data);
      } catch (err) {
        setError(err.message || 'Failed to load home page data');
        console.error('Error fetching home widgets:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="skeleton h-[400px] md:h-[500px] lg:h-[600px] w-full rounded-lg mb-12"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="skeleton h-48 w-full rounded-lg"></div>
          ))}
        </div>
        <div className="mb-12">
          <div className="skeleton h-8 w-48 mb-6"></div>
          <div className="flex gap-4 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="skeleton h-80 w-64 flex-none rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-[50vh] flex flex-col items-center justify-center text-center">
        <ServerCrash className="w-20 h-20 text-base-300 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
        <p className="text-base-content/60 max-w-md mx-auto mb-6">
          We encountered an error while loading the content. Please try again later.
        </p>
      </div>
    );
  }
  if (!widgets || !widgets.data) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-[50vh] flex flex-col items-center justify-center text-center">
        <PackageOpen className="w-20 h-20 text-base-300 mb-4" />
        <h2 className="text-2xl font-bold mb-2">No content available</h2>
        <p className="text-base-content/60 max-w-md mx-auto">
          It looks like there are no active widgets or banners to display at the moment.
        </p>
      </div>
    );
  }
  const widgetsData = widgets.data.data || [];
  console.log(widgetsData);
  return (
    <div className="container mx-auto px-4 py-8">
      <SEO title="Eshtari - Home" description="Welcome to Eshtari, your one-stop shop for the best products at unbeatable prices!" />
      {widgetsData.map((widget) => {
        if (widget.type === 'banner' && widget.display === 'slider') {
          return (
            <ScrollReveal key={widget.mobile_widget_id} className="mb-14 overflow-hidden">
              <Banner banners={widget.banner_images} />
            </ScrollReveal>
          );
        }
        if (widget.type === 'banner' && widget.display === 'grid') {
          const shuffled = widget.banner_images.sort(() => 0.5 - Math.random());
          return (
            <ScrollReveal key={widget.mobile_widget_id} className="mb-12">
              <BannerGrid banners={shuffled} />
            </ScrollReveal>
          );
        }
        if (widget.type === 'category' && widget.display === 'carousel') {
          const product = widget.products.filter((product) => product.image_path !== false);
          const shuffled = product.sort(() => 0.5 - Math.random());
          return (
            <ScrollReveal key={widget.mobile_widget_id}>
                <ProductCarousel 
                title={widget.title} 
                products={shuffled} 
                />
            </ScrollReveal>
          );
        }
        if (widget.type === 'category' && widget.display === 'grid') {
          const products = widget.products.filter((product) => product.image_path);
          const shuffled = products.sort(() => 0.5 - Math.random());
          return (
            <ScrollReveal key={widget.mobile_widget_id}>
                <ProductGrid 
                title={widget.title} 
                products={shuffled} 
                />
            </ScrollReveal>
          );
        }

        return null;
      })}
    </div>
  );
};

export default Home;
