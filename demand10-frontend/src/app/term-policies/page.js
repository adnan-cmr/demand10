import { FileText, Gavel, Server, Shield } from "lucide-react";
import Link from 'next/link';


export const metadata = {
  title: "Terms & Policies - User Agreements | Demand10",
  description:
    "Understand Demand10 user agreements, data usage policies, and platform guidelines. Essential information for businesses using our managed IT services and cybersecurity solutions.",
  keywords: [
    "Terms and Conditions",
    "User Agreements",
    "Data Usage Policy",
    "Platform Guidelines",
    "Demand10 Terms",
    "Managed Service Provider Terms",
    "IT Managed Services Agreement",
    "Cybersecurity Service Terms",
    "MSP User Agreement",
    "Business IT Services Terms",
    "Technology Partner Agreement",
    "Data Protection Policy"
  ],
  metadataBase: new URL("https://demand10.com"),
  alternates: {
    canonical: "/terms-policies",
  },
  openGraph: {
    title: "Terms & Policies - User Agreements | Demand10",
    description:
      "Understand Demand10 user agreements, data usage policies, and platform guidelines. Essential information for businesses using our managed IT services and cybersecurity solutions.",
    url: "https://demand10.com/terms-policies",
    siteName: "Demand10",
   
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Policies - User Agreements | Demand10",
    description:
      "Understand Demand10 user agreements, data usage policies, and platform guidelines. Essential information for businesses using our managed IT services and cybersecurity solutions.",
    site: "@demand10",
  },
};


const TermsOfUse = () => {
  return (
    <>
    <div>
       {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] overflow-hidden min-h-[50vh] flex items-center">

          
        
          
          {/* Main Content */}
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="text-center lg:text-left">
                  {/* Main Heading */}
                  <div className="mb-8">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
                      Terms <span className="text-white/90">Of Use</span>
                    </h1>
                    <div className="w-20 h-1 bg-white/80 mx-auto lg:mx-0 rounded-full mb-6"></div>
                    <div className="mt-6">
                      <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                        Effective Date: August 4, 2025
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Right Content - Icons Grid */}
                <div className="hidden lg:block">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-white font-semibold">Terms & Conditions</h3>
                      </div>
                      <p className="text-white/80 text-sm">Comprehensive terms governing your use of our services</p>
                    </div>
                    
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                          <Gavel className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-white font-semibold">Legal Compliance</h3>
                      </div>
                      <p className="text-white/80 text-sm">Adherence to all applicable laws and regulations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
         
        </section>
      
      {/* Main Content */}
      <div className="min-h-screen">
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 bg-white shadow-sm rounded-lg">
          <div className="p-6 md:p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-6 border-b pb-3">
              Terms of Service
            </h1>
            <p className="text-gray-500 text-sm mb-4">(Revised August, 2025)</p>

            <div className="space-y-8 text-sm">
              {/* Section 1 */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Welcome to Demand10. By accessing or using our platform, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our services. We reserve the right to modify these terms at any time. Your continued use of our services after any changes constitutes your acceptance of the revised terms.
                </p>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  2. Description of Services
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Demand10 provides a comprehensive platform that connects businesses with verified managed service providers (MSPs), managed security service providers (MSSPs), and cloud service providers. Our services include vendor discovery tools, comparison features, project management capabilities, and secure communication channels. We strive to deliver accurate information, but cannot guarantee the accuracy, completeness, or reliability of third-party content. Your relationship with any service provider you connect with through our platform is solely between you and that provider.
                </p>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  3. General Rules of Conduct
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  You agree to use our services in compliance with all applicable local, state, national, and international laws and regulations. Specifically, you must not:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
                  <li>Interfere with another user&apos;s enjoyment of our services</li>
                  <li>Transmit unsolicited bulk communications or spam</li>
                  <li>Harm minors or vulnerable individuals in any way</li>
                  <li>Promote illegal activities or violate any laws</li>
                  <li>Impersonate any person or entity</li>
                  <li>Stalk, harass, or threaten other users</li>
                  <li>Collect or store personal data about other users without consent</li>
                  <li>Reproduce or distribute copyrighted material without permission</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  4. User Content and Submissions
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  You are solely responsible for all content you submit, post, or transmit through our platform. By submitting content, you represent and warrant that:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
                  <li>Your content is accurate, lawful, and not misleading</li>
                  <li>You own or have the necessary rights to the content</li>
                  <li>Your content does not infringe on any third-party rights</li>
                  <li>Your content complies with all applicable laws and regulations</li>
                  <li>Your content does not contain harmful code or viruses</li>
                </ul>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  We reserve the right to review, modify, or remove any content that violates these terms or is otherwise objectionable. By submitting content, you grant Demand10 a worldwide, royalty-free, perpetual license to use, reproduce, modify, publish, translate, distribute, and display your content in connection with our services.
                </p>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  5. Intellectual Property Rights
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  All content, features, and functionality on our platform, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software, are the exclusive property of Demand10 or its licensors and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of our content without our express written permission.
                </p>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  6. User Forums and Community Features
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Our platform may include community features such as discussion forums, review sections, and user groups. You agree to use these features only to send and receive messages and material that are proper and related to the intended purpose of each community space. Please exercise caution when sharing personal information in public forums, as it may be collected and used by others. We are not responsible for the content posted by users in these community areas.
                </p>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  7. Registration and Account Security
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  To access certain features of our services, you may be required to register for an account. You agree to provide accurate, current, and complete information during registration and to update such information as necessary. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
                </p>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  8. Paid Services and Billing
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Certain features of our platform may require payment of fees. All fees are stated in U.S. dollars and are non-refundable unless otherwise specified. We reserve the right to change our fees at any time with prior notice. You agree to pay all fees and charges incurred in connection with your use of our services. Failure to pay fees may result in suspension or termination of your access to paid services.
                </p>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  9. Privacy Protection
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using our services, you consent to our data practices as described in our Privacy Policy. We encourage you to review our Privacy Policy regularly for any updates or changes.
                </p>
              </section>

              {/* Section 10 */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  10. Service Modifications and Termination
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without notice. We may also terminate your access to our services for any reason, including but not limited to violation of these terms, at our sole discretion. We are not liable to you or any third party for any modification, suspension, or discontinuation of our services.
                </p>
              </section>

              {/* Section 11 */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  11. Disclaimer of Warranties
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Our services are provided on an as is and as available basis without warranties of any kind, either express or implied. We do not warrant that our services will be uninterrupted, secure, or error-free. We do not warrant the accuracy, reliability, or completeness of any content provided through our services. Your use of our services is at your own risk.
                </p>
              </section>

              {/* Section 12 */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  12. Limitation of Liability
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  To the fullest extent permitted by law, Demand10 and its affiliates shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to damages for loss of profits, goodwill, use, data, or other intangible losses resulting from your use of or inability to use our services. Our total liability for any claims arising from your use of our services is limited to one hundred U.S. dollars ($100.00).
                </p>
              </section>

              {/* Section 13 */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  13. Indemnification
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  You agree to indemnify, defend, and hold harmless Demand10, its affiliates, officers, directors, employees, agents, licensors, and suppliers from and against all claims, losses, expenses, damages, and costs, including reasonable attorneys&apos; fees, arising from or related to your use of our services, your content, your violation of these terms, or your violation of any rights of another party.
                </p>
              </section>

              {/* Section 14 */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  14. Copyright Infringement Notification
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  We respect the intellectual property rights of others and expect our users to do the same. If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement, please provide our Copyright Agent with the following information:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
                  <li>Identification of the copyrighted work claimed to have been infringed</li>
                  <li>Identification of the material that is claimed to be infringing</li>
                  <li>Your contact information including address, telephone number, and email address</li>
                  <li>A statement that you have a good faith belief that use of the material is not authorized</li>
                  <li>A statement that the information in your notice is accurate</li>
                  <li>Your physical or electronic signature</li>
                </ul>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Send notifications to: support@demand10.com
                </p>
              </section>

              {/* Section 15 */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  15. Governing Law and Jurisdiction
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  These Terms of Service are governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law principles. You agree that any action at law or equity arising out of or relating to these terms shall be filed only in the state and federal courts located in Worcester County, Massachusetts, and you hereby consent and submit to the personal jurisdiction of such courts for the purposes of litigating any such action.
                </p>
              </section>

              {/* Section 16 */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  16. Entire Agreement
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  These Terms of Service, together with our Privacy Policy and any other legal notices published by us on our services, constitute the entire agreement between you and Demand10 regarding your use of our services. If any provision of these terms is held to be invalid or unenforceable, the remaining provisions will continue in full force and effect.
                </p>
              </section>

              {/* Section 17 */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  17. Contact Information
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at:
                  <br />
                  Email: support@demand10.com
                </p>
              </section>

           

              {/* Section 19 */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  18. Statute of Limitations
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  You agree that regardless of any statute or law to the contrary, any claim or cause of action arising out of or related to your use of our services or these Terms of Service must be filed within one (1) year after such claim or cause of action arose, or it shall be forever barred.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
      
    </div>
  </>
  )
}

export default TermsOfUse;