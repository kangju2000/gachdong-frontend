import { cn } from '@/lib/utils';
import MDEditor, { MDEditorProps } from '@uiw/react-md-editor';

export function Editor({ className, ...props }: MDEditorProps) {
  return <MDEditor {...props} className={cn('min-h-[300px] border-gray-600 bg-gray-700 text-gray-100', className)} />;
}
