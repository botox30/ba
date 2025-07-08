import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AuthRedirect: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    
    if (code) {
      window.location.href = `https://dziwkikoks.xyz/api/auth/redirect?code=${code}`;
    } else {
      navigate('/');
    }
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#03418a] mx-auto mb-4"></div>
        <p className="text-gray-600">Autoryzacja w toku...</p>
      </div>
    </div>
  );
};

export default AuthRedirect;