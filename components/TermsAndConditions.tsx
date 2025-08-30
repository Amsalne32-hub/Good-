import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { ChevronLeft } from 'lucide-react';

interface TermsAndConditionsProps {
  onBack: () => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onBack }) => {
  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ChevronLeft className="w-4 h-4 mr-2" /> Back to Home
        </Button>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Terms and Conditions</CardTitle>
            <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Welcome to Synapse ("we", "us", "our"). These Terms and Conditions govern your use of our AI-powered learning platform (the "Service"). By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
            </p>

            <h2>2. Use of the Service</h2>
            <p>
              Synapse is provided for your personal, non-commercial educational use only. You agree not to use the Service for any unlawful purpose or in any way that interrupts, damages, or impairs the service.
            </p>

            <h2>3. User Accounts</h2>
            <p>
              To access certain features of the app, you may be required to create an account. You are responsible for safeguarding your account information and for any activities or actions under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>

            <h2>4. Intellectual Property</h2>
            <p>
              The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of Synapse and its licensors. Our trademarks may not be used in connection with any product or service without our prior written consent.
            </p>

            <h2>5. AI-Generated Content</h2>
            <p>
              The Service utilizes artificial intelligence to generate content such as study plans, explanations, and quiz questions ("AI Content"). While we strive for accuracy, AI Content may contain errors or inaccuracies. We do not guarantee the correctness or completeness of AI Content. It should be used as a supplementary learning tool and not as a sole source of information. You are responsible for verifying the information before relying on it.
            </p>

            <h2>6. User Conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Harass, abuse, or harm another person or group.</li>
              <li>Submit any content that is fraudulent, false, misleading, or deceptive.</li>
              <li>Use the Service to engage in any form of academic dishonesty.</li>
              <li>Attempt to reverse engineer or otherwise tamper with the Service's technology.</li>
            </ul>

            <h2>7. Termination</h2>
            <p>
              We may terminate or suspend your access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
              In no event shall Synapse, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>

            <h2>9. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of the Federal Republic of Nigeria, without regard to its conflict of law provisions.
            </p>

            <h2>10. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms and Conditions on this page.
            </p>

            <h2>11. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at support@synapselearning.ng.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsAndConditions;
