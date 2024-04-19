//* Refactored
"use client";
import { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";

import "./admission-portal-style.css";

interface AdmissionPortalStyleProviderProps {
  timeline?: boolean;
  grade: string;
  children: ReactNode;
}

const AdmissionPortalStyleProvider: React.FC<AdmissionPortalStyleProviderProps> = ({ timeline, grade, children }) => {
  return (
    <>
      <Head>
        <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet' />
      </Head>

      <div>
        <div>
          {/* <!-- only available for web application banner starts here --> */}
          <section className='unavailable-screen'>
            <img className='logo' src='../assets/images/logo/deerwalk-logo.png' alt='' />
            <section className='unavailable-banner'>
              <img src='../assets/illustrator/restrict.png' className='illustrator' alt='' />
              <h1 className='intel_400'>Sorry, This page only available for the web application</h1>
            </section>
          </section>
          <div id='account' className='application-form-screen'>
            <img id='ellipse-illustrator' src='../assets/illustrator/ellipse.png' alt='ellipse illustrator' />
            <div>
              <nav className='create-account_nav'>
                <Link href='/admissionPortal/gradeXII/step2'>
                  <img src='https://i.ibb.co/1ZC22Ct/instituteion-logo.png' alt='company logo' />
                </Link>
              </nav>
              <section className='form_container'>
                <div className='create-account_form'>
                  <a href='#' className='primary-btn intel_400' id='save-to-lc-btn'>
                    <i className='bx bx-save'></i> Save for later{" "}
                  </a>
                  <header>
                    <h2 className='intel_700'>Application Form for Grade {grade}</h2>
                  </header>
                  {timeline ? (
                    <section className='timeline'>
                      <div className='timeline-block status-container'>
                        <hr />
                        {/* circle */}
                        <Link href={`/admissionPortal/grade${grade}/step1`}>
                          <div className={`step-count-circle intel_400 step1-after-txt status `}>1</div>
                        </Link>
                        {/* line */}
                        <div className='step-count-line'></div>
                        {/* circle */}
                        <Link href={`/admissionPortal/grade${grade}/step2`}>
                          <div className={`step-count-circle intel_400 step2-after-txt status `}>2</div>
                        </Link>
                        {/* line */}
                        <div className='step-count-line'></div>
                        {/* circle */}
                        <Link href={`/admissionPortal/grade${grade}/step3`}>
                          <div className={`step-count-circle intel_400 step3-after-txt status `}>3</div>
                        </Link>
                        {/* line */}
                        <div className='step-count-line'></div>
                        {/* circle */}
                        <Link href={`/admissionPortal/grade${grade}/step4`}>
                          <div className={`step-count-circle intel_400 step4-after-txt status `}>4</div>
                        </Link>

                        {/* line */}
                        <div className='step-count-line'></div>
                        {/* circle */}
                        <Link href={`/admissionPortal/grade${grade}/step5`}>
                          <div className={`step-count-circle intel_400 step5-after-txt status `}>5</div>
                        </Link>

                        {/* line */}
                        <div className='step-count-line'></div>

                        {/* circle */}
                        <Link href={`/admissionPortal/grade${grade}/step6`}>
                          <div className={`step-count-circle intel_400 step6-after-txt status `}>6</div>
                        </Link>
                        {/* line */}
                        <div className='step-count-line'></div>
                        {/* circle */}
                        <Link href={`/admissionPortal/grade${grade}/step7`}>
                          <div className={`step-count-circle intel_400 step7-after-txt status `}>7</div>
                        </Link>
                        {/* line */}
                        <div className='step-count-line'></div>
                      </div>
                    </section>
                  ) : null}
                  {children}
                  <p className='intel_400 footer-info-text'>If you face any confusion during your application fill-up procedures, please contact us at +977-9849497330.</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdmissionPortalStyleProvider;
