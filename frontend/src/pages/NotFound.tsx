import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Home, Search, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <Sparkles className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              HOME BONZENGA
            </span>
          </Link>
        </div>

        {/* 404 Card */}
        <Card className="border-primary/10 shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="text-6xl font-bold text-primary mb-4">404</div>
            <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="space-y-4">
              <Link to="/">
                <Button className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/25">
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Button>
              </Link>
              
              <Link to="/search">
                <Button variant="outline" className="w-full">
                  <Search className="w-4 h-4 mr-2" />
                  Search Services
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Helpful Links */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Or try these popular pages:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link to="/search">
              <Button variant="ghost" size="sm">
                Find Services
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="ghost" size="sm">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
