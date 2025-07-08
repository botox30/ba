import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
    title: string;
    icon: React.ReactNode;
    path: string;
    isLast?: boolean;
}

const MoreItem: React.FC<Props> = ({ title, icon, path, isLast }) => {
    return (
        <Link to={path} className="block">
            <div className="flex items-center justify-between px-4 py-4">
                <div className="flex items-center gap-4">
                    <div className="w-6 h-6">{icon}</div>
                    <span className="text-[17px] font-medium text-gray-900">{title}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
            {!isLast && (
                <div className="ml-[52px] h-px bg-gray-200" />
            )}
        </Link>
    );
};

export default MoreItem;