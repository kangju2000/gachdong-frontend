import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export function usePasswordVisibility() {
  const [isVisible, setIsVisible] = useState(false);

  const toggle = () => setIsVisible(!isVisible);

  return {
    type: isVisible ? 'text' : 'password',
    icon: isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />,
    toggle,
  };
}
