import React from "react";
import './footerPage.scss'
import 'flatpickr/dist/flatpickr.css';
import { Footer, SignUpNavigationBar } from "../../components";

const ContactUs = () => {
    return(
        <div className={`registration__body__content__main`}>
            <div className={`maincontent-border`}>
                <h1 className="registration__body__content__main__step-title">Contact Customer Service</h1>
                <h5 className="registration__body__content__main__step-subtitle">Call us from the app</h5>
                <div className="registration__body__content__main__step-content">
                    Contacting us is now easier than ever when you contact us from your Android or iOS phone or tablet! 
                    Calling through the app is free - all you need is an internet or cellular connection.
                </div>
                <h5 className="registration__body__content__main__step-subtitle">Download our app (Coming Soon):</h5>
                <div className="badges">
                    <img className="badge-android" alt='android' target="_blank" src="https://help.nflxext.com/helpcenter/deb7c3e60fbabd81678a7b77c779ef51.png"/>
                    <img className="badge-ios" alt='ios' target="_blank" src="https://help.nflxext.com/helpcenter/a011cbc6f8050b1a0476814ed984c7e4.svg"/>
                </div>
            </div>
            <div className={`maincontent-border`}>
                <h5 className="registration__body__content__main__step-subtitle">Call us from any phone</h5>
                <h5 className="registration__body__content__main__step-content">Phone is currently unavailable.</h5><br/>
            </div>
            <div className={`maincontent`}>
                <h5 className="registration__body__content__main__step-subtitle">Live Chat</h5>
                <div className="registration__body__content__main__step-content">You will need an internet or mobile phone connection.</div>
            </div>
        </div>
    )
}

const TermsOfUse = () => {
    return(
        <div className={`registration__body__content__main`}>
            <div className={`maincontent`}>
                <h1 className="registration__body__content__main__step-title">Terms of Use</h1>
                <div className="registration__body__content__main__step-content">
                    Watchflix provides a personalized subscription service that allows our members to access entertainment content (“Watchflix content”) over the Internet to certain Internet-connected devices ("Watchflix ready devices").

                    As used in these Terms of Use, "Watchflix service", "our service" or "the service" means the personalized service provided by Watchflix for discovering and accessing a selection of Watchflix content, including all features and functionalities, recommendations and reviews, our websites, and user interfaces, as well as all content and software associated with our service.

                    The Terms of Use set out on this webpage govern your use of the Watchflix service. Use of any paid service plan is subject to the “Terms of Use (Paid Plans)”. Use of our free service plan is subject to the “Terms of Use (Free Plan)”.
                </div>
                <h5 className="registration__body__content__main__step-subtitle">Terms of Use (Paid Plans)</h5>
                <div className="registration__body__content__main__step-content">These “Terms of Use (Paid Plans)” govern your use of any of our paid service plans (“Paid Plan”) only. Use of our free membership plan is subject to the Terms of Use (Free Plans), below.</div>
                <div className="registration__body__content__main__step-content">
                    1. Paid Plan Membership<br/><br/>

                    1.1. Your Watchflix membership will continue until terminated. To use the Watchflix service you must have Internet access and a Watchflix ready device, and provide us with one or more Payment Methods. “Payment Method” means a current, valid, accepted method of payment, as may be updated from time to time, and which may include payment through your account with a third party. Unless you cancel your membership before your billing date, you authorize us to charge the membership fee for the next billing cycle to your Payment Method (see "Cancellation" below).<br/><br/>

                    1.2. We may offer a number of membership plans, including memberships offered by third parties in conjunction with the provision of their own products and services. We are not responsible for the products and services provided by such third parties. Some membership plans may have differing conditions and limitations, which will be disclosed at your sign-up or in other communications made available to you. You can find specific details regarding your Watchflix membership by visiting our website and clicking on the "Account" link available at the top of the pages under your profile name.<br/><br/>

                    2. Promotional Offers. We may from time to time offer special promotional offers, plans or memberships (“Offers”). Offer eligibility is determined by Watchflix at its sole discretion and we reserve the right to revoke an Offer and put your account on hold in the event that we determine you are not eligible. Members of households with an existing or recent Watchflix membership may not be eligible for certain introductory Offers. We may use information such as device ID, method of payment or an account email address used with an existing or recent Watchflix membership to determine Offer eligibility. The eligibility requirements and other limitations and conditions will be disclosed when you sign-up for the Offer or in other communications made available to you.<br/><br/>

                    3. Billing and Cancellation<br/><br/>
                    3.1. Billing Cycle. The membership fee for the Watchflix service and any other charges you may incur in connection with your use of the service, such as taxes and possible transaction fees, will be charged to your Payment Method on the specific payment date indicated on the "Account" page. The length of your billing cycle will depend on the type of subscription that you choose when you signed-up for the service. In some cases your payment date may change, for example if your Payment Method has not successfully settled, when you change your subscription plan or if your paid membership began on a day not contained in a given month. Visit the Watchflix.com website and click on the "Billing details" link on the "Account" page to see your next payment date. We may authorize your Payment Method in anticipation of membership or service-related charges through various methods, including authorizing it for up to approximately one month of service as soon as you register. If you signed up for Watchflix using your account with a third party as a Payment Method, you can find the billing information about your Watchflix membership by visiting your account with the applicable third party.<br/><br/>

                    3.2. Payment Methods. To use the Watchflix service you must provide one or more Payment Methods. You authorize us to charge any Payment Method associated to your account in case your primary Payment Method is declined or no longer available to us for payment of your subscription fee. You remain responsible for any uncollected amounts. If a payment is not successfully settled, due to expiration, insufficient funds, or otherwise, and you do not cancel your account, we may suspend your access to the service until we have successfully charged a valid Payment Method. For some Payment Methods, the issuer may charge you certain fees, such as foreign transaction fees or other fees relating to the processing of your Payment Method. Local tax charges may vary depending on the Payment Method used. Check with your Payment Method service provider for details.<br/><br/>

                    3.3. Updating your Payment Methods. You can update your Payment Methods by going to the "Account" page. We may also update your Payment Methods using information provided by the payment service providers. Following any update, you authorize us to continue to charge the applicable Payment Method(s).<br/><br/>

                    3.4. Cancellation. You can cancel your Watchflix membership at any time, and you will continue to have access to the Watchflix service through the end of your billing period. To the extent permitted by the applicable law, payments are non-refundable and we do not provide refunds or credits for any partial membership periods or unused Watchflix content. To cancel, go to the "Account" page and follow the instructions for cancellation. If you cancel your membership, your account will automatically close at the end of your current billing period. To see when your account will close, click "Billing details" on the "Account" page. If you signed up for Watchflix using your account with a third party as a Payment Method and wish to cancel your Watchflix membership, you may need to do so through such third party, for example by visiting your account with the applicable third party and turning off auto-renew, or unsubscribing from the Watchflix service through that third party.<br/><br/>

                    3.5. Changes to the Price and Subscription Plans. We may change our subscription plans and the price of our service from time to time; however, any price changes or changes to your subscription plans will apply no earlier than 30 days following notice to you.</div><br/><br/>
            </div>
        </div>
    )
}

const Privacy = () => {
    return(
        <div className={`registration__body__content__main`}>
            <div className={`maincontent-border`}>
                <h1 className="registration__body__content__main__step-title">Privacy Statement</h1>
                <div className="registration__body__content__main__step-content">This Privacy Statement explains our practices, including your choices, regarding the collection, use, and disclosure of certain information, including your personal information in connection with the Watchflix service.</div>
                <div className="registration__body__content__main__step-content">
                <b>Contacting Us</b><br/><br/>
If you have general questions about your account or how to contact customer service for assistance, please visit our online help center at help.Watchflix.com. For questions specifically about this Privacy Statement, or our use of your personal information, cookies or similar technologies, please contact our Data Protection Officer/Privacy Office by email at privacy@Watchflix.com.<br/><br/>

The data controller of your personal information is Watchflix Pte. Ltd. Please note that if you contact us to assist you, for your safety and ours we may need to authenticate your identity before fulfilling your request.<br/><br/>

<b>Collection of Information</b><br/><br/>
We receive and store information about you such as:<br/><br/>

<b>Information you provide to us:</b><br/><br/> We collect information you provide to us which includes:<br/><br/>

your name, email address, payment method(s), telephone number, and other identifiers you might use (such as an in-game name). We collect this information in a number of ways, including when you enter it while using our service, interact with our customer service, or participate in surveys or marketing promotions;
information when you choose to provide ratings, taste preferences, account settings (including preferences set in the "Account" section of our website), or otherwise provide information to us through our service or elsewhere.
Information we collect automatically: We collect information about you and your use of our service, your interactions with us and our advertising, as well as information regarding your network, network devices, and your computer or other Watchflix capable devices you might use to access our service (such as gaming systems, smart TVs, mobile devices, set top boxes, and other streaming media devices). This information includes:
your activity on the Watchflix service, such as title selections, shows you have watched, search queries, and activity in Watchflix games;
your interactions with our emails and texts, and with our messages through push and online messaging channels;
details of your interactions with our customer service, such as the date, time and reason for contacting us, transcripts of any chat conversations, and if you call us, your phone number and call recordings;
device IDs or other unique identifiers, including for your network devices, and devices that are Watchflix capable on your Wi-Fi network;
resettable device identifiers (also known as advertising identifiers), such as those on mobile devices, tablets, and streaming media devices that include such identifiers (see the "Cookies and Internet Advertising" section below for more information);
device and software characteristics (such as type and configuration), connection information including type (wifi, cellular), statistics on page views, referring source (for example, referral URLs), IP address (which may tell us your general location), browser and standard web server log information;
information collected via the use of cookies, web beacons and other technologies, including ad data (such as information on the availability and delivery of ads, the site URL, as well as the date and time). (See our "Cookies and Internet Advertising" section for more details.)
Information from partners: We collect information from other companies with whom you have a relationship (“Partners”). These Partners might include (depending on what services you use): your TV or internet service provider, or other streaming media device providers who make our service available on their device; mobile phone carriers or other companies who provide services to you and collect payment for the Watchflix service for distribution to us or provide pre-paid promotions for the Watchflix service; and voice assistant platform providers who enable interaction with our service through voice commands. The information Partners provide us varies depending on the nature of the Partner services, and may include:
search queries and commands applicable to Watchflix that you make through Partner devices or voice assistant platforms;
service activation information such as your email address or other contact information;
IP addresses, device IDs or other unique identifiers, as well as associated pre-paid promotion, billing and user interface information, that support user authentication, the Watchflix service registration experience, Partner payment processing, and the presentation of Watchflix content to you through portions of the Partner user interface.
Information from other sources: We also obtain information from other sources. We protect this information according to the practices described in this Privacy Statement, plus any additional restrictions imposed by the source of the data. These sources vary over time, but could include:
service providers that help us determine a location based on your IP address in order to customize our service and for other uses consistent with this Privacy Statement;
security service providers who provide us with information to secure our systems, prevent fraud and help us protect the security of Watchflix accounts;
payment service providers who provide us with payment or balance information, or updates to that information, based on their relationship with you;
online and offline data providers, from which we obtain aggregated demographic, interest based and online advertising related data;
publicly-available sources such as publicly available posts on social media platforms and information available through public databases associating IP addresses with internet service providers (ISPs);
third party services that you are signed into and that provide functions within Watchflix games, such as multiplayer gameplay, leaderboards, and game saving options.
                </div>
            </div>
        </div>
    )
}

const Cookie = () => {
    return(
        <div className={`registration__body__content__main`}>
            <div className={`maincontent-border`}>
                <h1 className="registration__body__content__main__step-title">Cookie Preferences</h1>
                <div className="registration__body__content__main__step-content"><br/>
We and our Service Providers use cookies and other technologies (such as web beacons), as well as resettable device identifiers, for various reasons. We want you to be informed about our use of these technologies, so this section explains the types of technologies we use, what they do, and your choices regarding their use. <br/><br/>

Cookies and similar technologies, web beacons, and resettable device identifiers<br/><br/>

Cookies are small data files that are commonly stored on your device when you browse and use websites and online services. We use other technologies such as browser storage and plugins (e.g., HTML5, IndexedDB, and WebSQL). Like cookies, these other technologies may store small amounts of data on your device. Web beacons (also known as clear gifs or pixel tags) often work in conjunction with cookies. In many cases, declining cookies will impair the effectiveness of web beacons associated with those cookies.<br/><br/>

If you use the Watchflix app on a mobile device, tablet, or streaming media device, we may collect a resettable device identifier from your device. Resettable device identifiers (also known as advertising identifiers) are similar to cookies and are found on many mobile devices and tablets (for example, the "Identifier for Advertisers" (or IDFA) on Apple iOS devices and the "Google Advertising ID" on Android devices), and certain streaming media devices. Like cookies, resettable device identifiers are used to make online advertising more relevant and for analytics and optimization purposes.<br/><br/>
                </div>
            </div>
        </div>
    )
}
const CorpInfo = () => {
    return(
        <div className={`registration__body__content__main`}>
            <div className={`maincontent`}>
                <h1 className="registration__body__content__main__step-title">Watchflix Corporate Information</h1>
                <div className="registration__body__content__main__step-content"><br/>
                Watchflix serves members in many different countries. The Watchflix entity that provides you with access to the Watchflix service and qualifies as your data controller depends on your country of membership, and will be listed in your membership or payment confirmation email.<br/><br/>
                <b>Watchflix, Inc.</b><br/><br/>
                100 Winchester Circle<br/><br/>
                Los Gatos, CA 95032, USA<br/><br/>
<br/><br/>
                <b>Watchflix International B.V.</b><br/><br/>
                Karperstraat 8-10<br/><br/>
                1075 KZ Amsterdam, the Netherlands<br/><br/>
                KvK: 62266519<br/><br/>
                VAT: NL853746333B01<br/><br/>
                Share Capital: 12,500 Euros<br/><br/>
<br/><br/>
                <b>Watchflix Entretenimento Brasil, Ltda.</b><br/><br/>
                Alameda Xingu, 350 - 14º andar - Alphaville Industrial<br/><br/>
                Barueri, CEP 06455-911 - SP - Brazil<br/><br/>
                CNPJ: ​13.590.585/0002-70<br/><br/>
<br/><br/>
                <b>Watchflix Entertainment Services India LLP</b><br/><br/>
                Level 11, Godrej BKC, Plot C-68<br/><br/>
                G Block, BKC- Bandra (East)<br/><br/>
                Mumbai 400051, India<br/><br/>
<br/><br/>
                <b>Watchflix G.K.</b><br/><br/>
                Tokyo Midtown East 3F<br/><br/>
                9-7-2 Akasaka<br/><br/>
                Minato-ku<br/><br/>
                Tokyo 107-0052 Japan<br/><br/>
<br/><br/>
                <b>Watchflix Services Korea Ltd</b>.<br/><br/>
                20F, Tower A, Centropolis Building<br/><br/>
                26, Ujeongguk-ro, Jongno-gu, Seoul, 03161, Republic of Korea<br/><br/>
                00-308-321-0058<br/><br/>
<br/><br/>
                <b>Watchflix Services UK Limited </b><br/><br/>
                100 New Bridge Street, London, EC4V 6JA<br/><br/>
                Company No (Registration):  9091899<br/><br/>
                Income Tax Registration No.:  623 25810 01805 A<br/><br/>
<br/><br/>
                <b>Watchflix Pte. Ltd.</b><br/><br/>
                9 Straits View, Marina One West Tower #14-07/12, Singapore 018937<br/><br/>
                Registration ID No. 201531197W<br/><br/>
<br/><br/>
                <b>Watchflix Services France S.A.S. </b> <br/><br/>
                11 Place Édouard VII, 75009 Paris, France <br/><br/>
                Business Number: 843 655 549 RCS Paris <br/><br/>
<br/><br/>
                <b>Watchflix Servicios de Transmisión España, S.L.</b><br/><br/>
                Paseo de la Castellana 89,  28046 Madrid, Spain<br/><br/>
                VAT/NIF number  B88182514<br/><br/>
<br/><br/>
                <b>Watchflix México S. de R.L. de C.V.</b> <br/><br/>
                Prado Sur 150, Floor 4. Lomas de Chapultepec, ZC: 11000. CDMX<br/><br/>
                Registration No.: 112483<br/><br/>
                RFC (tax ID): NME110513P13<br/><br/>
</div>
            </div>
        </div>
    )
}
const FooterPage = () => {
    const page = () => {
        switch(window.location.pathname) {
  
          case "/contactus":   return <ContactUs />;
          case "/termsofuse":   return <TermsOfUse />;
          case "/privacy":   return <Privacy />;
          case "/cookieprefer":   return <Cookie />;
          case "/corpinfo":   return <CorpInfo />;
  
          default:      return <h1>404 page not found</h1>
        }
      }
    return (
        <div id='footerpage'>
            <div className={`registration`}>
                <SignUpNavigationBar />
                <div className={`registration__body`}>
                    <div className={`registration__body__content`}>
                        {page()}
                    <div>
                </div>
            </div>
        </div>
        <div>
            <Footer style={{ background: '#f3f3f3' }} />
        </div>
        </div>
        </div >
    )
}

export default FooterPage;

// export default RegistrationForm;