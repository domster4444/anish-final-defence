//@ts-nocheck
import { useState } from "react";

import Link from "next/link";
import Tooltip from "@/components/Tooltip/Tooltip";

import SidePricingCard from "./components/SidePricingCard";
import CenterPricingCard from "./components/CenterPricingCard";
import FeatureTour from "components/FeatureTour";

export default function PricingPlan(): JSX.Element {
  const [isAnnual, setAnnualSwitch] = useState(false);

  const handleAnnualSwitch = (e: any) => {
    setAnnualSwitch(e.target.checked);
  };
  return (
    <div className='section-container'>
      <section id='pricingPlanSection'>
        <div className='containerCenter'>
          <div className='contentBlock'>
            <main>
              <h2>PRICING PLANS</h2>

              <h1 className='nibpro_semi_bold'>Best Pricing Plans</h1>

              <div
                style={{
                  marginBottom: "2rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <b style={{ fontSize: "2rem", margin: "0rem 0.5rem" }}>
                  Switch To
                  <span className='primary-red-text'>{isAnnual === true ? " Monthly " : " Annual "}</span>
                  Subscription
                </b>

                <label htmlFor='default-toggle' className='inline-flex relative items-center cursor-pointer'>
                  <input
                    type='checkbox'
                    id='default-toggle'
                    onChange={(e) => {
                      handleAnnualSwitch(e);
                    }}
                    className='sr-only peer'
                  />
                  <div className="w-11 h-6 bg-gray-400 rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-500 peer-checked:ring-4 peer-checked:ring-red-500"></div>
                </label>
              </div>

              <div className='container'>
                <SidePricingCard priceTag={isAnnual === true ? "Rs. 19200" : "Rs. 1600"} title='For Standard Use' priceAmount={isAnnual === true ? 19200 : 1600}>
                  <>
                    <ul>
                      <li className='pricing_feature_list'>
                        <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                          <div className='pricing_feature_list_icon'>
                            <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                              <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                            </svg>
                          </div>
                          <div className='pricing_feature_list_point'>Up to 300 students</div>
                        </Tooltip>
                      </li>
                      <li className='pricing_feature_list'>
                        <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                          <div className='pricing_feature_list_icon'>
                            <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                              <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                            </svg>
                          </div>
                          <div className='pricing_feature_list_point'>21 Core Modules</div>
                        </Tooltip>
                      </li>
                      <li className='pricing_feature_list'>
                        <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                          <div className='pricing_feature_list_icon'>
                            <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                              <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                            </svg>
                          </div>
                          <div className='pricing_feature_list_point'>17 Standard Modules</div>
                        </Tooltip>
                      </li>
                      <strike>
                        <li className='pricing_feature_list'>
                          <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                            <div className='pricing_feature_list_icon'>
                              <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                                <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                              </svg>
                            </div>
                            <div className='pricing_feature_list_point'>10 Premium Modules</div>
                          </Tooltip>
                        </li>
                      </strike>
                      <strike>
                        <li className='pricing_feature_list'>
                          <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                            <div className='pricing_feature_list_icon'>
                              <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                                <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                              </svg>
                            </div>
                            <div className='pricing_feature_list_point'>12 Ultimate Modules</div>
                          </Tooltip>
                        </li>
                      </strike>

                      <li className='pricing_feature_list'>
                        <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                          <div className='pricing_feature_list_icon'>
                            <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                              <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                            </svg>
                          </div>
                          <div className='pricing_feature_list_point'>Unlimited Users</div>
                        </Tooltip>
                      </li>
                      <li className='pricing_feature_list'>
                        <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                          <div className='pricing_feature_list_icon'>
                            <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                              <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                            </svg>
                          </div>
                          <div className='pricing_feature_list_point'>Online training</div>
                        </Tooltip>
                      </li>
                      <li className='pricing_feature_list'>
                        <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                          <div className='pricing_feature_list_icon'>
                            <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                              <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                            </svg>
                          </div>
                          <div className='pricing_feature_list_point'>Automatic Updates</div>
                        </Tooltip>
                      </li>
                      <li className='pricing_feature_list'>
                        <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                          <div className='pricing_feature_list_icon'>
                            <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                              <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                            </svg>
                          </div>
                          <div className='pricing_feature_list_point'>Email & Phone support</div>
                        </Tooltip>
                      </li>
                      <li className='pricing_feature_list'>
                        <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                          <div className='pricing_feature_list_icon'>
                            <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                              <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                            </svg>
                          </div>
                          <div className='pricing_feature_list_point'>Mobile App</div>
                        </Tooltip>
                      </li>
                      <li className='pricing_feature_list'>
                        <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                          <div className='pricing_feature_list_icon'>
                            <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                              <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                            </svg>
                          </div>
                          <div className='pricing_feature_list_point'>Biometric Attendance</div>
                        </Tooltip>
                      </li>
                      <li className='pricing_feature_list'>
                        <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                          <div className='pricing_feature_list_icon'>
                            <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                              <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                            </svg>
                          </div>
                          <div className='pricing_feature_list_point'>Online Fee Payment</div>
                        </Tooltip>
                      </li>
                      <li className='pricing_feature_list'>
                        <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                          <div className='pricing_feature_list_icon'>
                            <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                              <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                            </svg>
                          </div>
                          <div className='pricing_feature_list_point'>Free School Website</div>
                        </Tooltip>
                      </li>
                    </ul>
                  </>
                </SidePricingCard>

                <CenterPricingCard priceTag={isAnnual === true ? "Rs. 42000" : "Rs. 3500"} title='For Premium Use' priceAmount={isAnnual === true ? 42000 : 3500}>
                  <ul>
                    <li className='pricing_feature_list pricing_feature_list--central'>
                      <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                        <div className='pricing_feature_list_icon'>
                          <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                            <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                          </svg>
                        </div>
                        <div className='pricing_feature_list_point'>Up to 10000 students</div>
                      </Tooltip>
                    </li>

                    <li className='pricing_feature_list pricing_feature_list--central'>
                      <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                        <div className='pricing_feature_list_icon'>
                          <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                            <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                          </svg>
                        </div>
                        <div className='pricing_feature_list_point'>21 Core Modules</div>
                      </Tooltip>
                    </li>
                    <li className='pricing_feature_list pricing_feature_list--central'>
                      <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                        <div className='pricing_feature_list_icon'>
                          <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                            <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                          </svg>
                        </div>
                        <div className='pricing_feature_list_point'>17 Standard Modules</div>
                      </Tooltip>
                    </li>

                    <li className='pricing_feature_list pricing_feature_list--central'>
                      <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                        <div className='pricing_feature_list_icon'>
                          <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                            <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                          </svg>
                        </div>
                        <div className='pricing_feature_list_point'>10 Premium Modules</div>
                      </Tooltip>
                    </li>

                    <li className='pricing_feature_list pricing_feature_list--central'>
                      <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                        <div className='pricing_feature_list_icon'>
                          <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                            <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                          </svg>
                        </div>
                        <div className='pricing_feature_list_point'>12 Ultimate Modules</div>
                      </Tooltip>
                    </li>

                    <li className='pricing_feature_list pricing_feature_list--central'>
                      <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                        <div className='pricing_feature_list_icon'>
                          <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                            <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                          </svg>
                        </div>
                        <div className='pricing_feature_list_point'>Unlimited Users</div>
                      </Tooltip>
                    </li>
                    <li className='pricing_feature_list pricing_feature_list--central'>
                      <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                        <div className='pricing_feature_list_icon'>
                          <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                            <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                          </svg>
                        </div>
                        <div className='pricing_feature_list_point'>Online training</div>
                      </Tooltip>
                    </li>
                    <li className='pricing_feature_list pricing_feature_list--central'>
                      <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                        <div className='pricing_feature_list_icon'>
                          <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                            <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                          </svg>
                        </div>
                        <div className='pricing_feature_list_point'>Automatic Updates</div>
                      </Tooltip>
                    </li>
                    <li className='pricing_feature_list pricing_feature_list--central'>
                      <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                        <div className='pricing_feature_list_icon'>
                          <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                            <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                          </svg>
                        </div>
                        <div className='pricing_feature_list_point'>Email & Phone support</div>
                      </Tooltip>
                    </li>

                    <li className='pricing_feature_list pricing_feature_list--central'>
                      <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                        <div className='pricing_feature_list_icon'>
                          <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                            <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                          </svg>
                        </div>
                        <div className='pricing_feature_list_point'>Mobile App</div>
                      </Tooltip>
                    </li>
                    <li className='pricing_feature_list pricing_feature_list--central'>
                      <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                        <div className='pricing_feature_list_icon'>
                          <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                            <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                          </svg>
                        </div>
                        <div className='pricing_feature_list_point'>Biometric Attendance</div>
                      </Tooltip>
                    </li>
                    <li className='pricing_feature_list pricing_feature_list--central'>
                      <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                        <div className='pricing_feature_list_icon'>
                          <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                            <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                          </svg>
                        </div>
                        <div className='pricing_feature_list_point'>Online Fee Payment</div>
                      </Tooltip>
                    </li>
                    <li className='pricing_feature_list pricing_feature_list--central'>
                      <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                        <div className='pricing_feature_list_icon'>
                          <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                            <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                          </svg>
                        </div>
                        <div className='pricing_feature_list_point'>Free School Website</div>
                      </Tooltip>
                    </li>
                  </ul>
                </CenterPricingCard>
                <SidePricingCard priceTag={isAnnual === true ? "Rs. 36000" : "Rs. 3000"} title='For Ultimate Use' priceAmount={isAnnual === true ? 36000 : 3000}>
                  <ul>
                    <li className='pricing_feature_list'>
                      <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                        <div className='pricing_feature_list_icon'>
                          <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                            <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                          </svg>
                        </div>
                        <div className='pricing_feature_list_point'>Up to 1500 students</div>
                      </Tooltip>
                    </li>

                    <li className='pricing_feature_list'>
                      <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                        <div className='pricing_feature_list_icon'>
                          <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                            <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                          </svg>
                        </div>
                        <div className='pricing_feature_list_point'>21 Core Modules</div>
                      </Tooltip>
                    </li>
                    <li className='pricing_feature_list'>
                      <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                        <div className='pricing_feature_list_icon'>
                          <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                            <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                          </svg>
                        </div>
                        <div className='pricing_feature_list_point'>17 Standard Modules</div>
                      </Tooltip>
                    </li>

                    <li className='pricing_feature_list'>
                      <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                        <div className='pricing_feature_list_icon'>
                          <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                            <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                          </svg>
                        </div>
                        <div className='pricing_feature_list_point'>10 Premium Modules</div>
                      </Tooltip>
                    </li>

                    <strike>
                      <li className='pricing_feature_list'>
                        <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                          <div className='pricing_feature_list_icon'>
                            <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                              <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                            </svg>
                          </div>
                          <div className='pricing_feature_list_point'>12 Ultimate Modules</div>
                        </Tooltip>
                      </li>
                    </strike>

                    <li className='pricing_feature_list'>
                      <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                        <div className='pricing_feature_list_icon'>
                          <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                            <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                          </svg>
                        </div>
                        <div className='pricing_feature_list_point'>Unlimited Users</div>
                      </Tooltip>
                    </li>
                    <li className='pricing_feature_list'>
                      <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                        <div className='pricing_feature_list_icon'>
                          <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                            <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                          </svg>
                        </div>
                        <div className='pricing_feature_list_point'>Online training</div>
                      </Tooltip>
                    </li>
                    <li className='pricing_feature_list'>
                      <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                        <div className='pricing_feature_list_icon'>
                          <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                            <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                          </svg>
                        </div>
                        <div className='pricing_feature_list_point'>Automatic Updates</div>
                      </Tooltip>
                    </li>
                    <li className='pricing_feature_list'>
                      <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                        <div className='pricing_feature_list_icon'>
                          <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                            <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                          </svg>
                        </div>
                        <div className='pricing_feature_list_point'>Email & Phone support</div>
                      </Tooltip>
                    </li>

                    <li className='pricing_feature_list'>
                      <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                        <div className='pricing_feature_list_icon'>
                          <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                            <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                          </svg>
                        </div>
                        <div className='pricing_feature_list_point'>Mobile App</div>
                      </Tooltip>
                    </li>
                    <li className='pricing_feature_list'>
                      <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                        <div className='pricing_feature_list_icon'>
                          <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                            <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                          </svg>
                        </div>
                        <div className='pricing_feature_list_point'>Biometric Attendance</div>
                      </Tooltip>
                    </li>
                    <li className='pricing_feature_list'>
                      <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                        <div className='pricing_feature_list_icon'>
                          <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                            <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                          </svg>
                        </div>
                        <div className='pricing_feature_list_point'>Online Fee Payment</div>
                      </Tooltip>
                    </li>
                    <li className='pricing_feature_list'>
                      <Tooltip message={"Indicates total due amount of the school! This data is sum of all resource the software is using"}>
                        <div className='pricing_feature_list_icon'>
                          <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                            <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                          </svg>
                        </div>
                        <div className='pricing_feature_list_point'>Free School Website</div>
                      </Tooltip>
                    </li>
                  </ul>
                </SidePricingCard>
              </div>
            </main>
          </div>
        </div>
      </section>
      <FeatureTour />
    </div>
  );
}
