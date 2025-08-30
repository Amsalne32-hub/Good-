
import React, { useState, useCallback } from 'react';
import type { Coursework } from '../types';
import { Button } from './ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../data/Card';
import { ChevronLeft, UploadCloud, CheckCircle } from 'lucide-react';

interface CourseworkProps {
  coursework: Coursework;
  onBack: () => void;
  onComplete: () => void;
}

const CourseworkComponent: React.FC<CourseworkProps> = ({ coursework, onBack, onComplete }) => {
  const [textSubmission, setTextSubmission] = useState('');
  const [fileSubmission, setFileSubmission] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileSubmission(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle the upload/submission to a server here.
    console.log('Submitting coursework:', {
      id: coursework.id,
      text: textSubmission,
      file: fileSubmission?.name,
    });
    setIsSubmitted(true);
    // Automatically call onComplete after a short delay
    setTimeout(() => {
        onComplete();
    }, 2000);
  };
  
  if(isSubmitted) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <Card className="max-w-lg text-center p-8">
                <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                <CardTitle className="text-2xl">Submission Successful!</CardTitle>
                <CardDescription className="mt-2">Your work has been submitted. You will be redirected shortly.</CardDescription>
            </Card>
        </div>
      )
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <header className="max-w-4xl mx-auto mb-6">
        <Button variant="ghost" onClick={onBack}>
          <ChevronLeft className="w-4 h-4 mr-2" /> Back to Course
        </Button>
      </header>

      <main className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{coursework.title}</CardTitle>
            <CardDescription className="text-lg">
              {coursework.description} ({coursework.points} points)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none p-4 bg-slate-100 rounded-md">
              <h3 className="font-semibold">Instructions</h3>
              <p style={{ whiteSpace: 'pre-wrap' }}>{coursework.instructions}</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Your Submission</h3>
              {coursework.submissionType === 'text' && (
                <div>
                  <textarea
                    value={textSubmission}
                    onChange={(e) => setTextSubmission(e.target.value)}
                    rows={10}
                    className="w-full p-2 border rounded-md"
                    placeholder="Type your answer here..."
                    required
                  />
                </div>
              )}

              {coursework.submissionType === 'file-upload' && (
                <div>
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-slate-50"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />
                      {fileSubmission ? (
                        <p className="font-semibold text-primary">{fileSubmission.name}</p>
                      ) : (
                        <>
                         <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                         </p>
                          <p className="text-xs text-gray-500">PDF, DOCX, or PNG (MAX. 5MB)</p>
                        </>
                      )}
                    </div>
                    <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} required/>
                  </label>
                </div>
              )}

              <div className="mt-6 text-right">
                <Button type="submit" size="lg">
                  Submit {coursework.type === 'classwork' ? 'Classwork' : 'Assignment'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CourseworkComponent;
