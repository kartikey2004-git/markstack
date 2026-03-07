'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface FileUploadProps {
  onFileUpload: (file: File) => void;
  className?: string;
}

export function FileUpload({ onFileUpload, className }: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const markdownFiles = acceptedFiles.filter(file => 
      file.type === 'text/markdown' || file.name.endsWith('.md')
    );
    markdownFiles.forEach(file => {
      onFileUpload(file);
    });
  }, [onFileUpload]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'text/markdown': ['.md'],
      'text/plain': ['.md']
    },
    multiple: false,
  });

  return (
    <div {...getRootProps()} className={cn('inline-block', className)}>
      <input {...getInputProps()} />
      <Button variant="outline" size="sm" className="gap-2">
        <FileText className="h-4 w-4" />
        Upload .md
      </Button>
    </div>
  );
}
