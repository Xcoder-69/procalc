export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="prose dark:prose-invert max-w-4xl mx-auto">
        <h1>Terms and Disclaimer for ProCalc Hub</h1>
        <p><em>Last Updated: {new Date().toLocaleDateString()}</em></p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using ProCalc Hub (the "Website"), you accept and agree to be bound by the terms and provision of this agreement.
        </p>

        <h2>2. Use of Calculators</h2>
        <p>
          The calculators and information provided on this Website are for general informational and educational purposes only.
        </p>
        
        <h2>3. Disclaimer of Liability</h2>
        <p className="font-semibold text-destructive-foreground bg-destructive/80 p-4 rounded-md">
          Note: results are approximate and provided for informational purposes only. Please do not rely solely on these results for legal, financial, or medical decisions. The site owner, Mayur Suryavanshi, is not liable for actions taken based on these calculations.
        </p>
        <p>
          While we strive to keep the information and calculations up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.
        </p>

        <h2>4. Intellectual Property</h2>
        <p>
          The Website and its original content, features, and functionality are owned by Mayur Suryavanshi and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
        </p>

        <h2>5. Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
        </p>

        <h2>6. Changes to Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide at least 30 days' notice prior to any new terms taking effect.
        </p>
      </div>
    </div>
  );
}
