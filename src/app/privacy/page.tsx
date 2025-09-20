export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="prose dark:prose-invert max-w-4xl mx-auto">
        <h1>Privacy Policy for ProCalc</h1>
        <p><em>Last Updated: {new Date().toLocaleDateString()}</em></p>

        <p>
          At ProCalc, accessible from [Your Website URL], one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by ProCalc and how we use it.
        </p>

        <h2>Information We Collect</h2>
        <p>
          The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
        </p>
        <p>
          If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
        </p>
        
        <h2>User Accounts and Calculation History</h2>
        <p>
          When you create an account, we may ask for your contact information, including items such as name and email address.
        </p>
        <p>
          For authenticated users, we automatically save your calculation history (inputs and results) to your private profile. This data is stored securely and is only accessible by you. You have the option to delete individual history items or your entire history. We use this data solely to provide you with the history feature and do not share it with third parties.
        </p>

        <h2>Formula Assistance Feature</h2>
        <p>
          Our Formula Assistance feature uses a third-party AI model to generate explanations. The data sent for this purpose includes only the calculator's name and its formula description. We do not send your personal data or your specific calculation inputs. The AI provider does not retain this information.
        </p>

        <h2>Log Files</h2>
        <p>
          ProCalc follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
        </p>

        <h2>Advertising Partners Privacy Policies</h2>
        <p>
          You may consult this list to find the Privacy Policy for each of the advertising partners of ProCalc.
        </p>
        <p>
          Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on ProCalc, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
        </p>
        <p>
          Note that ProCalc has no access to or control over these cookies that are used by third-party advertisers.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us.
        </p>
      </div>
    </div>
  );
}
