import Link from "next/link";
const FeatureMenu = ({ link, name }: { link: string; name: string }) => {
  return (
    <>
      <Link href={link}>
        <div className='p-1 feature-item cursor-pointer flex flex-row mt-3 justify-start items-center'>
          <div className='w-8 h-8  mr-3'>
            <img
              src='data:image/svg+xml;base64,PHN2ZyBpZD0iQ3VzdG9tUmVwb3J0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij4KICA8cmVjdCBpZD0iUmVjdGFuZ2xlXzUzNiIgZGF0YS1uYW1lPSJSZWN0YW5nbGUgNTM2IiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQ4IDQ4KSByb3RhdGUoLTE4MCkiIGZpbGw9Im5vbmUiLz4KICA8ZyBpZD0iR3JvdXBfODc1IiBkYXRhLW5hbWU9Ikdyb3VwIDg3NSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEyOTYgLTU3NikiPgogICAgPHJlY3QgaWQ9IlJlY3RhbmdsZV81MzciIGRhdGEtbmFtZT0iUmVjdGFuZ2xlIDUzNyIgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMzQ0IDYyNCkgcm90YXRlKC0xODApIiBmaWxsPSJub25lIi8%2BCiAgPC9nPgogIDxnIGlkPSJHcm91cF84NzYiIGRhdGEtbmFtZT0iR3JvdXAgODc2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTI5NiAtNTc2KSI%2BCiAgICA8cGF0aCBpZD0iUGF0aF8xMTY1IiBkYXRhLW5hbWU9IlBhdGggMTE2NSIgZD0iTTEzMTgsNjAwaDExYTEsMSwwLDAsMCwwLTJoLTF2LTVhMSwxLDAsMCwwLTEtMWgtNGExLDEsMCwwLDAtMSwxdjVoLTR2LTdhMSwxLDAsMCwwLTEtMWgtNGExLDEsMCwwLDAtMSwxdjdoLTFhMSwxLDAsMCwwLDAsMmg3Wm0tMi0yaC0ydi02aDJabTgsMHYtNGgydjRaIiBmaWxsPSIjZTc0YzNjIi8%2BCiAgICA8cGF0aCBpZD0iUGF0aF8xMTY2IiBkYXRhLW5hbWU9IlBhdGggMTE2NiIgZD0iTTEzMjMsNjA0aDZhMSwxLDAsMCwxLDAsMmgtNmExLDEsMCwwLDEsMC0yWiIgZmlsbD0iI2U3NGMzYyIvPgogICAgPHBhdGggaWQ9IlBhdGhfMTE2NyIgZGF0YS1uYW1lPSJQYXRoIDExNjciIGQ9Ik0xMzI5LDYxMGgtNGExLDEsMCwwLDEsMC0yaDRhMSwxLDAsMCwxLDAsMloiIGZpbGw9IiNlNzRjM2MiLz4KICAgIDxwYXRoIGlkPSJQYXRoXzExNjgiIGRhdGEtbmFtZT0iUGF0aCAxMTY4IiBkPSJNMTMyMyw2MTJoNmExLDEsMCwwLDEsMCwyaC02YTEsMSwwLDAsMSwwLTJaIiBmaWxsPSIjZTc0YzNjIi8%2BCiAgPC9nPgogIDxwYXRoIGlkPSJQYXRoXzExNjkiIGRhdGEtbmFtZT0iUGF0aCAxMTY5IiBkPSJNMTMwNCw1ODN2MThhMSwxLDAsMCwwLDEsMWgwYTEsMSwwLDAsMCwxLTFWNTg0aDh2MWExLDEsMCwwLDAsMSwxaDEwYTEsMSwwLDAsMCwxLTF2LTFoOHYzNGgtMTNhMSwxLDAsMCwwLTEsMWgwYTEsMSwwLDAsMCwxLDFoMTRhMSwxLDAsMCwwLDEtMVY1ODNhMSwxLDAsMCwwLTEtMWgtOXYtMWExLDEsMCwwLDAtMS0xaC0xMGExLDEsMCwwLDAtMSwxdjFoLTlBMSwxLDAsMCwwLDEzMDQsNTgzWm0xMi0xaDh2MmgtOFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMjk2IC01NzYpIiBmaWxsPSIjZTc0YzNjIi8%2BCiAgPHBhdGggaWQ9IlBhdGhfMTE3MCIgZGF0YS1uYW1lPSJQYXRoIDExNzAiIGQ9Ik0xMzA1LjY2Nyw2MTMuMDk0bC0xLjE2Ny42NzRhMSwxLDAsMCwwLS4zNjYsMS4zNjZsMSwxLjczMmExLDEsMCwwLDAsMS4zNjYuMzY2bDEuMTY3LS42NzRhNS45ODcsNS45ODcsMCwwLDAsMS45LDEuMDkzVjYxOWExLDEsMCwwLDAsMSwxaDJhMSwxLDAsMCwwLDEtMXYtMS4zNDlhNS45ODEsNS45ODEsMCwwLDAsMS45LTEuMDkzbDEuMTY3LjY3NGExLDEsMCwwLDAsMS4zNjYtLjM2NmwxLTEuNzMyYTEsMSwwLDAsMC0uMzY2LTEuMzY2bC0xLjE2Ny0uNjc0YTUuODA2LDUuODA2LDAsMCwwLDAtMi4xODhsMS4xNjctLjY3NGExLDEsMCwwLDAsLjM2Ni0xLjM2NmwtMS0xLjczMmExLDEsMCwwLDAtMS4zNjYtLjM2NmwtMS4xNjcuNjc0YTUuOTgxLDUuOTgxLDAsMCwwLTEuOS0xLjA5M1Y2MDVhMSwxLDAsMCwwLTEtMWgtMmExLDEsMCwwLDAtMSwxdjEuMzQ5YTUuOTg3LDUuOTg3LDAsMCwwLTEuOSwxLjA5M2wtMS4xNjctLjY3NGExLDEsMCwwLDAtMS4zNjYuMzY2bC0xLDEuNzMyYTEsMSwwLDAsMCwuMzY2LDEuMzY2bDEuMTY3LjY3NGE1Ljc1Myw1Ljc1MywwLDAsMCwwLDIuMTg4Wm0zLjktMS4wOTRhMiwyLDAsMSwxLDIsMkEyLDIsMCwwLDEsMTMwOS41NjIsNjEyWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEyOTYgLTU3NikiIGZpbGw9IiNlNzRjM2MiLz4KPC9zdmc%2BCg%3D%3D'
              alt='feature icon'
              className='w-full h-full object-cover'
            />
          </div>
          <span className='text-sm '>{name}</span>
        </div>
      </Link>
    </>
  );
};

export default FeatureMenu;