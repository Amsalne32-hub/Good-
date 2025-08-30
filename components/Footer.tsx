import React from 'react';

interface FooterProps {
    onNavigateToTerms: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigateToTerms }) => {
    return (
        <footer className="bg-gray-800 text-gray-300">
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col items-center justify-between sm:flex-row">
                    <p className="text-sm">
                        © {new Date().getFullYear()} Synapse Learning. All rights reserved.
                    </p>
                    <div className="mt-4 sm:mt-0">
                         <button onClick={onNavigateToTerms} className="text-sm hover:text-white transition-colors">
                            Terms & Conditions
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
