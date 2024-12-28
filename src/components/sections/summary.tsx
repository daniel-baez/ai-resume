// src/components/sections/summary.tsx
import { SummaryProps } from "@/types/portfolio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

export function Summary({ content, title = "Professional Summary" }: SummaryProps) {
  if (!content) {
    return null;
  }

  return (
    <Card className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg rounded-2xl transition-all duration-300 hover:shadow-xl border border-blue-100">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-900 flex items-center">
          <User className="mr-2 h-6 w-6 text-blue-600" /> {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 leading-relaxed">{content}</p>
      </CardContent>
    </Card>
  );
}

