import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="h-full w-full flex items-center justify-center p-6">
      <Card className="w-full max-w-sm text-center">
        <CardContent className="pt-8 pb-8">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
              <Plane className="h-6 w-6 text-muted-foreground" />
            </div>
          </div>
          <h1 className="text-xl font-bold mb-2" data-testid="text-404-title">Page Not Found</h1>
          <p className="text-sm text-muted-foreground mb-6">
            The page you're looking for doesn't exist or you don't have access.
          </p>
          <Link href="/">
            <Button data-testid="button-go-home">Go to Home</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
