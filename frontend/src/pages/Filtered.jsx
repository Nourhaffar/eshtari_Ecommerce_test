import React from 'react';
import { FilterX } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO.jsx';

const Filtered = () => {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
            <SEO title="No Products Found - Eshtari" description="No products matched your search criteria." />
            {/* Icon Container */}
            <div className="mb-6">
                <FilterX className="w-24 h-24 text-base-content/20" />
            </div>

            {/* Content */}
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-base-content">
                No products found
            </h2>
            <p className="text-base-content/60 max-w-md mx-auto mb-8 text-lg">
                We couldn't find any products matching your filters. Try adjusting your search criteria or clearing text.
            </p>

            {/* Action Button */}
            <Link 
                to="/" 
                className="btn btn-primary btn-wide rounded-full text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
                Start Shopping
            </Link>
        </div>
    );
}

export default Filtered;
