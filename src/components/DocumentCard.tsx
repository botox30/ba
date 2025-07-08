import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CreditCard, Car } from 'lucide-react';

interface DocumentCardProps {
  title: string;
  icon: string;
  bgImage?: string;
  description?: string;
}
const DocumentCard: React.FC<DocumentCardProps> = ({
                                                     title,
                                                     icon,
                                                     description
                                                   }) => {
  const getIcon = () => {
    switch (icon) {
      case 'book':
        return <BookOpen className="w-8 h-8 text-rose-600" />;
      case 'id-card':
        return <CreditCard className="w-8 h-8 text-blue-600" />;
      case 'car':
        return <Car className="w-8 h-8 text-green-600" />;
      default:
        return <BookOpen className="w-8 h-8 text-rose-600" />;
    }
  };

  const getBgColor = () => {
    switch (icon) {
      case 'book':
        return 'bg-rose-50';
      case 'id-card':
        return 'bg-blue-50';
      case 'car':
        return 'bg-green-50';
      default:
        return 'bg-rose-50';
    }
  };

  return (
      <motion.div
          className={`p-6 rounded-xl shadow-sm ${getBgColor()} w-full max-w-md min-h-32`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
      >
        <div className="flex justify-between h-full">
          <div className="flex flex-col justify-between w-3/4">
            <div>
              <h3 className="text-xl font-bold text-gray-800">{title}</h3>
              {description && (
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {description}
                  </p>
              )}
            </div>
            <div className="mt-4">
              <motion.div
                  className="flex items-center"
                  whileHover={{ scale: 1.05 }}
              >
                <span className="text-sm font-medium text-gray-600">Szczegóły</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 ml-1 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            </div>
          </div>
          <div className="flex items-center justify-center w-12 h-12 bg-white bg-opacity-50 rounded-lg">
            {getIcon()}
          </div>
        </div>
      </motion.div>
  );
};

export default DocumentCard;