import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const EmptyState = () => {
  const router = useRouter();

  return (
    <div
      className='
          px-4 
          py-10 
          sm:px-6 
          lg:px-8 
          lg:py-6 
          min-h-screen 
          flex 
          justify-center 
          items-center 
          bg-gray-100
        '
    >
      <div className='text-center items-center flex flex-col'>
        <h3 className='mt-2 text-2xl font-semibold text-gray-900'>Select a chat or start a new conversation</h3>
        <a
          href='#'
          onClick={async () => {
            await signOut();
            router.push("/chat/chatLogin");
          }}
        >
          Logout
        </a>
      </div>
    </div>
  );
};

export default EmptyState;
