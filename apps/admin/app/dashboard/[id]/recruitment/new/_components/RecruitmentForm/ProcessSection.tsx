import { Plus, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface ProcessSectionProps {
  processes: string[];
  onAdd: () => void;
  onUpdate: (index: number, value: string) => void;
  onRemove: (index: number) => void;
}

export function ProcessSection({ processes, onAdd, onUpdate, onRemove }: ProcessSectionProps) {
  return (
    <Card className="border-gray-700 bg-gray-800 shadow-lg">
      <CardHeader>
        <CardTitle className="text-gray-100">프로세스 설정</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {processes.map((process, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Input
              value={process}
              onChange={e => onUpdate(index, e.target.value)}
              className="border-gray-600 bg-gray-700 text-gray-100"
              placeholder={`프로세스 ${index + 1}`}
            />
            <Button
              onClick={() => onRemove(index)}
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button onClick={onAdd} variant="outline" className="w-full">
          <Plus className="mr-2 h-4 w-4" /> 프로세스 추가
        </Button>
      </CardContent>
    </Card>
  );
}
