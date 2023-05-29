import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import ExtraLayout from '../../pages/ExtraLayout'
import large_pattern from '../../assets/large_pattern.png'

function LegalLayout(props) {
// make sections-buttons sticky on scroll 
const [sticky, setSticky] = useState(false);

const handleScroll = () => {
    if (window.scrollY > 100) {
        setSticky(true);
    } else {
        setSticky(false);
    }
}

useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, []);

    return (
    <ExtraLayout>
          <div className='flex flex-row-reverse font-oskari mt-4 gap-4 flex-wrap lg:flex-nowrap relative'>
              
              <div className='flex-1 py-8 text-darkgray-200 ltr:text-left rtl:text-right text-xl relative'>
                  <div style={{ backgroundImage:`url(${large_pattern})` }} className='w-full h-full absolute top-0'>
                      
                </div>
                  <div className='relative z-10  side-paddings'>
                      <h1 className='text-primary-500 text-5xl mb-4'>
                          Terms & Conditions
                      </h1>
                      <p className='whitespace-pre-line'>
                          {`Welcome to El Gaming Academy!

                          These terms and conditions outline the rules and regulations for the use of Company Name's Website, located at Website.com.

                          By accessing this website we assume you accept these terms and conditions. Do not continue to use Website Name if you do not agree to take all of the terms and conditions stated on this page.

                          The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: “Client”, “You” and “Your” refers to you, the person log on this website and compliant to the Company's terms and conditions. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.

                          Cookies
                          We employ the use of cookies. By accessing Website Name, you agreed to use cookies in agreement with the Company Name's Privacy Policy.

                          Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.

                          License
                          Unless otherwise stated, Company Name and/or its licensors own the intellectual property rights for all material on Website Name. All intellectual property rights are reserved. You may access this from Website Name for your own personal use subjected to restrictions set in these terms and conditions.

                          You must not:

                          Republish material from Website Name
                          Sell, rent or sub-license material from Website Name
                          Reproduce, duplicate or copy material from Website Name
                          Redistribute content from Website Name
                          This Agreement shall begin on the date hereof.

                          Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Company Name does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Company Name,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, Company Name shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.

                          Company Name reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.

                          You warrant and represent that:

                          You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;
                          The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;
                          The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy
                          The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.
                          You hereby grant Company Name a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.

                          Hyperlinking to our Content
                          The following organizations may link to our Website without prior written approval:

                          Government agencies;
                          Search engines;
                          News organizations;
                          Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and
                          System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.
                          These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party's site.`}
                      </p>
               </div>
                  
              </div>
                <div id="sections-buttons" className="lg:w-80 rtl:pr-6 rtl:md:pr-8 rtl:xl:pr-12 rtl:2xl:pr-16 rtl:pl-6 rtl:md:pl-8 ltr:pl-6 ltr:md:pl-8 ltr:xl:pl-12 ltr:2xl:pl-16 ltr:pr-6 ltr:md:pr-8 lg:pr-0 w-full">
                    <div className={(sticky ? "lg:fixed lg:w-80 rtl:right-0 ltr:left-0 top-0" : "") + ' w-full lg:mt-4 text-center bg-bluegray-600 text-darkgray-200'}>
                      <button className={(props.title ==="Terms and Conditions"?"text-white":"")+' py-4 uppercase'}>
                          Terms and Conditions
                      </button>
                      <hr className='border-darkgray-300' />
                      <button className={(props.title === "Privacy Policy" ? "text-white" : "") + ' py-4 uppercase'}>
                          Privacy Policy
                      </button>
                      <hr className='border-darkgray-300' />
                      <button className={(props.title === "FAQ" ? "text-white" : "") + ' py-4 uppercase'}>
                          FAQ
                      </button>
                      <hr className='border-darkgray-300' />
                      <button className={(props.title === "Careers" ? "text-white" : "") + ' py-4 uppercase'}>
                          Careers
                      </button>
                  </div>
              </div>
          </div>
    </ExtraLayout>
  )
}

LegalLayout.propTypes = {}

export default LegalLayout
