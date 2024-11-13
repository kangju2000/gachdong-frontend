'use client';

import { MDXEditorMethods, MDXEditorProps } from '@mdxeditor/editor';
import dynamic from 'next/dynamic';
import { forwardRef } from 'react';

const InitializedMDXEditor = dynamic(() => import('./InitializedMDXEditor'), {
  ssr: false,
});

export const Editor = forwardRef<MDXEditorMethods, MDXEditorProps>((props, ref) => (
  <InitializedMDXEditor {...props} editorRef={ref} />
));
