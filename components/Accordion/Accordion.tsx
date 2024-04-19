//* REFACTORED
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

const disclosureButtonStyle: React.CSSProperties = {
  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
};

interface CustomDisclosureProps {
  title: string;
  content: string;
}

function CustomDisclosure({ title, content }: CustomDisclosureProps): JSX.Element {
  return (
    <Disclosure as='div' className='mt-2'>
      {({ open }) => (
        <>
          <Disclosure.Button style={disclosureButtonStyle} className='flex w-full justify-between rounded-md bg-white px-4 py-4 text-left text-md font-medium text-black focus:outline-none'>
            <span className='primary-blue-text'>{title}</span>
            <ChevronUpIcon className={`${open ? "rotate-180 transform" : ""} h-8 w-8 text-red-500`} />
          </Disclosure.Button>
          <Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>{content}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

const Example: React.FC = (): JSX.Element => {
  return (
    <div className='w-full rounded-2xl bg-white p-2'>
      <CustomDisclosure
        title='What is Your School Management Software??'
        content='Your School Management Software is a digital platform that helps educational institutions streamline their administrative and operational tasks especially designed for Nepal and Nepalis. It automates processes like student enrollment, course scheduling, fee management, library management, attendance tracking, and more.'
      />
      <CustomDisclosure
        title='What are the features of Your School Management Software?'
        content='The key features of our School Management Software include student information management, digital attendance tracking, grade management, timetable scheduling, communication tools, library management, and more. For more information check out our modules page.'
      />
      <CustomDisclosure
        title='What are the benefits of using Your School Management Software?'
        content='It enhances administrative efficiency, improves communication and transparency, allows real-time data access, and fosters a collaborative learning environment. Besides, the cost and time you save by using software is uncanny. Check our time and cost savings calculator for more information.'
      />
      <CustomDisclosure
        title='How does Your School Management Software work?'
        content='   It provides a centralized dashboard to manage and track all information assets digitally. It automates administrative tasks like grading and attendance tracking and facilitates efficient retrieval and updates of student records.'
      />
      <CustomDisclosure
        title='Who uses Your School Management Software?'
        content='It is typically used by school administrators, support staff in various departments, teachers, students, and parents. Your School is manageable by the school admins and teachers and students, faculty members, parents get to use it.'
      />
      <CustomDisclosure
        title='How much does Your School Management Software cost?'
        content='Your School Management Software has subscription-based fees related to it. Visit our pricing page for more information. Our motto has been to “Give more at less price” & “Give best at less”. So rest assured you can have our software no matter how big/small your institution is.'
      />
      <CustomDisclosure
        title='Why choose Your School Management Software?'
        content='We are a Nepal-based company and we have built it tailored to Nepal and Nepali audiences building the product from scratch. So we believe we are the best Nepal-based Management software company in the present scenario. Also, after the pandemic how we teach and learn has changed drastically. As a newly opened company, we have acknowledged this fact while building our product and modules.'
      />
      <CustomDisclosure title='How to contact Your School Management Software?' content='Please fill in your information on the Contact Us page of Your School Management Software. You can also directly give us a call via our phone numbers: 9840266570, 9749211234.' />
      <CustomDisclosure title='What are the trends in Your School Management Software?' content='Trends include effective classroom management, live online classes, increase in online exams and assessments, advanced platform for digital learning, and integrated learning environment.' />
    </div>
  );
};

export default Example;
