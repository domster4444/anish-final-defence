//@ts-nocheck

/**
 * @mockup_resource https://shotsnapp.com/
 * @mockup_resource https://mockuphone.com/device?type=ios#iphone13
 * https://mockupbro.com/mockup/standing-blu-ray-disk-with-cover-mockup
 */

"use client";
import { useEffect, useState } from "react";

import Script from "next/script";
import Outline from "components/Outline";

import "./homePageStyles.css";

import { useGetAllMutation } from "@/app/GlobalRedux/API/reviewCategoryApi";

export default function Home() {
  const [getAllCategoryForHomePage, { data, error, isLoading }] = useGetAllMutation();
  const [reviewCategoryList, setReviewCategoryList] = useState([]);

  useEffect(() => {
    getAllCategoryForHomePage().then((res) => {
      console.log(res.data.data);
      setReviewCategoryList(res.data.data);
    });
  }, []);

  return (
    <>
      <Outline>
        <div class='style-0'>
          <div data-constellation-section-theme='black' class='style-1'></div>
          <main role='main' class='style-2'>
            <div class='style-3'></div>
            <div data-constellation-section-theme='green' class='style-4'>
              <div class='style-5'>
                <div class='style-6'>
                  <picture class='style-7'>
                    <source type='image/webp' srcset='https://consumersite-assets.trustpilot.net/consumersite-home/public/hero-banner/hero-image-xxs.webp' media='(max-width: 359px)' class='style-8' />
                    <source type='image/png' srcset='https://consumersite-assets.trustpilot.net/consumersite-home/public/hero-banner/hero-image-xxs.png' media='(max-width: 359px)' class='style-9' />
                    <source type='image/webp' srcset='https://consumersite-assets.trustpilot.net/consumersite-home/public/hero-banner/hero-image-xs.webp' media='(max-width: 659px)' class='style-10' />
                    <source type='image/png' srcset='https://consumersite-assets.trustpilot.net/consumersite-home/public/hero-banner/hero-image-xs.png' media='(max-width: 659px)' class='style-11' />
                    <source type='image/webp' srcset='https://consumersite-assets.trustpilot.net/consumersite-home/public/hero-banner/hero-image-s.webp' media='(max-width: 1023px)' class='style-12' />
                    <source type='image/png' srcset='https://consumersite-assets.trustpilot.net/consumersite-home/public/hero-banner/hero-image-s.png' media='(max-width: 1023px)' class='style-13' />
                    <source type='image/webp' srcset='https://consumersite-assets.trustpilot.net/consumersite-home/public/hero-banner/hero-image-l.webp' media='(min-width: 1024px)' class='style-14' />
                    <source type='image/png' srcset='https://consumersite-assets.trustpilot.net/consumersite-home/public/hero-banner/hero-image-l.png' media='(min-width: 1024px)' class='style-15' />
                    <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/hero-banner/hero-image-s.png' alt='heroImage' class='style-16' />
                  </picture>
                </div>
                <div class='style-17'>
                  <div class='style-18'>
                    <h1 class='style-19'>Read reviews. Write reviews.</h1>
                    <p class='style-20'>
                      Find companies you can <span class='style-21'>trust.</span>
                    </p>
                    <div data-constellation-section-theme='default' class='style-22'>
                      <div class='style-23'>
                        <form class='style-24' autocomplete='off'>
                          <div class='style-25'>
                            <input class='style-26' placeholder='Company or category' name='query' type='search' data-home-search-input='true' value='' />
                            <button class='style-27' name='search-button' type='submit' data-search-button-button='true'>
                              <span class='style-28'>Search</span>
                            </button>
                            <button class='style-29' name='search-button' type='submit' aria-label='Search' data-search-button-button='true'>
                              <span class='style-30'>
                                <svg viewBox='0 0 16 16' fill='inherit' class='style-31' xmlns='http://www.w3.org/2000/svg' width='24px' height='24px'>
                                  <path fill-rule='evenodd' clip-rule='evenodd' d='M3 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM6.75 2a4.75 4.75 0 1 0 2.987 8.444l3.91 3.91.707-.708-3.91-3.91A4.75 4.75 0 0 0 6.75 2Z' class='style-32'></path>
                                </svg>
                              </span>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <section class='style-33'>
              <div class='style-34'>
                <div class='style-35'>
                  <h2 class='style-36'>Our categories</h2>
                  <a href='/categories' target='_self' class='style-37'>
                    <span class='style-38'>View all</span>
                  </a>
                </div>
                <div class='style-39'>
                  <button class='style-40' name='next-categories-carousel-page' type='button' aria-label='View next page of categories' data-next-categories-carousel-page-button='true'>
                    <span class='style-41'>
                      <svg viewBox='0 0 16 16' class='style-42' xmlns='http://www.w3.org/2000/svg' width='16px' height='16px'>
                        <path fill-rule='evenodd' clip-rule='evenodd' d='M10.51 7.776 3.953 2.158l.65-.759 7.444 6.377-7.443 6.382-.651-.759 6.557-5.623Z' class='style-43'></path>
                      </svg>
                    </span>
                  </button>
                  <div class='style-44'>
                    <div class='style-45'>
                      {reviewCategoryList.map((category) => {
                        return (
                          <div class='style-46'>
                            <p class='style-49 text-center mt-8 uppercase font-bold'>{category.name}</p>
                          </div>
                        );
                      })}
                    </div>
                    <div class='style-94'>
                      <div class='style-95'>
                        <a href='categories/bedroom_furniture_store' target='_self' class='style-96'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/bedroom_furniture.svg' class='style-97' alt='' />
                          <p class='style-98'>Bedroom Furniture Store</p>
                        </a>
                      </div>
                      <div class='style-99'>
                        <a href='categories/activewear_store' target='_self' class='style-100'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/activewear.svg' class='style-101' alt='' />
                          <p class='style-102'>Activewear Store</p>
                        </a>
                      </div>
                      <div class='style-103'>
                        <a href='categories/womens_clothing_store' target='_self' class='style-104'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/womens_clothing_store.svg' class='style-105' alt='' />
                          <p class='style-106'>Women's Clothing Store</p>
                        </a>
                      </div>
                      <div class='style-107'>
                        <a href='categories/mens_clothing_store' target='_self' class='style-108'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/mens_clothing_store.svg' class='style-109' alt='' />
                          <p class='style-110'>Men's Clothing Store</p>
                        </a>
                      </div>
                      <div class='style-111'>
                        <a href='categories/bicycle_store' target='_self' class='style-112'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/bicycle_shop.svg' class='style-113' alt='' />
                          <p class='style-114'>Bicycle Store</p>
                        </a>
                      </div>
                      <div class='style-115'>
                        <a href='categories/shoe_store' target='_self' class='style-116'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/shoe_store.svg' class='style-117' alt='' />
                          <p class='style-118'>Shoe Store</p>
                        </a>
                      </div>
                      <div class='style-119'>
                        <a href='categories/mortgage_broker' target='_self' class='style-120'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/mortgage_broker.svg' class='style-121' alt='' />
                          <p class='style-122'>Mortgage Broker</p>
                        </a>
                      </div>
                      <div class='style-123'>
                        <a href='categories/appliance_store' target='_self' class='style-124'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/appliance_store.svg' class='style-125' alt='' />
                          <p class='style-126'>Appliance Store</p>
                        </a>
                      </div>
                      <div class='style-127'>
                        <a href='categories/cosmetics_store' target='_self' class='style-128'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/cosmetics_store.svg' class='style-129' alt='' />
                          <p class='style-130'>Cosmetics Store</p>
                        </a>
                      </div>
                      <div class='style-131'>
                        <a href='categories/electronics_store' target='_self' class='style-132'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/electronic_store.svg' class='style-133' alt='' />
                          <p class='style-134'>Electronics Store</p>
                        </a>
                      </div>
                      <div class='style-135'>
                        <a href='categories/garden_center' target='_self' class='style-136'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/garden_center.svg' class='style-137' alt='' />
                          <p class='style-138'>Garden Center</p>
                        </a>
                      </div>
                      <div class='style-139'>
                        <a href='categories/travel_agency' target='_self' class='style-140'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/travel_agency.svg' class='style-141' alt='' />
                          <p class='style-142'>Travel Agency</p>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class='style-143'>
                    <div class='style-144' aria-hidden='true'></div>
                    <div class='style-145' aria-hidden='true'></div>
                  </div>
                </div>
                <div class='style-146'>
                  <button class='style-147' name='next-categories-carousel-page' type='button' aria-label='View next page of categories' data-next-categories-carousel-page-button='true'>
                    <span class='style-148'>
                      <svg viewBox='0 0 16 16' class='style-149' xmlns='http://www.w3.org/2000/svg' width='16px' height='16px'>
                        <path fill-rule='evenodd' clip-rule='evenodd' d='M10.51 7.776 3.953 2.158l.65-.759 7.444 6.377-7.443 6.382-.651-.759 6.557-5.623Z' class='style-150'></path>
                      </svg>
                    </span>
                  </button>
                  <div class='style-151'>
                    <div class='style-152'>
                      <div class='style-153'>
                        <a href='categories/bank' target='_self' class='style-154'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/banks.svg' class='style-155' alt='' />
                          <p class='style-156'>Bank</p>
                        </a>
                      </div>
                      <div class='style-157'>
                        <a href='categories/travel_insurance_company' target='_self' class='style-158'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/travel_insurance.svg' class='style-159' alt='' />
                          <p class='style-160'>Travel Insurance Company</p>
                        </a>
                      </div>
                      <div class='style-161'>
                        <a href='categories/car_dealer' target='_self' class='style-162'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/car_dealer.svg' class='style-163' alt='' />
                          <p class='style-164'>Car Dealer</p>
                        </a>
                      </div>
                      <div class='style-165'>
                        <a href='categories/furniture_store' target='_self' class='style-166'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/furniture_store.svg' class='style-167' alt='' />
                          <p class='style-168'>Furniture Store</p>
                        </a>
                      </div>
                      <div class='style-169'>
                        <a href='categories/jewelry_store' target='_self' class='style-170'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/jewelry_store.svg' class='style-171' alt='' />
                          <p class='style-172'>Jewelry Store</p>
                        </a>
                      </div>
                      <div class='style-173'>
                        <a href='categories/clothing_store' target='_self' class='style-174'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/clothing_store.svg' class='style-175' alt='' />
                          <p class='style-176'>Clothing Store</p>
                        </a>
                      </div>
                      <div class='style-177'>
                        <a href='categories/electronics_technology' target='_self' class='style-178'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/electronics_technology.svg' class='style-179' alt='' />
                          <p class='style-180'>Electronics &amp; Technology</p>
                        </a>
                      </div>
                      <div class='style-181'>
                        <a href='categories/fitness_and_nutrition_service' target='_self' class='style-182'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/fitness_nutrition_center.svg' class='style-183' alt='' />
                          <p class='style-184'>Fitness and Nutrition Service</p>
                        </a>
                      </div>
                    </div>
                    <div class='style-185'>
                      <div class='style-186'>
                        <a href='categories/pet_store' target='_self' class='style-187'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/pet_store.svg' class='style-188' alt='' />
                          <p class='style-189'>Pet Store</p>
                        </a>
                      </div>
                      <div class='style-190'>
                        <a href='categories/energy_supplier' target='_self' class='style-191'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/energy_supplier.svg' class='style-192' alt='' />
                          <p class='style-193'>Energy Supplier</p>
                        </a>
                      </div>
                      <div class='style-194'>
                        <a href='categories/real_estate_agents' target='_self' class='style-195'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/real_estate_agents.svg' class='style-196' alt='' />
                          <p class='style-197'>Real Estate Agents</p>
                        </a>
                      </div>
                      <div class='style-198'>
                        <a href='categories/insurance_agency' target='_self' class='style-199'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/insurance_agency.svg' class='style-200' alt='' />
                          <p class='style-201'>Insurance Agency</p>
                        </a>
                      </div>
                      <div class='style-202'>
                        <a href='categories/bedroom_furniture_store' target='_self' class='style-203'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/bedroom_furniture.svg' class='style-204' alt='' />
                          <p class='style-205'>Bedroom Furniture Store</p>
                        </a>
                      </div>
                      <div class='style-206'>
                        <a href='categories/activewear_store' target='_self' class='style-207'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/activewear.svg' class='style-208' alt='' />
                          <p class='style-209'>Activewear Store</p>
                        </a>
                      </div>
                      <div class='style-210'>
                        <a href='categories/womens_clothing_store' target='_self' class='style-211'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/womens_clothing_store.svg' class='style-212' alt='' />
                          <p class='style-213'>Women's Clothing Store</p>
                        </a>
                      </div>
                      <div class='style-214'>
                        <a href='categories/mens_clothing_store' target='_self' class='style-215'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/mens_clothing_store.svg' class='style-216' alt='' />
                          <p class='style-217'>Men's Clothing Store</p>
                        </a>
                      </div>
                    </div>
                    <div class='style-218'>
                      <div class='style-219'>
                        <a href='categories/bicycle_store' target='_self' class='style-220'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/bicycle_shop.svg' class='style-221' alt='' />
                          <p class='style-222'>Bicycle Store</p>
                        </a>
                      </div>
                      <div class='style-223'>
                        <a href='categories/shoe_store' target='_self' class='style-224'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/shoe_store.svg' class='style-225' alt='' />
                          <p class='style-226'>Shoe Store</p>
                        </a>
                      </div>
                      <div class='style-227'>
                        <a href='categories/mortgage_broker' target='_self' class='style-228'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/mortgage_broker.svg' class='style-229' alt='' />
                          <p class='style-230'>Mortgage Broker</p>
                        </a>
                      </div>
                      <div class='style-231'>
                        <a href='categories/appliance_store' target='_self' class='style-232'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/appliance_store.svg' class='style-233' alt='' />
                          <p class='style-234'>Appliance Store</p>
                        </a>
                      </div>
                      <div class='style-235'>
                        <a href='categories/cosmetics_store' target='_self' class='style-236'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/cosmetics_store.svg' class='style-237' alt='' />
                          <p class='style-238'>Cosmetics Store</p>
                        </a>
                      </div>
                      <div class='style-239'>
                        <a href='categories/electronics_store' target='_self' class='style-240'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/electronic_store.svg' class='style-241' alt='' />
                          <p class='style-242'>Electronics Store</p>
                        </a>
                      </div>
                      <div class='style-243'>
                        <a href='categories/garden_center' target='_self' class='style-244'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/garden_center.svg' class='style-245' alt='' />
                          <p class='style-246'>Garden Center</p>
                        </a>
                      </div>
                      <div class='style-247'>
                        <a href='categories/travel_agency' target='_self' class='style-248'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/travel_agency.svg' class='style-249' alt='' />
                          <p class='style-250'>Travel Agency</p>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class='style-251'>
                    <div class='style-252' aria-hidden='true'></div>
                    <div class='style-253' aria-hidden='true'></div>
                    <div class='style-254' aria-hidden='true'></div>
                  </div>
                </div>
                <div class='style-255'>
                  <button class='style-256' name='next-categories-carousel-page' type='button' aria-label='View next page of categories' data-next-categories-carousel-page-button='true'>
                    <span class='style-257'>
                      <svg viewBox='0 0 16 16' class='style-258' xmlns='http://www.w3.org/2000/svg' width='16px' height='16px'>
                        <path fill-rule='evenodd' clip-rule='evenodd' d='M10.51 7.776 3.953 2.158l.65-.759 7.444 6.377-7.443 6.382-.651-.759 6.557-5.623Z' class='style-259'></path>
                      </svg>
                    </span>
                  </button>
                  <div class='style-260'>
                    <div class='style-261'>
                      <div class='style-262'>
                        <a href='categories/bank' target='_self' class='style-263'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/banks.svg' class='style-264' alt='' />
                          <p class='style-265'>Bank</p>
                        </a>
                      </div>
                      <div class='style-266'>
                        <a href='categories/travel_insurance_company' target='_self' class='style-267'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/travel_insurance.svg' class='style-268' alt='' />
                          <p class='style-269'>Travel Insurance Company</p>
                        </a>
                      </div>
                      <div class='style-270'>
                        <a href='categories/car_dealer' target='_self' class='style-271'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/car_dealer.svg' class='style-272' alt='' />
                          <p class='style-273'>Car Dealer</p>
                        </a>
                      </div>
                      <div class='style-274'>
                        <a href='categories/furniture_store' target='_self' class='style-275'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/furniture_store.svg' class='style-276' alt='' />
                          <p class='style-277'>Furniture Store</p>
                        </a>
                      </div>
                    </div>
                    <div class='style-278'>
                      <div class='style-279'>
                        <a href='categories/jewelry_store' target='_self' class='style-280'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/jewelry_store.svg' class='style-281' alt='' />
                          <p class='style-282'>Jewelry Store</p>
                        </a>
                      </div>
                      <div class='style-283'>
                        <a href='categories/clothing_store' target='_self' class='style-284'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/clothing_store.svg' class='style-285' alt='' />
                          <p class='style-286'>Clothing Store</p>
                        </a>
                      </div>
                      <div class='style-287'>
                        <a href='categories/electronics_technology' target='_self' class='style-288'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/electronics_technology.svg' class='style-289' alt='' />
                          <p class='style-290'>Electronics &amp; Technology</p>
                        </a>
                      </div>
                      <div class='style-291'>
                        <a href='categories/fitness_and_nutrition_service' target='_self' class='style-292'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/fitness_nutrition_center.svg' class='style-293' alt='' />
                          <p class='style-294'>Fitness and Nutrition Service</p>
                        </a>
                      </div>
                    </div>
                    <div class='style-295'>
                      <div class='style-296'>
                        <a href='categories/pet_store' target='_self' class='style-297'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/pet_store.svg' class='style-298' alt='' />
                          <p class='style-299'>Pet Store</p>
                        </a>
                      </div>
                      <div class='style-300'>
                        <a href='categories/energy_supplier' target='_self' class='style-301'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/energy_supplier.svg' class='style-302' alt='' />
                          <p class='style-303'>Energy Supplier</p>
                        </a>
                      </div>
                      <div class='style-304'>
                        <a href='categories/real_estate_agents' target='_self' class='style-305'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/real_estate_agents.svg' class='style-306' alt='' />
                          <p class='style-307'>Real Estate Agents</p>
                        </a>
                      </div>
                      <div class='style-308'>
                        <a href='categories/insurance_agency' target='_self' class='style-309'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/insurance_agency.svg' class='style-310' alt='' />
                          <p class='style-311'>Insurance Agency</p>
                        </a>
                      </div>
                    </div>
                    <div class='style-312'>
                      <div class='style-313'>
                        <a href='categories/bedroom_furniture_store' target='_self' class='style-314'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/bedroom_furniture.svg' class='style-315' alt='' />
                          <p class='style-316'>Bedroom Furniture Store</p>
                        </a>
                      </div>
                      <div class='style-317'>
                        <a href='categories/activewear_store' target='_self' class='style-318'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/activewear.svg' class='style-319' alt='' />
                          <p class='style-320'>Activewear Store</p>
                        </a>
                      </div>
                      <div class='style-321'>
                        <a href='categories/womens_clothing_store' target='_self' class='style-322'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/womens_clothing_store.svg' class='style-323' alt='' />
                          <p class='style-324'>Women's Clothing Store</p>
                        </a>
                      </div>
                      <div class='style-325'>
                        <a href='categories/mens_clothing_store' target='_self' class='style-326'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/mens_clothing_store.svg' class='style-327' alt='' />
                          <p class='style-328'>Men's Clothing Store</p>
                        </a>
                      </div>
                    </div>
                    <div class='style-329'>
                      <div class='style-330'>
                        <a href='categories/bicycle_store' target='_self' class='style-331'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/bicycle_shop.svg' class='style-332' alt='' />
                          <p class='style-333'>Bicycle Store</p>
                        </a>
                      </div>
                      <div class='style-334'>
                        <a href='categories/shoe_store' target='_self' class='style-335'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/shoe_store.svg' class='style-336' alt='' />
                          <p class='style-337'>Shoe Store</p>
                        </a>
                      </div>
                      <div class='style-338'>
                        <a href='categories/mortgage_broker' target='_self' class='style-339'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/mortgage_broker.svg' class='style-340' alt='' />
                          <p class='style-341'>Mortgage Broker</p>
                        </a>
                      </div>
                      <div class='style-342'>
                        <a href='categories/appliance_store' target='_self' class='style-343'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/appliance_store.svg' class='style-344' alt='' />
                          <p class='style-345'>Appliance Store</p>
                        </a>
                      </div>
                    </div>
                    <div class='style-346'>
                      <div class='style-347'>
                        <a href='categories/cosmetics_store' target='_self' class='style-348'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/cosmetics_store.svg' class='style-349' alt='' />
                          <p class='style-350'>Cosmetics Store</p>
                        </a>
                      </div>
                      <div class='style-351'>
                        <a href='categories/electronics_store' target='_self' class='style-352'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/electronic_store.svg' class='style-353' alt='' />
                          <p class='style-354'>Electronics Store</p>
                        </a>
                      </div>
                      <div class='style-355'>
                        <a href='categories/garden_center' target='_self' class='style-356'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/garden_center.svg' class='style-357' alt='' />
                          <p class='style-358'>Garden Center</p>
                        </a>
                      </div>
                      <div class='style-359'>
                        <a href='categories/travel_agency' target='_self' class='style-360'>
                          <img src='https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/travel_agency.svg' class='style-361' alt='' />
                          <p class='style-362'>Travel Agency</p>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class='style-363'>
                    <div class='style-364' aria-hidden='true'></div>
                    <div class='style-365' aria-hidden='true'></div>
                    <div class='style-366' aria-hidden='true'></div>
                    <div class='style-367' aria-hidden='true'></div>
                    <div class='style-368' aria-hidden='true'></div>
                    <div class='style-369' aria-hidden='true'></div>
                  </div>
                </div>
              </div>
            </section>
            <div class='style-370' data-business-promo-banner='true'>
              <h3 class='style-371'>Are you a business?</h3>
              <a href='https://business.trustpilot.com?utm_medium=consumer&amp;utm_source=homepage_banner&amp;utm_campaign=consumer_cta' target='_self' class='style-372'>
                <span class='style-373'>Get started</span>
              </a>
            </div>
            <div class='style-374' data-activity-stream='true'>
              <h2 class='style-375'>Recent reviews</h2>
              <div class='style-376' data-activity-stream-wrapper='true'>
                <div class='style-377'>
                  <div class='style-378' data-activity-stream-column='true'>
                    <div class='style-379'>
                      <div class='style-380'>
                        <div class='style-381'>
                          <img class='style-382' src='//user-images.trustpilot.com/661a4de20052f80012977d2e/64x64.png' alt='Gaming with Anmol .' decoding='async' loading='lazy' />
                          <div class='style-383'>
                            <div class='style-384'>
                              <img alt='Rated 4 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-4.svg' class='style-385' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-386'>
                          <a href='users/661a4de20052f80012977d2e' rel='nofollow' target='_self' class='style-387'>
                            Gaming with Anmol .
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/www.openreach.co.uk' target='_self' class='style-388'>
                            Openreach
                          </a>
                        </h3>
                        <p class='style-389'>“Great speed ”</p>
                      </div>
                    </div>
                    <div class='style-390'>
                      <div class='style-391'>
                        <div class='style-392'>
                          <img class='style-393' src='//user-images.trustpilot.com/645e6900ba62d100131de8db/64x64.png' alt='Margarita Camilla' decoding='async' loading='lazy' />
                          <div class='style-394'>
                            <div class='style-395'>
                              <img alt='Rated 2 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-2.svg' class='style-396' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-397'>
                          <a href='users/645e6900ba62d100131de8db' rel='nofollow' target='_self' class='style-398'>
                            Margarita Camilla
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/sweepslots.com' target='_self' class='style-399'>
                            sweepslots.com
                          </a>
                        </h3>
                        <p class='style-400'>“Honestly when I signed up for this casino I was thrilled with the sign on bonus and not only that I thought the platform was very bright and inviting but on the...”</p>
                      </div>
                    </div>
                  </div>
                  <div class='style-401' data-activity-stream-column='true'>
                    <div class='style-402'>
                      <div class='style-403'>
                        <div class='style-404'>
                          <img class='style-405' src='//user-images.trustpilot.com/62deea241c9e1c0012981176/64x64.png' alt='Stephen Judge' decoding='async' loading='lazy' />
                          <div class='style-406'>
                            <div class='style-407'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-408' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-409'>
                          <a href='users/62deea241c9e1c0012981176' rel='nofollow' target='_self' class='style-410'>
                            Stephen Judge
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/carmats4u.com' target='_self' class='style-411'>
                            Carmats4u
                          </a>
                        </h3>
                        <p class='style-412'>“"They’ve arrived, they fit, they look great. I ordered the most expensive ‘rubber’ mats for my Audi RS5 and the raised diamond ribbing really complements the he...”</p>
                      </div>
                    </div>
                    <div class='style-413'>
                      <div class='style-414'>
                        <div class='style-415'>
                          <img class='style-416' src='//user-images.trustpilot.com/661a4ccb912cf3001240e9d2/64x64.png' alt='Nikita Babar' decoding='async' loading='lazy' />
                          <div class='style-417'>
                            <div class='style-418'>
                              <img alt='Rated 3 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-3.svg' class='style-419' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-420'>
                          <a href='users/661a4ccb912cf3001240e9d2' rel='nofollow' target='_self' class='style-421'>
                            Nikita Babar
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/office-pdf.com' target='_self' class='style-422'>
                            Office Pdf
                          </a>
                        </h3>
                        <p class='style-423'>“VERY HELPFUL”</p>
                      </div>
                    </div>
                  </div>
                  <div class='style-424' data-activity-stream-column='true'>
                    <div class='style-425'>
                      <div class='style-426'>
                        <div class='style-427'>
                          <img class='style-428' src='//user-images.trustpilot.com/64fc402bc70c7000137b9612/64x64.png' alt='Giusy Cannavale' decoding='async' loading='lazy' />
                          <div class='style-429'>
                            <div class='style-430'>
                              <img alt='Rated 4 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-4.svg' class='style-431' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-432'>
                          <a href='users/64fc402bc70c7000137b9612' rel='nofollow' target='_self' class='style-433'>
                            Giusy Cannavale
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/www.edreams.com' target='_self' class='style-434'>
                            eDreams
                          </a>
                        </h3>
                        <p class='style-435'>“Very kind and helpful”</p>
                      </div>
                    </div>
                    <div class='style-436'>
                      <div class='style-437'>
                        <div class='style-438'>
                          <img class='style-439' src='//user-images.trustpilot.com/661a4b01427b7a0011a6bf68/64x64.png' alt='Antoine Michael' decoding='async' loading='lazy' />
                          <div class='style-440'>
                            <div class='style-441'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-442' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-443'>
                          <a href='users/661a4b01427b7a0011a6bf68' rel='nofollow' target='_self' class='style-444'>
                            Antoine Michael
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/vogany.com' target='_self' class='style-445'>
                            Vogany
                          </a>
                        </h3>
                        <p class='style-446'>“I recently had a fantastic experience shopping at Vogany.com! Not only was the quality of the products impressive, but the customer service was exceptionally he...”</p>
                      </div>
                    </div>
                  </div>
                  <div class='style-447' data-activity-stream-column='true'>
                    <div class='style-448'>
                      <div class='style-449'>
                        <div class='style-450'>
                          <img class='style-451' src='//user-images.trustpilot.com/5c830888f46be340fa3569c6/64x64.png' alt='Chandan Puri' decoding='async' loading='lazy' />
                          <div class='style-452'>
                            <div class='style-453'>
                              <img alt='Rated 3 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-3.svg' class='style-454' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-455'>
                          <a href='users/5c830888f46be340fa3569c6' rel='nofollow' target='_self' class='style-456'>
                            Chandan Puri
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/www.cbet.gg' target='_self' class='style-457'>
                            Cbet.gg
                          </a>
                        </h3>
                        <p class='style-458'>“I feel that this was gud web site to play like I play on stake robet bitstarz drift first they have cancel my withwal and told me to hold for 72 hours try aft...”</p>
                      </div>
                    </div>
                    <div class='style-459'>
                      <div class='style-460'>
                        <div class='style-461'>
                          <img class='style-462' src='//user-images.trustpilot.com/661a4ce10052f80012977c99/64x64.png' alt='Buvana Vignesh' decoding='async' loading='lazy' />
                          <div class='style-463'>
                            <div class='style-464'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-465' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-466'>
                          <a href='users/661a4ce10052f80012977c99' rel='nofollow' target='_self' class='style-467'>
                            Buvana Vignesh
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/lebara.com' target='_self' class='style-468'>
                            Lebara Mobile (UK)
                          </a>
                        </h3>
                        <p class='style-469'>“Asish provided quick resolution”</p>
                      </div>
                    </div>
                  </div>
                  <div class='style-470' data-activity-stream-column='true'>
                    <div class='style-471'>
                      <div class='style-472'>
                        <div class='style-473'>
                          <img class='style-474' src='//user-images.trustpilot.com/661a4ce8427b7a0011a6c0a0/64x64.png' alt='Shayvakeya profit' decoding='async' loading='lazy' />
                          <div class='style-475'>
                            <div class='style-476'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-477' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-478'>
                          <a href='users/661a4ce8427b7a0011a6c0a0' rel='nofollow' target='_self' class='style-479'>
                            Shayvakeya profit
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/www.giftcards.com' target='_self' class='style-480'>
                            GiftCards.com
                          </a>
                        </h3>
                        <p class='style-481'>“Great varity and you get them fast.”</p>
                      </div>
                    </div>
                    <div class='style-482'>
                      <div class='style-483'>
                        <div class='style-484'>
                          <img class='style-485' src='//user-images.trustpilot.com/52c6e94a00006400015cbe55/64x64.png' alt='Paul Burbidge' decoding='async' loading='lazy' />
                          <div class='style-486'>
                            <div class='style-487'>
                              <img alt='Rated 1 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-1.svg' class='style-488' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-489'>
                          <a href='users/52c6e94a00006400015cbe55' rel='nofollow' target='_self' class='style-490'>
                            Paul Burbidge
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/afkletters.com' target='_self' class='style-491'>
                            AFK Letters
                          </a>
                        </h3>
                        <p class='style-492'>“Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords. The above is written in...”</p>
                      </div>
                    </div>
                  </div>
                  <div class='style-493' data-activity-stream-column='true'>
                    <div class='style-494'>
                      <div class='style-495'>
                        <div class='style-496'>
                          <img class='style-497' src='//user-images.trustpilot.com/5a44e32b0000ff000af73e8d/64x64.png' alt='Rebecca Capel' decoding='async' loading='lazy' />
                          <div class='style-498'>
                            <div class='style-499'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-500' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-501'>
                          <a href='users/5a44e32b0000ff000af73e8d' rel='nofollow' target='_self' class='style-502'>
                            Rebecca Capel
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/cityfibre.com' target='_self' class='style-503'>
                            CityFibre
                          </a>
                        </h3>
                        <p class='style-504'>“The installation went perfectly, the guys were polite, and respectful to the property. The installation only took an hour and a half and was all discussed with ...”</p>
                      </div>
                    </div>
                    <div class='style-505'>
                      <div class='style-506'>
                        <div class='style-507'>
                          <img class='style-508' src='//user-images.trustpilot.com/661a4e68fc6ed600122c7275/64x64.png' alt='Kekhrie Zao' decoding='async' loading='lazy' />
                          <div class='style-509'>
                            <div class='style-510'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-511' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-512'>
                          <a href='users/661a4e68fc6ed600122c7275' rel='nofollow' target='_self' class='style-513'>
                            Kekhrie Zao
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/moogold.com' target='_self' class='style-514'>
                            MooGold
                          </a>
                        </h3>
                        <p class='style-515'>“Good and instant support by Mr./Ms. Yiing”</p>
                      </div>
                    </div>
                  </div>
                  <div class='style-516' data-activity-stream-column='true'>
                    <div class='style-517'>
                      <div class='style-518'>
                        <div class='style-519'>
                          <img class='style-520' src='//user-images.trustpilot.com/60ad22e958afe7001acea4f0/64x64.png' alt='Stan Kirby' decoding='async' loading='lazy' />
                          <div class='style-521'>
                            <div class='style-522'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-523' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-524'>
                          <a href='users/60ad22e958afe7001acea4f0' rel='nofollow' target='_self' class='style-525'>
                            Stan Kirby
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/www.diy.com' target='_self' class='style-526'>
                            B&amp;Q
                          </a>
                        </h3>
                        <p class='style-527'>“excellent selection of plants in good condition.”</p>
                      </div>
                    </div>
                    <div class='style-528'>
                      <div class='style-529'>
                        <div class='style-530'>
                          <img class='style-531' src='//user-images.trustpilot.com/661a4e270052f80012977d5a/64x64.png' alt='GNG' decoding='async' loading='lazy' />
                          <div class='style-532'>
                            <div class='style-533'>
                              <img alt='Rated 1 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-1.svg' class='style-534' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-535'>
                          <a href='users/661a4e270052f80012977d5a' rel='nofollow' target='_self' class='style-536'>
                            GNG
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/www.mytheresa.com' target='_self' class='style-537'>
                            mytheresa.com
                          </a>
                        </h3>
                        <p class='style-538'>“Just about the most terrible company delivery they said came but it was five weeks late and it was never delivered to us. It was dumped outside and it was lost....”</p>
                      </div>
                    </div>
                  </div>
                  <div class='style-539' data-activity-stream-column='true'>
                    <div class='style-540'>
                      <div class='style-541'>
                        <div class='style-542'>
                          <img class='style-543' src='//user-images.trustpilot.com/661a4ddcfc6ed600122c721c/64x64.png' alt='Paula Robinson' decoding='async' loading='lazy' />
                          <div class='style-544'>
                            <div class='style-545'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-546' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-547'>
                          <a href='users/661a4ddcfc6ed600122c721c' rel='nofollow' target='_self' class='style-548'>
                            Paula Robinson
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/motorhomedepot.com' target='_self' class='style-549'>
                            Motorhome Depot
                          </a>
                        </h3>
                        <p class='style-550'>“We liaised with Rob at motorhome depot when we recently purchased our rollerteam. He was very helpful and prompt in answering questions by telephone and email....”</p>
                      </div>
                    </div>
                    <div class='style-551'>
                      <div class='style-552'>
                        <div class='style-553'>
                          <img class='style-554' src='//user-images.trustpilot.com/56e96e450000ff000a0f3a41/64x64.png' alt=' Mrs Denise Moroney' decoding='async' loading='lazy' />
                          <div class='style-555'>
                            <div class='style-556'>
                              <img alt='Rated 4 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-4.svg' class='style-557' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-558'>
                          <a href='users/56e96e450000ff000a0f3a41' rel='nofollow' target='_self' class='style-559'>
                            {" "}
                            Mrs Denise Moroney
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/arrowxl.co.uk' target='_self' class='style-560'>
                            ArrowXL
                          </a>
                        </h3>
                        <p class='style-561'>“Delivered within the time frame which is always good. ”</p>
                      </div>
                    </div>
                  </div>
                  <div class='style-562' data-activity-stream-column='true'>
                    <div class='style-563'>
                      <div class='style-564'>
                        <div class='style-565'>
                          <img class='style-566' src='//user-images.trustpilot.com/661a4df2912cf3001240ea93/64x64.png' alt='sharn ske' decoding='async' loading='lazy' />
                          <div class='style-567'>
                            <div class='style-568'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-569' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-570'>
                          <a href='users/661a4df2912cf3001240ea93' rel='nofollow' target='_self' class='style-571'>
                            sharn ske
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/ggboost.com' target='_self' class='style-572'>
                            GGBOOST
                          </a>
                        </h3>
                        <p class='style-573'>“nahska was a top booster very quick and great services ”</p>
                      </div>
                    </div>
                    <div class='style-574'>
                      <div class='style-575'>
                        <div class='style-576'>
                          <img class='style-577' src='//user-images.trustpilot.com/648b0603cdcb5500122c4d68/64x64.png' alt='Tatiana Rego' decoding='async' loading='lazy' />
                          <div class='style-578'>
                            <div class='style-579'>
                              <img alt='Rated 1 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-1.svg' class='style-580' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-581'>
                          <a href='users/648b0603cdcb5500122c4d68' rel='nofollow' target='_self' class='style-582'>
                            Tatiana Rego
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/yodel.co.uk' target='_self' class='style-583'>
                            Yodel
                          </a>
                        </h3>
                        <p class='style-584'>“Apparently my parcel was left in the lobby.. I don’t have a lobby in my block! They couldn’t be asked to do their job properly and deliver to my door, they didn...”</p>
                      </div>
                    </div>
                  </div>
                  <div class='style-585' data-activity-stream-column='true'>
                    <div class='style-586'>
                      <div class='style-587'>
                        <div class='style-588'>
                          <img class='style-589' src='//user-images.trustpilot.com/6616aec55e15d50011089f00/64x64.png' alt='Bahram Vazirov' decoding='async' loading='lazy' />
                          <div class='style-590'>
                            <div class='style-591'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-592' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-593'>
                          <a href='users/6616aec55e15d50011089f00' rel='nofollow' target='_self' class='style-594'>
                            Bahram Vazirov
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/askgamblers.com' target='_self' class='style-595'>
                            AskGamblers
                          </a>
                        </h3>
                        <p class='style-596'>“Askgamblers.com is one of the best sites in the market, there one can find all interested information in the sphere of online casino gambling. When I would lik...”</p>
                      </div>
                    </div>
                    <div class='style-597'>
                      <div class='style-598'>
                        <div class='style-599'>
                          <img class='style-600' src='//user-images.trustpilot.com/661a4e09df518e00127e0fde/64x64.png' alt='olam weir vlogs' decoding='async' loading='lazy' />
                          <div class='style-601'>
                            <div class='style-602'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-603' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-604'>
                          <a href='users/661a4e09df518e00127e0fde' rel='nofollow' target='_self' class='style-605'>
                            olam weir vlogs
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/www.winnerwinnerchickendinner.co.uk' target='_self' class='style-606'>
                            Winner Winner Chicken Dinner
                          </a>
                        </h3>
                        <p class='style-607'>“Very efficient with winnings, fabulous customer service ”</p>
                      </div>
                    </div>
                  </div>
                  <div class='style-608' data-activity-stream-column='true'>
                    <div class='style-609'>
                      <div class='style-610'>
                        <div class='style-611'>
                          <img class='style-612' src='//user-images.trustpilot.com/661a4d74912cf3001240ea3e/64x64.png' alt='Natalie McDonagh' decoding='async' loading='lazy' />
                          <div class='style-613'>
                            <div class='style-614'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-615' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-616'>
                          <a href='users/661a4d74912cf3001240ea3e' rel='nofollow' target='_self' class='style-617'>
                            Natalie McDonagh
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/glossybox.co.uk' target='_self' class='style-618'>
                            Glossybox
                          </a>
                        </h3>
                        <p class='style-619'>“When I finally got though to someone they were very helpful”</p>
                      </div>
                    </div>
                    <div class='style-620'>
                      <div class='style-621'>
                        <div class='style-622'>
                          <img class='style-623' src='//user-images.trustpilot.com/661a4e27fc6ed600122c724b/64x64.png' alt='sapna singh' decoding='async' loading='lazy' />
                          <div class='style-624'>
                            <div class='style-625'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-626' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-627'>
                          <a href='users/661a4e27fc6ed600122c724b' rel='nofollow' target='_self' class='style-628'>
                            sapna singh
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/www.caratlane.com' target='_self' class='style-629'>
                            CaratLane
                          </a>
                        </h3>
                        <p class='style-630'>“I was confused about a recent purchase of the ring at caratlane. This guy Vyas is really a professional and efficient who really solved my problem and provided ...”</p>
                      </div>
                    </div>
                  </div>
                  <div class='style-631' data-activity-stream-column='true'>
                    <div class='style-632'>
                      <div class='style-633'>
                        <div class='style-634'>
                          <img class='style-635' src='//user-images.trustpilot.com/661a4d100052f80012977cb4/64x64.png' alt='Diana Zaslavoglou' decoding='async' loading='lazy' />
                          <div class='style-636'>
                            <div class='style-637'>
                              <img alt='Rated 1 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-1.svg' class='style-638' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-639'>
                          <a href='users/661a4d100052f80012977cb4' rel='nofollow' target='_self' class='style-640'>
                            Diana Zaslavoglou
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/www.17track.net' target='_self' class='style-641'>
                            17TRACK
                          </a>
                        </h3>
                        <p class='style-642'>“Where do I start! Tracking continued for a whole month, giving false security! They then said it was delivered, BUT IT WASN'T, the enterprise couldn't help to f...”</p>
                      </div>
                    </div>
                    <div class='style-643'>
                      <div class='style-644'>
                        <div class='style-645'>
                          <img class='style-646' src='//user-images.trustpilot.com/661a4cfad0cd7a0012ae811e/64x64.png' alt='Kyle Sutton' decoding='async' loading='lazy' />
                          <div class='style-647'>
                            <div class='style-648'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-649' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-650'>
                          <a href='users/661a4cfad0cd7a0012ae811e' rel='nofollow' target='_self' class='style-651'>
                            Kyle Sutton
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/ncf.co.uk' target='_self' class='style-652'>
                            NCF LIVING
                          </a>
                        </h3>
                        <p class='style-653'>“Ash from Stoke was very helpful! The store was well set out!”</p>
                      </div>
                    </div>
                  </div>
                  <div class='style-654' data-activity-stream-column='true'>
                    <div class='style-655'>
                      <div class='style-656'>
                        <div class='style-657'>
                          <img class='style-658' src='//user-images.trustpilot.com/661a4dedfc6ed600122c7228/64x64.png' alt='mr aboulfath' decoding='async' loading='lazy' />
                          <div class='style-659'>
                            <div class='style-660'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-661' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-662'>
                          <a href='users/661a4dedfc6ed600122c7228' rel='nofollow' target='_self' class='style-663'>
                            mr aboulfath
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/ebooksoffice.com' target='_self' class='style-664'>
                            ebooksoffice.com
                          </a>
                        </h3>
                        <p class='style-665'>“Great underground ebooks plateform, fortunately it is not famous”</p>
                      </div>
                    </div>
                    <div class='style-666'>
                      <div class='style-667'>
                        <div class='style-668'>
                          <img class='style-669' src='//user-images.trustpilot.com/59f1c08e0000ff000ad9d4c7/64x64.png' alt='Dan Brookman' decoding='async' loading='lazy' />
                          <div class='style-670'>
                            <div class='style-671'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-672' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-673'>
                          <a href='users/59f1c08e0000ff000ad9d4c7' rel='nofollow' target='_self' class='style-674'>
                            Dan Brookman
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/www.bikeparkwales.com' target='_self' class='style-675'>
                            BikePark Wales
                          </a>
                        </h3>
                        <p class='style-676'>“Absolutely brilliant. Quite simply. I visited with my 9 year old son who's an avid mountain biker, the blues were perfect for him to hone his skills before we t...”</p>
                      </div>
                    </div>
                  </div>
                  <div class='style-677' data-activity-stream-column='true'>
                    <div class='style-678'>
                      <div class='style-679'>
                        <div class='style-680'>
                          <img class='style-681' src='//user-images.trustpilot.com/54e6044d0000ff0001ac2ded/64x64.png' alt='Rasa' decoding='async' loading='lazy' />
                          <div class='style-682'>
                            <div class='style-683'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-684' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-685'>
                          <a href='users/54e6044d0000ff0001ac2ded' rel='nofollow' target='_self' class='style-686'>
                            Rasa
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/gousto.co.uk' target='_self' class='style-687'>
                            Gousto
                          </a>
                        </h3>
                        <p class='style-688'>“I tried other boxes but even this one is a bit more expensive than others - it is the best. Also, today courier made a mistake and delivered to the wrong addres...”</p>
                      </div>
                    </div>
                    <div class='style-689'>
                      <div class='style-690'>
                        <div class='style-691'>
                          <img class='style-692' src='//user-images.trustpilot.com/661a4e71427b7a0011a6c18e/64x64.png' alt='Raymond Tansley' decoding='async' loading='lazy' />
                          <div class='style-693'>
                            <div class='style-694'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-695' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-696'>
                          <a href='users/661a4e71427b7a0011a6c18e' rel='nofollow' target='_self' class='style-697'>
                            Raymond Tansley
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/goskippy.com' target='_self' class='style-698'>
                            GoSkippy Insurance
                          </a>
                        </h3>
                        <p class='style-699'>“Fast efficient no bother and a great price for my car insurance. ”</p>
                      </div>
                    </div>
                  </div>
                  <div class='style-700' data-activity-stream-column='true'>
                    <div class='style-701'>
                      <div class='style-702'>
                        <div class='style-703'>
                          <img class='style-704' src='//user-images.trustpilot.com/50febf9600006400012e512e/64x64.png' alt='Mrs Tracey Scullin' decoding='async' loading='lazy' />
                          <div class='style-705'>
                            <div class='style-706'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-707' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-708'>
                          <a href='users/50febf9600006400012e512e' rel='nofollow' target='_self' class='style-709'>
                            Mrs Tracey Scullin
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/uk.virginmoney.com' target='_self' class='style-710'>
                            Virgin Money UK
                          </a>
                        </h3>
                        <p class='style-711'>“Clear communication right through. Can’t fault them setting my cc up. ”</p>
                      </div>
                    </div>
                    <div class='style-712'>
                      <div class='style-713'>
                        <div class='style-714'>
                          <img class='style-715' src='//user-images.trustpilot.com/5ba9063c4de5666d34b46618/64x64.png' alt='customer' decoding='async' loading='lazy' />
                          <div class='style-716'>
                            <div class='style-717'>
                              <img alt='Rated 3 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-3.svg' class='style-718' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-719'>
                          <a href='users/5ba9063c4de5666d34b46618' rel='nofollow' target='_self' class='style-720'>
                            customer
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/www.moneygram.com' target='_self' class='style-721'>
                            MoneyGram International
                          </a>
                        </h3>
                        <p class='style-722'>“To be honest I love to use Moneygram, unfortunately they blocked some of my members family name, that's make it hard for me to transfer money to them anymore. I...”</p>
                      </div>
                    </div>
                  </div>
                  <div class='style-723' data-activity-stream-column='true'>
                    <div class='style-724'>
                      <div class='style-725'>
                        <div class='style-726'>
                          <img class='style-727' src='//user-images.trustpilot.com/661a4d5efc6ed600122c71d3/64x64.png' alt='John Patrick Nobleza' decoding='async' loading='lazy' />
                          <div class='style-728'>
                            <div class='style-729'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-730' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-731'>
                          <a href='users/661a4d5efc6ed600122c71d3' rel='nofollow' target='_self' class='style-732'>
                            John Patrick Nobleza
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/tradingleagues.app' target='_self' class='style-733'>
                            Tradingleagues
                          </a>
                        </h3>
                        <p class='style-734'>“Tradingleagues helped me learn so much about crypto trading. At first, I knew almost nothing about it but with the help of tradingleagues I started to grasp som...”</p>
                      </div>
                    </div>
                    <div class='style-735'>
                      <div class='style-736'>
                        <div class='style-737'>
                          <img class='style-738' src='//user-images.trustpilot.com/661a4d66427b7a0011a6c0ed/64x64.png' alt='Lana Kaaki' decoding='async' loading='lazy' />
                          <div class='style-739'>
                            <div class='style-740'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-741' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-742'>
                          <a href='users/661a4d66427b7a0011a6c0ed' rel='nofollow' target='_self' class='style-743'>
                            Lana Kaaki
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/justlife.com' target='_self' class='style-744'>
                            Justlife
                          </a>
                        </h3>
                        <p class='style-745'>“Bebelyn is very friendly, professional and super clean and fast. Great job. ”</p>
                      </div>
                    </div>
                  </div>
                  <div class='style-746' data-activity-stream-column='true'>
                    <div class='style-747'>
                      <div class='style-748'>
                        <div class='style-749'>
                          <img class='style-750' src='//user-images.trustpilot.com/661a4ce0912cf3001240e9de/64x64.png' alt='KHUSHI KUMARI' decoding='async' loading='lazy' />
                          <div class='style-751'>
                            <div class='style-752'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-753' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-754'>
                          <a href='users/661a4ce0912cf3001240e9de' rel='nofollow' target='_self' class='style-755'>
                            KHUSHI KUMARI
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/faharas.com' target='_self' class='style-756'>
                            Faharas NET
                          </a>
                        </h3>
                        <p class='style-757'>“Great fantasy readers pretty well now have some problem reading and writing ”</p>
                      </div>
                    </div>
                    <div class='style-758'>
                      <div class='style-759'>
                        <div class='style-760'>
                          <img class='style-761' src='//user-images.trustpilot.com/6166d73372c7a20012eb99c8/64x64.png' alt='Daisy H' decoding='async' loading='lazy' />
                          <div class='style-762'>
                            <div class='style-763'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-764' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-765'>
                          <a href='users/6166d73372c7a20012eb99c8' rel='nofollow' target='_self' class='style-766'>
                            Daisy H
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/yolo.co.uk' target='_self' class='style-767'>
                            yolö creative
                          </a>
                        </h3>
                        <p class='style-768'>“Really great company, fast delivery &amp; whenever I have had to message them they’ve replied quickly &amp; been really friendly. One of the best places I use for suppl...”</p>
                      </div>
                    </div>
                  </div>
                  <div class='style-769' data-activity-stream-column='true'>
                    <div class='style-770'>
                      <div class='style-771'>
                        <div class='style-772'>
                          <img class='style-773' src='//user-images.trustpilot.com/661a4d160052f80012977cb9/64x64.png' alt='Francisco Abrantes' decoding='async' loading='lazy' />
                          <div class='style-774'>
                            <div class='style-775'>
                              <img alt='Rated 4 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-4.svg' class='style-776' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-777'>
                          <a href='users/661a4d160052f80012977cb9' rel='nofollow' target='_self' class='style-778'>
                            Francisco Abrantes
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/ukvaporwaves.com' target='_self' class='style-779'>
                            UK Vapor Waves
                          </a>
                        </h3>
                        <p class='style-780'>“My package arrived 6 days later, than when it was supposed to. This is the first time I have had any troubles with them. Other than that, they are always on tim...”</p>
                      </div>
                    </div>
                    <div class='style-781'>
                      <div class='style-782'>
                        <div class='style-783'>
                          <img class='style-784' src='//user-images.trustpilot.com/661a4d54912cf3001240ea20/64x64.png' alt='Sharon Barnes' decoding='async' loading='lazy' />
                          <div class='style-785'>
                            <div class='style-786'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-787' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-788'>
                          <a href='users/661a4d54912cf3001240ea20' rel='nofollow' target='_self' class='style-789'>
                            Sharon Barnes
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/www.vodafone.co.uk' target='_self' class='style-790'>
                            Vodafone UK
                          </a>
                        </h3>
                        <p class='style-791'>“Whenever I call into the leamington store everyone is aways so helpful and polite ”</p>
                      </div>
                    </div>
                  </div>
                  <div class='style-792' data-activity-stream-column='true'>
                    <div class='style-793'>
                      <div class='style-794'>
                        <div class='style-795'>
                          <img class='style-796' src='//user-images.trustpilot.com/661a4e8b0052f80012977da0/64x64.png' alt='Sharon Bennett' decoding='async' loading='lazy' />
                          <div class='style-797'>
                            <div class='style-798'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-799' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-800'>
                          <a href='users/661a4e8b0052f80012977da0' rel='nofollow' target='_self' class='style-801'>
                            Sharon Bennett
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/gohenry.com/uk' target='_self' class='style-802'>
                            GoHenry
                          </a>
                        </h3>
                        <p class='style-803'>“Making my granddaughter a very happy child loves her card and the independence she has ”</p>
                      </div>
                    </div>
                    <div class='style-804'>
                      <div class='style-805'>
                        <div class='style-806'>
                          <img class='style-807' src='//user-images.trustpilot.com/660f18446584af001204de33/64x64.png' alt='ED' decoding='async' loading='lazy' />
                          <div class='style-808'>
                            <div class='style-809'>
                              <img alt='Rated 3 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-3.svg' class='style-810' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-811'>
                          <a href='users/660f18446584af001204de33' rel='nofollow' target='_self' class='style-812'>
                            ED
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/www.tesco.com' target='_self' class='style-813'>
                            Tesco
                          </a>
                        </h3>
                        <p class='style-814'>“Tesco needs to do one thing with their home delivery, that is to return to £25 instead of £50 where they put a £5 charge on the delivery order. Not everyone nee...”</p>
                      </div>
                    </div>
                  </div>
                  <div class='style-815' data-activity-stream-column='true'>
                    <div class='style-816'>
                      <div class='style-817'>
                        <div class='style-818'>
                          <img class='style-819' src='//user-images.trustpilot.com/63d20bf2d1ffac00127e4d19/64x64.png' alt='customer' decoding='async' loading='lazy' />
                          <div class='style-820'>
                            <div class='style-821'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-822' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-823'>
                          <a href='users/63d20bf2d1ffac00127e4d19' rel='nofollow' target='_self' class='style-824'>
                            customer
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/songtools.io' target='_self' class='style-825'>
                            Songtools
                          </a>
                        </h3>
                        <p class='style-826'>“Songtools has been a game changer for my music. I just can't find enough words to say thank you. I appreciate the efforts that Songtools has done for my music.”</p>
                      </div>
                    </div>
                    <div class='style-827'>
                      <div class='style-828'>
                        <div class='style-829'>
                          <img class='style-830' src='//user-images.trustpilot.com/661a4d88427b7a0011a6c10d/64x64.png' alt='Arthur Bowden' decoding='async' loading='lazy' />
                          <div class='style-831'>
                            <div class='style-832'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-833' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-834'>
                          <a href='users/661a4d88427b7a0011a6c10d' rel='nofollow' target='_self' class='style-835'>
                            Arthur Bowden
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/flightcatchers.com' target='_self' class='style-836'>
                            Flightcatchers
                          </a>
                        </h3>
                        <p class='style-837'>“The lady was very helpful and answered all my questions. I felt at ease with this charming lady.”</p>
                      </div>
                    </div>
                  </div>
                  <div class='style-838' data-activity-stream-column='true'>
                    <div class='style-839'>
                      <div class='style-840'>
                        <div class='style-841'>
                          <img class='style-842' src='//user-images.trustpilot.com/661a4d97d0cd7a0012ae8194/64x64.png' alt='gcook' decoding='async' loading='lazy' />
                          <div class='style-843'>
                            <div class='style-844'>
                              <img alt='Rated 1 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-1.svg' class='style-845' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-846'>
                          <a href='users/661a4d97d0cd7a0012ae8194' rel='nofollow' target='_self' class='style-847'>
                            gcook
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/usebounce.com' target='_self' class='style-848'>
                            Bounce Luggage Storage
                          </a>
                        </h3>
                        <p class='style-849'>“Gave me address to a mall with 15+ stores and a name that was not displayed on the store. Garbage service. ”</p>
                      </div>
                    </div>
                    <div class='style-850'>
                      <div class='style-851'>
                        <div class='style-852'>
                          <img class='style-853' src='//user-images.trustpilot.com/65b3e002a052ec001217c705/64x64.png' alt='Mert Oflaz' decoding='async' loading='lazy' />
                          <div class='style-854'>
                            <div class='style-855'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-856' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-857'>
                          <a href='users/65b3e002a052ec001217c705' rel='nofollow' target='_self' class='style-858'>
                            Mert Oflaz
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/skiller90.com' target='_self' class='style-859'>
                            Skiller Shop{" "}
                          </a>
                        </h3>
                        <p class='style-860'>“Really good quality, even if something was missing. Support is always available and very accommodating towards you. 10/10, can only recommend it to everyone. ”</p>
                      </div>
                    </div>
                  </div>
                  <div class='style-861' data-activity-stream-column='true'>
                    <div class='style-862'>
                      <div class='style-863'>
                        <div class='style-864'>
                          <img class='style-865' src='//user-images.trustpilot.com/59b951ee0000ff000ac8b676/64x64.png' alt='Dave Critchley' decoding='async' loading='lazy' />
                          <div class='style-866'>
                            <div class='style-867'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-868' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-869'>
                          <a href='users/59b951ee0000ff000ac8b676' rel='nofollow' target='_self' class='style-870'>
                            Dave Critchley
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/www.outfoxthemarket.co.uk' target='_self' class='style-871'>
                            Outfox the Market{" "}
                          </a>
                        </h3>
                        <p class='style-872'>“The chat service was fast and the operator was to be point and clear.At my previous supplier, EON Next. I had to wait ages to get anyone to answer queries.”</p>
                      </div>
                    </div>
                    <div class='style-873'>
                      <div class='style-874'>
                        <div class='style-875'>
                          <img class='style-876' src='//user-images.trustpilot.com/661a4e41df518e00127e0ffd/64x64.png' alt='Raffel Dilrange' decoding='async' loading='lazy' />
                          <div class='style-877'>
                            <div class='style-878'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-879' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-880'>
                          <a href='users/661a4e41df518e00127e0ffd' rel='nofollow' target='_self' class='style-881'>
                            Raffel Dilrange
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/www.theessencevault.co.uk' target='_self' class='style-882'>
                            The Essence Vault
                          </a>
                        </h3>
                        <p class='style-883'>“Long lasting fragrance. Very Pleasant Smell. Definitely worth the Price. Highly Recommended and would for sure buy again.”</p>
                      </div>
                    </div>
                  </div>
                  <div class='style-884' data-activity-stream-column='true'>
                    <div class='style-885'>
                      <div class='style-886'>
                        <div class='style-887'>
                          <img class='style-888' src='//user-images.trustpilot.com/661a4e34fc6ed600122c7253/64x64.png' alt='Jen D coaching' decoding='async' loading='lazy' />
                          <div class='style-889'>
                            <div class='style-890'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-891' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-892'>
                          <a href='users/661a4e34fc6ed600122c7253' rel='nofollow' target='_self' class='style-893'>
                            Jen D coaching
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/ideapod.com' target='_self' class='style-894'>
                            Ideapod
                          </a>
                        </h3>
                        <p class='style-895'>“Thank you for your wisdom. I look forward to your video messages and emails all the time. They seem to find me just as I need them.”</p>
                      </div>
                    </div>
                    <div class='style-896'>
                      <div class='style-897'>
                        <div class='style-898'>
                          <img class='style-899' src='//user-images.trustpilot.com/6536539774f2ca00120090a8/64x64.png' alt='Darrell Williamson' decoding='async' loading='lazy' />
                          <div class='style-900'>
                            <div class='style-901'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-902' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-903'>
                          <a href='users/6536539774f2ca00120090a8' rel='nofollow' target='_self' class='style-904'>
                            Darrell Williamson
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/myappliances.co.uk' target='_self' class='style-905'>
                            MyAppliances
                          </a>
                        </h3>
                        <p class='style-906'>“very pleased with the gas hob. fast delivery &amp; no problems installing it. Regards Preimer Plumbing &amp; Heating. !!phsplumbingandheating.co,uk!!”</p>
                      </div>
                    </div>
                  </div>
                  <div class='style-907' data-activity-stream-column='true'>
                    <div class='style-908'>
                      <div class='style-909'>
                        <div class='style-910'>
                          <img class='style-911' src='//user-images.trustpilot.com/661a4cf00052f80012977ca5/64x64.png' alt='Valentin Valenta' decoding='async' loading='lazy' />
                          <div class='style-912'>
                            <div class='style-913'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-914' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-915'>
                          <a href='users/661a4cf00052f80012977ca5' rel='nofollow' target='_self' class='style-916'>
                            Valentin Valenta
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/mous.co' target='_self' class='style-917'>
                            Mous
                          </a>
                        </h3>
                        <p class='style-918'>“I ordered worng car mount, and customer support were very helpfull in exchanging it to a right one. Very kind and helpfull. Excellent service”</p>
                      </div>
                    </div>
                    <div class='style-919'>
                      <div class='style-920'>
                        <div class='style-921'>
                          <img class='style-922' src='//user-images.trustpilot.com/65361a1054cf110011155e57/64x64.png' alt='Vennila Ponnusamy' decoding='async' loading='lazy' />
                          <div class='style-923'>
                            <div class='style-924'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-925' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-926'>
                          <a href='users/65361a1054cf110011155e57' rel='nofollow' target='_self' class='style-927'>
                            Vennila Ponnusamy
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/www.furniturevillage.co.uk' target='_self' class='style-928'>
                            Furniture Village
                          </a>
                        </h3>
                        <p class='style-929'>“Excellent delivery by Rausheed. On time, tidy work and also picked up small stains in the upholstery and explained what to do with it. ”</p>
                      </div>
                    </div>
                  </div>
                  <div class='style-930' data-activity-stream-column='true'>
                    <div class='style-931'>
                      <div class='style-932'>
                        <div class='style-933'>
                          <img class='style-934' src='//user-images.trustpilot.com/59d788a90000ff000ad1c40d/64x64.png' alt='Pandora' decoding='async' loading='lazy' />
                          <div class='style-935'>
                            <div class='style-936'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-937' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-938'>
                          <a href='users/59d788a90000ff000ad1c40d' rel='nofollow' target='_self' class='style-939'>
                            Pandora
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/manypets.com/uk' target='_self' class='style-940'>
                            ManyPets Pet Insurance
                          </a>
                        </h3>
                        <p class='style-941'>“Excellent insurer for our epileptic dog albeit their claim handling times are super long which I know is down to the increase in customers.”</p>
                      </div>
                    </div>
                    <div class='style-942'>
                      <div class='style-943'>
                        <div class='style-944'>
                          <img class='style-945' src='//user-images.trustpilot.com/661a4d51427b7a0011a6c0df/64x64.png' alt='peter marsh' decoding='async' loading='lazy' />
                          <div class='style-946'>
                            <div class='style-947'>
                              <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-948' />
                            </div>
                          </div>
                        </div>
                        <h3 class='style-949'>
                          <a href='users/661a4d51427b7a0011a6c0df' rel='nofollow' target='_self' class='style-950'>
                            peter marsh
                          </a>{" "}
                          reviewed{" "}
                          <a href='review/www.barkerandstonehouse.co.uk' target='_self' class='style-951'>
                            Barker and Stonehouse
                          </a>
                        </h3>
                        <p class='style-952'>“What great drivers Kalvis &amp; Paul C were today, very helpful and friendly.....Sofa is amazing thank you very much Barker and Stonehouse 100% ”</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <section class='style-953' aria-labelledby='title'>
              <h2 class='style-954'>Your stories</h2>
              <h3 class='style-955'>Each review has a personal story</h3>
              <div class='style-956' data-stack-carousel='true'>
                <div class='style-957'>
                  <div class='style-958' data-stack-carousel-layer='true'>
                    <figure class='style-959'>
                      <div class='style-960'>
                        <picture class='style-961'>
                          <source type='image/webp' srcset='https://consumersite-assets.trustpilot.net/consumersite-home/public/_rebrand/broken-phone-review.webp' class='style-962' />
                          <img
                            class='style-963'
                            src='https://consumersite-assets.trustpilot.net/consumersite-home/public/_rebrand/broken-phone-review.jpg'
                            alt='A picture of a man sitting on a couch looking at his phone while holding his head.'
                            width='620'
                            height='532'
                            loading='lazy'
                            decoding='async'
                          />
                        </picture>
                      </div>
                      <div class='style-964'>
                        <div class='style-965'></div>
                        <div class='style-966'>
                          <figcaption aria-labelledby='broken_phone_review_text' class='style-967'>
                            <div class='style-968'>
                              <div class='style-969'>
                                <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-970' />
                              </div>
                            </div>
                            <p class='style-971'>Fixed my broke fone. But I still can't get a date on Tinder.</p>
                            <p class='style-972'>
                              <span class='style-973'>Max</span> experienced <span class='style-974'>Re-Tech</span>
                            </p>
                          </figcaption>
                        </div>
                        <div class='style-975'></div>
                      </div>
                    </figure>
                  </div>
                  <div class='style-976' data-stack-carousel-layer='true'>
                    <figure class='style-977'>
                      <div class='style-978'>
                        <picture class='style-979'>
                          <source type='image/webp' srcset='https://consumersite-assets.trustpilot.net/consumersite-home/public/_rebrand/dog-gift-review.webp' class='style-980' />
                          <img class='style-981' src='https://consumersite-assets.trustpilot.net/consumersite-home/public/_rebrand/dog-gift-review.jpg' alt='A picture of a woman holding a dog in her arms.' width='620' height='532' loading='lazy' decoding='async' />
                        </picture>
                      </div>
                      <div class='style-982'>
                        <div class='style-983'></div>
                        <div class='style-984'>
                          <figcaption aria-labelledby='dog_gift_review_text' class='style-985'>
                            <div class='style-986'>
                              <div class='style-987'>
                                <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-988' />
                              </div>
                            </div>
                            <p class='style-989'>The first birthday gift my wife didn't want to return.</p>
                            <p class='style-990'>
                              <span class='style-991'>Robert</span> experienced <span class='style-992'>Songfinch</span>
                            </p>
                          </figcaption>
                        </div>
                        <div class='style-993'></div>
                      </div>
                    </figure>
                  </div>
                  <div class='style-994' data-stack-carousel-layer='true'>
                    <figure class='style-995'>
                      <div class='style-996'>
                        <picture class='style-997'>
                          <source type='image/webp' srcset='https://consumersite-assets.trustpilot.net/consumersite-home/public/_rebrand/plant-shopping-review.webp' class='style-998' />
                          <img class='style-999' src='https://consumersite-assets.trustpilot.net/consumersite-home/public/_rebrand/plant-shopping-review.jpg' alt='A picture of a woman in a greenhouse shopping for plants.' width='620' height='532' loading='lazy' decoding='async' />
                        </picture>
                      </div>
                      <div class='style-1000'>
                        <div class='style-1001'></div>
                        <div class='style-1002'>
                          <figcaption aria-labelledby='plant_shopping_review_text' class='style-1003'>
                            <div class='style-1004'>
                              <div class='style-1005'>
                                <img alt='Rated 5 out of 5 stars' src='https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg' class='style-1006' />
                              </div>
                            </div>
                            <p class='style-1007'>Gonna love making my flat a small jungle :)</p>
                            <p class='style-1008'>
                              <span class='style-1009'>Marjori</span> experienced <span class='style-1010'>Patch</span>
                            </p>
                          </figcaption>
                        </div>
                        <div class='style-1011'></div>
                      </div>
                    </figure>
                  </div>
                </div>
                <button class='style-1012' name='previousFeaturedReview' type='button' aria-label='View previous featured review' data-previousfeaturedreview-button='true'>
                  <span class='style-1013'>
                    <svg viewBox='0 0 16 16' class='style-1014' xmlns='http://www.w3.org/2000/svg' width='16px' height='16px'>
                      <path fill-rule='evenodd' clip-rule='evenodd' d='M10.51 7.776 3.953 2.158l.65-.759 7.444 6.377-7.443 6.382-.651-.759 6.557-5.623Z' class='style-1015'></path>
                    </svg>
                  </span>
                </button>
                <button class='style-1016' name='nextFeaturedReview' type='button' aria-label='View next featured review' data-nextfeaturedreview-button='true'>
                  <span class='style-1017'>
                    <svg viewBox='0 0 16 16' class='style-1018' xmlns='http://www.w3.org/2000/svg' width='16px' height='16px'>
                      <path fill-rule='evenodd' clip-rule='evenodd' d='M10.51 7.776 3.953 2.158l.65-.759 7.444 6.377-7.443 6.382-.651-.759 6.557-5.623Z' class='style-1019'></path>
                    </svg>
                  </span>
                </button>
              </div>
            </section>
            <section class='style-1020'>
              <h2 class='style-1021'>Be heard</h2>
              <p class='style-1022'>Trustpilot is free and open to every company and consumer everywhere. Sharing your experiences helps others make better choices and companies up their game.</p>
              <a href='/about' target='_self' class='style-1023'>
                <span class='style-1024'>What we do</span>
              </a>
            </section>
          </main>
          <div class='style-1025'>
            <a href='/end-of-the-line' rel='nofollow' target='_self' class='style-1026'>
              are you human?
            </a>
          </div>
          <footer class='style-1027' role='contentinfo'></footer>
        </div>

        <Script src='//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js' strategy='lazyOnload' />
      </Outline>
    </>
  );
}
