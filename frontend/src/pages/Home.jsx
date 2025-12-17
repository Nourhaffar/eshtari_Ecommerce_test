import { useState, useEffect } from 'react';
import Banner from '../components/Banner.jsx';
import BannerGrid from '../components/BannerGrid.jsx';
import ProductCarousel from '../components/ProductCarousel.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import { getHomeWidgets } from '../services/api.js';

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

  // Loading State
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Banner Skeleton */}
        <div className="skeleton h-[400px] md:h-[500px] lg:h-[600px] w-full rounded-lg mb-12"></div>
        
        {/* Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="skeleton h-48 w-full rounded-lg"></div>
          ))}
        </div>

        {/* Carousel Skeleton */}
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

  // Error State
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  // Empty State
  if (!widgets || !widgets.data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-info">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>No content available at the moment.</span>
        </div>
      </div>
    );
  }

  // Parse widgets data
  const widgetsData = widgets.data.data || [];
  console.log(widgetsData);
  return (
    <div className="container mx-auto px-4 py-8">
      {widgetsData.map((widget) => {
        // 1. Main Banner Slider
        if (widget.type === 'banner' && widget.display === 'slider') {
          return (
            <div key={widget.mobile_widget_id} className="mb-12">
              <Banner banners={widget.banner_images} />
            </div>
          );
        }

        // 2. Banner Grid
        if (widget.type === 'banner' && widget.display === 'grid') {
          const shuffled = widget.banner_images.sort(() => 0.5 - Math.random());
          return (
            <div key={widget.mobile_widget_id} className="mb-12">
              <BannerGrid banners={shuffled} />
            </div>
          );
        }

        // 3. Product Carousel (Category)
        if (widget.type === 'category' && widget.display === 'carousel') {
          return (
            <ProductCarousel 
              key={widget.mobile_widget_id}
              title={widget.title} 
              products={widget.products} 
            />
          );
        }

        // 4. Product Grid (Category)
        if (widget.type === 'category' && widget.display === 'grid') {
          const products = widget.products.filter((product) => product.image_path);
          const shuffled = products.sort(() => 0.5 - Math.random());
          return (
            <ProductGrid 
              key={widget.mobile_widget_id}
              title={widget.title} 
              products={shuffled} 
            />
          );
        }

        return null;
      })}
    </div>
  );
};

export default Home;
